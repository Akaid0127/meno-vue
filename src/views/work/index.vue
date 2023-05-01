<template>
    <div class="work-wrap">
        <div class="work-content">
            <n-layout has-sider>
                <n-layout-sider width="220">
                    <WorkNav />
                </n-layout-sider>

                <n-layout>
                    <n-layout-header bordered>
                        <WorkSearch />
                    </n-layout-header>
                    <n-layout-content>
                        <WorkFile />
                    </n-layout-content>
                </n-layout>
            </n-layout>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import WorkNav from "./components/WorkNav.vue";
import WorkSearch from "./components/WorkSearch.vue";
import WorkFile from "./components/WorkFile.vue";
import useUserinfo from "@/stores/userinfo";

// pinia
const userinfoStore = useUserinfo(); // 用户状态

onMounted(() => {
    console.log(userinfoStore.userInfo);
});
</script>

<style lang="scss" scoped>
.work-wrap {
    background-color: #fff;
}

.work-content {
    background-color: #fff;
    .n-layout-sider {
        height: 929px;
    }

    .n-layout-header {
        background-color: #fff;
    }

    .n-layout-content {
        background-color: #fff;
    }
}
</style>