<template>
    <div class="worksearch-wrap">
        <div class="worksearch-content">
            <div class="left">
                <div class="search">
                    <n-input
                        placeholder="输入文件名称搜索文件"
                        v-model:value="searchState.searchValue"
                    >
                        <template #prefix>
                            <n-icon :component="Search" @click="handleSearch" />
                        </template>
                    </n-input>
                </div>
                <div class="split-line"></div>
                <div class="add">
                    <n-button circle @click="handleSearch" size="small">
                        <template #icon>
                            <n-icon size="14">
                                <Search />
                            </n-icon>
                        </template>
                    </n-button>
                </div>
            </div>

            <div class="right">
                <div class="function-btn">
                    <n-button>
                        <n-icon> <CopyLink /> </n-icon>其他文件迁移
                    </n-button>
                </div>
                <div class="split-line"></div>
                <div class="theme">
                    <!-- 主题化 -->
                    <n-icon>
                        <Sun />
                    </n-icon>
                </div>
                <div class="user">
                    <n-dropdown
                        :options="dropState.userOptions"
                        trigger="hover"
                        @select="handleSelect"
                    >
                        <n-button strong secondary circle type="primary">
                            {{ props.userName }}
                        </n-button>
                    </n-dropdown>
                </div>

                <n-modal
                    v-model:show="modalState.infoModal"
                    class="custom-card"
                    preset="card"
                    :style="{ width: '300px' }"
                    title="用户资料"
                    :bordered="false"
                >
                    <p>用户姓名：{{ userState.userName }}</p>
                    <p>用户邮箱：{{ userState.email }}</p>
                    <p>创建时间：{{ userState.createDate }}</p>
                </n-modal>
            </div>
        </div>
    </div>
</template>

<script setup>
import { h, defineComponent, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage, NIcon } from 'naive-ui'
import moment from 'moment'
import { getUserSelf } from '@/service'
import useUserinfo from '@/stores/userinfo'
import {
    Search,
    Sun,
    Moon,
    CopyLink,
    CloudDownload,
    Chat,
    UserAvatar,
    NextOutline,
} from '@vicons/carbon'

// 路由
const router = useRouter()
const route = useRoute()

// props
const props = defineProps(['userName'])

// emit
const emit = defineEmits(['getSearchVaule'])

// naive message
const message = useMessage()

// 搜索
const searchState = reactive({
    searchValue: '',
})
const handleSearch = () => {
    if (searchState.searchValue !== '') {
        emit('getSearchVaule', { searchValue: searchState.searchValue })
    } else if (searchState.searchValue === '') {
        message.warning('搜索输入为空')
    } else {
        message.error('系统错误')
    }
}

// 右上角用户下拉
const renderIcon = (icon) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon),
        })
    }
}
const dropState = reactive({
    userOptions: [
        {
            label: '用户资料',
            key: 'userInfo',
            icon: renderIcon(UserAvatar),
        },
        {
            label: '退出登录',
            key: 'loginOut',
            icon: renderIcon(NextOutline),
        },
    ],
})
const modalState = reactive({
    infoModal: false,
}) // 用户信息模态框
const userState = reactive({
    userName: '',
    email: '',
    createDate: '',
})
const handleSelect = (key) => {
    if (String(key) === 'userInfo') {
        modalState.infoModal = true
        getUserSelf().then(
            (response) => {
                const resUser = response.data
                const { username, email, createdAt } = resUser
                userState.userName = username
                userState.email = email
                userState.createDate = moment(createdAt).format('YYYY-MM-DD')
            },
            (error) => {
                message.error('获取失败')
                console.log(error)
            }
        )
    } else if (String(key) === 'loginOut') {
        router.push({ name: 'index' })
        localStorage.removeItem('userJwt')
        useUserinfo.clearUserInfo()
    }
}
</script>

<style lang="scss" scoped>
.worksearch-content {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .split-line {
        background: rgba(218, 218, 220, 0.6);
        width: 1px;
        height: 20px;
        margin: 10px;
    }
    .left {
        display: flex;
        align-items: center;
        .search {
            margin-left: 10px;
            margin-right: 6px;
            .n-input {
                width: 300px;
                border-radius: 5px;
            }
        }

        .add {
            display: flex;
            align-items: center;
        }
    }
    .right {
        display: flex;
        align-items: center;
        .function-btn {
            margin-right: 10px;
            .n-button {
                border-radius: 5px;
            }
            .n-icon {
                margin-right: 4px;
            }
        }

        .theme {
            .n-icon {
                display: flex;
                align-items: center;
                font-size: 20px;
                margin-right: 18px;
                margin-left: 8px;
            }
        }
    }
}
</style>