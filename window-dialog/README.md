### WindowDialog弹窗组件

[English](README_EN.md)

#### 说明

这是一个在浏览器中模拟windows弹窗的dialog组件，需要在vue3中进行使用，支持拖拽、调整大小、分屏、最大化、最小化、关闭、隐藏最大化、隐藏最小化等功能。

#### 示例

[window-dialog-examples.mov](../examples/window-dialog-examples.mov)

#### 使用方式

```vue
import WindowDialogComponents from "@/components/window-dialog/window-dialog-components.vue";

...

<a-button type="primary" @click="()=> this.$refs.dialog1.open()"> 默认弹窗（全功能）</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog2.open()"> 禁止调整大小</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog3.open()"> 禁用分屏效果</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog4.open()"> 禁用拖动</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog5.open()"> 禁用最大化</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog6.open()"> 禁用最小化</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog7.open()"> 隐藏最大最小化</a-button>

<window-dialog-components title="标题" ref="dialog1">弹窗内容</window-dialog-components>
<window-dialog-components title="标题" ref="dialog2" disabled-resize>弹窗内容</window-dialog-components>
<window-dialog-components title="标题" ref="dialog3" disabled-split-screen>弹窗内容</window-dialog-components>
<window-dialog-components title="标题" ref="dialog4" disabled-drag>弹窗内容</window-dialog-components>
<window-dialog-components title="标题" ref="dialog5" disable-max>弹窗内容</window-dialog-components>
<window-dialog-components title="标题" ref="dialog6" disable-min>弹窗内容</window-dialog-components>
<window-dialog-components title="标题" ref="dialog7" hide-min hide-max>弹窗内容</window-dialog-components>
```

#### Props 属性

| 属性名                   | 类型      | 默认值     | 说明              |
|-----------------------|---------|---------|-----------------|
| `title`               | String  | -       | 弹窗标题            |
| `hideMin`             | Boolean | `false` | 是否隐藏最小化按钮       |
| `hideMax`             | Boolean | `false` | 是否隐藏最大化按钮       |
| `hideClose`           | Boolean | `false` | 是否隐藏关闭按钮        |
| `disableMin`          | Boolean | `false` | 是否禁用最小化功能       |
| `disableMax`          | Boolean | `false` | 是否禁用最大化功能       |
| `disableClose`        | Boolean | `false` | 是否禁用关闭功能        |
| `positionX`           | Number  | `50`    | 默认窗口位置 x 坐标(px) |
| `positionY`           | Number  | `50`    | 默认窗口位置 y 坐标(px) |
| `width`               | Number  | `400`   | 默认窗口宽度(px)      |
| `height`              | Number  | `300`   | 默认窗口高度(px)      |
| `minWidth`            | Number  | `400`   | 最小窗口宽度(px)      |
| `minHeight`           | Number  | `300`   | 最小窗口高度(px)      |
| `disabledDrag`        | Boolean | `false` | 是否禁止拖动窗口        |
| `disabledResize`      | Boolean | `false` | 是否禁止调整窗口大小      |
| `disabledSplitScreen` | Boolean | `false` | 是否禁用分屏效果        |

#### 方法

| 方法名               | 说明                  |
|-------------------|---------------------|
| `open()`          | 打开弹窗                |
| `switchMin(flag)` | 切换最小化状态，`flag` 为布尔值 |
| `switchMax(flag)` | 切换最大化状态，`flag` 为布尔值 |
| `close()`         | 关闭弹窗                |
| `bringToFront()`  | 将弹窗置于顶层             |

#### 功能说明

1. **拖拽功能**：在标题栏按住鼠标左键可拖拽窗口，通过 `disabled-drag` 属性可禁用此功能
2. **调整大小**：在窗口右下角拖拽可调整窗口大小，通过 `disabled-resize` 属性可禁用此功能
3. **分屏功能**：拖拽窗口到屏幕边缘可触发分屏，占据屏幕左/右半部分，通过 `disabled-split-screen` 属性可禁用此功能
4. **最大化/最小化**：支持窗口最大化和最小化操作
5. **多窗口管理**：支持多窗口，自动管理z-index层级关系
6. **自定义尺寸**：可设置窗口默认尺寸和最小尺寸

#### 注意事项

- 组件使用了 `Teleport` 功能，目标挂载点为 `#app`
- 组件基于 Vue 3 Composition API 开发
- 分屏功能依赖于拖拽和调整大小功能，若禁用这两项功能则分屏功能自动失效
- 窗口拖拽和调整大小时会自动限制在浏览器视窗范围内

#### License

MIT License
