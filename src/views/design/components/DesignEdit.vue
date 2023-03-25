<template>
    <div class="designedit-wrap">
        <div class="designedit-content" :style="containerStyle" ref="containerDom">
            <div v-for="item in blockState.blocksData" :key="item.key">
                <edit-block :block="item" @contextmenu="$event=>onContextMenu($event,item)"></edit-block>
            </div>

            <context-menu
                :show="contextState.show"
                @close="closeContextMenu"
                :options="contextState.optionsComponent"
            >
                <context-menu-item label="删除组件" @click="delComponent">
                    <template #icon>
                        <n-icon>
                            <Delete />
                        </n-icon>
                    </template>
                </context-menu-item>
                <context-menu-sperator />
                <context-menu-item label="上移组件" @click="upComponent">
                    <template #icon>
                        <n-icon>
                            <ChevronUp />
                        </n-icon>
                    </template>
                </context-menu-item>
                <context-menu-item label="下移组件" @click="downComponent">
                    <template #icon>
                        <n-icon>
                            <ChevronDown />
                        </n-icon>
                    </template>
                </context-menu-item>
            </context-menu>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import { ContextMenu } from "@imengyu/vue3-context-menu";
import { Delete, ChevronUp, ChevronDown } from "@vicons/carbon";
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

// 需要拿到当前操作组件的key
const componentState = reactive({
    currentComponentKey: "",
});

// 右键菜单
const contextState = reactive({
    show: false,
    //For component
    optionsComponent: {
        zIndex: 99,
        minWidth: 100,
        x: 500,
        y: 100,
    },
});

const onContextMenu = (e, componentItem) => {
    e.preventDefault();
    //显示组件菜单
    contextState.optionsComponent.x = e.x;
    contextState.optionsComponent.y = e.y;
    componentState.currentComponentKey = componentItem.key;
    contextState.show = true;
};
const closeContextMenu = () => {
    contextState.show = false;
};
const delComponent = () => {
	editingStore.delBlock(componentState.currentComponentKey)
    contextState.show = false;
};
const upComponent = () => {
    // 上移组件 todo
    contextState.show = false;
};
const downComponent = () => {
    // 下移组件 todo
    contextState.show = false;
};
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
    background-color: #f9f5eb;
    position: relative;
}
</style>