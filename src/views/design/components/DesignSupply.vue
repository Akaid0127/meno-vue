<template>
    <div class="designsupply-wrap">
        <div class="designsupply-content">
            <div
                class="component-item"
                v-for="item in tagState.tagList"
                :key="item.id"
                draggable="true"
                @dragstart="($event) => handleDragstart($event,item)"
                @dragend="($event) =>handleDragend($event)"
            >{{ item.label }}</div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { nanoid } from "nanoid";
import useEditing from "@/stores/editing";
import componentList from "@/components-unit/componentList";

// pinia editingStore
const editingStore = useEditing();

// tag和component状态
const tagState = reactive({ tagList: componentList });
const componentState = reactive({ currentComponent: null });
 
// 拿到画布DOM节点
const domState = reactive({ containerDom: null });
const hasContainerDom = (dom) => {
    domState.containerDom = dom;
};
defineExpose({ hasContainerDom });


/* 
	实现物料区组件拖拽功能
*/
// 拖拽开始
const handleDragstart = (event, item) => {
    componentState.currentComponent = item;
    domState.containerDom.addEventListener("dragenter", dragenter);
    domState.containerDom.addEventListener("dragover", dragover);
    domState.containerDom.addEventListener("dragleave", dragleave);
    domState.containerDom.addEventListener("drop", drop);
};
// 拖拽结束
const handleDragend = (event) => {
    domState.containerDom.removeEventListener("dragenter", dragenter);
    domState.containerDom.removeEventListener("dragover", dragover);
    domState.containerDom.removeEventListener("dragleave", dragleave);
    domState.containerDom.removeEventListener("drop", drop);
};
// 拖拽API 
const dragenter = (event) => {
    event.dataTransfer.dropEffect = "move";
};
const dragover = (event) => {
    event.preventDefault();
};
const dragleave = (event) => {
    event.dataTransfer.dropEffect = "none";
};
const drop = (event) => {
    const tempComponent = {
        component: componentState.currentComponent.component,
        propValue: componentState.currentComponent.label,
        key: nanoid(),
        style: {
            top: event.offsetY - componentState.currentComponent.height / 2,
            left: event.offsetX - componentState.currentComponent.width / 2,
            zIndex: 1,
        },
    };
    editingStore.addBlock(tempComponent);
};

</script>

<style lang="scss" scoped>
.designsupply-content {
    height: 300px;
    widows: 200px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    // justify-content: center;
    padding: 10px;
    .component-item {
        width: 80px;
        height: 40px;
        margin-bottom: 10px;
        margin-right: 10px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
    }
}
</style>