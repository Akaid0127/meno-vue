<template>
    <div class="work-team-content">
        <div class="team-file">
            <div class="opera-group" v-if="userState.userIdentity === '管理员'">
                <n-button strong secondary type="primary" @click="handleMember">
                    <template #icon>
                        <n-icon>
                            <GroupSecurity />
                        </n-icon>
                    </template>
                    管理团队成员
                </n-button>
                <n-button strong secondary type="primary" @click="handleFold">
                    <template #icon>
                        <n-icon>
                            <FolderDetailsReference />
                        </n-icon>
                    </template>
                    新建团队文件夹
                </n-button>
                <n-button strong secondary type="primary" @click="handleFile">
                    <template #icon>
                        <n-icon>
                            <VolumeFileStorage />
                        </n-icon>
                    </template>
                    新建团队文件
                </n-button>
                <n-button strong secondary type="primary" @click="handleTask">
                    <template #icon>
                        <n-icon>
                            <TaskAssetView />
                        </n-icon>
                    </template>
                    新建任务看板
                </n-button>
            </div>

            <div class="fold-group">
                <n-scrollbar x-scrollable trigger="none">
                    <div class="fold-item">
                        <n-card
                            v-for="item in contentState.teamFolds"
                            :key="item.id"
                            :title="item.fold_name"
                            hoverable
                            embedded
                            @click="checkChildFiles(item)"
                        >
                            <template #header-extra>
                                <div v-if="userState.userIdentity === '管理员'">
                                    <n-icon
                                        size="16"
                                        color="#606266"
                                        :style="{ marginRight: '6px' }"
                                        @click="handleEditFold(item.id)"
                                    >
                                        <Edit />
                                    </n-icon>
                                    <n-popconfirm
                                        @positive-click="
                                            handleDeleteFold(item.id)
                                        "
                                    >
                                        <template #trigger>
                                            <n-icon
                                                size="16"
                                                color="#606266"
                                                :style="{ marginRight: '6px' }"
                                            >
                                                <Delete />
                                            </n-icon>
                                        </template>
                                        确定删除该{{ item.fold_name }}吗
                                    </n-popconfirm>
                                </div>

                                <div v-else>
                                    <n-icon size="22" color="#FFD485">
                                        <Folder />
                                    </n-icon>
                                </div>
                            </template>
                            创建时间：{{
                                moment(
                                    item.publishedAt,
                                    moment.ISO_8601
                                ).format('YYYY-MM-DD')
                            }}
                        </n-card>
                    </div>
                </n-scrollbar>
            </div>

            <div class="file-group">
                <n-tabs type="line" animated v-model:value="tabState.tabValue">
                    <n-tab-pane name="userFiles" tab="全部文件">
                        <div class="file-scroll">
                            <n-scrollbar trigger="none">
                                <div class="file-item">
                                    <n-card
                                        v-for="item in contentState.teamFiles"
                                        :key="item.id"
                                        :title="item.cre_name"
                                        hoverable
                                        embedded
                                    >
                                        <template #header-extra>
                                            <div
                                                v-if="
                                                    userState.userIdentity ===
                                                    '管理员'
                                                "
                                            >
                                                <n-icon
                                                    size="16"
                                                    color="#606266"
                                                    :style="{
                                                        marginRight: '6px',
                                                    }"
                                                    @click="
                                                        handleEditFile(item.id)
                                                    "
                                                >
                                                    <Edit />
                                                </n-icon>
                                                <n-popconfirm
                                                    @positive-click="
                                                        handleDeleteFile(
                                                            item.id
                                                        )
                                                    "
                                                >
                                                    <template #trigger>
                                                        <n-icon
                                                            size="16"
                                                            color="#606266"
                                                            :style="{
                                                                marginRight:
                                                                    '6px',
                                                            }"
                                                        >
                                                            <Delete />
                                                        </n-icon>
                                                    </template>
                                                    确定删除该{{
                                                        item.cre_name
                                                    }}吗
                                                </n-popconfirm>
                                            </div>

                                            <div v-else>
                                                <n-icon
                                                    size="22"
                                                    color="#18A058"
                                                >
                                                    <AlignBoxMiddleLeft />
                                                </n-icon>
                                            </div>
                                        </template>
                                        文件状态：{{ item.cre_status }}
                                        <br />
                                        创建时间：{{
                                            moment(
                                                item.publishedAt,
                                                moment.ISO_8601
                                            ).format('YYYY-MM-DD')
                                        }}
                                        <br />
                                        更新时间：{{
                                            moment(
                                                item.updatedAt,
                                                moment.ISO_8601
                                            ).format('YYYY-MM-DD')
                                        }}
                                        <n-button strong secondary>
                                            <template #icon>
                                                <n-icon
                                                    size="18"
                                                    color="#0e7a0d"
                                                >
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

                    <n-tab-pane name="foldFiles" :tab="tabState.foldTabName">
                        <div v-if="contentState.foldFiles.length === 0">
                            该文件夹下暂无文件
                        </div>
                        <div v-if="contentState.foldFiles !== 0">
                            <n-scrollbar trigger="none">
                                <div class="file-item">
                                    <n-card
                                        v-for="item in contentState.foldFiles"
                                        :key="item.id"
                                        :title="item.cre_name"
                                        hoverable
                                        embedded
                                    >
                                        <template #header-extra>
                                            <div
                                                v-if="
                                                    userState.userIdentity ===
                                                    '管理员'
                                                "
                                            >
                                                <n-icon
                                                    size="16"
                                                    color="#606266"
                                                    :style="{
                                                        marginRight: '6px',
                                                    }"
                                                    @click="
                                                        handleEditFile(item.id)
                                                    "
                                                >
                                                    <Edit />
                                                </n-icon>
                                                <n-popconfirm
                                                    @positive-click="
                                                        handleDeleteFile(
                                                            item.id
                                                        )
                                                    "
                                                >
                                                    <template #trigger>
                                                        <n-icon
                                                            size="16"
                                                            color="#606266"
                                                            :style="{
                                                                marginRight:
                                                                    '6px',
                                                            }"
                                                        >
                                                            <Delete />
                                                        </n-icon>
                                                    </template>
                                                    确定删除该{{
                                                        item.cre_name
                                                    }}吗
                                                </n-popconfirm>
                                            </div>

                                            <div v-else>
                                                <n-icon
                                                    size="22"
                                                    color="#18A058"
                                                >
                                                    <AlignBoxMiddleLeft />
                                                </n-icon>
                                            </div>
                                        </template>
                                        文件夹状态：{{ item.cre_status }}
                                        <br />
                                        创建时间：{{
                                            moment(
                                                item.publishedAt,
                                                moment.ISO_8601
                                            ).format('YYYY-MM-DD')
                                        }}
                                        <br />
                                        更新时间：{{
                                            moment(
                                                item.updatedAt,
                                                moment.ISO_8601
                                            ).format('YYYY-MM-DD')
                                        }}
                                        <n-button strong secondary>
                                            <template #icon>
                                                <n-icon
                                                    size="18"
                                                    color="#0e7a0d"
                                                >
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
        <div class="team-bulletin">
            <div class="user-info">
                <n-card
                    :title="userinfoStore.userInfo.userName"
                    :segmented="{
                        content: true,
                        footer: 'soft',
                    }"
                >
                    <template #header-extra>
                        <n-tag type="success">{{
                            userState.userIdentity
                        }}</n-tag>
                    </template>
                    {{ contentState.teamName }}
                    <template #action>
                        <div class="operation">
                            <n-button
                                strong
                                secondary
                                type="tertiary"
                                @click="handleCreateTeam"
                                >创建团队
                            </n-button>
                            <n-button
                                strong
                                secondary
                                type="primary"
                                @click="handlePartTeam"
                                >加入团队
                            </n-button>
                        </div>
                    </template>
                </n-card>
            </div>
            <div class="bulletin-group">
                <div class="bulletin-content">
                    <n-scrollbar trigger="none">
                        <div
                            class="item"
                            v-for="item in contentState.teamTasks"
                            :key="item.id"
                            @click="checkTeamTask(item)"
                        >
                            <n-card :title="item.taskName" hoverable>
                                <template #header-extra>
                                    <n-tag
                                        :type="
                                            item.taskStatus === '已完成'
                                                ? 'success'
                                                : 'info'
                                        "
                                        >{{ item.taskStatus }}</n-tag
                                    >
                                </template>
                                {{ item.taskTitle }}
                            </n-card>
                        </div>
                    </n-scrollbar>
                </div>
            </div>
        </div>

        <!-- 模态框 -->
        <div>
            <!-- 管理团队成员弹框 -->
            <n-modal
                v-model:show="memberState.memberModal"
                class="custom-card"
                preset="card"
                title="管理团队成员"
                size="huge"
                :bordered="false"
                style="width: 800px"
            >
                <n-data-table
                    :columns="memberState.tableColumns"
                    :data="memberState.tableData"
                    :pagination="false"
                    :bordered="false"
                />
            </n-modal>

            <!-- 添加文件夹模态框 -->
            <n-modal
                v-model:show="modalState.addFoldModal"
                class="custom-card"
                preset="card"
                :style="{ width: '400px' }"
                :title="
                    modalState.foldModalMode === 'add'
                        ? '添加文件夹'
                        : '修改文件夹'
                "
                size="huge"
                :bordered="false"
                :segmented="{ content: 'soft', footer: 'soft' }"
            >
                <template #header-extra></template>
                <n-input
                    v-model:value="addFoldFormValue.fold_name"
                    placeholder="输入文件夹名"
                />
                <template #footer>
                    <n-button
                        strong
                        secondary
                        @click="cancelFoldCallback"
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
                        @click="submitFoldCallback"
                        :style="{ width: '120px' }"
                        >确定</n-button
                    >
                </template>
            </n-modal>

            <!-- 添加文件模态框 -->
            <n-modal
                v-model:show="modalState.addFileModal"
                class="custom-card"
                preset="card"
                :style="{ width: '400px' }"
                :title="
                    modalState.fileModalMode === 'add' ? '添加文件' : '修改文件'
                "
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

            <!-- 任务看板模态框 -->
            <n-modal
                v-model:show="taskState.taskModal"
                class="custom-card"
                preset="card"
                :style="{ width: '400px' }"
                :title="taskState.taskTitle"
                size="huge"
                :bordered="false"
                :segmented="{ content: 'soft', footer: 'soft' }"
            >
                <template #header-extra>
                    <n-tag style="margin-right: 10px"
                        >优先级 {{ taskState.taskPriority }}</n-tag
                    >
                    <n-tag
                        :type="
                            taskState.taskStatus === '已完成'
                                ? 'success'
                                : 'info'
                        "
                        >{{ taskState.taskStatus }}</n-tag
                    >
                </template>
                <p>负责人：{{ taskState.coder }}</p>
                <span>{{ taskState.taskName }} - </span>
                <span>{{ taskState.taskTitle }}</span>
                <div>
                    {{ taskState.taskContent }}
                </div>

                <template #footer>
                    <p>截止日期：{{ taskState.deadline }}</p>
                    <p>发布日期：{{ taskState.publishedAt }}</p>
                </template>
            </n-modal>

            <!-- 新建任务看板模态框 -->
            <n-modal
                v-model:show="taskState.addTaskModal"
                class="custom-card"
                preset="card"
                :style="{ width: '400px' }"
                title="添加新的任务看板"
                size="huge"
                :bordered="false"
                :segmented="{ content: 'soft', footer: 'soft' }"
            >
                <n-select
                    v-model:value="taskAddForm.coder"
                    :options="optionState.coderOption"
                    placeholder="选择负责人"
                    :style="{ marginBottom: '20px' }"
                />
                <n-input
                    v-model:value="taskAddForm.taskName"
                    placeholder="输入任务迭代"
                    :style="{ marginBottom: '20px' }"
                />
                <n-input
                    v-model:value="taskAddForm.taskTitle"
                    placeholder="输入任务标题"
                    :style="{ marginBottom: '20px' }"
                />
                <n-input
                    v-model:value="taskAddForm.taskContent"
                    placeholder="输入任务内容"
                    type="textarea"
                    :style="{ marginBottom: '20px' }"
                />
                <n-select
                    v-model:value="taskAddForm.taskStatus"
                    :options="optionState.statusOption"
                    placeholder="请选择任务状态"
                    :style="{ marginBottom: '20px' }"
                />
                <n-select
                    v-model:value="taskAddForm.taskPriority"
                    :options="optionState.priorityOption"
                    placeholder="请选择任务优先级"
                    :style="{ marginBottom: '20px' }"
                />
                <n-date-picker
                    v-model:value="taskAddForm.deadline"
                    type="date"
                />

                <template #footer>
                    <n-button
                        strong
                        secondary
                        @click="cancelAddTask"
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
                        @click="submitAddTask"
                        :style="{ width: '120px' }"
                        >确定</n-button
                    >
                </template>
            </n-modal>

            <!-- 创建团队模态框 -->
            <n-modal
                v-model:show="teamOpState.createModal"
                class="custom-card"
                preset="card"
                :style="{ width: '400px' }"
                title="创建团队"
                size="huge"
                :bordered="false"
                :segmented="{ content: 'soft', footer: 'soft' }"
            >
                <n-input
                    v-model:value="createTeamForm.teamName"
                    placeholder="输入团队名称"
                    :style="{ marginBottom: '20px' }"
                />

                <template #footer>
                    <n-button
                        strong
                        secondary
                        @click="cancelCreateTeam"
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
                        @click="submitCreateTeam"
                        :style="{ width: '120px' }"
                        >确定</n-button
                    >
                </template>
            </n-modal>

            <!-- 加入团队模态框 -->
            <n-modal
                v-model:show="teamOpState.partModal"
                class="custom-card"
                preset="card"
                :style="{ width: '400px' }"
                title="加入团队"
                size="huge"
                :bordered="false"
                :segmented="{ content: 'soft', footer: 'soft' }"
            >
                <n-input
                    v-model:value="partTeamForm.teamName"
                    placeholder="输入团队名称"
                    :style="{ marginBottom: '20px' }"
                />
                <template #footer>
                    <n-button
                        strong
                        secondary
                        @click="cancelPartTeam"
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
                        @click="submitPartTeam"
                        :style="{ width: '120px' }"
                        >确定</n-button
                    >
                </template>
            </n-modal>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, watch, h, defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NButton, useMessage } from 'naive-ui'
