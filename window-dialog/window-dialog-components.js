import { ref } from "vue";
import { randomStr } from "@/util/random.js";

// 默认窗口z-index值
let currentZIndex = 1000;

// 获取最新的窗口z-index
const getZIndex = () => {
    return ++currentZIndex;
};

// 重置窗口的z-index
const resetZIndex = () => {
    currentZIndex = 1000;
};

// 分屏区域 px
const splitZone = 40;

export default {
    name: 'WindowDialogComponents',
    props: {
        title: String,
        // 是否隐藏最小化按钮
        hideMin: {
            type: Boolean,
            default: false
        },
        // 是否隐藏最大化按钮
        hideMax: {
            type: Boolean,
            default: false
        },
        // 是否隐藏关闭按钮
        hideClose: {
            type: Boolean,
            default: false
        },
        // 是否禁用最小化按钮
        disableMin: Boolean,
        // 是否禁用最大化按钮
        disableMax: Boolean,
        // 是否禁用关闭按钮
        disableClose: Boolean,
        // 默认窗口位置 x px
        positionX: {
            type: Number,
            default: 50
        },
        // 默认窗口位置 y px
        positionY: {
            type: Number,
            default: 50
        },
        // 默认窗口宽度 px
        width: {
            type: Number,
            default: 400
        },
        // 默认窗口高度 px
        height: {
            type: Number,
            default: 300
        },
        // 最小窗口宽度 px
        minWidth: {
            type: Number,
            default: 400
        },
        // 最小窗口高度 px
        minHeight: {
            type: Number,
            default: 300
        },
        // 是否禁止拖动
        disabledDrag: {
            type: Boolean,
            default: false
        },
        // 是否禁止调整大小
        disabledResize: {
            type: Boolean,
            default: false
        },
        // 是否禁用分屏效果 受disabledDrag和disabledResize影响
        disabledSplitScreen: {
            type: Boolean,
            default: false,
        }
    },
    setup(props) {
        const id = 'window-dialog-' + randomStr(12);
        // 是否打开
        const opened = ref(false);
        // 是否显示
        const visible = ref(true);
        // 是否全屏
        const fullScreen = ref(false);

        // z-index值活动窗口设置
        const zIndex = ref(getZIndex());
        const bringToFront = () => {
            zIndex.value = getZIndex();
        };

        // 是否正在分屏
        const isSplitting = ref(false);
        // 分屏方向 'left' 或 'right'
        const splitSide = ref(undefined);
        // 显示分屏占位符
        const showSplitPlaceholder = ref(false);
        // 原始尺寸
        const originalSplitSize = ref({width: props.width, height: props.height});
        // 准备分屏
        const prepareSplit = (side) => {
            isSplitting.value = true;
            splitSide.value = side;
            showSplitPlaceholder.value = true;
        }
        // 执行分屏
        const executeSplit = () => {
            if (isSplitting.value && splitSide.value) {
                const w = window.innerWidth / 2;
                const h = window.innerHeight;
                originalSplitSize.value = {width: size.value.width, height: size.value.height};
                size.value = {width: w, height: h};
                if (splitSide.value === 'left') {
                    position.value = {x: 0, y: 0};
                } else {
                    position.value = {x: window.innerWidth - w, y: 0};
                }
            }
            showSplitPlaceholder.value = false;
        }
        // 退出分屏
        const exitSplit = () => {
            isSplitting.value = false;
            showSplitPlaceholder.value = false;
            splitSide.value = undefined;
            // 恢复原始尺寸
            size.value = {width: originalSplitSize.value.width, height: originalSplitSize.value.height};
        }

        // 初始位置
        const position = ref({x: props.positionX, y: props.positionY});
        // 是否正在拖拽
        const isDragging = ref(false);
        // 拖拽偏移量数据
        const dragOffset = ref({x: 0, y: 0});
        // 开始拖动
        const startDrag = (event) => {
            // 全屏状态下不能拖动
            if (fullScreen.value || props.disabledDrag) return;
            isDragging.value = true;
            const dialog = event.target.closest('#' + id);
            if (!dialog) return;

            // 计算鼠标相对于窗口左上角的偏移量
            const rect = dialog.getBoundingClientRect();
            dragOffset.value = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };

            // 添加事件监听器
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
        };
        // 拖动中
        const onDrag = (event) => {
            if (!isDragging.value || fullScreen.value || props.disabledDrag) return;
            const dialog = document.querySelector('#' + id);
            if (!dialog) return;

            // 计算窗口应该移动到的位置
            const newX = event.clientX - dragOffset.value.x;
            const newY = event.clientY - dragOffset.value.y;

            // 获取窗口尺寸
            const rect = dialog.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // 限制窗口不能拖出屏幕边界
            const boundedX = Math.max(0, Math.min(newX, windowWidth - rect.width));
            const boundedY = Math.max(0, Math.min(newY, windowHeight - rect.height));

            // 更新位置
            position.value = {x: boundedX, y: boundedY};

            // 检查是否进入分屏区域（屏幕左右边缘各splitZone区域）
            if (!props.disabledSplitScreen && !props.disabledResize) {
                if (event.clientX <= splitZone) {
                    // 准备左侧分屏
                    prepareSplit('left', rect.width, rect.height);
                } else if (event.clientX >= windowWidth - splitZone) {
                    // 准备右侧分屏
                    prepareSplit('right', rect.width, rect.height);
                } else {
                    // 移动到其他位置退出分屏状态
                    exitSplit();
                }
            }
        };
        // 停止拖动
        const stopDrag = () => {
            isDragging.value = false;
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDrag);
            // 执行分屏
            executeSplit();
        };

        // 窗口尺寸
        const size = ref({width: props.width, height: props.height});
        // 是否正在调整大小
        const isResizing = ref(false);
        // 调整大小时的初始数据
        const resizeData = ref({startX: 0, startY: 0, startWidth: 0, startHeight: 0, startXPosition: 0, startYPosition: 0});
        // 开始调整大小
        const startResize = (event) => {
            // 全屏状态下不能调整大小
            if (fullScreen.value || props.disabledResize) return;

            isResizing.value = true;
            const dialog = document.querySelector('#' + id);
            if (!dialog) return;

            // 记录初始数据
            const rect = dialog.getBoundingClientRect();
            resizeData.value = {
                startX: event.clientX,
                startY: event.clientY,
                startWidth: rect.width,
                startHeight: rect.height,
                startXPosition: rect.left,
                startYPosition: rect.top
            };

            // 添加事件监听器
            document.addEventListener('mousemove', onResize);
            document.addEventListener('mouseup', stopResize);

            // 防止文本选择
            event.preventDefault();
        };
        // 调整大小过程中
        const onResize = (event) => {
            if (!isResizing.value || fullScreen.value || props.disabledResize) return;

            const dialog = document.querySelector('#' + id);
            if (!dialog) return;

            // 计算新的宽度和高度
            const newWidth = resizeData.value.startWidth + (event.clientX - resizeData.value.startX);
            const newHeight = resizeData.value.startHeight + (event.clientY - resizeData.value.startY);

            // 应用新的尺寸
            size.value.width = Math.max(props.minWidth, newWidth);
            size.value.height = Math.max(props.minHeight, newHeight);
        };
        // 停止调整大小
        const stopResize = () => {
            isResizing.value = false;
            document.removeEventListener('mousemove', onResize);
            document.removeEventListener('mouseup', stopResize);
            // 更新一下分屏的记录原始尺寸
            originalSplitSize.value = {width: size.value.width, height: size.value.height};
        };

        return {
            id,
            opened,
            visible,
            fullScreen,
            // 打开窗口
            open: () => {
                opened.value = true;
                visible.value = true;
            },
            // 切换窗口最小化状态
            switchMin: (flag) => {
                visible.value = flag;
            },
            // 切换全屏幕
            switchMax: (flag) => {
                fullScreen.value = flag;
            },
            // 关闭窗口
            close: () => {
                opened.value = false;
            },
            // 窗口z-index值活动窗口设置
            zIndex,
            bringToFront,
            // 分屏相关
            isSplitting,
            showSplitPlaceholder,
            splitSide,
            // 拖动相关
            isDragging,
            position,
            startDrag,
            // 调整大小相关
            isResizing,
            size,
            startResize,
        }
    },
}
