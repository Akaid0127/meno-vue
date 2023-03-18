<template>
    <div class="design-wrap">
        <div class="design-cotent">
            <n-layout>
                <!-- 顶部工具栏 -->
                <div class="top">顶部工具栏</div>

                <div class="bottom">
                    <!-- 左侧组件栏 -->
                    <div class="left">
                        <!-- 组件列表 -->
                    </div>

                    <!-- 中间画布区 -->
                    <div class="center">中间画布区</div>

                    <!-- 右侧属性区 -->
                    <div class="right">右侧属性区</div>
                </div>
            </n-layout>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.design-wrap {
    height: 100vh;
    border: 1px solid red;
}

.design-cotent {
    height: 900px;
    width: 100%;
    .top {
        height: 60px;
        width: 100%;
        border: 1px solid red;
    }

    .bottom {
        display: flex;
        flex-direction: row;
        .left {
            width: 280px;
            height: 868px;
            border: 1px solid red;
        }
        .center {
            width: 100%;
            height: 868px;
            border: 1px solid red;
        }
        .right {
            width: 290px;
            height: 868px;
            border: 1px solid red;
        }
    }
}
</style>