import moment from 'moment'
import emitter from '@/mitt/event'
import {
    getTeamManagerInfo,
    pullTeamMemberIdentity,
    pullTeamMemberList,
    postFold,
    putFoldInfo,
    getTeamFolds,
    getCategory,
    postFile,
    putFileInfo,
    getFoldFiles,
    getTaskCoder,
    postTask,
    postNewTeam,
    putNewTeam,
    getTeamAll,
    getTeamVisit,
    deleteFold,
    deleteFile,
    getFile,
} from '@/service'
import useUserinfo from '@/stores/userinfo'
import {
    GroupSecurity,
    FolderDetailsReference,
    VolumeFileStorage,
    TaskAssetView,
    Folder,
    Code,
    AlignBoxMiddleLeft,
    FlowStream,
    Edit,
    Delete,
} from '@vicons/carbon'

// naive message
const message = useMessage()

// 路由
const router = useRouter()
const route = useRoute()

// 用户
const userinfoStore = useUserinfo()

// 团队基本信息
const contentState = reactive({
    teamId: 0,
    teamName: '',

    usersLists: [],
    usersManager: {},
    userOperate: [],
    userVisit: [],

    teamFolds: [],
    teamFiles: [],
    foldFiles: [],

    teamTasks: [],
})

// 获取团队基本信息
const setTeamInfo = () => {
    // route.query.teamId
    getTeamManagerInfo({ id: route.query.teamId }).then(
        (response) => {
            const resData = response.data.data.attributes

            contentState.teamId = response.data.data.id
            contentState.teamName = resData.team_name
            contentState.usersLists = resData.users_lists.data.map((item) => {
                return {
                    userId: item.id,
                    userName: item.attributes.username,
                    userEmail: item.attributes.email,
                }
            })
            contentState.usersManager = {
                userId: resData.user_manager.data.id,
                userName: resData.user_manager.data.attributes.username,
                userEmail: resData.user_manager.data.attributes.email,
            }
            contentState.userOperate = resData.users_operate.data.map(
                (item) => {
                    return {
                        userId: item.id,
                        userName: item.attributes.username,
                        userEmail: item.attributes.email,
                        userIdentity: '开发人员',
                    }
                }
            )
            contentState.userVisit = resData.users_visit.data.map((item) => {
                return {
                    userId: item.id,
                    userName: item.attributes.username,
                    userEmail: item.attributes.email,
                    userEmail: item.attributes.email,
                    userIdentity: '游客',
                }
            })
            contentState.teamFolds = resData.folds.data.map((item) => {
                return {
                    id: item.id,
                    fold_name: item.attributes.fold_name,
                    publishedAt: item.attributes.publishedAt,
                }
            })
            contentState.teamFiles = resData.creations.data.map((item) => {
                return {
                    id: item.id,
                    cre_name: item.attributes.cre_name,
                    cre_status: item.attributes.cre_status,
                    publishedAt: item.attributes.publishedAt,
                    updatedAt: item.attributes.updatedAt,
                }
            })
            contentState.teamTasks = resData.tasks.data.map((item) => {
                return {
                    id: item.id,
                    taskName: item.attributes.task_name,
                    taskTitle: item.attributes.task_title,
                    taskPriority: item.attributes.task_priority,
                    taskContent: item.attributes.task_content,
                    taskStatus: item.attributes.task_status,
                    deadline: item.attributes.deadline,
                    publishedAt: item.attributes.publishedAt,
                }
            })

            setUserIdentity()
            memberState.tableData = [
                ...contentState.userOperate,
                ...contentState.userVisit,
            ]
        },
        (error) => {
            console.log(error)
        }
    )
}

