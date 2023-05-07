<template>
    <div class="workfile-wrap">
        <div class="workfile-cotent">
            <div class="top">
                <div class="add-group">
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

                    <!-- 添加文件夹模态框 -->
                    <n-modal
                        v-model:show="modalState.addFoldModal"
                        class="custom-card"
                        preset="card"
                        :style="{ width: '400px' }"
                        :title="modalState.foldModalMode==='add'?'添加文件夹':'修改文件夹'"
                        size="huge"
                        :bordered="false"
                        :segmented="{ content: 'soft', footer: 'soft' }"
                    >
                        <template #header-extra></template>
                        <n-input v-model:value="addFoldFormValue.fold_name" placeholder="输入文件夹名" />
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
                            >取消</n-button>
                            <n-button
                                strong
                                secondary
                                type="primary"
                                @click="submitFoldCallback"
                                :style="{ width: '120px' }"
                            >确定</n-button>
                        </template>
                    </n-modal>

                    <!-- 添加文件模态框 -->
                    <n-modal
                        v-model:show="modalState.addFileModal"
                        class="custom-card"
                        preset="card"
                        :style="{ width: '400px' }"
                        :title="modalState.fileModalMode==='add'?'添加文件':'修改文件'"
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
                            >取消</n-button>
                            <n-button
                                strong
                                secondary
                                type="primary"
                                @click="submitFileCallback"
                                :style="{ width: '120px' }"
                            >确定</n-button>
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
                            @click="checkChildFiles(item)"
                        >
                            <template #header-extra>
                                <n-icon
                                    size="16"
                                    color="#606266"
                                    :style="{marginRight:'6px'}"
                                    @click="handleEditFold(item.id)"
                                >
                                    <Edit />
                                </n-icon>

                                <n-popconfirm @positive-click="handleDeleteFold(item.id)">
                                    <template #trigger>
                                        <n-icon
                                            size="16"
                                            color="#606266"
                                            :style="{marginRight:'6px'}"
                                        >
                                            <Delete />
                                        </n-icon>
                                    </template>
                                    确定删除该{{item.fold_name}}吗
                                </n-popconfirm>

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

            <n-tabs type="line" animated v-model:value="tabState.tabValue">
                <n-tab-pane name="userFiles" tab="全部文件">
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
                                        <n-icon
                                            size="16"
                                            color="#606266"
                                            :style="{marginRight:'6px'}"
                                            @click="handleEditFile(item.id)"
                                        >
                                            <Edit />
                                        </n-icon>
                                        <n-popconfirm @positive-click="handleDeleteFile(item.id)">
                                            <template #trigger>
                                                <n-icon
                                                    size="16"
                                                    color="#606266"
                                                    :style="{marginRight:'6px'}"
                                                >
                                                    <Delete />
                                                </n-icon>
                                            </template>
                                            确定删除该{{item.cre_name}}吗
                                        </n-popconfirm>
                                    </template>
                                    文件夹状态：{{ item.cre_status }}
                                    <br />
                                    创建时间：{{
                                    moment(item.publishedAt).format(
                                    "YYYY-MM-DD"
                                    )
                                    }}
                                    <br />
                                    更新时间：{{
                                    moment(item.updatedAt).format(
                                    "YYYY-MM-DD"
                                    )
                                    }}
                                    <n-button strong secondary @click="fileToDesign(item.id)">
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
                <n-tab-pane name="foldFiles" :tab="tabState.foldTabName">
                    <div v-if="contentState.foldFiles.length === 0">该文件夹下暂无文件</div>
                    <div v-if="contentState.foldFiles !== 0">
                        <n-scrollbar trigger="none">
                            <div class="file-group">
                                <n-card
                                    v-for="item in contentState.foldFiles"
                                    :key="item.id"
                                    :title="item.cre_name"
                                    hoverable
                                    embedded
                                >
                                    <template #header-extra>
                                        <n-icon
                                            size="16"
                                            color="#606266"
                                            :style="{marginRight:'6px'}"
                                            @click="handleEditFile(item.id)"
                                        >
                                            <Edit />
                                        </n-icon>
                                       <n-popconfirm @positive-click="handleDeleteFile(item.id)">
                                            <template #trigger>
                                                <n-icon
                                                    size="16"
                                                    color="#606266"
                                                    :style="{marginRight:'6px'}"
                                                >
                                                    <Delete />
                                                </n-icon>
                                            </template>
                                            确定删除该{{item.cre_name}}吗
                                        </n-popconfirm>
                                    </template>
                                    文件夹状态：{{ item.cre_status }}
                                    <br />
                                    创建时间：{{
                                    moment(item.publishedAt).format(
                                    "YYYY-MM-DD"
                                    )
                                    }}
                                    <br />
                                    更新时间：{{
                                    moment(item.updatedAt).format(
                                    "YYYY-MM-DD"
                                    )
                                    }}
                                    <n-button strong secondary @click="fileToDesign(item.id)">
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
import { onMounted, reactive, ref } from "vue";
import {
    Add,
    DocumentAdd,
    FolderAdd,
    Folder,
    Code,
    Edit,
    Delete,
} from "@vicons/carbon";
import { useRouter, useRoute } from "vue-router";
import { useMessage } from "naive-ui";
import moment from "moment";
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
} from "@/service";
import useUserinfo from "@/stores/userinfo";
import useEditing from "@/stores/editing";

