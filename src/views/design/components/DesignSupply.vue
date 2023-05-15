<template>
    <div class="designsupply-wrap">
        <div class="designsupply-content">
            <div
                class="component-item"
                v-for="item in tagState.tagList"
                :key="item.id"
                draggable="true"
                @dragstart="($event) => handleDragstart($event, item)"
                @dragend="($event) => handleDragend($event)"
            >
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { nanoid } from 'nanoid'
import useEditing from '@/stores/editing'
import useSnapshot from '@/stores/snapshot'
import componentList from '@/components-unit/componentList'

// pinia
const editingStore = useEditing() // 组件状态
const snapshotStore = useSnapshot() // 快照状态

// tag和component状态
const tagState = reactive({ tagList: componentList })
const componentState = reactive({ currentComponent: null })

// 拿到画布DOM节点
const domState = reactive({ containerDom: null })
const hasContainerDom = (dom) => {
    domState.containerDom = dom
}
defineExpose({ hasContainerDom })

// 实现物料区组件拖拽
const handleDragstart = (event, item) => {
    componentState.currentComponent = item
    domState.containerDom.addEventListener('dragenter', dragenter)
    domState.containerDom.addEventListener('dragover', dragover)
    domState.containerDom.addEventListener('dragleave', dragleave)
    domState.containerDom.addEventListener('drop', drop)
}
const handleDragend = (event) => {
    domState.containerDom.removeEventListener('dragenter', dragenter)
    domState.containerDom.removeEventListener('dragover', dragover)
    domState.containerDom.removeEventListener('dragleave', dragleave)
    domState.containerDom.removeEventListener('drop', drop)
}
const dragenter = (event) => {
    event.dataTransfer.dropEffect = 'move'
}
const dragover = (event) => {
    event.preventDefault()
}
const dragleave = (event) => {
    event.dataTransfer.dropEffect = 'none'
}
const drop = (event) => {
    // 拖拽结束 添加组件
    // 添加组件要进行判断，每个组件的属性不一样需要添加不同组件的style

    const tempComponent = {
        component: componentState.currentComponent.component,
        // 传入内容
        propValue: componentState.currentComponent.label,
        key: nanoid(),
        focus: false,
        style: {
            width: Number(componentState.currentComponent.style.width),
            height: Number(componentState.currentComponent.style.height),
            top: Number(
                event.offsetY - componentState.currentComponent.style.height / 2
            ),
            left: Number(
                event.offsetX - componentState.currentComponent.style.width / 2
            ),
            zIndex: Number(componentState.currentComponent.style.zIndex),
        },
        styleDefault: {
            ...componentState.currentComponent.styleDefault,
        },
    }

    if (tempComponent.component === 'm-text') {
        tempComponent.style = {
            ...tempComponent.style,
            backgroundColor:
                componentState.currentComponent.style.backgroundColor,
            borderStyle: componentState.currentComponent.style.borderStyle,
            borderWidth: Number(
                componentState.currentComponent.style.borderWidth
            ),
            borderColor: componentState.currentComponent.style.borderColor,
            opacity: Number(componentState.currentComponent.style.opacity),
            borderRadius: Number(
                componentState.currentComponent.style.borderRadius
            ),
            color: componentState.currentComponent.style.color,
            fontStyle: componentState.currentComponent.style.fontStyle,
            fontWeight: componentState.currentComponent.style.fontWeight,
            fontSize: Number(componentState.currentComponent.style.fontSize),
        }
    } else if (tempComponent.component === 'm-button') {
        tempComponent.style = {
            ...tempComponent.style,
            backgroundColor:
                componentState.currentComponent.style.backgroundColor,
            borderStyle: componentState.currentComponent.style.borderStyle,
            borderWidth: Number(
                componentState.currentComponent.style.borderWidth
            ),
            borderColor: componentState.currentComponent.style.borderColor,
            opacity: Number(componentState.currentComponent.style.opacity),
            borderRadius: Number(
                componentState.currentComponent.style.borderRadius
            ),
            color: componentState.currentComponent.style.color,
            fontSize: Number(componentState.currentComponent.style.fontSize),
        }
    } else if (tempComponent.component === 'm-input') {
        tempComponent.style = {
            ...tempComponent.style,
            backgroundColor:
                componentState.currentComponent.style.backgroundColor,
            borderStyle: componentState.currentComponent.style.borderStyle,
            borderWidth: Number(
                componentState.currentComponent.style.borderWidth
            ),
            borderColor: componentState.currentComponent.style.borderColor,
            opacity: Number(componentState.currentComponent.style.opacity),
            borderRadius: Number(
                componentState.currentComponent.style.borderRadius
            ),
            fontSize: Number(componentState.currentComponent.style.fontSize),
        }
    } else if (tempComponent.component === 'm-rectangle') {
        tempComponent.style = {
            ...tempComponent.style,
            backgroundColor:
                componentState.currentComponent.style.backgroundColor,
            borderStyle: componentState.currentComponent.style.borderStyle,
            borderWidth: Number(
                componentState.currentComponent.style.borderWidth
            ),
            borderColor: componentState.currentComponent.style.borderColor,
            opacity: Number(componentState.currentComponent.style.opacity),
            borderRadius: Number(
                componentState.currentComponent.style.borderRadius
            ),
        }
    } else if (tempComponent.component === 'm-circular') {
        tempComponent.style = {
            ...tempComponent.style,
            backgroundColor:
                componentState.currentComponent.style.backgroundColor,
            borderStyle: componentState.currentComponent.style.borderStyle,
            borderWidth: Number(
                componentState.currentComponent.style.borderWidth
            ),
            borderColor: componentState.currentComponent.style.borderColor,
            opacity: Number(componentState.currentComponent.style.opacity),
        }
    } else if (tempComponent.component === 'm-image') {
        tempComponent.style = {
            ...tempComponent.style,
            borderStyle: componentState.currentComponent.style.borderStyle,
            borderWidth: Number(
                componentState.currentComponent.style.borderWidth
            ),
            borderColor: componentState.currentComponent.style.borderColor,
            opacity: Number(componentState.currentComponent.style.opacity),
        }
    } else if (tempComponent.component === 'm-icon') {
        tempComponent.propIndex = 11
        tempComponent.style = {
            ...tempComponent.style,
            backgroundColor:
                componentState.currentComponent.style.backgroundColor,
            opacity: Number(componentState.currentComponent.style.opacity),
            color: componentState.currentComponent.style.color,
            borderRadius: Number(
                componentState.currentComponent.style.borderRadius
            ),
        }
    }

    editingStore.addBlock(tempComponent)
    // 添加快照
    snapshotStore.addSnapshot([...editingStore.pageData.blocks]) // 存储的快照不能是响应式的，需要深拷贝
}
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