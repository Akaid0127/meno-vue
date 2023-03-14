<template>
    <div class="worknav-wrap">
        <div class="worknav-content">
            <img :src="imgState.logoImg" alt="简易绘码" />
            <div class="nav-list">
                <div class="item" tabindex="1">
                    <div class="info">
                        <n-icon>
                            <RecentlyViewed />
                        </n-icon>
                        <div class="title">最近</div>
                    </div>
                </div>
                <div class="item" tabindex="2">
                    <div class="info">
                        <n-icon>
                            <AlignBoxMiddleLeft />
                        </n-icon>
                        <div class="title">我的文件</div>
                    </div>
                </div>
                <div class="item" tabindex="3">
                    <div class="info">
                        <n-icon>
                            <RequestQuote />
                        </n-icon>
                        <div class="title">正在跟进</div>
                    </div>
                </div>
                <div class="item" tabindex="4">
                    <div class="info">
                        <n-icon>
                            <FlightInternational />
                        </n-icon>
                        <div class="title">资源社区</div>
                    </div>

                    <div class="detail">
                        <n-icon>
                            <ArrowRight />
                        </n-icon>
                    </div>
                </div>
            </div>

            <div class="split-line"></div>

            <div class="team">
                <div class="title">
                    <span>团队</span>
                    <n-icon>
                        <Add />
                    </n-icon>
                </div>
                <div class="item">
                    <n-avatar
                        :style="{
								color: '#FFFFFF',
								backgroundColor: '#CE6D84'
							}"
                    >前</n-avatar>
                    <div class="name">前端美工队</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import {
    RecentlyViewed,
    AlignBoxMiddleLeft,
    RequestQuote,
    FlightInternational,
    Add,
    ArrowRight,
} from "@vicons/carbon";

// 侧边栏图片
const imgState = reactive({
    logoImg: require("assets/logo/menocode-row.png"),
});
</script>

<style lang="scss" scoped>
.worknav-wrap {
    background-color: #f8f8f8;
    height: 929px;
}
.worknav-content {
    padding: 28px 20px;
    img {
        height: 25px;
        margin-bottom: 10px;
		margin-left: 4px;
    }

    .nav-list {
        .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 180px;
            height: 36px;
            padding: 0 8px;
            margin-bottom: 4px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            color: #202020;
            opacity: 0.9;
            .info {
                display: flex;
                align-items: center;
                .n-icon {
                    font-size: 16px;
                    margin-right: 8px;
                }
            }

            .detail {
                .n-icon {
                    display: flex;
                    align-items: center;
                }
            }

            &:hover {
                background-color: #ebebeb;
                transition: background 0.3s;
            }

            &:focus {
                background-color: #dfedf8;
                color: #008efa;
            }
        }
    }
    .split-line {
        background: rgba(218, 218, 220, 0.6);
        height: 1px;
        margin: 8px;
    }

    .team {
        .title {
			display: flex;
			align-items: center;
			justify-content: space-between;
            font-size: 13px;
			padding: 0 8px;
            color: rgba(32, 32, 32, 0.8);
            .n-icon {
                font-size: 18px;
                color: #202020;
            }
        }
        .item {
			display: flex;
			align-items: center;
            .n-avatar {
				width: 40px;
				height: 40px;
				font-size: 25px;
				border-radius: 8px;
				transform:scale(0.45,0.45);
            }
            .name {
            }
        }
    }
}
</style>