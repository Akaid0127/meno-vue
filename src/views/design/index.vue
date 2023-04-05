<template>
    <div class="design-wrap">
        <div class="design-cotent">
            <n-layout>
                <!-- 顶部工具栏 -->
                <div class="top">
					<design-header/>
				</div>

                <div class="bottom">
                    <!-- 左侧组件栏 -->
                    <div class="left">
                        <design-supply ref="supplyRef" />
                        <design-level />
                    </div>

                    <!-- 中间画布区 -->
                    <div class="center">
                        <design-edit @getContainerDom="handleContainerDom" />
                    </div>

                    <!-- 右侧属性区 -->
                    <div class="right">
                        <design-attr />
                    </div>
                </div>
            </n-layout>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import DesignHeader from "./components/DesignHeader.vue";
import DesignSupply from "./components/DesignSupply.vue";
import DesignLevel from "./components/DesignLevel.vue";
import DesignEdit from "./components/DesignEdit.vue";
import DesignAttr from "./components/DesignAttr.vue";

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
        height: 50px;
        width: 100%;
        border-bottom: 1px solid #d4d7de;
    }

    .bottom {
        display: flex;
        flex-direction: row;
        .left {
            width: 280px;
            height: 865px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .center {
            width: 100%;
            height: 865px;
            border-left: 1px solid #d4d7de;
            border-right: 1px solid #d4d7de;
        }
        .right {
            width: 290px;
            height: 865px;
        }
    }
}
</style>