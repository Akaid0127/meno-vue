<template>
    <div class="designedit-wrap">
        <div class="designedit-content" :style="containerStyle" ref="containerDom">
            <div v-for="item in blockState.blocksData" :key="item.key">
                <edit-block :block="item"></edit-block>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import useEditing from "@/stores/editing";
import EditBlock from "./EditBlock.vue";

// pinia
const editingStore = useEditing();
const { pageData } = storeToRefs(editingStore);
const containerData = pageData.value.container;
const blockState = reactive({
    blocksData: pageData.value.blocks,
});

// container样式
const containerStyle = {
    width: containerData.width + "px",
    height: containerData.height + "px",
};

// 当前画布ref
const containerDom = ref(null);
let $emit = defineEmits(["getContainerDom"]); // defineEmits需要先声明再使用
const getContainerDom = () => {
    $emit("getContainerDom", containerDom.value);
};

// 挂载
onMounted(() => {
    // mounted之后才能拿到dom节点
    getContainerDom();
});
</script>

<style lang="scss" scoped>
.designedit-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.designedit-content {
    width: 200px;
    height: 200px;
    background-color: antiquewhite;
    position: relative;
}
</style>