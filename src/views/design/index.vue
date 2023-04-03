<template>
    <div class="design-wrap">
        <div class="design-cotent">
            <n-layout>
                <!-- 顶部工具栏 -->
                <div class="top">顶部工具栏</div>

                <div class="bottom">
                    <!-- 左侧组件栏 -->
                    <div class="left">
                        <DesignSupply ref="supplyRef" />
                        <DesignLevel />
                    </div>

                    <!-- 中间画布区 -->
                    <div class="center">
                        <DesignEdit @getContainerDom="handleContainerDom" />
                    </div>

                    <!-- 右侧属性区 -->
                    <div class="right">右侧属性区</div>
                </div>
            </n-layout>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import DesignSupply from "./components/DesignSupply.vue";
import DesignLevel from "./components/DesignLevel.vue";
import DesignEdit from "./components/DesignEdit.vue";

// 获取containerdom并传递给左侧物料区
const supplyRef = ref();
const handleContainerDom = (containerDom) => {
    supplyRef.value.hasContainerDom(containerDom);
};
</script>

<style lang="scss" scoped>
.design-wrap {
    height: 100vh;
}

.design-cotent {
    height: 900px;
    width: 100%;
    .top {
        height: 60px;
        width: 100%;
        border-bottom: 1px solid #D4D7DE;
    }

    .bottom {
        display: flex;
        flex-direction: row;
        .left {
            width: 280px;
            height: 868px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .center {
            border-left: 1px solid #D4D7DE;
            border-right: 1px solid #D4D7DE;
            width: 100%;
            height: 868px;
        }
        .right {
            width: 290px;
            height: 868px;
        }
    }
}
</style>