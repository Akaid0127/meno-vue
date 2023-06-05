<template>
    <div class="designattr-wrap">
        <div class="designattr-content">
            <n-tabs
                type="line"
                animated
                default-value="attrStyle"
                justify-content="space-evenly"
            >
                <n-tab-pane tab="样式" name="attrStyle">
                    <div class="style-list">
                        <n-form label-placement="left" label-width="auto">
                            <n-form-item
                                v-for="(key, index) in curState.styleKeys"
                                :key="index"
                                :label="styleLabelList[key]"
                            >
                                <n-input-number
                                    v-if="
                                        key == 'width' ||
                                        key == 'height' ||
                                        key == 'top' ||
                                        key == 'left' ||
                                        key == 'zIndex' ||
                                        key == 'borderWidth' ||
                                        key == 'opacity' ||
                                        key == 'borderRadius' ||
                                        key == 'fontSize'
                                    "
                                    v-model:value="curState.curStyle[key]"
                                    placeholder="请输入数值"
                                />
                                <n-color-picker
                                    v-else-if="
                                        key == 'backgroundColor' ||
                                        key == 'borderColor' ||
                                        key == 'color'
                                    "
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
                                <n-input
                                    v-else
                                    v-model:value="curState.curStyle[key]"
                                    placeholder="请输入数据"
                                />
                            </n-form-item>
                        </n-form>
                    </div>
                </n-tab-pane>
                <n-tab-pane tab="内容" name="attrContent">
                    <n-scrollbar style="max-height: 860px" trigger="none">
                        <div class="content-list">
                            <n-form label-placement="top" label-width="auto">
                                <n-form-item
                                    v-if="curState.curComponent === 'm-input'"
                                    label="输入提示"
                                >
                                    <n-input
                                        v-model:value="curState.curValue"
                                        type="text"
                                        placeholder="请输入placeholder"
                                    />
                                </n-form-item>
                                <n-form-item
                                    v-if="
                                        curState.curComponent === 'm-text' ||
                                        curState.curComponent === 'm-button'
                                    "
                                    label="组件内容"
                                >
                                    <n-input
                                        v-model:value="curState.curValue"
                                        type="text"
                                        placeholder="请输入组件内容"
                                    />
                                </n-form-item>

                                <n-form-item
                                    v-if="
                                        curState.curComponent ===
                                            'm-rectangle' ||
                                        curState.curComponent ===
                                            'm-circular' ||
                                        curState.curComponent === 'm-image'
                                    "
                                    label="组件名称"
                                >
                                    <n-input
                                        v-model:value="curState.curValue"
                                        type="text"
                                        placeholder="请输入组件名称"
                                    />
                                </n-form-item>

                                <n-form-item
                                    v-if="curState.curComponent === 'm-image'"
                                    label="图片链接"
                                >
                                    <n-input
                                        v-model:value="curState.curImgUrl"
                                        type="textarea"
                                        placeholder="请输入图片链接(http://...)"
                                    />
                                </n-form-item>

                                <div
                                    v-if="curState.curComponent === 'm-icon'"
                                    class="icon-list"
                                >
                                    <div
                                        v-for="(item, index) in svgArr"
                                        :key="item.name"
                                        class="icon-item"
                                    >
                                        <n-button
                                            strong
                                            secondary
                                            @click="handleClickIcon(index)"
                                        >
                                            <template #icon>
                                                <n-icon>
                                                    <div
                                                        v-html="item.svgValue"
                                                    ></div>
                                                </n-icon>
                                            </template>
                                        </n-button>
                                    </div>
                                </div>
                            </n-form>
                            <n-button
                                v-if="curState.curComponent !== 'm-icon'"
                                strong
                                secondary
                                type="primary"
                                @click="handleUpdataContent"
                                >更新内容</n-button
                            >
                        </div>
                    </n-scrollbar>
                </n-tab-pane>
                <n-tab-pane tab="事件" name="attrEvent">
                    <div class="event-list">暂未开发</div>
                </n-tab-pane>
            </n-tabs>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import emitter from '@/mitt/event'
import styleLabelList from '@/components-unit/styleList'
import useEditing from '@/stores/editing'
import svgArr from '@/components-unit/iconData'

// 表单
const formState = reactive({
    borderStyleSelect: [
        { value: 'dotted', label: '点线' },
        { value: 'dashed', label: '虚线' },
        { value: 'solid', label: '实线' },
        { value: 'double', label: '双边' },
        { value: 'none', label: '无边' },
    ],
    fontStyleSelect: [
        { value: 'normal', label: '正常' },
        { value: 'italic', label: '斜体' },
    ],
    fontWeightSelect: [
        { value: 'normal', label: '正常' },
        { value: 'bold', label: '加粗' },
    ],
})

// pinia
const editingStore = useEditing()

// 当前组件数据
const curState = reactive({
    curkey: '',
    curStyle: {},
    styleKeys: [],
    curValue: '',
    curComponent: '',
    curImgUrl: '',
})
emitter.on('getCurStyle', (data) => {
    curState.curkey = data.key
    curState.curStyle = data.style
    curState.styleKeys = Object.keys(data.style)
    curState.curValue = data.propValue
    curState.curComponent = data.component
})

// 监听表单数据
watch(
    () => curState.curStyle,
    (curStyle) => {
        editingStore.updateBlockStyle(curState.curkey, curStyle)
        const curData = {
            key: curState.curkey,
            style: curState.curStyle,
        }
        emitter.emit('setCurStyle', curData) // 设置焦点组件属性
    },
    {
        deep: true,
    }
)

// 监听内容提交
const handleUpdataContent = () => {
    const curData = {
        key: curState.curkey,
        value: curState.curValue,
        imgUrl: curState.curComponent === 'm-image' ? curState.curImgUrl : '',
        componentType: curState.curComponent,
    }
    emitter.emit('setCurContent', curData) // 设置焦点组件内容
}

// 监听图标提交
const handleClickIcon = (index) => {
    const curData = {
        key: curState.curkey,
        value: curState.curValue,
        componentType: curState.curComponent,
        iconIndex: index,
    }
    emitter.emit('setCurIcon', curData)
}
</script>

<style lang="scss" scoped>
.designattr-wrap {
    width: 100%;
    height: 100%;
}

.designattr-content {
    .n-tabs {
        height: 860px;
        overflow: scroll;
    }
    .style-list {
        padding: 8px 10px;
        .n-form-item {
            margin-bottom: -6px;
        }
    }

    .content-list {
        padding: 8px 10px;
        .n-button {
            width: 100%;
        }

        .icon-list {
            width: 200px;
            flex-wrap: wrap;
            // background-color: aliceblue;
            .icon-item {
                display: inline-block;
                width: 60px;
                height: 30px;
                margin-bottom: 10px;
                margin-right: 6px;
                .n-button {
                    font-size: 10px;
                }
            }
        }
    }

    .event-list {
        padding: 8px 10px;
    }
}
</style>