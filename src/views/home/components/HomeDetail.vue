<!-- 首页详情 -->
<template>
    <div class="homedetail-wrap">
        <div class="homedetail-content">
            <div class="title">简易上手，绘制代码</div>
            <div class="summary">
                <p>可云端编辑的页面低代码设计工具，为前端工程师量身打造</p>
                <p>Windows 也能用的「协作版 LCDP」</p>
            </div>

            <n-input
                placeholder="输入邮箱注册"
                v-model:value="regState.regMail"
            >
                <template #prefix>
                    <n-icon :component="MailAll" />
                </template>

                <template #suffix>
                    <n-button strong secondary type="primary" @click="handleReg"
                        >免费注册</n-button
                    >
                </template>
            </n-input>

            <div class="point">
                <n-card embedded :bordered="false">
                    <n-button class="sectitle" strong secondary type="primary">
                        设计
                        <n-icon>
                            <AirlineManageGates />
                        </n-icon>
                    </n-button>
                    <div class="subtitle">所见即是所得</div>
                    <div class="content">
                        快速构建用户界面，它允许用户使用可视化工具，来创建和编辑页面。
                    </div>
                </n-card>

                <n-card embedded :bordered="false">
                    <n-button class="sectitle" strong secondary type="primary">
                        团队
                        <n-icon>
                            <Group />
                        </n-icon>
                    </n-button>

                    <div class="subtitle">多人协作开发</div>
                    <div class="content">
                        用户可创建团队项目，邀请协作成员进行团队项目开发，管理项目日常协作。
                    </div>
                </n-card>

                <n-card embedded :bordered="false">
                    <n-button class="sectitle" strong secondary type="primary">
                        共享
                        <n-icon>
                            <ShareKnowledge />
                        </n-icon>
                    </n-button>

                    <div class="subtitle">社区不断繁荣</div>
                    <div class="content">
                        平台社区资源共享，快速进行二次开发迭代，减少项目页面绘制时间。
                    </div>
                </n-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
    MailAll,
    AirlineManageGates,
    Group,
    ShareKnowledge,
} from '@vicons/carbon'
import es from 'naive-ui'
import { useMessage } from 'naive-ui'

// 定义路由
const router = useRouter()
const route = useRoute()

// naive message
const message = useMessage()

const regState = reactive({
    regMail: '',
})

const handleReg = () => {
    // 邮箱验证正确后跳转
    if (checkMail(regState.regMail)) {
        router.push({
            name: 'login',
            query: { regMail: regState.regMail, type: 'toReg' },
        })
    } else {
        message.warning('邮箱号码格式有误，请重新填写')
    }
    s
}

// 邮箱验证
const checkMail = (mailValue) => {
    var regMail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9])+/
    if (!regMail.test(mailValue)) {
        return false
    } else {
        return true
    }
}
</script>

<style lang="scss" scoped>
.homedetail-wrap {
    background-color: #f3f7fb;
    width: 100%;
    padding: 20px 20px;
    display: flex;
    justify-content: center;
}
// 调整渐变背景
.homedetail-content {
    width: 1880px;
    height: calc(100vh - 40px - 65px);
    border-radius: 25px;
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
    background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
        -30vmax -10vmax, 50vmax 50vmax;
    background-repeat: no-repeat;
    animation: 10s movement linear infinite;

    @keyframes movement {
        0%,
        100% {
            background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
                110vmax 110vmax, 90vmax 90vmax;
            background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
                -30vmax -10vmax, 50vmax 50vmax;
        }
        25% {
            background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax,
                90vmax 90vmax, 60vmax 60vmax;
            background-position: -60vmax -90vmax, 50vmax -40vmax, 0vmax -20vmax,
                -40vmax -20vmax, 40vmax 60vmax;
        }
        50% {
            background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax,
                60vmax 60vmax, 80vmax 80vmax;
            background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax,
                20vmax 10vmax, 30vmax 70vmax;
        }
        75% {
            background-size: 90vmax 90vmax, 90vmax 90vmax, 100vmax 100vmax,
                90vmax 90vmax, 70vmax 70vmax;
            background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax,
                -10vmax 10vmax, 40vmax 60vmax;
        }
    }

    .homedetail-content ::after {
        content: '';
        display: block;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
}

// 调整内容
.homedetail-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
        font: bold 4rem/4.64rem 'SourceHanSansCN_Bold';
        margin-bottom: 30px;
    }

    .summary {
        font: 400 1rem/1.5rem 'PingFang SC', 'Microsoft YaHei',
            'Microsoft JhengHei', '黑体', arial, 'STHeiti', '宋体';
        font-size: 20px;
        color: #243042;
        opacity: 0.8;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 60px;
        p {
            line-height: 28px;
        }
    }

    .n-input {
        width: 500px;
        height: 65px;
        border-radius: 16px;
        line-height: 65px;
        font-size: 18px;

        .n-icon {
            width: 20px;
            font-size: 26px;
            margin-right: 10px;
        }
        .n-button {
            width: 200px;
            height: 50px;
            border-radius: 12px;
            margin-right: -5px;
        }
        margin-bottom: 100px;
    }

    .point {
        width: 1300px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .n-card {
            width: 360px;
            height: 240px;
            display: flex;
            border-radius: 20px;
            background-color: rgba($color: #daf0e4, $alpha: 40%);
            box-shadow: rgba(24, 160, 88, 0.1) 0px 4px 12px;
            .sectitle {
                height: 40px;
                width: 100px;
                background-color: #fff;
                border-radius: 10px;
                display: flex;
                align-items: center;
                font: bold 24px 'SourceHanSansCN_Bold';
                margin-bottom: 16px;
                .n-icon {
                    font-size: 26px;
                    display: inline-block;
                    padding-top: 1px;
                    margin-left: 4px;
                }
            }
            .subtitle {
                font: bold 25px 'SourceHanSansCN_Bold';
                color: #18a058;
                opacity: 0.7;
                margin-bottom: 14px;
            }
            .content {
                font: 400 22px 'PingFang SC', 'Microsoft YaHei',
                    'Microsoft JhengHei', '黑体', arial, 'STHeiti', '宋体';
                opacity: 0.7;
            }
        }
    }
}
</style>