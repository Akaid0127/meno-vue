<template>
    <div class="login-wrapper">
        <div class="login-content">
            <div class="header">
                <img class="logo" :src="imgState.logoImgLight" alt="低代码平台" />

                <n-button strong secondary type="primary" @click="handleBack">返回首页</n-button>
            </div>

            <div class="bottom">
                <div class="left">
                    <div class="show"></div>
                </div>

                <div class="right">
                    <div class="title">
                        <n-icon>
                            <Bot />
                        </n-icon>快速 & 简易
                    </div>
                    <div class="inlet">
                        <n-card>
                            <n-tabs
                                class="card-tabs"
                                default-value="signin"
                                size="large"
                                animated
                                justify-content="space-evenly"
                            >
                                <n-tab-pane name="signin" tab="登录">
                                    <n-form
                                        ref="formLogin"
                                        :model="formLoginState"
                                        :rules="formLoginRule"
                                    >
                                        <n-form-item-row label="用户名" path="formLoginState.userName">
                                            <n-input
                                                v-model:value="formLoginState.userName"
                                                placeholder="请输入用户名"
                                            />
                                        </n-form-item-row>
                                        <n-form-item-row label="密码" path="formLoginState.passward">
                                            <n-input
                                                v-model:value="formLoginState.passward"
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
                                <n-tab-pane name="signup" tab="注册">
                                    <n-form
                                        ref="formReg"
                                        :model="formRegState"
                                        :rules="formRegRule"
                                    >
                                        <n-form-item-row label="用户名" path="formRegState.userName">
                                            <n-input
                                                v-model:value="formRegState.userName"
                                                placeholder="请输入用户名"
                                            />
                                        </n-form-item-row>
                                        <n-form-item-row label="邮箱" path="formRegState.email">
                                            <n-input
                                                v-model:value="formRegState.email"
                                                placeholder="请输入邮箱"
                                            />
                                        </n-form-item-row>
                                        <n-form-item-row label="密码" path="formRegState.passward">
                                            <n-input
                                                v-model:value="formRegState.passward"
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
import { Bot } from "@vicons/carbon";
import { userLogin, userReg } from "@/service";

// 定义路由
const router = useRouter();
const route = useRoute();

// logo
const imgState = reactive({
    logoImgLight: require("assets/logo/menocode-row-white.png"),
    logoImgDark: require("assets/logo/menocode-row-black.png"),
    bgImg: require("assets/bg/bg-login1.jpg"),
});

const handleBack = () => {
    router.push({ name: "home" });
};

// 登录
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

const formLogin = ref(null);

const handleLogin = (e) => {
    e.preventDefault();
    formLogin.value?.validate((errors) => {
        if (!errors) {
            console.log(123);
            if (formLoginState.userName && formLoginState.passward) {
                const params = {
                    userName: formLoginState.userName,
                    passward: formLoginState.passward,
                };

                userLogin(params)
                    .then((res) => {
                        // 读取token并存储localStorage
                        localStorage.setItem("userJwt", response.data.jwt);
                    })
                    .catch((error) => {
                        // Handle error.
                        console.log("An error occurred:", error.response);
                    });
            }
        } else {
            console.log(errors);
        }
    });
};

// 注册
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
        message: "请输入姓名",
        trigger: "blur",
    },
    passward: {
        required: true,
        message: "请输入密码",
        trigger: "blur",
    },
};

const formReg = ref(null);

const handleReg = (e) => {
    e.preventDefault();
    formLogin.value?.validate((errors) => {
        if (!errors) {
            if (
                formRegState.userName &&
                formRegState.passward &&
                formRegState.email
            ) {
                const params = {
                    userName: formLoginState.userName,
                    email: formLoginState.email,
                    passward: formLoginState.passward,
                };

                userReg(params)
                    .then((res) => {
                        // 读取token并存储localStorage
                        localStorage.setItem("userJwt", response.data.jwt);
                    })
                    .catch((error) => {
                        // Handle error.
                        console.log("An error occurred:", error.response);
                    });
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

        .left {
            width: 1200px;
            height: 650px;
            margin-right: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            .show {
                width: 1200px;
                height: 650px;
                background-color: #daf0e4;
                border-radius: 20px;
            }
        }

        .right {
            width: 400px;
            height: 650px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            .title {
                .n-icon {
                    font-size: 50px;
                    padding-top: 3px;
                    margin-right: 16px;
                }
                width: 360px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: 40px;
                font: bold 40px "SourceHanSansCN_Bold";
                color: #53a058;
                opacity: 0.8;
            }
            .inlet {
                .n-card {
                    width: 360px;
                    border-radius: 20px;
                    height: 540px;
                }
            }
        }
    }
    .inlet {
    }
}
</style>