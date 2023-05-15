<template>
    <!-- message消息提醒 -->
    <n-message-provider>
        <!-- 代码高亮 -->
        <n-config-provider :hljs="hljs">
            <div id="app">
                <router-view></router-view>
            </div>
        </n-config-provider>
    </n-message-provider>
</template>

<script setup>
import { onMounted } from 'vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { useMessage } from 'naive-ui'

hljs.registerLanguage('javascript', javascript)
window.$message = useMessage()

// 页面适配
const bodyScale = () => {
    let devicewidth = document.documentElement.clientWidth
    // 分母——设计稿的尺寸(当前开发屏幕为1920*1080)
    let widthScale = devicewidth / 1920
    document.body.style.zoom = widthScale * 1
    let heightScale = document.documentElement.clientHeight
    document.body.style.height = heightScale
}
onMounted(() => {
    // 使用这种方法会导致组件在拖拽的过程中，定位有偏差
    // bodyScale()
})
</script>

<style lang="scss">
@import 'styles/common/common';
</style>