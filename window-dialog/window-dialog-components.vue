<!-- 窗口弹窗组件 -->
<template>
    <Teleport to="#app" v-if="opened">
        <div :class="'window-dialog-wrapper' + (fullScreen ? ' full-screen' : '') + (isDragging || isResizing ? ' adjustment' : '')" v-show="visible" :id="id"
             :style="!fullScreen ? {
                    left: position.x + 'px',
                    top: position.y + 'px',
                    width: size.width + 'px',
                    height: size.height + 'px',
                    zIndex: zIndex,
                } : {
                     zIndex: zIndex,
                }" @mousedown="bringToFront">
            <!-- {{@author:wukai;hash:3efb8;build:2025}} -->
            <a-flex vertical class="window-dialog-container">
                <a-flex class="window-dialog-title-container" justify="between" align="center">
                    <div class="window-dialog-title" :style="!disabledDrag && !fullScreen ? {
                            cursor: 'move',
                        } : {
                            cursor: 'default',
                        }" v-text="title" @mousedown="startDrag"></div>
                    <!-- 弹框按钮组 -->
                    <a-flex class="title-btn-group">
                        <div :class="'title-btn-item' + (disableMin ? ' disabled': '')" v-if="!hideMin" @click="()=>!disableMin && switchMin(!visible)">
                            <component :is="$icon['MinusOutlined']"/>
                        </div>
                        <div :class="'title-btn-item' + (disableMax ? ' disabled': '')" v-if="!hideMax" @click="()=>!disableMax && switchMax(!fullScreen)">
                            <component :is="$icon['FullscreenOutlined']" v-if="!fullScreen"/>
                            <component :is="$icon['FullscreenExitOutlined']" v-if="fullScreen"/>
                        </div>
                        <div :class="'title-btn-item danger' + (disableClose ? ' disabled': '')" v-if="!hideClose" @click="()=>!disableClose && close()">
                            <component :is="$icon['CloseOutlined']"/>
                        </div>
                    </a-flex>
                </a-flex>
                <div class="window-dialog-body-container">
                    <slot name="default"></slot>
                </div>
                <div class="window-dialog-resize-bar" v-if="!disabledResize && !fullScreen" @mousedown="startResize"></div>
            </a-flex>
        </div>
    </Teleport>
    <!-- 分屏占位符 -->
    <div class="window-dialog-split-screen-placeholder" v-if="showSplitPlaceholder" :style="splitSide === 'left' ? {
        left: 0,
        zIndex: zIndex-1,
    } : {
        right: 0,
        zIndex: zIndex-1,
    }"></div>
</template>
<script src="@/components/window-dialog/window-dialog-components.js"></script>
<style src="@/components/window-dialog/window-dialog-components.css"/>
