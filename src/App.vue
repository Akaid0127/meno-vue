<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script setup>

import {onMounted} from 'vue';
// 页面适配
const bodyScale = () => {
    let devicewidth = document.documentElement.clientWidth;
	// 分母——设计稿的尺寸(当前开发屏幕为1920*1080)
    let widthScale = devicewidth / 1920; 
    document.body.style.zoom = widthScale * 1;
    let heightScale = document.documentElement.clientHeight;
    document.body.style.height = heightScale;
};
onMounted(() => {
	// bodyScale()
})
</script>

<style lang="scss">
@import "styles/common/common";
</style>