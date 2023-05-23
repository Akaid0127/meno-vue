<template>
    <div class="file-card">
        <div class="file-image"></div>
        <div class="info-content">
            <div class="left">
                <div class="title">设计页面一</div>
                <div class="user">阿萨德</div>
            </div>

            <div class="right">
                <div class="opre-like">
                    <n-icon>
                        <Favorite />
                    </n-icon>
                    2121
                </div>
                <div class="opre-copy">
                    <n-icon>
                        <Copy />
                    </n-icon>
                    109
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Favorite, Copy } from '@vicons/carbon'
</script>

<style lang="scss" scoped>
.file-card {
    width: 100%;
    height: 100%;
    border: 1px solid #d4d7de;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .file-image {
        background-color: #d4d7de;
        width: 100%;
        flex: 3;
    }

    .info-content {
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        .left {
            display: flex;
            flex-direction: column;
            cursor: text;
            .title {
                font-size: 16px;
                color: #303133;
            }

            .user {
                font-size: 12px;
                color: #909399;
            }
        }
        .right {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .n-icon{
                margin-bottom: 4px;
                margin-right: 4px;
            }

            .opre-like {
                display: flex;
                align-items: center;
                font-size: 16px;
                color: #303133;
                cursor: pointer;
            }

            .opre-copy {
                display: flex;
                align-items: center;
                font-size: 16px;
                color: #303133;
                cursor: pointer;
            }
        }
    }
}
</style>