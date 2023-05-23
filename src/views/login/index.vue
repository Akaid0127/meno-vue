<template>
    <div class="login-wrapper">
        <div class="login-content">
            <div class="header">
                <img class="logo" :src="imgState.logoImgLight" alt="低代码平台" />
                <n-button strong secondary type="primary" @click="handleBack">返回首页</n-button>
            </div>

            <div class="bottom">
                <div class="left">
                    <div class="show">
                        <img class="logo" :src="imgState.introduceImg" alt="设计页" />
                    </div>
                </div>

                <div class="right">
                    <div class="title">
                        <img class="logo" :src="imgState.logoSingle" alt="低代码平台" />
                        <div class="txt">快速 & 简易</div>
                    </div>
                    <div class="inlet">
                        <n-card>
                            <n-tabs
                                class="card-tabs"
                                v-model:value="nTabState.nTabValue"
                                size="large"
                                animated
                                justify-content="space-evenly"
                            >
                                <n-tab-pane name="signin" tab="登录" @click="handleSignin">
                                    <n-form
                                        ref="formLoginRef"
                                        :model="formLoginState"
                                        :rules="formLoginRule"
                                    >
                                        <n-form-item-row label="用户名" path="userName">
                                            <n-input
                                                v-model:value="
                                                    formLoginState.userName
                                                "
                                                placeholder="请输入用户名"
                                            />
                                        </n-form-item-row>
                                        <n-form-item-row label="密码" path="passward">
                                            <n-input
                                                type="password"
                                                show-password-on="mousedown"
                                                v-model:value="
                                                    formLoginState.passward
                                                "
                                                placeholder="请输入密码"
                                            />
                                        </n-form-item-row>
                                        <n-form-item-row>
                                            <n-button
                                                type="primary"
                                                block
                                                secondary
                                                strong
                                                @click="handleLogin"
                                            >登录</n-button>
                                        </n-form-item-row>
                                    </n-form>
                                </n-tab-pane>
                                <n-tab-pane name="signup" tab="注册" @click="handleSignup">
                                    <n-form
                                        ref="formRegRef"
                                        :model="formRegState"
                                        :rules="formRegRule"
                                    >
                                        <n-form-item-row label="用户名" path="userName">
                                            <n-input
                                                v-model:value="
                                                    formRegState.userName
                                                "
                                                placeholder="请输入用户名"
                                            />
                                        </n-form-item-row>
                                        <n-form-item-row label="邮箱" path="email">
                                            <n-input
                                                v-model:value="
                                                    formRegState.email
                                                "
                                                placeholder="请输入邮箱"
                                            />
                                        </n-form-item-row>
                                        <n-form-item-row label="密码" path="passward">
                                            <n-input
                                                v-model:value="
                                                    formRegState.passward
                                                "
                                                placeholder="请输入密码"
                                            />
                                        </n-form-item-row>
                                        <n-form-item-row>
                                            <n-button
                                                type="primary"
                                                block
                                                secondary
                                                strong
                                                @click="handleReg"
                                            >注册</n-button>
                                        </n-form-item-row>
                                    </n-form>
                                </n-tab-pane>
                            </n-tabs>
                        </n-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMessage } from "naive-ui";

import { userLogin, userReg } from "@/service";
import useUserinfo from "@/stores/userinfo";

// 挂载
onMounted(() => {
    const tabValue = route.query.type;
    if (tabValue === "toLogin") {
        nTabState.nTabValue = "signin";
    } else if (tabValue === "toReg") {
        formRegState.email = route.query.regMail;
        nTabState.nTabValue = "signup";
    }
});

// 模态框默认值
const nTabState = reactive({
    nTabValue: "signin",
});

const handleSignin = () => {
    nTabState.nTabValue = "signin";
};

const handleSignup = () => {
    nTabState.nTabValue = "signup";
};

// pinia
const userinfoStore = useUserinfo(); // 用户状态

// naive message
const message = useMessage();

// 定义路由
const router = useRouter();
const route = useRoute();

// logo
const imgState = reactive({
    logoSingle: require("assets/logo/menocode-green-single.png"),
    logoImgLight: require("assets/logo/menocode-row-white.png"),
    logoImgDark: require("assets/logo/menocode-row-black.png"),
    bgImg: require("assets/bg/bg-login1.jpg"),
    introduceImg: require("assets/normal/introduceImg.png"),
});

const handleBack = () => {
    router.push({ name: "home" });
};

// 登录
const formLoginRef = ref(null);
const formLoginState = reactive({
    userName: "",
    passward: "",
});
const formLoginRule = {
    userName: {
        required: true,
        message: "请输入姓名",
        trigger: "blur",
    },
    passward: {
        required: true,
        message: "请输入密码",
        trigger: "blur",
    },
};
const handleLogin = (e) => {
    e.preventDefault();
    formLoginRef.value?.validate((errors) => {
        if (!errors) {
            if (formLoginState.userName && formLoginState.passward) {
                const params = {
                    userName: formLoginState.userName,
                    passward: formLoginState.passward,
                };

                if (localStorage.getItem("userJwt") != null) {
                    localStorage.removeItem("userJwt");
                }
                userLogin(params).then(
                    (res) => {
                        // 读取token并存储localStorage
                        localStorage.setItem("userJwt", res.data.jwt);
                        const responseData = res.data.user;
                        const userData = {
                            userId: responseData.id,
                            userName: responseData.username,
                            userEmail: responseData.email,
                        };
                        userinfoStore.setUserInfo(userData);
                        router.push({ name: "work" });
                    },
                    (error) => {
                        if (error.response.status === 400) {
                            message.error("账号密码错误或账号不存在");
                        }
                    }
                );
            }
        } else {
            console.log(errors);
            message.error("请补全信息");
        }
    });
};

