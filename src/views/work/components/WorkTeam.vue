<template>
    <div class="work-team-content">
        <div class="team-file"></div>
        <div class="team-bulletin">
            <div class="user-info">
                <n-card
                    title="叶女士"
                    :segmented="{
                        content: true,
                        footer: 'soft',
                    }"
                >
                    <template #header-extra>
                        <n-tag type="success">团队管理员</n-tag>
                    </template>
                    卡片内容
                    <template #action>
                        <div class="operation">
                            <n-button strong secondary type="tertiary">
                                创建团队
                            </n-button>
                            <n-button strong secondary type="primary">
                                加入团队
                            </n-button>
                        </div>
                    </template>
                </n-card>
            </div>
            <div class="bulletin-group">
                <div class="title">
                    <n-button icon-placement="left" tertiary type="primary">
                        <template #icon>
                            <n-icon>
                                <TaskAssetView />
                            </n-icon>
                        </template>
                        编辑团队任务看板
                    </n-button>
                </div>
                <div class="bulletin-content">
                    <n-scrollbar trigger="none">
                        <div class="item">
                            <n-card title="更新任务" hoverable>
                                <template #header-extra>
                                    <n-tag type="info">正在跟进</n-tag>
                                </template>
                                全部推翻重构
                            </n-card>
                        </div>
                    </n-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { TaskAssetView } from '@vicons/carbon'
</script>

<style lang="scss" scoped>
.work-team-content {
    padding: 15px 30px;
    height: calc(100vh - 60px);
    display: flex;

    .team-file {
        width: 80%;
        height: 100%;
        margin-right: 20px;
        border: 1px solid red;
    }

    .team-bulletin {
        width: 20%;
        height: 100%;
        border: 1px solid red;
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
            .title {
                width: 100%;
                display: flex;
                justify-content: center;
                margin-bottom: 10px;
            }

            .bulletin-content{
                height: calc(100% - 40px);
                .item{
                    margin-bottom: 10px;
                }
            }

            
        }
    }
}
</style>