// pinia
const userinfoStore = useUserinfo(); // 用户状态
const editingStore = useEditing(); // 组件状态

// 定义路由
const router = useRouter();
const route = useRoute();

// naive message
const message = useMessage();

// 文件夹和文件初始化
const contentState = reactive({
    userFolds: [],
    userFiles: [],
    foldFiles: [],
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
    foldModalMode: "add",
    fileModalMode: "add",
});

// 添加文件夹
const handleAddFold = () => {
    modalState.foldModalMode = "add";
    modalState.addFoldModal = true;
};

const addFoldFormValue = reactive({
    curFoldId: 0,
    fold_name: "",
});

const submitFoldCallback = () => {
    if (modalState.foldModalMode === "add") {
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
    } else if (modalState.foldModalMode === "edit") {
        const data = {
            id: addFoldFormValue.curFoldId,
            fold_name: addFoldFormValue.fold_name,
        };
        putFoldInfo(data).then(
            (response) => {
                message.success("修改成功");
                dataInit();
            },
            (error) => {
                message.error("修改失败");
            }
        );
        modalState.addFoldModal = false;
    }
};

const cancelFoldCallback = () => {
    modalState.addFoldModal = false;
    addFoldFormValue.fold_name = "";
};

// 添加文件
const addFileFormValue = reactive({
    curFileId: 0,
    cre_name: "",
    isPublic: true,
    fold: null,
    category: null,
});

const addFileOption = reactive({
    foldOption: [],
    categoryOption: [],
});

const fileOptionInit = () => {
    const userID = userinfoStore.userInfo.userId;
    getUserFold({ id: userID }).then(
        (response) => {
            const resFolds = response.data.folds;
            for (let index = 0; index < resFolds.length; index++) {
                addFileOption.foldOption[index] = {
                    label: resFolds[index].fold_name,
                    value: resFolds[index].id,
                };
            }
        },
        (error) => {
            message.error("未获取到用户文件夹");
            console.log(error);
        }
    );

    getCategory().then(
        (response) => {
            const resCategories = response.data.data;
            for (let index = 0; index < resCategories.length; index++) {
                addFileOption.categoryOption[index] = {
                    label: resCategories[index].attributes.cate_name,
                    value: resCategories[index].id,
                };
            }
        },
        (error) => {
            message.error("未获取到分类");
            console.log(error);
        }
    );
}; // 添加文件表单的选择器配置初始化

const handleAddFile = () => {
    modalState.fileModalMode = "add";
    fileOptionInit();
    modalState.addFileModal = true;
    // router.push({ name: "design" });
};

