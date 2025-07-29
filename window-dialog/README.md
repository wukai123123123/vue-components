### WindowDialog弹窗组件

#### 说明
这是一个在浏览器中模拟windows弹窗的dialog组件，需要在vue3中进行使用，支持拖拽、调整大小、分屏、最大化、最小化、关闭、隐藏最大化、隐藏最小化等功能。

#### 使用方式
```javascript
import WindowDialogComponents from "@/components/window-dialog/window-dialog-components.vue";

...

<a-button type="primary" @click="()=> this.$refs.dialog1.open()">默认弹窗（全功能）</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog2.open()">禁止调整大小</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog3.open()">禁用分屏效果</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog4.open()">禁用拖动</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog5.open()">禁用最大化</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog6.open()">禁用最小化</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog7.open()">隐藏最大最小化</a-button>

<window-dialog-components title="标题" ref="dialog1">弹窗内容</window-dialog-components>
<window-dialog-components title="标题" ref="dialog2" disabled-resize>弹窗内容</window-dialog-components>
<window-dialog-components title="标题" ref="dialog3" disabled-split-screen>弹窗内容</window-dialog-components>
<window-dialog-components title="标题" ref="dialog4" disabled-drag>弹窗内容</window-dialog-components>
<window-dialog-components title="标题" ref="dialog5" disable-max>弹窗内容</window-dialog-components>
<window-dialog-components title="标题" ref="dialog6" disable-min>弹窗内容</window-dialog-components>
<window-dialog-components title="标题" ref="dialog7" hide-min hide-max>弹窗内容</window-dialog-components>
```

#### 文档
见window-dialog-components.vue中相关描述

#### License
MIT License
