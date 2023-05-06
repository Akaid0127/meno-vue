<template>
    <div class="workfile-wrap">
        <div class="workfile-cotent">
            <div class="top">
                <div class="add-group">
                    <n-button class="add-btn" @click="handleAddFile">
                        <div class="left">
                            <n-icon class="color-icon">
                                <DocumentAdd />
                            </n-icon>
                            <div class="content">
                                <div class="title">创建文件</div>
                                <div class="txt">页面开发设计</div>
                            </div>
                        </div>
                        <n-icon class="add-icon">
                            <Add />
                        </n-icon>
                    </n-button>

                    <n-button class="add-btn" @click="handleAddFold">
                        <div class="left">
                            <n-icon class="color-icon">
                                <FolderAdd />
                            </n-icon>
                            <div class="content">
                                <div class="title">创建文件夹</div>
                                <div class="txt">文件收纳归类</div>
                            </div>
                        </div>
                        <n-icon class="add-icon">
                            <Add />
                        </n-icon>
                    </n-button>

                    <n-button class="add-btn">
                        <div class="left">
                            <n-icon class="color-icon">
                                <Download />
                            </n-icon>
                            <div class="content">
                                <div class="title">导入文件</div>
                                <div class="txt">导入Json、HTML...</div>
                            </div>
                        </div>

                        <n-icon class="add-icon">
                            <Add />
                        </n-icon>
                    </n-button>

                    <n-modal
                        v-model:show="modalState.addFoldModal"
                        class="custom-card"
                        preset="card"
                        :style="{ width: '400px' }"
                        title="添加文件夹"
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
                            >
                                取消
                            </n-button>
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
                </div>
            </div>
            <div class="split-line"></div>
            <div class="fold-scroll">
                <n-scrollbar x-scrollable trigger="none">
                    <div class="fold-group">
                        <n-card
                            v-for="item in contentState.userFolds"
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
                                moment(item.publishedAt).format("YYYY-MM-DD")
                            }}
                        </n-card>
                    </div>
                </n-scrollbar>
            </div>

            <div class="split-line"></div>
            <div class="file-scroll">
                <n-scrollbar trigger="none">
                    <div class="file-group">
                        <n-card
                            v-for="item in contentState.userFiles"
                            :key="item.id"
                            :title="item.cre_name"
                            hoverable
                            embedded
                        >
                            <template #header-extra>
                                <n-icon size="22" color="#0e7a0d">
                                    <Code />
                                </n-icon>
                            </template>

                            文件夹状态：{{ item.cre_status }}
                            <br />
                            创建时间：{{
                                moment(item.publishedAt).format("YYYY-MM-DD")
                            }}
                            <br />
                            更新时间：{{
                                moment(item.updatedAt).format("YYYY-MM-DD")
                            }}
                        </n-card>
                    </div>
                </n-scrollbar>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import {
    Add,
    DocumentAdd,
    FolderAdd,
    Download,
    Folder,
    Code,
} from "@vicons/carbon";
import { useRouter, useRoute } from "vue-router";
import { useMessage } from "naive-ui";
import moment from "moment";
import { getUserFold, getUserFile, postFold } from "@/service";
import useUserinfo from "@/stores/userinfo";

// pinia
const userinfoStore = useUserinfo(); // 用户状态

// 定义路由
const router = useRouter();
const route = useRoute();

// naive message
const message = useMessage();

// 文件夹和文件初始化
const contentState = reactive({
    userFolds: [],
    userFiles: [],
});

const dataInit = () => {
    const userID = userinfoStore.userInfo.userId;
    getUserFold({ id: userID }).then(
        (response) => {
            const resFolds = response.data.folds;
            contentState.userFolds = [...resFolds];
        },
        (error) => {
            message.error("未获取到用户文件夹");
            console.log(error);
        }
    ); // 获取用户文件夹

    getUserFile({ id: userID }).then(
        (response) => {
            const resFiles = response.data.creations;
            contentState.userFiles = [...resFiles];
        },
        (error) => {
            message.error("未获取到用户文件");
            console.log(error);
        }
    ); // 获取用户文件
};

// 模态框
const modalState = reactive({
    addFoldModal: false,
    addFileModal: false,
});

// 添加文件夹
const handleAddFold = () => {
    modalState.addFoldModal = true;
};

const addFoldFormValue = reactive({
    fold_name: "",
});

const submitFoldCallback = () => {
    if (addFoldFormValue.fold_name !== "") {
        const data = {
            fold_name: addFoldFormValue.fold_name,
            user: userinfoStore.userInfo.userId,
            is_team_fold: false,
            creations: null,
        };
        postFold(data).then(
            (response) => {
                dataInit();
                message.success("添加成功");
            },
            (error) => {
                console.log(error);
                message.error("添加失败");
            }
        );
        modalState.addFoldModal = false;
    } else if (addFoldFormValue.fold_name === "") {
        message.warning("输入为空");
    } else {
        message.error("添加失败");
    }
};

const cancelFoldCallback = () => {
    modalState.addFoldModal = false;
    addFoldFormValue.fold_name = "";
};

// 添加文件
const handleAddFile = () => {
    router.push({ name: "design" });
};

onMounted(() => {
    dataInit();
});
</script>

<style lang="scss" scoped>
.workfile-cotent {
    padding: 15px 30px;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;

    .split-line {
        background: rgba(218, 218, 220, 0.6);
        margin: 16px 0;
        height: 1px;
    }

    .top {
        .add-group {
            display: flex;
            .add-btn {
                width: 240px;
                height: 65px;
                border-radius: 8px;
                margin-right: 24px;
                display: flex;
                align-items: center;
                .left {
                    width: 200px;
                    display: flex;
                    align-items: center;

                    .n-icon {
                        font-size: 26px;
                        margin-right: 14px;
                    }

                    .content {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        .title {
                            color: #202020;
                            font-weight: 600;
                            margin-bottom: 6px;
                        }
                        .txt {
                            color: rgba(32, 32, 32, 0.6);
                        }
                    }
                }
                .add-icon {
                    font-size: 20px;
                }
            }
        }
    }

    .fold-scroll {
        height: 120px;
    }

    .fold-group {
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
            width: 200px;
            height: 100px;
        }
    }

    .file-scroll {
        height: 620px;
        margin-top: 10px;
    }
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
            height: 150px;
        }
    }
}
</style>