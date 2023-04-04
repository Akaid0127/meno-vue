<template>
    <!-- 八点 -->
    <div>
        <div
            :class="props.curActive?'edit-shape-line':'edit-shape'"
            :style="props.defaultStyle"
            @mousedown="handleMouseDown"
        >
            <div
                class="shape-point"
                v-for="(item, index) in pointList"
                :key="index"
                v-show="props.curActive"
                @mousedown="handleMouseDownOnPoint(item)"
                :style="getPointStyle(item)"
            ></div>
            <!-- 插槽接收component -->
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import useEditing from "@/stores/editing";
// props emit
const props = defineProps(["curComponent", "defaultStyle", "curActive"]);
const emit = defineEmits(['blockStyle'])

// pinia
const editingStore = useEditing();

// 圆点位置鼠标落下
const handleMouseDownOnPoint = (point) => {
    const downEvent = window.event;
    downEvent.stopPropagation();
    downEvent.preventDefault();
    const pos = { ...props.defaultStyle };

    const height = Number(pos.height.slice(0, -2));
    const width = Number(pos.width.slice(0, -2));
    const top = Number(pos.top.slice(0, -2));
    const left = Number(pos.left.slice(0, -2));
    const startX = downEvent.clientX;
    const startY = downEvent.clientY;

    const move = (moveEvent) => {
        const currX = moveEvent.clientX;
        const currY = moveEvent.clientY;
        const disY = currY - startY;
        const disX = currX - startX;
        const hasT = /t/.test(point);
        const hasB = /b/.test(point);
        const hasL = /l/.test(point);
        const hasR = /r/.test(point);
        const newHeight = height + (hasT ? -disY : hasB ? disY : 0);
        const newWidth = width + (hasL ? -disX : hasR ? disX : 0);

        pos.height = (newHeight > 0 ? newHeight : 0) + "px";
        pos.width = (newWidth > 0 ? newWidth : 0) + "px";
        pos.left = left + (hasL ? disX : 0) + "px";
        pos.top = top + (hasT ? disY : 0) + "px";

		// 修改组件 *注意这里修改pinia中数据的时候一定要去掉单位*
        editingStore.updateBlockSize(
            props.curComponent.key,
			Number(pos.top.slice(0, -2)),
			Number(pos.left.slice(0, -2)),
			Number(pos.width.slice(0, -2)),
			Number(pos.height.slice(0, -2))
        );
        // 修改样式
		emit("blockStyle", pos);
    };

    const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
};

// 获取点样式
const pointList = ["t", "r", "b", "l", "lt", "rt", "lb", "rb"];
const cursorList = ["n", "e", "s", "w", "nw", "ne", "sw", "se"];
const getPointStyle = (point) => {
    // 获取组件宽高
    const width = props.curComponent.style.width.slice(0, -2);
    const height = props.curComponent.style.height.slice(0, -2);

    const curCursor = cursorList[pointList.indexOf(point)];

    const hasT = /t/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);
    const hasR = /r/.test(point);

    let newLeft = 0;
    let newTop = 0;

    // 四个角的点
    if (point.length === 2) {
        newLeft = hasL ? 0 : width;
        newTop = hasT ? 0 : height;
    } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
            newLeft = width / 2;
            newTop = hasT ? 0 : height;
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
            newLeft = hasL ? 0 : width;
            newTop = Math.floor(height / 2);
        }
    }

    const style = {
        marginLeft: hasR ? "-4px" : "-3px",
        marginTop: "-3px",
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: curCursor + "-resize",
    };

    return style;
};
</script>

<style lang="scss" scoped>
.edit-shape {
    position: absolute;
    outline: 1px solid transparent;
}

.edit-shape-line {
    position: absolute;
    outline: 1px solid #18a058;
    .shape-point {
        position: absolute;
        background: #fff;
        border: 1px solid #18a058;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        z-index: 99;
    }
}
</style>