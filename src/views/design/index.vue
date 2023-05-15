<template>
    <div class="design-wrap">
        <div class="design-cotent">
            <n-layout>
                <!-- 顶部工具栏 -->
                <div class="top">
                    <design-header
                        :fileInfo="{
                            userName: infoState.userName,
                            foldName: infoState.foldName,
                            fileName: infoState.fileName,
                        }"
                    />
                </div>

                <div class="bottom">
                    <!-- 左侧组件栏 -->
                    <div class="left">
                        <design-supply ref="supplyRef" />
                        <design-level />
                    </div>

                    <!-- 中间画布区 -->
                    <div class="center">
                        <design-edit @getContainerDom="handleContainerDom" />
                    </div>

                    <!-- 右侧属性区 -->
                    <div class="right">
                        <design-attr />
                    </div>
                </div>
            </n-layout>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getFile } from '@/service'
import useEditing from '@/stores/editing'
import useSnapshot from '@/stores/snapshot'
import DesignHeader from './components/DesignHeader.vue'
import DesignSupply from './components/DesignSupply.vue'
import DesignLevel from './components/DesignLevel.vue'
import DesignEdit from './components/DesignEdit.vue'
import DesignAttr from './components/DesignAttr.vue'

// 定义路由
const router = useRouter()
const route = useRoute()

// pinia
const editingStore = useEditing() // 组件状态
const snapshotStore = useSnapshot() // 快照状态

const infoState = reactive({
    userName: '',
    foldName: '',
    fileName: '',
    fileContent: '',
})

const initData = () => {
    getFile({ id: route.query.fileId }).then(
        (response) => {
            const resFile = response.data.data.attributes
            infoState.userName = resFile.user.data.attributes.username
            infoState.foldName = resFile.fold.data.attributes.fold_name
            infoState.fileName = resFile.cre_name
            infoState.fileContent = resFile.json_content
            snapshotStore.resetSnapshot(resFile.json_content)
            if (infoState.fileContent !== null) {
                editingStore.resetBlocks(infoState.fileContent)
            } else {
                const tempData = []
                editingStore.resetBlocks(tempData)
            }
        },
        (error) => {
            console.log(error)
        }
    )
}

// 获取containerdom并传递给左侧物料区
const supplyRef = ref()
const handleContainerDom = (containerDom) => {
    supplyRef.value.hasContainerDom(containerDom)
}

onMounted(() => {
    initData()
})
</script>

<style lang="scss" scoped>
.design-wrap {
    height: 100vh;
}

.design-cotent {
    height: 100vh;
    width: 100%;
    .top {
        height: 50px;
        width: 100%;
        border-bottom: 1px solid #d4d7de;
    }

    .bottom {
        display: flex;
        flex-direction: row;
        .left {
            width: 280px;
            height: calc(100vh - 50px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .center {
            width: 100%;
            height: calc(100vh - 50px);
            border-left: 1px solid #d4d7de;
            border-right: 1px solid #d4d7de;
        }
        .right {
            width: 290px;
            height: calc(100vh - 50px);
        }
    }
}
</style>