<template>
    <div class="commclass-wrap">
        <div class="commclass-content">
            <div class="background-container">
                <div class="background_wrap">
                    <img
                        src="https://img.js.design/assets/static/04655ded30771e94bfa72bf9dab3cbbf.png"
                        class="hidden"
                    /><img
                        src="https://img.js.design/assets/static/5919906512ce08100909398cda8fe302.png"
                        class=""
                    />
                </div>
            </div>
            <div class="first-row">
                <div class="title">
                    <div class="top">
                        <div class="time">早上好，</div>
                        <div class="name">新唐老师</div>
                    </div>

                    <div class="describe">欢迎来到简易绘码社区</div>
                </div>
                <div class="search-box">
                    <div>
                        <n-input
                            placeholder="搜索作品、用户"
                            class="search-inp"
                        >
                            <template #prefix>
                                <n-icon color="#0e7a0d" :component="Search" />
                            </template>
                        </n-input>
                    </div>
                    <div class="btn-group">
                        <n-button type="primary" ghost> 全部 </n-button>

                        <n-button type="tertiary"> 分类1 </n-button>

                        <n-button type="tertiary"> 分类2 </n-button>

                        <n-button type="tertiary"> 分类3 </n-button>

                        <n-button type="tertiary"> 分类4 </n-button>

                        <n-button type="tertiary"> 分类5 </n-button>
                    </div>
                </div>
            </div>
            <div class="second-row">
                <div class="head-line">热门设计作品</div>
                <div class="bottom-content">
                    <div class="card-group">
                        <div class="card-item">
                            <FileInfoCard />
                        </div>

                        <div class="card-item">
                            <FileInfoCard />
                        </div>

                        <div class="card-item">
                            <FileInfoCard />
                        </div>

                        <div class="card-item">
                            <FileInfoCard />
                        </div>

                        <div class="card-item">
                            <FileInfoCard />
                        </div>

                        <div class="card-item">
                            <FileInfoCard />
                        </div>
                    </div>
                    <div class="user-group">
                        <AuthorList />
                    </div>
                </div>
            </div>
            <div class="third-row"></div>
        </div>
    </div>
</template>

<script setup>
import FileInfoCard from '@/components/FileInfoCard'
import AuthorList from '@/components/AuthorList'
import { Search } from '@vicons/carbon'
</script>


<style lang="scss" scoped>
.commclass-wrap {
}

.commclass-content {
    position: relative;
    .background-container {
        width: 100%;
        position: absolute;
        top: -40px;
        left: -150px;
        // filter: blur(6px);
        overflow: hidden;
        user-select: none;
        .background_wrap {
            width: 1440px;
            aspect-ratio: 6 / 2;
            opacity: 0.7;
            img {
                width: 100%;
                height: 100%;
                vertical-align: middle;
            }
            .hidden {
                display: none;
            }
        }
    }

    .first-row {
        width: 100%;
        height: 170px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        margin-bottom: 80px;
        .title {
            z-index: 999;
            width: 340px;
            height: 120px;
            display: flex;
            justify-content: center;
            display: flex;
            flex-direction: column;
            user-select: text;
            margin-right: 120px;
            .top {
                display: flex;
                .time {
                    opacity: 0.5;
                    color: #000;
                    margin-right: 6px;
                    margin-bottom: 4px;
                    font-size: 24px;
                }
                .name {
                    color: #000;
                    margin-bottom: 4px;
                    font-size: 24px;
                }
            }

            .describe {
                color: #000;
                font-weight: 500;
                font-size: 30px;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont,
                    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
                    Helvetica Neue, sans-serif;
            }
        }

        .search-box {
            width: 700px;
            height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .search-inp {
                width: 600px;
                line-height: 45px;
                margin-bottom: 12px;
            }

            .btn-group {
                display: flex;
                width: 600px;
                .n-button {
                    width: 80px;
                    margin-right: 12px;
                }
            }
        }
    }

    .second-row {
        padding: 0 50px;
        .head-line {
            font-size: 24px;
            font-weight: 500;
            letter-spacing: 0px;
            line-height: 24px;
            color: #000;
            text-align: left;
            margin-bottom: 20px;
        }
        .bottom-content {
            display: flex;
            .card-group {
                flex: 3;
                margin-right: 10px;
                display: flex;
                flex-wrap: wrap;
                .card-item {
                    width: 32%;
                    height: 240px;
                    margin-bottom: 20px;
                }
                .card-item:not(:nth-child(3n)) {
                    margin-right: calc(6% / 3);
                }
            }
            .user-group {
                margin-left: 10px;
                flex: 1;
                height: 500px;
            }
        }
    }

    .third-row {
    }
}
</style>