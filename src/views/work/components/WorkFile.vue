<template>
    <div class="workfile-wrap">
        <div class="workfile-cotent">
            <div class="top">
                <div class="left">
                    <div class="item">全部文件</div>
                    <div class="item">我创建的</div>
                    <div class="item">共享文件</div>
                    <div class="item">回收站</div>
                </div>
                <div class="right"></div>
            </div>
            <div class="split-line"></div>
            <div class="bottom">
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

                    <n-button class="add-btn">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Add, DocumentAdd, FolderAdd, Download } from "@vicons/carbon";
import { useRouter, useRoute } from "vue-router";

// 定义路由
const router = useRouter();
const route = useRoute();


// 创建文件
function handleAddFile() {
	router.push({ name: "design" });
}

</script>

<style lang="scss" scoped>
.workfile-cotent {
    padding: 15px 30px;
    .top {
        margin-bottom: 10px;
        .left {
            color: rgba(32, 32, 32, 0.8);

            display: flex;
            .item {
                margin-right: 20px;
                &:hover {
                    // 后面改为点击跳转
                    color: #202020;
                    font-weight: 700;
                }
            }
        }
    }
    .split-line {
        background: rgba(218, 218, 220, 0.6);
        height: 1px;
    }
    .bottom {
        margin-top: 24px;
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
}
</style>