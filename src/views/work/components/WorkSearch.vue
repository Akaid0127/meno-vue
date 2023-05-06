<template>
    <div class="worksearch-wrap">
        <div class="worksearch-content">
            <div class="left">
                <div class="add">
                    <n-icon>
                        <Add />
                    </n-icon>
                </div>
                <div class="split-line"></div>
                <div class="search">
                    <n-input placeholder="搜索文件、文件夹、用户">
                        <template #prefix>
                            <n-icon :component="Search" />
                        </template>
                    </n-input>
                </div>
            </div>

            <div class="right">
                <div class="function-btn">
                    <n-button>
                        <n-icon>
                            <CopyLink />
                        </n-icon>素材库迁移
                    </n-button>
                </div>
                <div class="function-btn">
                    <n-button>
                        <n-icon>
                            <CloudDownload />
                        </n-icon>文件导入
                    </n-button>
                </div>
                <div class="split-line"></div>
                <div class="theme">
                    <n-icon>
                        <Sun />
                    </n-icon>
                </div>
                <div class="news">
                    <n-icon>
                        <Chat />
                    </n-icon>
                </div>
                <div class="user">
                    <n-avatar :style="{
						color: '#FFF',
						backgroundColor: '#E381C6'
						}">{{props.userName}}</n-avatar>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    Add,
    Search,
    Sun,
    Moon,
    CopyLink,
    CloudDownload,
    Chat,
} from "@vicons/carbon";

const props = defineProps(["userName"]);




</script>

<style lang="scss" scoped>
.worksearch-content {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
    .split-line {
        background: rgba(218, 218, 220, 0.6);
        width: 1px;
        height: 20px;
        margin: 10px;
    }
    .left {
        display: flex;
        align-items: center;
        .add {
            display: flex;
            align-items: center;
            .n-icon {
                font-size: 28px;
            }
        }

        .search {
            margin-left: 8px;
            .n-input {
                width: 300px;
                border-radius: 5px;
            }
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

        .news {
            .n-icon {
                display: flex;
                align-items: center;
                font-size: 20px;
                margin-right: 20px;
            }
        }

        .user {
			.n-avatar{
				border-radius: 50%;
				display: flex;
				align-items: center;
				font-size:14px;
			}
        }
    }
}
</style>