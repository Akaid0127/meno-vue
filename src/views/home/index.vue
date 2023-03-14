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
                    <HomeBrief></HomeBrief>
                    <HomeFeature></HomeFeature>
                    <HomeCommunity></HomeCommunity>
                    <HomeLink></HomeLink>
                </n-layout-content>
                <n-layout-footer>
                    <HomeEnd></HomeEnd>
                </n-layout-footer>
            </n-layout>
        </div>
    </div>
</template>

<script setup>
// 组件
import HomeNav from "./components/HomeNav.vue";
import HomeDetail from "./components/HomeDetail.vue";
import HomeBrief from "./components/HomeBrief.vue";
import HomeFeature from "./components/HomeFeature.vue";
import HomeCommunity from "./components/HomeCommunity.vue";
import HomeLink from "./components/HomeLink.vue";
import HomeEnd from "./components/HomeEnd.vue";
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
    min-height: 1800px;
    // background: rgba(128, 128, 128, 0.4);
}

.n-layout-footer {
    min-height: 65px;
}
</style>s