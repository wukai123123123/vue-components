### WindowDialog弹窗组件

[Chinese](README.md)

#### Description

This is a dialog component that simulates Windows pop-up windows in the browser, designed for use in Vue 3. It supports dragging, resizing, split-screen, maximize,
minimize, close, hide maximize, hide minimize, and other functions.

#### Example

[window-dialog-examples.mov](../examples/window-dialog-examples.mov)

#### Usage

```vue
import WindowDialogComponents from "@/components/window-dialog/window-dialog-components.vue";

...

<a-button type="primary" @click="()=> this.$refs.dialog1.open()"> Default dialog (full functionality)</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog2.open()"> Disable resizing</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog3.open()"> Disable split screen</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog4.open()"> Disable dragging</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog5.open()"> Disable maximize</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog6.open()"> Disable minimize</a-button>
<a-button type="primary" @click="()=> this.$refs.dialog7.open()"> Hide maximize/minimize</a-button>

<window-dialog-components title="Title" ref="dialog1">Dialog content</window-dialog-components>
<window-dialog-components title="Title" ref="dialog2" disabled-resize>Dialog content</window-dialog-components>
<window-dialog-components title="Title" ref="dialog3" disabled-split-screen>Dialog content</window-dialog-components>
<window-dialog-components title="Title" ref="dialog4" disabled-drag>Dialog content</window-dialog-components>
<window-dialog-components title="Title" ref="dialog5" disable-max>Dialog content</window-dialog-components>
<window-dialog-components title="Title" ref="dialog6" disable-min>Dialog content</window-dialog-components>
<window-dialog-components title="Title" ref="dialog7" hide-min hide-max>Dialog content</window-dialog-components>
```

#### Props 属性

| Prop Name             | Type    | Default Value | Description                               |
|-----------------------|---------|---------------|-------------------------------------------|
| `title`               | String  | -             | Dialog title                              |
| `hideMin`             | Boolean | `false`       | Whether to hide the minimize button       |
| `hideMax`             | Boolean | `false`       | Whether to hide the maximize button       |
| `hideClose`           | Boolean | `false`       | Whether to hide the close button          |
| `disableMin`          | Boolean | `false`       | Whether to disable the minimize function  |
| `disableMax`          | Boolean | `false`       | Whether to disable the maximize function  |
| `disableClose`        | Boolean | `false`       | Whether to disable the close function     |
| `positionX`           | Number  | `50`          | Default window position x coordinate (px) |
| `positionY`           | Number  | `50`          | Default window position y coordinate (px) |
| `width`               | Number  | `400`         | Default window width (px)                 |
| `height`              | Number  | `300`         | Default window height (px)                |
| `minWidth`            | Number  | `400`         | Minimum window width (px)                 |
| `minHeight`           | Number  | `300`         | Minimum window height (px)                |
| `disabledDrag`        | Boolean | `false`       | Whether to disable window dragging        |
| `disabledResize`      | Boolean | `false`       | Whether to disable window resizing        |
| `disabledSplitScreen` | Boolean | `false`       | Whether to disable split screen effect    |

#### 方法

| Method Name       | Description                                    |
|-------------------|------------------------------------------------|
| `open()`          | Open the dialog                                |
| `switchMin(flag)` | Toggle minimize state, flag is a boolean value |
| `switchMax(flag)` | Toggle maximize state, flag is a boolean value |
| `close()`         | Close the dialog                               |
| `bringToFront()`  | Bring the dialog to the front                  |

#### Feature Description

1. **Drag Function**: Hold down the left mouse button on the title bar to drag the window. This function can be disabled via the disabled-drag property.
2. **Resize Function**: Drag the bottom-right corner of the window to resize it. This function can be disabled via the disabled-resize property.
3. **Split Screen Function**: Drag the window to the screen edge to trigger split screen, occupying the left/right half of the screen. This function can be disabled via
   the disabled-split-screen property.
4. **Maximize/Minimize**: Supports window maximize and minimize operations.
5. **Multi-window Management**: Supports multiple windows with automatic z-index layer management.
6. **Custom Size**: Window default size and minimum size can be set.

#### Notes

- The component uses the Teleport feature with the target mount point being #app
- The component is developed based on Vue 3 Composition API
- The split screen function depends on the drag and resize functions. If these functions are disabled, the split screen function will automatically become invalid.
- Window dragging and resizing are automatically constrained within the browser viewport.

#### License

MIT License
