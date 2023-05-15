<template>
    <div class="workrecent-wrap">
        <div class="workrecent-content">
            <n-tabs type="line" animated v-model:value="tabState.tabValue">
                <n-tab-pane name="threeDFileTab" tab="近三天文件">
                    <div class="file-scroll">
                        <n-scrollbar trigger="none">
                            <div class="file-group">
                                <n-card
                                    v-for="item in fileState.threeDFiles"
                                    :key="item.id"
                                    :title="item.cre_name"
                                    hoverable
                                    embedded
                                >
                                    <template #header-extra>
                                        <n-icon
                                            size="16"
                                            color="#606266"
                                            :style="{ marginRight: '6px' }"
                                            @click="handleEditFile(item.id)"
                                        >
                                            <Edit />
                                        </n-icon>
                                        <n-popconfirm
                                            @positive-click="
                                                handleDeleteFile(item.id)
                                            "
                                        >
                                            <template #trigger>
                                                <n-icon
                                                    size="16"
                                                    color="#606266"
                                                    :style="{
                                                        marginRight: '6px',
                                                    }"
                                                >
                                                    <Delete />
                                                </n-icon>
                                            </template>
                                            确定删除该{{ item.cre_name }}吗
                                        </n-popconfirm>
                                    </template>
                                    文件夹状态：{{ item.cre_status }}
                                    <br />
                                    创建时间：{{
                                        moment(item.publishedAt).format(
                                            'YYYY-MM-DD'
                                        )
                                    }}
                                    <br />
                                    更新时间：{{
                                        moment(item.updatedAt).format(
                                            'YYYY-MM-DD'
                                        )
                                    }}
                                    <n-button
                                        strong
                                        secondary
                                        @click="fileToDesign(item.id)"
                                    >
                                        <template #icon>
                                            <n-icon size="18" color="#0e7a0d">
                                                <Code />
                                            </n-icon>
                                        </template>
                                        开启设计
                                    </n-button>
                                </n-card>
                            </div>
                        </n-scrollbar>
                    </div>
                </n-tab-pane>

                <n-tab-pane name="oneMFileTab" tab="近一个月文件">
                    近一个月文件
                </n-tab-pane>

                <n-tab-pane name="threeMFileTab" tab="近三个月文件">
                    近三个月文件
                </n-tab-pane>
            </n-tabs>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import moment from 'moment'
import { useMessage } from 'naive-ui'
import { getUserFile } from '@/service'
import useUserinfo from '@/stores/userinfo'
import {
    Code,
    Edit,
    Delete,
} from '@vicons/carbon'

// pinia
const userinfoStore = useUserinfo() // 用户状态

// naive message
const message = useMessage()

// 标签状态
const tabState = reactive({
    tabValue: 'threeDFileTab',
})

// 获取用户文件
const fileState = reactive({
    threeDFiles: [],
    OneMFiles: [],
    threeMFiles: [],
})

const dataInit = () => {
    const userID = userinfoStore.userInfo.userId
    getUserFile({ id: userID }).then(
        (response) => {
            const resFiles = response.data.creations
            fileFilter(resFiles, 0)
            fileFilter(resFiles, 1)
            fileFilter(resFiles, 2)
        },
        (error) => {
            message.error('未获取到用户文件')
            console.log(error)
        }
    ) // 获取用户文件
}

// 根据时间筛选文件
const fileFilter = (arrData, dayType) => {
    if (dayType === 0) {
        const dayLine = moment().subtract(3, 'days')
        const resFiles = arrData.filter((item) => {
            return moment(item.createdAt) >= dayLine
        })
        fileState.threeDFiles = [...resFiles]
    } else if (dayType === 1) {
        const dayLine = moment().subtract(30, 'days')
        const resFiles = arrData.filter((item) => {
            return moment(item.createdAt) >= dayLine
        })
        fileState.OneMFiles = [...resFiles]
    } else if (dayType === 2) {
        const dayLine = moment().subtract(90, 'days')
        const resFiles = arrData.filter((item) => {
            return moment(item.createdAt) >= dayLine
        })
        fileState.threeMFiles = [...resFiles]
    }
}

// 修改文件
const handleEditFile = () => {
    
}

// 删除文件
const handleDeleteFile = () => {
    
}

// 打开文件
const fileToDesign = () => {
    
}

onMounted(() => {
    dataInit()
})
</script>

<style lang="scss" scoped>
.workrecent-content {
    padding: 15px 30px;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;

    .file-group {
        user-select: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .n-card {
            cursor: pointer;
            margin-right: 16px;
            margin-bottom: 16px;
            width: 256px;
            height: 190px;
            .n-button {
                width: 210px;
                margin-top: 10px;
            }
        }
    }
}
</style>