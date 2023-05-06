<template>
    <div class="work-wrap">
        <div class="work-content">
            <n-layout has-sider>
                <n-layout-sider width="220">
                    <WorkNav />
                </n-layout-sider>

                <n-layout>
                    <n-layout-header bordered>
                        <WorkSearch :userName="userState.userName"/>
                    </n-layout-header>
                    <n-layout-content>
                        <router-view></router-view>
                    </n-layout-content>
                </n-layout>
            </n-layout>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import WorkNav from "./components/WorkNav.vue";
import WorkSearch from "./components/WorkSearch.vue";
import WorkFile from "./components/WorkFile.vue";
import useUserinfo from "@/stores/userinfo";

// pinia
const userinfoStore = useUserinfo(); // 用户状态

const userState = reactive({
    userName: userinfoStore.userInfo.userName,
});

onMounted(() => {
    
    // console.log(userinfoStore.userInfo);
});
</script>

<style lang="scss" scoped>
.work-wrap {
    background-color: #fff;
    height: 100vh;
}

.work-content {
    background-color: #fff;
    .n-layout-sider {
    }

    .n-layout-header {
        background-color: #fff;
        height: 60px;
    }

    .n-layout-content {
        background-color: #fff;
        height: calc(100vh - 60px);
    }
}
</style>