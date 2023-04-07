<template>
    <div class="designattr-wrap">
        <div class="designattr-content">
            <div class="nav">
                <div class="item">样式</div>
                <div class="item">内容</div>
                <div class="item">事件</div>
            </div>
            <div class="list">
                <n-form label-placement="left" label-width="auto">
                    <n-form-item
                        v-for="(key, index) in curState.styleKeys"
                        :key="index"
                        :label="styleLabelList[key]"
                    >
                        <n-input-number
                            v-if="key == 'width'||key == 'height'||
							key == 'top'||key == 'left'||key == 'zIndex'||key == 'borderWidth'
							||key == 'opacity'||key == 'borderRadius'||key == 'fontSize'"
                            v-model:value="curState.curStyle[key]"
                            placeholder="请输入数值"
                        />
                        <n-color-picker
                            v-else-if="key == 'backgroundColor'||key == 'borderColor'||key == 'color'"
                            v-model:value="curState.curStyle[key]"
                            :show-alpha="true"
                        />
                        <n-select
                            v-else-if="key === 'borderStyle'"
                            v-model:value="curState.curStyle[key]"
                            placeholder="选择类型"
                            :options="formState.borderStyleSelect"
                        />
                        <n-select
                            v-else-if="key == 'fontStyle'"
                            v-model:value="curState.curStyle[key]"
                            placeholder="选择类型"
                            :options="formState.fontStyleSelect"
                        />
                        <n-select
                            v-else-if="key == 'fontWeight'"
                            v-model:value="curState.curStyle[key]"
                            placeholder="选择类型"
                            :options="formState.fontWeightSelect"
                        />
                        <n-input v-else v-model:value="curState.curStyle[key]" placeholder="请输入数据" />
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

// 表单
const formState = reactive({
    borderStyleSelect: [
        { value: "dotted", label: "点线" },
        { value: "dashed", label: "虚线" },
        { value: "solid", label: "实线" },
        { value: "double", label: "双边" },
        { value: "none", label: "无边" },
    ],
    fontStyleSelect: [
        { value: "normal", label: "正常" },
        { value: "italic", label: "斜体" },
    ],
    fontWeightSelect: [
        { value: "normal", label: "正常" },
        { value: "bold", label: "加粗" },
    ],
});

// pinia
const editingStore = useEditing();

// 接收当前组件style
const curState = reactive({
    curkey: "",
    curStyle: {},
    styleKeys: [],
});
emitter.on("getCurStyle", (data) => {
    curState.curkey = data.key;
    curState.curStyle = data.style;
    curState.styleKeys = Object.keys(data.style);
});

// 深度监听表单数据
watch(
    () => curState.curStyle,
    (curStyle) => {
        editingStore.updateBlockStyle(curState.curkey, curStyle);
        const curData = {
            key: curState.curkey,
            style: curState.curStyle,
        };
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
		.n-form-item{
			margin-bottom: -6px;
		}
    }
}
</style>