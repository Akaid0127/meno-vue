<template>
    <div class="community-wrap">
        <div class="community-content">
            <n-layout has-sider>
                <n-layout-sider width="220">
                    <CommNav />
                </n-layout-sider>

                <n-layout>
                    <n-layout-content>
                        <router-view></router-view>
                    </n-layout-content>
                </n-layout>
            </n-layout>
        </div>
    </div>
</template>

<script setup>
import CommNav from './components/CommNav.vue'

</script>

<style lang="scss" scoped>
.community-wrap {
    background-color: #fff;
    height: 100vh;
}

.community-content {
    background-color: #fff;

    .n-layout-content {
        background-color: #fff;
        height: 100vh;
    }
}
</style>