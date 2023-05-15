<!-- 首页 -->
<template>
    <div class="home-wrapper">
        <div class="home-content">
            <n-layout>
                <n-layout-header>
                    <HomeNav></HomeNav>
                </n-layout-header>
                <n-layout-content>
                    <HomeDetail></HomeDetail>
                </n-layout-content>
            </n-layout>
        </div>
    </div>
</template>

<script setup>
// 组件
import HomeNav from './components/HomeNav.vue'
import HomeDetail from './components/HomeDetail.vue'
</script>

<style lang="scss" scoped>
.n-layout-header {
    height: 65px;
    position: fixed;
    top: 0;
    z-index: 1;
}

.n-layout-content {
    margin-top: 65px;
    min-height: calc(100vh - 65px);
    // background: rgba(128, 128, 128, 0.4);
}
</style>s