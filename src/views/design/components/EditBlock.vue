<template>
    <component
        class="block"
        :style="blockStyle"
        :is="props.block.component"
        :propValue="props.block.propValue"
        @mousedown="$event => handleMousedown($event)"
    >组件</component>
</template>

<script setup>
import { reactive } from "vue";
import useEditing from "@/stores/editing";
// pinia
const editingStore = useEditing();
// get props
const props = defineProps(["block"]);
// block style
let blockStyle = reactive({
    top: props.block.style.top + "px",
    left: props.block.style.left + "px",
    zIndex: props.block.style.zIndex,
});
// 组件选中画布中拖拽
const handleMousedown = (event) => {
    // 阻止默认事件
    event.preventDefault();
    event.stopPropagation();

    const posItem = { ...props.block };
    const startTop = Number(posItem.style.top);
    const startLeft = Number(posItem.style.left);
    const startY = event.clientY;
    const startX = event.clientX;

    const move = (moveEvent) => {
        const currX = moveEvent.clientX;
        const currY = moveEvent.clientY;
        posItem.style.top = currY - startY + startTop;
        posItem.style.left = currX - startX + startLeft;
        // 修改当前组件样式
        editingStore.updateBlock(
            posItem.key,
            posItem.style.top,
            posItem.style.left
        );
        blockStyle.top = posItem.style.top + "px";
        blockStyle.left = posItem.style.left + "px";
    };

    const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
};


</script>

<style lang="scss" scoped>
.block {
    position: absolute;
    cursor: pointer;
    user-select: none;
}



</style>