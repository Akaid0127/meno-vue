<!-- 首页导航栏 -->
<template>
    <div class="homenav-wrap">
        <div class="homenav-content">
            <img
                class="logo"
                :src="themeState.dark?imgState.logoImgDark:imgState.logoImgLight"
                alt="低代码平台"
            />
            <div class="tag-list">
                <div class="tag-item">设计社区</div>
                <div class="tag-item">平台优势</div>
                <div class="tag-item">帮助中心</div>
                <div class="tag-item">项目仓库</div>
                <div class="tag-item">工作台</div>
                <div class="tag-item">关于我们</div>
            </div>

            <div class="btn-list">
                <n-button
                    class="themeBtn"
                    strong
                    secondary
                    circle
                    @click="modelBrn"
                    :color="themeState.dark?'#fff':'#18A058'"
                >
                    <template #icon>
                        <n-icon>
                            <Sun v-if="!themeState.dark" />
                            <Moon v-if="themeState.dark" />
                        </n-icon>
                    </template>
                </n-button>
                <n-button
                    class="loginBtn"
                    strong
                    secondary
                    type="tertiary"
                    :color="themeState.dark?'#fff':'#18A058'"
                    @click="handleLogin"
                >登录</n-button>
                <n-button
                    class="regisBtn"
                    strong
                    secondary
                    type="primary"
                    :color="themeState.dark?'#fff':'#18A058'"
                    @click="handleRegister"
                >免费使用</n-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Sun, Moon } from "@vicons/carbon";

// 定义路由
const router = useRouter();
const route = useRoute();

// logo
const imgState = reactive({
    logoImgLight: require("assets/logo/menocode-row-white.png"),
    logoImgDark: require("assets/logo/menocode-row-black.png"),
});

// 黑白主题切换
const themeState = reactive({
    dark: false,
});
function modelBrn() {
    themeState.dark = !themeState.dark;
    if (themeState.dark) {
        window.document.documentElement.setAttribute("data-theme", "dark");
    } else {
        window.document.documentElement.setAttribute("data-theme", "light");
    }
}
onMounted(() => {
    window.document.documentElement.setAttribute("data-theme", "light");
});

// 登录
function handleLogin() {
    console.log(123);
}

// 注册
function handleRegister() {
    router.push({ name: "work" });
}
</script>



<style lang="scss" scoped>
@import "styles/common/common";
.homenav-wrap {
    @include background_color_nav("background_color_nav");
    @include text_color_nav("text_color_nav");
    transition: background 1s, color 0.6s;
    width: 100%;
    display: flex;
    justify-content: center;
}
.homenav-content {
    width: 1350px;
    height: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        height: 34px;
    }

    .tag-list {
        display: flex;
        .tag-item {
            height: 63px;
            display: flex;
            align-items: center;
            margin-right: 36px;
            font-weight: 400;
            font-family: SourceHanSansCN_Normal, PingFang SC, Microsoft YaHei;
            opacity: 0.7;
            -webkit-box-align: center;
            // transition-delay: 0.01s;
            font-size: 15px;
            cursor: pointer;
            &:hover {
                color: #18a058;
            }
        }
    }

    .btn-list {
        height: 65px;
        display: flex;
        align-items: center;
        .themeBtn {
            margin-right: 16px;
        }
        .loginBtn {
            padding-left: 16px;
            padding-right: 16px;
            margin-right: 16px;
        }
        .regisBtn {
            padding-left: 16px;
            padding-right: 16px;
        }
    }
}
</style>