// 检测当前用户的团队身份
const userState = reactive({
    userIdentity: '',
})
const setUserIdentity = () => {
    const userId = userinfoStore.userInfo.userId
    let OperateFlag = false
    let VisitFlag = false
    contentState.userOperate.forEach((item) => {
        if (item.userId === userId) {
            OperateFlag = true
        }
    })
    contentState.userVisit.forEach((item) => {
        if (item.userId === userId) {
            VisitFlag = true
        }
    })
    if (userId === contentState.usersManager.userId) {
        userState.userIdentity = '管理员'
    } else if (OperateFlag === true) {
        userState.userIdentity = '开发人员'
    } else if (VisitFlag === true) {
        userState.userIdentity = '游客'
    }
}

// 查看文件夹栏下文件
const tabState = reactive({
    tabValue: 'userFiles',
    foldTabName: '选定文件夹',
})
const checkChildFiles = (foldData) => {
    contentState.foldFiles = []
    getFoldFiles({ id: foldData.id }).then(
        (response) => {
            const resFiles = response.data.data.attributes.creations.data
            for (let index = 0; index < resFiles.length; index++) {
                contentState.foldFiles[index] = {
                    id: resFiles[index].id,
                    ...resFiles[index].attributes,
                }
            }
            tabState.foldTabName = foldData.fold_name
            tabState.tabValue = 'foldFiles'
        },
        (error) => {
            message.error('未获取到文件')
            console.log(error)
        }
    )
}