const submitFileCallback = () => {
    if (modalState.fileModalMode === "add") {
        if (
            addFileFormValue.cre_name !== "" &&
            addFileFormValue.fold !== "" &&
            addFileFormValue.category !== ""
        ) {
            const data = {
                cre_name: addFileFormValue.cre_name,
                cre_status: "刚创建",
                isPublic: addFileFormValue.isPublic,
                is_team_file: false,
                json_content: null,
                fold: Number(addFileFormValue.fold),
                category: Number(addFileFormValue.category),
                user: userinfoStore.userInfo.userId,
                team: null,
            };
            postFile(data).then(
                (response) => {
                    dataInit();
                    message.success("添加成功");
                    // 跳转
                    modalState.addFileModal = false;
                    fileToDesign(response.data.data.id);
                },
                (error) => {
                    message.error("添加失败");
                }
            );
        } else if (
            addFileFormValue.cre_name === "" ||
            addFileFormValue.fold === null ||
            addFileFormValue.category === null
        ) {
            message.warning("请完备信息");
        } else {
            message.error("添加失败");
        }
    } else if (modalState.fileModalMode === "edit") {
        const data = {
            id: addFileFormValue.curFileId,
            cre_name: addFileFormValue.cre_name,
            isPublic: addFileFormValue.isPublic,
            fold: addFileFormValue.fold,
            category: addFileFormValue.category,
        };
        putFileInfo(data).then(
            (response) => {
                dataInit();
                message.success("修改成功");
            },
            (error) => {
                message.error("修改失败");
            }
        );
        modalState.addFileModal = false;
    }
};

const cancelFileCallback = () => {
    addFileFormValue.cre_name = "";
    addFileFormValue.isPublic = true;
    addFileFormValue.fold = null;
    addFileFormValue.category = null;
    modalState.addFileModal = false;
};

// 编辑文件夹
const handleEditFold = (foldId) => {
    addFoldFormValue.curFoldId = foldId;
    const filterFold = contentState.userFolds.filter((item) => {
        return item.id === foldId;
    });
    addFoldFormValue.fold_name = filterFold[0].fold_name;
    modalState.foldModalMode = "edit";
    modalState.addFoldModal = true;
};

// 编辑文件
const handleEditFile = (fileId) => {
    addFileFormValue.curFileId = fileId;
    fileOptionInit();
    getFile({ id: fileId }).then(
        (response) => {
            const resfile = response.data.data.attributes;
            addFileFormValue.cre_name = resfile.cre_name;
            addFileFormValue.isPublic = resfile.isPublic;
            addFileFormValue.fold = resfile.fold.data.id;
            addFileFormValue.category = resfile.category.data.id;
        },
        (error) => {
            message.error("获取文件信息失败");
            console.log(error);
        }
    );
    modalState.fileModalMode = "edit";
    modalState.addFileModal = true;
};

// 删除文件夹
const handleDeleteFold = (foldId) => {
    deleteFold({ id: foldId }).then(
        (response) => {
            message.success("删除成功");
            dataInit();
        },
        (error) => {
            message.error("删除失败");
            console.log(error);
        }
    );
};

// 删除文件
const handleDeleteFile = (fileId) => {
    deleteFile({ id: fileId }).then(
        (response) => {
            message.success("删除成功");
            dataInit();
        },
        (error) => {
            message.error("删除失败");
            console.log(error);
        }
    );
};

// 查看文件夹下文件
const tabState = reactive({
    tabValue: "userFiles",
    foldTabName: "选定文件夹",
});

const checkChildFiles = (foldData) => {
    contentState.foldFiles = [];
    getFoldFiles({ id: foldData.id }).then(
        (response) => {
            const resFiles = response.data.data.attributes.creations.data;
            for (let index = 0; index < resFiles.length; index++) {
                contentState.foldFiles[index] = {
                    id: resFiles[index].id,
                    ...resFiles[index].attributes,
                };
            }
            tabState.foldTabName = foldData.fold_name;
            tabState.tabValue = "foldFiles";
        },
        (error) => {
            message.error("未获取到文件");
            console.log(error);
        }
    );
};

// 文件跳转设计界面
const fileToDesign = (fileId) => {
    const tempData = [];
    editingStore.resetBlocks(tempData);
    router.push({ name: "design", query: { fileId } });
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
            width: 240px;
            height: 100px;
        }
    }

    .n-tab-pane {
        height: 560px;
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
            height: 190px;
            .n-button {
                width: 210px;
                margin-top: 10px;
            }
        }
    }
}
</style>