// 注册
const formRegRef = ref(null);
const formRegState = reactive({
    userName: "",
    email: "",
    passward: "",
});
const formRegRule = {
    userName: {
        required: true,
        message: "请输入姓名",
        trigger: "blur",
    },
    email: {
        required: true,
        message: "请输入邮箱",
        trigger: "blur",
    },
    passward: {
        required: true,
        message: "请输入密码",
        trigger: "blur",
    },
};
const handleReg = (e) => {
    e.preventDefault();
    formRegRef.value?.validate((errors) => {
        if (!errors) {
            if (
                formRegState.userName &&
                formRegState.passward &&
                formRegState.email
            ) {
                const params = {
                    userName: formRegState.userName,
                    email: formRegState.email,
                    passward: formRegState.passward,
                };

                if (localStorage.getItem("userJwt") != null) {
                    localStorage.removeItem("userJwt");
                }
                userReg(params).then(
                    (res) => {
                        // 读取token并存储localStorage
                        localStorage.setItem("userJwt", res.data.jwt);
                        const responseData = res.data.user;
                        const userData = {
                            userId: responseData.id,
                            userName: responseData.username,
                            userEmail: responseData.email,
                        };
                        userinfoStore.setUserInfo(userData);
                        message.success("注册成功");
                        router.push({ name: "work" });
                    },
                    (error) => {
                        if (error.response.status === 400) {
                            message.error(error.response.data.error.message);
                        }
                    }
                );
            }
        } else {
            console.log(errors);
        }
    });
};
</script>

<style lang="scss" scoped>
@import "styles/common/common";
.login-wrapper {
    background-color: #f3f7fb;
    width: 100%;
    height: 100vh;
}

.login-content {
    .card-tabs .n-tabs-nav--bar-type {
        padding-left: 4px;
    }

    .header {
        height: 65px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;
        background-color: #ffffff;
        .logo {
            height: 34px;
        }
        .n-button {
            padding-left: 16px;
            padding-right: 16px;
        }
    }

    .bottom {
        display: flex;
        justify-content: center;
        padding: 40px;

        height: calc(100vh - 65px);

        .left {
            width: 1200px;
            margin-right: 20px;
            .show {
                width: 1200px;
                height: calc(100vh - 65px - 80px);
                background-color: #daf0e4;
                border-radius: 20px;
                background-color: #bcecc8;
                background-image: radial-gradient(
                        closest-side,
                        rgba(218, 240, 228, 1),
                        rgba(218, 240, 228, 0)
                    ),
                    radial-gradient(
                        closest-side,
                        rgba(194, 236, 194, 1),
                        rgba(194, 236, 194, 0)
                    ),
                    radial-gradient(
                        closest-side,
                        rgba(226, 237, 170, 1),
                        rgba(226, 237, 170, 0)
                    ),
                    radial-gradient(
                        closest-side,
                        rgba(139, 226, 217, 1),
                        rgba(139, 226, 217, 0)
                    ),
                    radial-gradient(
                        closest-side,
                        rgba(251, 237, 150, 1),
                        rgba(251, 237, 150, 0)
                    );
                background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
                    110vmax 110vmax, 90vmax 90vmax;
                background-position: -80vmax -80vmax, 60vmax -30vmax,
                    10vmax 10vmax, -30vmax -10vmax, 50vmax 50vmax;
                background-repeat: no-repeat;
                animation: 10s movement linear infinite;

                @keyframes movement {
                    0%,
                    100% {
                        background-size: 130vmax 130vmax, 80vmax 80vmax,
                            90vmax 90vmax, 110vmax 110vmax, 90vmax 90vmax;
                        background-position: -80vmax -80vmax, 60vmax -30vmax,
                            10vmax 10vmax, -30vmax -10vmax, 50vmax 50vmax;
                    }
                    25% {
                        background-size: 100vmax 100vmax, 90vmax 90vmax,
                            100vmax 100vmax, 90vmax 90vmax, 60vmax 60vmax;
                        background-position: -60vmax -90vmax, 50vmax -40vmax,
                            0vmax -20vmax, -40vmax -20vmax, 40vmax 60vmax;
                    }
                    50% {
                        background-size: 80vmax 80vmax, 110vmax 110vmax,
                            80vmax 80vmax, 60vmax 60vmax, 80vmax 80vmax;
                        background-position: -50vmax -70vmax, 40vmax -30vmax,
                            10vmax 0vmax, 20vmax 10vmax, 30vmax 70vmax;
                    }
                    75% {
                        background-size: 90vmax 90vmax, 90vmax 90vmax,
                            100vmax 100vmax, 90vmax 90vmax, 70vmax 70vmax;
                        background-position: -50vmax -40vmax, 50vmax -30vmax,
                            20vmax 0vmax, -10vmax 10vmax, 40vmax 60vmax;
                    }
                }
            }

            .show {
                display: flex;
                justify-content: center;
                align-items: center;
                .logo {
                    width: 90%;
                    border-radius: 20px;
                    opacity: 0.9;
                    box-shadow: 1px 3px 12px #909399;
                }
            }
        }

        .right {
            width: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .title {
                img {
                    width: 45px;
                    margin-right: 12px;
                    padding-top: 5px;
                }

                width: 360px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: 40px;
                margin-bottom: 40px;

                font: bold 40px "SourceHanSansCN_Bold";
                color: #53a058;
                opacity: 0.8;
            }
            .inlet {
                .n-card {
                    width: 360px;
                    border-radius: 20px;
                    height: calc(100vh - 65px - 60px - 40px - 80px);
                }
            }
        }
    }
}
</style>