//标记通用设置
export default {
  enableHotkeys: {
    newUI: {
      title: "标签热键",
      description: "可使用热键快速选择标签"
    },
    description: "启用标签热键",
    onChangeEvent: "toggleHotkeys",
    defaultValue: true
  },
  enableTooltips: {
    newUI: {
      title: "在工具提示中显示热键",
      description: "在工具和操作工具提示中显示按键绑定"
    },
    description: "Show hotkey tooltips",
    onChangeEvent: "显示热键工具提示",
    checked: "",
    defaultValue: false
  },
  enableLabelTooltips: {
    newUI: {
      title: "在标签上显示热键",
      description: "在标签上显示按键绑定"
    },
    description: "显示标签热键工具提示",
    onChangeEvent: "toggleLabelTooltips",
    defaultValue: true
  },
  showLabels: {
    newUI: {
      title: "显示区域标签",
      description: "显示区域标签名称"
    },
    description: "在区域内显示标签",
    onChangeEvent: "toggleShowLabels",
    defaultValue: false
  },
  continuousLabeling: {
    newUI: {
      title: "创建区域后保持选中标签",
      description: "允许使用所选标签连续创建区域"
    },
    description: "创建区域后保持选中标签",
    onChangeEvent: "toggleContinuousLabeling",
    defaultValue: false
  },
  selectAfterCreate: {
    newUI: {
      title: "创建区域后选择区域",
      description: "自动选择新建区域"
    },
    description: "创建后选择区域",
    onChangeEvent: "toggleSelectAfterCreate",
    defaultValue: false
  },
  showLineNumbers: {
    newUI: {
      tags: "文本标签",
      title: "显示行号",
      description: "确定并引用文件中的特定文本行"
    },
    description: "显示文本行号",
    onChangeEvent: "toggleShowLineNumbers",
    defaultValue: false
  },
  preserveSelectedTool: {
    newUI: {
      tags: "图像标签",
      title: "保留所选工具",
      description: "在不同任务中持续使用所选工具"
    },
    description: "记住所选工具",
    onChangeEvent: "togglepreserveSelectedTool",
    defaultValue: true
  },
  enableSmoothing: {
    newUI: {
      tags: "图像标签",
      title: "缩放时的像素平滑处理",
      description: "放大时平滑图像像素"
    },
    description: "缩放时启用图像平滑",
    onChangeEvent: "toggleSmoothing",
    defaultValue: true
  }
};
