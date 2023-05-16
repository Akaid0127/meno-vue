<template>
    <div class="workrecent-wrap">
        <div class="workrecent-content">
            <!-- 添加文件模态框 -->
            <n-modal
                v-model:show="modalState.editFileModal"
                class="custom-card"
                preset="card"
                :style="{ width: '400px' }"
                :title="'修改文件'"
                size="huge"
                :bordered="false"
                :segmented="{ content: 'soft', footer: 'soft' }"
            >
                <template #header-extra></template>

                <n-input
                    v-model:value="addFileFormValue.cre_name"
                    placeholder="输入文件名"
                    :style="{ marginBottom: '20px' }"
                />

                <n-radio-group
                    v-model:value="addFileFormValue.isPublic"
                    :style="{ marginBottom: '20px' }"
                >
                    <n-space>
                        <n-radio :value="false">不公开</n-radio>
                        <n-radio :value="true">对外公开</n-radio>
                    </n-space>
                </n-radio-group>

                <n-select
                    v-model:value="addFileFormValue.fold"
                    :options="addFileOption.foldOption"
                    placeholder="选择文件夹"
                    :style="{ marginBottom: '20px' }"
                />
                <n-select
                    v-model:value="addFileFormValue.category"
                    :options="addFileOption.categoryOption"
                    placeholder="选择分类"
                    :style="{ marginBottom: '20px' }"
                />

                <template #footer>
                    <n-button
                        strong
                        secondary
                        @click="cancelFileCallback"
                        :style="{
                            width: '120px',
                            marginRight: '20px',
                            marginLeft: '30px',
                        }"
                        >取消</n-button
                    >
                    <n-button
                        strong
                        secondary
                        type="primary"
                        @click="submitFileCallback"
                        :style="{ width: '120px' }"
                        >确定</n-button
                    >
                </template>
            </n-modal>
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
                                        <div class="file-scroll">
                        <n-scrollbar trigger="none">
                            <div class="file-group">
                                <n-card
                                    v-for="item in fileState.OneMFiles"
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

                <n-tab-pane name="threeMFileTab" tab="近三个月文件">
                                        <div class="file-scroll">
                        <n-scrollbar trigger="none">
                            <div class="file-group">
                                <n-card
                                    v-for="item in fileState.threeMFiles"
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
            </n-tabs>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import moment from 'moment'
import useUserinfo from '@/stores/userinfo'
import { Code, Edit, Delete } from '@vicons/carbon'
import {
    getUserFold,
    getUserFile,
    postFold,
    postFile,
    getCategory,
    getFoldFiles,
    putFoldInfo,
    putFileInfo,
    deleteFold,
    deleteFile,
    getFile,
} from '@/service'

// 定义路由
const router = useRouter()
const route = useRoute()

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

// 模态框
const modalState = reactive({
    editFileModal: false,
})

// 文件
const addFileFormValue = reactive({
    curFileId: 0,
    cre_name: '',
    isPublic: true,
    fold: null,
    category: null,
})

const addFileOption = reactive({
    foldOption: [],
    categoryOption: [],
})

const fileOptionInit = () => {
    const userID = userinfoStore.userInfo.userId
    getUserFold({ id: userID }).then(
        (response) => {
            const resFolds = response.data.folds
            for (let index = 0; index < resFolds.length; index++) {
                addFileOption.foldOption[index] = {
                    label: resFolds[index].fold_name,
                    value: resFolds[index].id,
                }
            }
        },
        (error) => {
            message.error('未获取到用户文件夹')
            console.log(error)
        }
    )

    getCategory().then(
        (response) => {
            const resCategories = response.data.data
            for (let index = 0; index < resCategories.length; index++) {
                addFileOption.categoryOption[index] = {
                    label: resCategories[index].attributes.cate_name,
                    value: resCategories[index].id,
                }
            }
        },
        (error) => {
            message.error('未获取到分类')
            console.log(error)
        }
    )
} // 添加文件表单的选择器配置初始化

// 编辑文件
const handleEditFile = (fileId) => {
    addFileFormValue.curFileId = fileId
    fileOptionInit()
    getFile({ id: fileId }).then(
        (response) => {
            const resfile = response.data.data.attributes
            addFileFormValue.cre_name = resfile.cre_name
            addFileFormValue.isPublic = resfile.isPublic
            addFileFormValue.fold = resfile.fold.data.id
            addFileFormValue.category = resfile.category.data.id
        },
        (error) => {
            message.error('获取文件信息失败')
            console.log(error)
        }
    )
    modalState.editFileModal = true
}

const cancelFileCallback = () => {
    addFileFormValue.cre_name = ''
    addFileFormValue.isPublic = true
    addFileFormValue.fold = null
    addFileFormValue.category = null
    modalState.editFileModal = false
}

const submitFileCallback = () => {
    const data = {
        id: addFileFormValue.curFileId,
        cre_name: addFileFormValue.cre_name,
        isPublic: addFileFormValue.isPublic,
        fold: addFileFormValue.fold,
        category: addFileFormValue.category,
    }
    putFileInfo(data).then(
        (response) => {
            dataInit()
            message.success('修改成功')
        },
        (error) => {
            message.error('修改失败')
        }
    )
    modalState.editFileModal = false
}

// 删除文件
const handleDeleteFile = (fileId) => {
    deleteFile({ id: fileId }).then(
        (response) => {
            message.success('删除成功')
            dataInit()
        },
        (error) => {
            message.error('删除失败')
            console.log(error)
        }
    )
}

// 文件跳转设计界面
const fileToDesign = (fileId) => {
    const tempData = []
    editingStore.resetBlocks(tempData)
    router.push({ name: 'design', query: { fileId } })
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