// 查看任务看板
const taskState = reactive({
    addTaskModal: false,
    taskModal: false,
    taskName: '',
    taskTitle: '',
    taskPriority: '',
    taskContent: '',
    taskStatus: '',
    deadline: '',
    publishedAt: '',
    coder: '',
})
const checkTeamTask = (data) => {
    taskState.taskModal = true
    taskState.taskName = data.taskName
    taskState.taskTitle = data.taskTitle
    taskState.taskPriority = data.taskPriority
    taskState.taskContent = data.taskContent
    taskState.taskContent = data.taskContent
    taskState.taskStatus = data.taskStatus
    taskState.deadline = data.deadline
    taskState.publishedAt = data.publishedAt
    getTaskCoder({ id: data.id }).then(
        (response) => {
            taskState.coder =
                response.data.data.attributes.coder.data.attributes.username
        },
        (error) => {
            console.log(error)
        }
    )
    // taskState.coder =
}

// 管理团队成员
const editMember = (row) => {
    // 修改团队成员身份
    let usersOperate = []
    let usersVisit = []
    if (row.userIdentity === '开发人员') {
        contentState.userOperate.forEach((item) => {
            if (item.userId !== row.userId) {
                usersOperate.push(item.userId)
            }
        })
        contentState.userVisit.forEach((item) => {
            usersVisit.push(item.userId)
        })
        usersVisit.push(row.userId)
    } else if (row.userIdentity === '游客') {
        contentState.userOperate.forEach((item) => {
            usersOperate.push(item.userId)
        })
        contentState.userVisit.forEach((item) => {
            if (item.userId !== row.userId) {
                usersVisit.push(item.userId)
            }
        })
        usersOperate.push(row.userId)
    }

    pullTeamMemberIdentity({
        id: contentState.teamId,
        usersOperate,
        usersVisit,
    }).then(
        (response) => {
            message.success('切换身份成功')
            setTeamInfo()
        },
        (error) => {
            console.log(error)
        }
    )
}
const delMember = (row) => {
    // 删除该成员
    let usersOperate = []
    let usersVisit = []
    let usersLists = []
    contentState.userOperate.forEach((item) => {
        if (item.userId !== row.userId) {
            usersOperate.push(item.userId)
        }
    })
    contentState.userVisit.forEach((item) => {
        if (item.userId !== row.userId) {
            usersVisit.push(item.userId)
        }
    })
    usersLists = [userinfoStore.userInfo.userId, ...usersOperate, ...usersVisit]

    pullTeamMemberList({
        id: contentState.teamId,
        usersOperate,
        usersVisit,
        usersLists,
    }).then(
        (response) => {
            message.success('删除成功')
            setTeamInfo()
        },
        (error) => {
            console.log(error)
        }
    )
}
const memberCreateColumns = ({ editMember, delMember }) => {
    return [
        { title: '姓名', key: 'userName' },
        { title: '邮箱', key: 'userEmail' },
        { title: '身份', key: 'userIdentity' },
        {
            title: '修改',
            key: 'edit',
            render(row) {
                return h(
                    NButton,
                    {
                        strong: true,
                        secondary: true,
                        type: 'info',
                        size: 'small',
                        onClick: () => editMember(row),
                    },
                    { default: () => '切换身份' }
                )
            },
        },
        {
            title: '删除',
            key: 'del',
            render(row) {
                return h(
                    NButton,
                    {
                        strong: true,
                        secondary: true,
                        type: 'error',
                        size: 'small',
                        onClick: () => delMember(row),
                    },
                    { default: () => '删除成员' }
                )
            },
        },
    ]
}
const memberState = reactive({
    memberModal: false,
    tableColumns: memberCreateColumns({
        editMember,
        delMember,
    }),
    tableData: [],
})
const handleMember = () => {
    memberState.memberModal = true
    memberState.tableData = [
        ...contentState.userOperate,
        ...contentState.userVisit,
    ]
}

