<template>
    <div class="worknav-wrap">
        <div class="worknav-content">
            <img :src="imgState.logoImg" alt="简易绘码" />

            <n-menu
                :options="meunState.menuOptions"
                @update:value="handleUpdateValue"
                default-value="workFile"
                v-model:value="meunState.menuRouteValue"
                accordion
            />
        </div>
    </div>
</template>

<script setup>
import { reactive, defineComponent, h, onMounted } from 'vue'
import {
    RecentlyViewed,
    AlignBoxMiddleLeft,
    RequestQuote,
    FlightInternational,
    Add,
    ArrowRight,
    LicenseThirdPartyDraft,
    Events,
} from '@vicons/carbon'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { NIcon, useMessage } from 'naive-ui'

onMounted(() => {
    meunState.menuRouteValue = route.name
})

// 定义路由
const router = useRouter()
const route = useRoute()

// 侧边栏图片
const imgState = reactive({
    logoImg: require('assets/logo/menocode-row.png'),
})

// 左侧菜单
function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const meunState = reactive({
    menuRouteValue: '',
    menuOptions: [
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: 'workFile',
                        },
                    },
                    { default: () => '个人文件' }
                ),
            key: 'workFile',
            icon: renderIcon(AlignBoxMiddleLeft),
        },
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: 'workRecent',
                        },
                    },
                    { default: () => '最近文件' }
                ),
            key: 'workRecent',
            icon: renderIcon(RecentlyViewed),
        },
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: 'workCreaTeam',
                        },
                    },
                    { default: () => '创建团队' }
                ),
            key: 'workCreaTeam',
            icon: renderIcon(LicenseThirdPartyDraft),
        },
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: 'workPartTeam',
                        },
                    },
                    { default: () => '加入团队' }
                ),
            key: 'workPartTeam',
            icon: renderIcon(Events),
        },
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: 'community',
                        },
                    },
                    { default: () => '资源社区' }
                ),
            key: 'community',
            icon: renderIcon(FlightInternational),
        },
    ],
})

const handleUpdateValue = (key, item) => {
    // console.log(item)
}
</script>

<style lang="scss" scoped>
.worknav-wrap {
    background-color: #f8f8f8;
    height: 100vh;
}
.worknav-content {
    padding: 28px 6px;
    img {
        height: 25px;
        margin-bottom: 10px;
        margin-left: 20px;
    }
}
</style>