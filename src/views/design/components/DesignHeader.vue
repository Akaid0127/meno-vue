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

                <n-button strong secondary @click="handleImage">
                    <template #icon>
                        <n-icon>
                            <vicon-image />
                        </n-icon>
                    </template>
                    图片
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
                <n-button @click="handleDeriveHtml">HTML</n-button>
                <n-button strong secondary type="success">保存退出</n-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Reply, Delete, Image as viconImage, EditOff } from "@vicons/carbon";
import emitter from "@/mitt/event";
import useEditing from "@/stores/editing";
import useSnapshot from "@/stores/snapshot";

// pinia
const editingStore = useEditing(); // 组件状态
const snapshotStore = useSnapshot(); // 快照状态

// 撤销
const handlePrevious = () => {
    snapshotStore.cancelOperate();
    const tempData = snapshotStore.snapshotData[snapshotStore.snapshotIndex];
    editingStore.resetBlocks(tempData);	
	emitter.emit("setOperateStyle",tempData)
};

// 反撤销
const handleReback = () => {
    snapshotStore.rebackOperate();
    const tempData = snapshotStore.snapshotData[snapshotStore.snapshotIndex];
    editingStore.resetBlocks(tempData);
	emitter.emit("setOperateStyle",tempData)
};

// 添加图片
const handleImage = () => {};

// 取消选择
const handleCancelChoose = () => {};

// 清空画布
const handleEmpty = () => {};

// 导出Json
const handleDeriveJson = () => {};

// 导出HTML
const handleDeriveHtml = () => {};
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