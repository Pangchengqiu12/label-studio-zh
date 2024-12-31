<!-- VideoCanvas.vue -->
<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import VirtualVideo from './VirtualVideo.vue'

const MIN_ZOOM = 0.25
const MAX_ZOOM = 10

interface PanOptions {
  x: number
  y: number
}

interface VideoDimensions {
  width: number
  height: number
  ratio: number
}

const props = defineProps<{
  src: string
  width?: number
  height?: number
  position?: number
  currentTime?: number
  playing?: boolean
  framerate?: number
  muted?: boolean
  zoom?: number
  pan?: PanOptions
  allowInteractions?: boolean
  speed: number
  allowPanOffscreen?: boolean
  contrast?: number
  brightness?: number
  saturation?: number
}>()

const emit = defineEmits<{
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'click'): void
  (e: 'seeked', event?: any): void
  (e: 'timeupdate', event: any): void
  (e: 'load', data: any): void
  (e: 'frameChange', frame: number, length: number): void
  (e: 'ended'): void
  (e: 'resize', dimensions: VideoDimensions): void
  (e: 'error', error: any): void
}>()

const virtualVideo = ref<InstanceType<typeof VirtualVideo> | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const canvasContext = ref<CanvasRenderingContext2D | null>(null)
const currentFrame = ref(0)
const videoDimensions = ref<VideoDimensions>({
  width: 0,
  height: 0,
  ratio: 1,
})

// 计算实际缩放值
const clampZoom = (value: number) => Math.min(Math.max(value, MIN_ZOOM), MAX_ZOOM)

// 计算缩放比例
const zoomRatio = (canvasWidth: number, canvasHeight: number, width: number, height: number) => {
  return Math.min(canvasWidth / width, canvasHeight / height)
}

// 绘制视频帧
const drawVideo = () => {
  if (!canvas.value || !canvasContext.value || !virtualVideo.value?.videoElement.value) return

  const video = virtualVideo.value.videoElement.value
  const ctx = canvasContext.value

  // 清除画布
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // 应用变换
  ctx.save()
  
  // 应用缩放
  const currentZoom = clampZoom(props.zoom || 1)
  ctx.scale(currentZoom, currentZoom)

  // 应用平移
  if (props.pan) {
    ctx.translate(props.pan.x, props.pan.y)
  }

  // 应用滤镜
  if (props.contrast || props.brightness || props.saturation) {
    const filters = []
    if (props.contrast) filters.push(`contrast(${props.contrast}%)`)
    if (props.brightness) filters.push(`brightness(${props.brightness}%)`)
    if (props.saturation) filters.push(`saturate(${props.saturation}%)`)
    ctx.filter = filters.join(' ')
  }

  // 绘制视频
  ctx.drawImage(
    video,
    0,
    0,
    videoDimensions.value.width,
    videoDimensions.value.height,
  )

  ctx.restore()
}

// 动画帧处理
let animationFrame: number | null = null
const handleAnimationFrame = () => {
  if (!props.playing) return
  
  drawVideo()
  animationFrame = requestAnimationFrame(handleAnimationFrame)
}

// 视频播放控制方法
const play = () => {
  if (!virtualVideo.value?.videoElement.value) return
  virtualVideo.value.videoElement.value.play()
}

const pause = () => {
  if (!virtualVideo.value?.videoElement.value) return
  virtualVideo.value.videoElement.value.pause()
}

const seek = (time: number) => {
  if (!virtualVideo.value?.videoElement.value) return
  virtualVideo.value.videoElement.value.currentTime = time
}

const goToFrame = (frame: number) => {
  if (!virtualVideo.value?.videoElement.value || !props.framerate) return
  const time = frame / props.framerate
  seek(time)
}

// 视频加载检查
const checkVideoLoaded = () => {
  if (!virtualVideo.value?.videoElement.value) return

  const video = virtualVideo.value.videoElement.value
  
  videoDimensions.value = {
    width: video.videoWidth,
    height: video.videoHeight,
    ratio: video.videoWidth / video.videoHeight,
  }

  if (canvas.value) {
    canvas.value.width = video.videoWidth
    canvas.value.height = video.videoHeight
  }

  emit('load', {
    currentFrame: currentFrame.value,
    length: video.duration * (props.framerate || 30),
    playing: !video.paused,
    videoDimensions: videoDimensions.value,
    duration: video.duration,
    currentTime: video.currentTime,
    play,
    pause,
    seek,
    goToFrame,
  })
}

// 监听属性变化
watch(() => props.playing, (newVal) => {
  if (newVal) {
    play()
    handleAnimationFrame()
  } else {
    pause()
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
  }
})

// 组件挂载
onMounted(() => {
  if (canvas.value) {
    canvasContext.value = canvas.value.getContext('2d')
  }
})

// 暴露方法给父组件
defineExpose({
  play,
  pause,
  seek,
  goToFrame,
})
</script>

<template>
  <div class="video-canvas">
    <canvas
      ref="canvas"
      :style="{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
      }"
      @click="emit('click')"
    ></canvas>
    <VirtualVideo
      ref="virtualVideo"
      :src="src"
      :muted="muted"
      @timeupdate="(e) => emit('timeupdate', e)"
      @play="emit('play')"
      @pause="emit('pause')"
      @seeked="(e) => emit('seeked', e)"
      @ended="emit('ended')"
    />
  </div>
</template>

<style scoped>
.video-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

canvas {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
</style>
