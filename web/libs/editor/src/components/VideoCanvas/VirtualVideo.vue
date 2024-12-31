<!-- VirtualVideo.vue -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { InfoModal } from './InfoModal' // 假设你有一个 InfoModal 组件

const props = defineProps<{
  src?: string
  muted?: boolean
  crossOrigin?: string
}>()

const emit = defineEmits<{
  (e: 'canPlayType', supported: boolean): void
  (e: 'timeupdate', event: Event): void
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'seeked'): void
  (e: 'ended'): void
}>()

// MIME 类型映射
const mimeTypeMapping = {
  mp4: "video/mp4",
  mp4v: "video/mp4",
  mpg4: "video/mp4",
  ogg: "video/ogg",
  ogv: "video/ogg",
  ogm: "video/ogg",
  ogx: "video/ogg",
  webm: "video/webm",
  avi: "video/avi",
  mov: "video/quicktime",
  qt: "video/quicktime",
}

const video = ref<HTMLVideoElement | null>(null)
const attachedEvents = ref<[string, any][]>([])

// 检查是否为二进制文件
const isBinary = (mimeType: string | null | undefined) => {
  if (!mimeType) return false
  return mimeType.includes('octet-stream')
}

// 检查URL是否可播放
const canPlayUrl = async (url: string) => {
  const testVideo = document.createElement('video')
  const pathName = new URL(url, /^https?/.exec(url) ? undefined : window.location.href).pathname
  const fileType = pathName.split('.').pop() as keyof typeof mimeTypeMapping
  
  let fileMimeType: string | null | undefined = mimeTypeMapping[fileType]

  if (!fileMimeType) {
    const fileMeta = await fetch(url, {
      method: 'GET',
      headers: {
        Range: 'bytes=0-0',
      },
    })
    fileMimeType = fileMeta.headers.get('content-type')
  }

  const supported = isBinary(fileMimeType) || (!!fileMimeType && testVideo.canPlayType(fileMimeType) !== '')
  
  if (!supported && !document.querySelector('.ant-modal')) {
    InfoModal.error('There has been an error rendering your video, please check the format is supported')
  }
  
  emit('canPlayType', supported)
  return supported
}

// 创建视频元素
const createVideoElement = () => {
  const videoEl = document.createElement('video')
  videoEl.muted = !!props.muted
  videoEl.controls = false
  videoEl.preload = 'auto'
  videoEl.crossOrigin = props.crossOrigin || 'anonymous'
  
  Object.assign(videoEl.style, {
    top: '-9999px',
    position: 'absolute',
    opacity: '0',
  })

  document.body.appendChild(videoEl)
  video.value = videoEl
}

// 附加事件监听器
const attachEventListeners = () => {
  if (!video.value) return

  const events = [
    ['timeupdate', (e: Event) => emit('timeupdate', e)],
    ['play', () => emit('play')],
    ['pause', () => emit('pause')],
    ['seeked', () => emit('seeked')],
    ['ended', () => emit('ended')],
  ]

  events.forEach(([event, handler]) => {
    video.value?.addEventListener(event, handler)
    attachedEvents.value.push([event, handler])
  })
}

// 移除事件监听器
const detachEventListeners = () => {
  if (!video.value) return

  attachedEvents.value.forEach(([event, handler]) => {
    video.value?.removeEventListener(event, handler)
  })
  attachedEvents.value = []
}

// 卸载视频源
const unloadSource = () => {
  if (!video.value) return
  video.value.src = ''
  video.value.load()
}

// 加载视频源
const attachSource = async () => {
  if (!video.value || !props.src) return

  video.value.pause()
  
  const supported = await canPlayUrl(props.src)
  if (!supported) return

  video.value.src = props.src
  video.value.load()
}

// 组件挂载时创建视频元素和添加事件监听
onMounted(() => {
  createVideoElement()
  attachEventListeners()
  if (props.src) {
    attachSource()
  }
})

// 组件卸载时清理
onBeforeUnmount(() => {
  detachEventListeners()
  unloadSource()
  if (video.value) {
    document.body.removeChild(video.value)
    video.value = null
  }
})

// 暴露方法给父组件
defineExpose({
  videoElement: video,
  attachSource,
  unloadSource,
})
</script>

<template>
  <!-- 这是一个虚拟视频组件，实际的视频元素会被动态创建并添加到 body 中 -->
  <div class="virtual-video"></div>
</template>

<style scoped>
.virtual-video {
  display: none;
}
</style>
