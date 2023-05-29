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
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { NIcon, useMessage } from 'naive-ui'
import { getUserTeamAll, getTeamManager } from '@/service'
import useUserinfo from '@/stores/userinfo'

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

// 用户
const userinfoStore = useUserinfo()

// 路由
const router = useRouter()
const route = useRoute()

// logo
const imgState = reactive({
    logoImg: require('assets/logo/menocode-row.png'),
})

// 团队
const teamState = reactive({
    creaTeamData: [],
    partTeamData: [],
})

// 获取团队更新左侧菜单
const setUserTeam = () => {
    getUserTeamAll().then(
        (response) => {
            const resTeams = response.data.teams
            const curUserId = userinfoStore.userInfo.userId
            teamState.creaTeamData = []
            teamState.partTeamData = []
            resTeams.forEach((item) => {
                getTeamManager({ id: item.id }).then(
                    (response) => {
                        const resData = response.data.data
                        const teamData = {
                            key: resData.id,
                            label: resData.attributes.team_name,
                            menuType: 'team',
                        }
                        const teamManagerId =
                            resData.attributes.user_manager.data.id
                        if (curUserId === teamManagerId) {
                            teamState.creaTeamData.push(teamData)
                        } else {
                            teamState.partTeamData.push(teamData)
                        }
                        // 更新菜单
                        meunState.menuOptions[2] = {
                            menuType: 'user',
                            label: '我创建的团队',
                            key: 'workCreaTeam',
                            icon: renderIcon(LicenseThirdPartyDraft),
                            children: [...teamState.creaTeamData],
                        }
                        meunState.menuOptions[3] = {
                            menuType: 'user',
                            label: '我加入的团队',
                            key: 'workPartTeam',
                            icon: renderIcon(Events),
                            children: [...teamState.partTeamData],
                        }
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            })
        },
        (error) => {
            console.log(error)
        }
    )
}

// 左侧菜单
function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
}
const handleUpdateValue = (key, item) => {
    if (item.menuType && item.menuType === 'team') {
        router.push({
            name: 'workTeam',
            query: { teamId: item.key },
        })
    }
}
const meunState = reactive({
    menuRouteValue: '',
    menuOptions: [
        {
            menuType: 'user',
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
            menuType: 'user',
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
            menuType: 'user',
            label: '我创建的团队',
            key: 'workCreaTeam',
            icon: renderIcon(LicenseThirdPartyDraft),
            children: [...teamState.creaTeamData],
        },
        {
            menuType: 'user',
            label: '我加入的团队',
            key: 'workPartTeam',
            icon: renderIcon(Events),
            children: [...teamState.partTeamData],
        },
        {
            menuType: 'jump',
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: 'community',
                        },
                    },
                    { default: () => '前往资源社区' }
                ),
            key: 'community',
            icon: renderIcon(FlightInternational),
        },
    ],
})

// mount
onMounted(() => {
    setUserTeam()
    meunState.menuRouteValue = route.name
})
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