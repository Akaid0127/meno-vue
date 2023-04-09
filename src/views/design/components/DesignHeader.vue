<template>
    <div class="designheader-wrap">
        <div class="designheader-content">
            <div class="left">
                <!-- 左侧信息栏 -->
                <div class="user">
                    <n-avatar
                        :style="{
						color: '#18A058',
						backgroundColor: '#DAF0E4'
						}"
                    >雷</n-avatar>
                </div>
                <div class="split-line"></div>
                <div class="title">我的文件 / 未命名1</div>
            </div>
            <div class="center">
                <!-- 中间工具栏 -->

                <n-button strong secondary @click="handlePrevious">
                    <template #icon>
                        <n-icon>
                            <reply />
                        </n-icon>
                    </template>
                    撤销
                </n-button>

                <n-button strong secondary @click="handleReback">
                    <template #icon>
                        <n-icon class="forward-icon">
                            <reply />
                        </n-icon>
                    </template>
                    返回
                </n-button>

                <n-button strong secondary @click="handleCancelChoose">
                    <template #icon>
                        <n-icon>
                            <edit-off />
                        </n-icon>
                    </template>
                    取选
                </n-button>

                <n-button strong secondary @click="handleEmpty">
                    <template #icon>
                        <n-icon>
                            <delete />
                        </n-icon>
                    </template>
                    清空
                </n-button>
            </div>
            <div class="right">
                <!-- 右侧拓展栏 -->
                <n-button @click="handleDeriveJson">JSON</n-button>
                <n-modal
                    v-model:show="showModal.jsonModal"
                    class="custom-card"
                    preset="card"
                    :style="{width:'740px',height:'700px'}"
                    title="JSON数据"
                    size="huge"
                    :bordered="true"
                    :segmented="{content:'soft',footer:'soft'}"
                >
                    <n-scrollbar style="max-height: 560px" trigger="none">
                        <n-code
                            :code="codeState.jsonCode"
                            language="javascript"
                            show-line-numbers
                            trim
                        />
                    </n-scrollbar>
                </n-modal>

                <n-button @click="handleDeriveHtml">HTML</n-button>
                <n-modal
                    v-model:show="showModal.htmlModal"
                    class="custom-card"
                    preset="card"
                    :style="{width:'740px',height:'700px'}"
                    title="HTML数据"
                    size="huge"
                    :bordered="true"
                    :segmented="{content:'soft',footer:'soft'}"
                >
                    <n-scrollbar style="max-height: 560px" trigger="none">
                        <n-code
                            :code="codeState.htmlCode"
                            language="javascript"
                            show-line-numbers
                        />
                    </n-scrollbar>
                </n-modal>
                <n-button strong secondary type="success">保存退出</n-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { Reply, Delete, Image as viconImage, EditOff } from "@vicons/carbon";
import emitter from "@/mitt/event";
import useEditing from "@/stores/editing";
import useSnapshot from "@/stores/snapshot";
import objToJson from "@/utils/objToJson";
import objToHtml from "@/utils/objToHtml";

// pinia
const editingStore = useEditing(); // 组件状态
const snapshotStore = useSnapshot(); // 快照状态

// 撤销
const handlePrevious = () => {
    snapshotStore.cancelOperate([...editingStore.pageData.blocks]);
    // 拿取快照重置editingStore的数据
    const tempData = snapshotStore.snapshotData[snapshotStore.snapshotIndex];
    editingStore.resetBlocks(tempData);
    emitter.emit("setOperateStyle", tempData);
};

// 反撤销
const handleReback = () => {
    snapshotStore.rebackOperate([...editingStore.pageData.blocks]);
    const tempData = snapshotStore.snapshotData[snapshotStore.snapshotIndex];
    editingStore.resetBlocks(tempData);
    emitter.emit("setOperateStyle", tempData);
};

// 取消选择
const handleCancelChoose = () => {
    editingStore.setCurBlock("");
    emitter.emit("setCancelChoose");
};

// 清空画布
const handleEmpty = () => {
    editingStore.delBlockAll();
};

// 导出Json
const showModal = reactive({
    jsonModal: false,
    htmlModal: false,
});
const codeState = reactive({
    jsonCode: ``,
    htmlCode: ``,
});
const handleDeriveJson = () => {
    showModal.jsonModal = true;
    const jsonData = objToJson(editingStore.pageData.blocks);
    codeState.jsonCode = `${jsonData}`;
};

// 导出HTML
const handleDeriveHtml = () => {
	showModal.htmlModal = true;
	const htmlData = objToHtml(editingStore.pageData.blocks);
	codeState.htmlCode = `${htmlData}`;
};
</script>

<style lang="scss" scoped>
.designheader-wrap {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
}

.designheader-content {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    .split-line {
        background: rgba(218, 218, 220, 0.6);
        width: 1px;
        height: 20px;
        margin: 16px;
    }

    .left {
        display: flex;
        align-items: center;
        .user {
            .n-avatar {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                font-size: 14px;
            }
        }

        .title {
            color: #606266;
            opacity: 0.9;
            font-size: 14px;
        }
    }

    .center {
        display: flex;
        align-items: center;
        .n-button {
            margin-right: 10px;
        }

        .forward-icon {
            transform: rotateY(180deg); /* 水平镜像翻转 */
        }
    }

    .right {
        display: flex;
        align-items: center;
        .n-button + .n-button {
            margin-left: 10px;
        }
    }
}
</style>