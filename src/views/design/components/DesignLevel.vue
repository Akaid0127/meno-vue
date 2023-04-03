<template>
    <div class="designlevel-wrap">
        <div class="designlevel-content">
            <div class="title">组件数：{{ blocksState.blocks.length }}</div>
            <div class="list">
                <div
                    :class="curState.curKey===item.key?'item-focus':'item'"
                    v-for="item in blocksState.blocks"
                    :key="item.key"
                    @click="() => {handleClickBlock(item.key)}"
                >{{ item.propValue }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import useEditing from "@/stores/editing";
import emitter from "@/mitt/event";

// pinia
const editingStore = useEditing();

// 渲染组件列表
const blocksState = {
    blocks: editingStore.pageData.blocks,
};

// 列表绑定画布组件focus状态
const curState = reactive({
    curKey: "",
});
emitter.on("getCurBlock", (data) => {
    curState.curKey = data;
});

// 点击列表绑定画布组件focus状态
const handleClickBlock = (key) => {
    emitter.emit("setCurBlock", key);
};

// 点击列表组件实现画布组件focus
</script>

<style lang="scss" scoped>
.designlevel-wrap {
    border-top: 1px solid #d4d7de;
    width: 100%;
    height: 340px;
    padding-top: 10px;
}

.designlevel-content {
    .title {
        color: #909399;
        padding-left: 10px;
        margin-bottom: 4px;
    }
    .list {
        padding-top: 6px;
        height: 290px;
        overflow: scroll;
        .item {
            width: 100%;
            color: #606266;
            line-height: 32px;
            padding-left: 16px;
            margin-bottom: 4px;
            &:hover {
                background-color: #ebedf0;
            }
        }

        .item-focus {
            width: 100%;
            color: #606266;
            line-height: 32px;
            padding-left: 16px;
            margin-bottom: 4px;
            background-color: #ebedf0;
        }
    }
}
</style>