// 模态框
const modalState = reactive({
    addFoldModal: false,
    addFileModal: false,
    foldModalMode: 'add',
    fileModalMode: 'add',
})
// 添加值
const addFoldFormValue = reactive({
    curFoldId: 0,
    fold_name: '',
})

// 新建团队文件夹
const handleFold = () => {
    addFoldFormValue.fold_name = ''
    modalState.foldModalMode = 'add'
    modalState.addFoldModal = true
}
const submitFoldCallback = () => {
    if (modalState.foldModalMode === 'add') {
        if (addFoldFormValue.fold_name !== '') {
            const data = {
                fold_name: addFoldFormValue.fold_name,
                team: contentState.teamId,
                is_team_fold: true,
                creations: null,
                folds: null,
                user: null,
            }
            postFold(data).then(
                (response) => {
                    setTeamInfo()
                    message.success('添加成功')
                },
                (error) => {
                    console.log(error)
                    message.error('添加失败')
                }
            )
            modalState.addFoldModal = false
        } else if (addFoldFormValue.fold_name === '') {
            message.warning('输入为空')
        } else {
            message.error('添加失败')
        }
    } else if (modalState.foldModalMode === 'edit') {
        const data = {
            id: addFoldFormValue.curFoldId,
            fold_name: addFoldFormValue.fold_name,
        }
        putFoldInfo(data).then(
            (response) => {
                message.success('修改成功')
                setTeamInfo()
            },
            (error) => {
                message.error('修改失败')
            }
        )
        modalState.addFoldModal = false
    }
}
const cancelFoldCallback = () => {
    modalState.addFoldModal = false
    addFoldFormValue.fold_name = ''
}

