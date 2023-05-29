<template>
    <div class="work-team-content">
        <div class="team-file">
            <div
                class="opera-group"
                v-show="userState.userIdentity === '管理员'"
            >
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
                    管理团队文件夹
                </n-button>
                <n-button strong secondary type="primary" @click="handleFile">
                    <template #icon>
                        <n-icon>
                            <VolumeFileStorage />
                        </n-icon>
                    </template>
                    管理团队文件
                </n-button>
                <n-button strong secondary type="primary" @click="handleTask">
                    <template #icon>
                        <n-icon>
                            <TaskAssetView />
                        </n-icon>
                    </template>
                    管理团队任务看板
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
                        >
                            <template #header-extra>
                                <n-icon size="22" color="#FFD485">
                                    <Folder />
                                </n-icon>
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
                                            <n-icon size="22" color="#18A058">
                                                <AlignBoxMiddleLeft />
                                            </n-icon>
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
                                            <n-icon size="22" color="#18A058">
                                                <AlignBoxMiddleLeft />
                                            </n-icon>
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
                            <n-button strong secondary type="tertiary"
                                >创建团队</n-button
                            >
                            <n-button strong secondary type="primary"
                                >加入团队</n-button
                            >
                        </div>
                    </template>
                </n-card>
            </div>
            <div class="bulletin-group">
                <div class="bulletin-content">
                    <n-scrollbar trigger="none">
                        <div class="item">
                            <n-card title="项目一" hoverable>
                                <template #header-extra>
                                    <n-tag type="success">已完成</n-tag>
                                </template>
                                登录页迭代
                            </n-card>
                        </div>

                        <div class="item">
                            <n-card title="项目二" hoverable>
                                <template #header-extra>
                                    <n-tag type="info">正在跟进</n-tag>
                                </template>
                                后台管理页完善
                            </n-card>
                        </div>

                        <div class="item">
                            <n-card title="项目二" hoverable>
                                <template #header-extra>
                                    <n-tag type="info">正在跟进</n-tag>
                                </template>
                                后台管理页提测
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
                <template #header-extra>
                    <n-button strong secondary type="primary"> 添加 </n-button>
                </template>
                <n-data-table
                    :columns="memberState.tableColumns"
                    :data="memberState.tableData"
                    :pagination="false"
                    :bordered="false"
                />
            </n-modal>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, watch, h, defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NButton, useMessage } from 'naive-ui'
import moment from 'moment'
import { getTeamManagerInfo, pullTeamMemberIdentity } from '@/service'
import useUserinfo from '@/stores/userinfo'
import {
    GroupSecurity,
    FolderDetailsReference,
    VolumeFileStorage,
    TaskAssetView,
    Folder,
    Code,
    AlignBoxMiddleLeft,
} from '@vicons/carbon'

// naive message
const message = useMessage()

// 路由
const router = useRouter()
const route = useRoute()

// 用户
const userinfoStore = useUserinfo()

// users_lists,
// user_manager,
// users_operate,
// users_visit,
// creations,
// folds,
// tasks,

// 标签页tab信息
const tabState = reactive({
    tabValue: 'userFiles',
    foldTabName: '选定文件夹',
})

// 团队基本信息
const contentState = reactive({
    teamId: 0,
    teamName: '',

    usersLists: [],
    usersManager: {},
    userOperate: [],
    userVisit: [],

    teamFolds: [],
    teamFiles: [
        {
            id: 1,
            cre_name: '登录页',
            cre_status: '待审核',
            publishedAt: '2023/5/21',
            updatedAt: '2023/5/23',
        },
        {
            id: 1,
            cre_name: '订单管理页',
            cre_status: '待审核',
            publishedAt: '2023/5/11',
            updatedAt: '2023/5/15',
        },
        {
            id: 1,
            cre_name: '运输管理页',
            cre_status: '待审核',
            publishedAt: '2023/5/15',
            updatedAt: '2023/5/16',
        },
        {
            id: 1,
            cre_name: '采购管理页',
            cre_status: '待审核',
            publishedAt: '2023/5/18',
            updatedAt: '2023/5/19',
        },
        {
            id: 1,
            cre_name: '交付管理页',
            cre_status: '待审核',
            publishedAt: '2023/5/21',
            updatedAt: '2023/5/25',
        },
        {
            id: 1,
            cre_name: '员工管理页',
            cre_status: '待审核',
            publishedAt: '2023/5/01',
            updatedAt: '2023/5/11',
        },
    ],
    foldFiles: [
        {
            id: 1,
            cre_name: '团队文件夹123',
            cre_status: '待审核',
            publishedAt: '2023/5/21',
            updatedAt: '2023/5/21',
        },
    ],
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

            // file todo

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
            OperateFlag = true
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
    
    console.log(row)
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

// 管理团队文件夹
const handleFold = () => {}

// 管理团队文件
const handleFile = () => {}

// 管理任务看板
const handleTask = () => {}

// 同页面跳转监视路由
watch(router.currentRoute, () => {
    setTeamInfo()
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