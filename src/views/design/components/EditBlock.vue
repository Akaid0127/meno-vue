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
        ></component>
    </edit-shape>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import emitter from "@/mitt/event";
import useEditing from "@/stores/editing";
import useSnapshot from "@/stores/snapshot";
import EditShape from "./EditShape.vue";

// pinia
const editingStore = useEditing(); // 组件状态
const snapshotStore = useSnapshot(); // 快照状态

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
        backgroundColor: props.block.style.backgroundColor,
        borderStyle: props.block.style.borderStyle,
        borderWidth: props.block.style.borderWidth + "px",
        borderColor: props.block.style.borderColor,
        opacity: props.block.style.opacity,
        borderRadius: props.block.style.borderRadius + "px",
        color: props.block.style.color,
        fontStyle: props.block.style.fontStyle,
        fontWeight: props.block.style.fontWeight,
        fontSize: props.block.style.fontSize + "px",
		boxSizing:"content-box"
    }, 
});

// 组件选中画布中拖拽
const handleMousedown = (event) => {
    // 阻止默认事件
    event.preventDefault();
    event.stopPropagation();

    let snapshotFlag = false;

    const posItem = { ...blockState };
    const startTop = Number(posItem.style.top.slice(0, -2));
    const startLeft = Number(posItem.style.left.slice(0, -2));
    const startY = event.clientY;
    const startX = event.clientX;

    const move = (moveEvent) => {
        // 开启快照
        snapshotFlag = true;
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
        // 添加快照
        if (snapshotFlag === true) {
            snapshotStore.addSnapshot([...editingStore.pageData.blocks]);
        }
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
};

// 组件修改属性样式绑定
emitter.on("setCurStyle", (data) => {
    if (blockState.key === data.key) {
        blockState.style.width = data.style.width + "px";
        blockState.style.height = data.style.height + "px";
        blockState.style.top = data.style.top + "px";
        blockState.style.left = data.style.left + "px";
        blockState.style.zIndex = data.style.zIndex;
        blockState.style.backgroundColor = data.style.backgroundColor;
        blockState.style.borderStyle = data.style.borderStyle;
        blockState.style.borderWidth = data.style.borderWidth + "px",
        blockState.style.borderColor = data.style.borderColor;
        blockState.style.opacity = data.style.opacity;
        blockState.style.borderRadius = data.style.borderRadius + "px",
        blockState.style.color = data.style.color;
        blockState.style.fontStyle = data.style.fontStyle;
        blockState.style.fontWeight = data.style.fontWeight;
        blockState.style.fontSize = data.style.fontSize + "px"
    }
}); // 组件属性-->画布

emitter.on("setOperateStyle", (data) => {
    data.forEach((item) => {
        if (blockState.key === item.key) {
            blockState.style.width = item.style.width + "px";
            blockState.style.height = item.style.height + "px";
            blockState.style.top = item.style.top + "px";
            blockState.style.left = item.style.left + "px";
            blockState.style.zIndex = item.style.zIndex;
        }
    });
}); // 组件操作-->画布

// shape定型
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