// 新建团队文件
const handleFile = () => {
    addFileFormValue.curFileId = 0
    addFileFormValue.cre_name = ''
    addFileFormValue.isPublic = true
    addFileFormValue.fold = null
    addFileFormValue.category = null
    modalState.fileModalMode = 'add'
    fileOptionInit()
    modalState.addFileModal = true
}
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
    const teamId = contentState.teamId
    // 获取团队文件
    getTeamFolds({ id: teamId }).then(
        (response) => {
            const resFolds = response.data.data.attributes.folds.data
            addFileOption.foldOption = resFolds.map((item) => {
                return {
                    label: item.attributes.fold_name,
                    value: item.id,
                }
            })
        },
        (error) => {
            message.error('未获取到团队文件夹')
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
const submitFileCallback = () => {
    if (modalState.fileModalMode === 'add') {
        if (
            addFileFormValue.cre_name !== '' &&
            addFileFormValue.fold !== '' &&
            addFileFormValue.category !== ''
        ) {
            const data = {
                cre_name: addFileFormValue.cre_name,
                cre_status: '刚创建',
                isPublic: addFileFormValue.isPublic,
                is_team_file: true,
                json_content: null,
                fold: Number(addFileFormValue.fold),
                category: Number(addFileFormValue.category),
                user: null,
                team: contentState.teamId,
            }
            postFile(data).then(
                (response) => {
                    setTeamInfo()
                    message.success('添加成功')
                    // 跳转
                    modalState.addFileModal = false
                },
                (error) => {
                    message.error('添加失败')
                }
            )
        } else if (
            addFileFormValue.cre_name === '' ||
            addFileFormValue.fold === null ||
            addFileFormValue.category === null
        ) {
            message.warning('请完备信息')
        } else {
            message.error('添加失败')
        }
    } else if (modalState.fileModalMode === 'edit') {
        const data = {
            id: addFileFormValue.curFileId,
            cre_name: addFileFormValue.cre_name,
            isPublic: addFileFormValue.isPublic,
            fold: addFileFormValue.fold,
            category: addFileFormValue.category,
        }
        putFileInfo(data).then(
            (response) => {
                setTeamInfo()
                message.success('修改成功')
            },
            (error) => {
                message.error('修改失败')
            }
        )
        modalState.addFileModal = false
    }
}
const cancelFileCallback = () => {
    addFileFormValue.cre_name = ''
    addFileFormValue.isPublic = true
    addFileFormValue.fold = null
    addFileFormValue.category = null
    modalState.addFileModal = false
}

// 新建任务看板
const taskAddForm = reactive({
    taskName: '',
    taskTitle: '',
    taskContent: '',
    taskStatus: null,
    taskPriority: null,
    deadline: Date.parse(new Date()),
    coder: null,
})
const optionState = reactive({
    coderOption: [],
    statusOption: [
        { label: '未开始', value: '未开始' },
        { label: '正在跟进', value: '正在跟进' },
        { label: '已完成', value: '已完成' },
    ],
    priorityOption: [
        { label: '优先级1', value: '1' },
        { label: '优先级2', value: '2' },
        { label: '优先级3', value: '3' },
        { label: '优先级4', value: '4' },
        { label: '优先级5', value: '5' },
    ],
})
const handleTask = () => {
    setCoderSelect()
    taskState.addTaskModal = true
}
const setCoderSelect = () => {
    optionState.coderOption = contentState.userOperate.map((item) => {
        return {
            label: item.userName,
            value: item.userId,
        }
    })
}
const cancelAddTask = () => {
    taskState.addTaskModal = false
}
const submitAddTask = () => {
    const data = {
        task_name: taskAddForm.taskName,
        task_title: taskAddForm.taskTitle,
        task_content: taskAddForm.taskContent,
        task_status: taskAddForm.taskStatus,
        task_priority: taskAddForm.taskPriority,
        deadline: moment(taskAddForm.deadline).format('YYYY-MM-DD:HH:MM:SS'),
        coder: taskAddForm.coder,
        team: contentState.teamId,
    }

    let emptyFlag = false
    for (let key in data) {
        if (data[key] === null || data[key] === undefined || data[key] === '') {
            emptyFlag = true
        }
    }

    if (!emptyFlag) {
        postTask(data).then(
            (response) => {
                console.log(response.data)
                setTeamInfo()
                message.success('添加任务成功')
                taskState.addTaskModal = false
            },
            (error) => {
                message.error('创建失败')
                taskState.addTaskModal = false
                console.log(error)
            }
        )
    } else {
        message.warning('输入信息不完备')
    }
}

// 团队相关操作
const teamOpState = reactive({
    createModal: false,
    partModal: false,
})
const createTeamForm = reactive({
    teamName: '',
})
const partTeamForm = reactive({
    teamName: '',
})

// 创建团队
const handleCreateTeam = () => {
    teamOpState.createModal = true
}
const cancelCreateTeam = () => {
    teamOpState.createModal = false
}
const submitCreateTeam = () => {
    const userId = userinfoStore.userInfo.userId

    const data = {
        team_name: createTeamForm.teamName,
        user_manager: userId,
        users_operate: null,
        users_visit: null,
        creations: null,
        tasks: null,
        folds: null,
        users_lists: [userId],
    }

    if (data.team_name !== '') {
        postNewTeam(data).then(
            (response) => {
                setTeamInfo()
                message.success('创建团队成功')
                // 刷新左侧组队列表全局事件总线
                emitter.emit('setRouteTeam', '')
                teamOpState.createModal = false
            },
            (error) => {
                message.error('创建失败')
                teamOpState.createModal = false
                console.log(error)
            }
        )
    } else {
        message.warning('输入为空')
    }
}

// 加入团队
const handlePartTeam = () => {
    teamOpState.partModal = true
}
const cancelPartTeam = () => {
    teamOpState.partModal = false
}
const submitPartTeam = () => {
    const userId = userinfoStore.userInfo.userId
    const teamNameInp = partTeamForm.teamName
    let teamIdInp = null
    let teamListInp = []
    let teamVisitInp = []

    // 获取所有的团队
    getTeamAll().then((response) => {
        let existFlag = false
        console.log(response.data.data)
        response.data.data.forEach((item) => {
            if (item.attributes.team_name === teamNameInp) {
                teamIdInp = item.id
                teamVisitInp = [...item.attributes.users_visit.data]
                teamListInp = [...item.attributes.users_lists.data]
                existFlag = true
                putTeamVisit()
            }
        })
        if (!existFlag) {
            message.error('团队不存在')
        }
    })

    const putTeamVisit = () => {
        const data = {
            id: teamIdInp,
            users_visit: [...teamVisitInp, userId],
            users_lists: [...teamListInp, userId],
        }

        if (teamNameInp !== '') {
            putNewTeam(data).then(
                (response) => {
                    setTeamInfo()
                    message.success('加入团队成功')
                    // 刷新左侧组队列表全局事件总线
                    emitter.emit('setRouteTeam', '')
                    teamOpState.partModal = false
                },
                (error) => {
                    message.error('加入失败')
                    teamOpState.partModal = false
                    console.log(error)
                }
            )
        } else {
            message.warning('输入为空')
        }
    }
}

// 编辑文件夹
const handleEditFold = (foldId) => {
    addFoldFormValue.curFoldId = foldId
    const filterFold = contentState.teamFolds.filter((item) => {
        return item.id === foldId
    })
    addFoldFormValue.fold_name = filterFold[0].fold_name
    modalState.foldModalMode = 'edit'
    modalState.addFoldModal = true
}

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
    modalState.fileModalMode = 'edit'
    modalState.addFileModal = true
}

// 删除文件夹
const handleDeleteFold = (foldId) => {
    deleteFold({ id: foldId }).then(
        (response) => {
            message.success('删除成功')
            setTeamInfo()
        },
        (error) => {
            message.error('删除失败')
            console.log(error)
        }
    )
}

// 删除文件
const handleDeleteFile = (fileId) => {
    deleteFile({ id: fileId }).then(
        (response) => {
            message.success('删除成功')
            setTeamInfo()
        },
        (error) => {
            message.error('删除失败')
            console.log(error)
        }
    )
}

// 同页面跳转监视路由
watch(router.currentRoute, () => {
    if (route.path === '/work/team') {
        setTeamInfo()
    }
})

onMounted(() => {
    setTeamInfo()
})
</script>

<style lang="scss" scoped>
.work-team-content {
    padding: 15px 30px;
    height: calc(100vh - 60px);
    display: flex;
    padding: 20px;

    .team-file {
        width: 80%;
        height: 100%;
        margin-right: 20px;
        .opera-group {
            display: flex;
            margin-bottom: 16px;
            .n-button {
                height: 45px;
                margin-right: 20px;
            }
        }

        .fold-group {
            height: 120px;
            .fold-item {
                user-select: none;
                display: flex;
                align-items: center;
                flex-direction: row;
                flex-wrap: nowrap;
                margin-bottom: 16px;
                .n-card {
                    display: inline-flex;
                    cursor: pointer;
                    margin-right: 16px;
                    width: 240px;
                    height: 100px;
                }
            }
        }

        .file-group {
            height: 550px;
            .n-tab-pane {
                height: 560px;
            }

            .file-item {
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
    }

    .team-bulletin {
        width: 20%;
        height: 100%;
        padding: 10px;
        .user-info {
            height: 210px;
            margin-bottom: 10px;
            .operation {
                display: flex;
                justify-content: space-around;
                .n-button {
                    width: 43%;
                }
            }
        }

        .bulletin-group {
            width: 100%;
            height: calc(100% - 220px);
            background-color: #f8f8f8;
            padding: 10px;

            .bulletin-content {
                height: calc(100% - 40px);
                .item {
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style>