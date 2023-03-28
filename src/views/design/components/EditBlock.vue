<template>
    <edit-shape
        :defaultStyle="blockState.style"
        @blockStyle="setBlockStyle"
        :curComponent="blockState"
        :curActive="props.blockFocus"
    >
        <component
            class="block"
            :is="blockState.component"
            :propValue="blockState.propValue"
            :propStyle="blockState.style"
            @mousedown="$event => handleMousedown($event)"
        >组件</component>
    </edit-shape>
</template>

<script setup>
import { reactive } from "vue";
import useEditing from "@/stores/editing";
import EditShape from "./EditShape.vue";

// pinia
const editingStore = useEditing();
// get props
const props = defineProps(["block", "blockFocus"]);

// blockState
let blockState = reactive({
    component: props.block.component,
    propValue: props.block.propValue,
    key: props.block.key,
    style: {
        width: props.block.style.width + "px",
        height: props.block.style.height + "px",
        top: props.block.style.top + "px",
        left: props.block.style.left + "px",
        zIndex: props.block.style.zIndex,
    },
});

// 组件选中画布中拖拽
const handleMousedown = (event) => {
    // 阻止默认事件
    event.preventDefault();
    event.stopPropagation();

    const posItem = { ...blockState };
    const startTop = Number(posItem.style.top.slice(0, -2));
    const startLeft = Number(posItem.style.left.slice(0, -2));
    const startY = event.clientY;
    const startX = event.clientX;

    const move = (moveEvent) => {
        const currX = moveEvent.clientX;
        const currY = moveEvent.clientY;
        posItem.style.top = currY - startY + startTop;
        posItem.style.left = currX - startX + startLeft;
        // 修改组件
        editingStore.updateBlockPos(
            posItem.key,
            posItem.style.top,
            posItem.style.left
        );
        // 修改样式
        blockState.style.top = posItem.style.top + "px";
        blockState.style.left = posItem.style.left + "px";
    };

    const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
};

const setBlockStyle = (data) => {
    blockState.style.width = data.width;
    blockState.style.height = data.height;
    blockState.style.top = data.top;
    blockState.style.left = data.left;
};
</script>
<style lang="scss" scoped>
.block {
    position: absolute;
    // cursor: pointer;
    user-select: none;
}
</style>