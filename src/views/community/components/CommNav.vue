<template>
    <div class="commnav-wrap">
        <div class="commnav-content">
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
import {
    InfrastructureClassic,
    DirectionLoopLeft,
    SearchLocate,
} from '@vicons/carbon'

// logo
const imgState = reactive({
    logoImg: require('assets/logo/menocode-row.png'),
})

// 左侧菜单
function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
}
const handleUpdateValue = (key, item) => {
    // todo
}
// 菜单路由
const meunState = reactive({
    menuRouteValue: '',
    menuOptions: [
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: 'commClass',
                        },
                    },
                    { default: () => '作品分类' }
                ),
            key: 'commClass',
            icon: renderIcon(InfrastructureClassic),
        },

        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: 'commRetrieval',
                        },
                    },
                    { default: () => '作品检索' }
                ),
            key: 'commRetrieval',
            icon: renderIcon(SearchLocate),
        },

        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: 'work',
                        },
                    },
                    { default: () => '返回工作台' }
                ),
            key: 'work',
            icon: renderIcon(DirectionLoopLeft),
        },
    ],
})
</script>

<style lang="scss" scoped>
.commnav-wrap {
    background-color: #f8f8f8;
    height: 100vh;
}
.commnav-content {
    padding: 28px 6px;
    img {
        height: 25px;
        margin-bottom: 10px;
        margin-left: 20px;
    }
}
</style>