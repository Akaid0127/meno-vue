<template>
    <div class="designattr-wrap">
        <div class="designattr-content">
            <div class="nav">
                <div class="item">属性</div>
                <div class="item">事件</div>
                <div class="item">动画</div>
            </div>
            <div class="list">
                <n-form label-placement="left" label-width="auto">
                    <n-form-item
                        v-for="(key, index) in curState.styleKeys"
                        :key="index"
                        :label="styleLabelList[key]"
                    >
                        <n-input-number v-model:value="curState.curStyle[key]" placeholder="请输入数值" />
                    </n-form-item>
                </n-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import emitter from "@/mitt/event";
import styleLabelList from "@/components-unit/styleList";
import useEditing from "@/stores/editing";

// pinia
const editingStore = useEditing();

// 接收当前组件style
const curState = reactive({
    curkey: "",
    curStyle: {},
    styleKeys: [],
});
emitter.on("getCurStyle", (data) => {
	curState.curkey = data.key
    curState.curStyle = data.style;
    curState.styleKeys = Object.keys(data.style);
});

// 深度监听表单数据
watch(
    () => curState.curStyle,
    (curStyle) => {
		editingStore.updateBlockStyle(curState.curkey,curStyle)
		const curData = {
			key:curState.curkey,
			style:curState.curStyle
		}
		emitter.emit("setCurStyle", curData); // 设置焦点组件属性
    },
    {
        deep: true,
    }
);
</script>

<style lang="scss" scoped>
.designattr-wrap {
    width: 100%;
    height: 100%;
}

.designattr-content {
    .nav {
        display: flex;
        justify-content: space-around;
        padding: 8px 10px;
        border-bottom: 1px solid #d4d7de;
    }
    .list {
        padding: 10px;
    }
}
</style>