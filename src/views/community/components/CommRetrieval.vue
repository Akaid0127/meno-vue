<template>
    <div class="commretrieval-wrap">
        <div class="commretrieval-content">
            <div class="first-row">
                <n-card
                    class="left-card"
                    title="📖 平台一共收录"
                    embedded
                    :bordered="true"
                >
                    <n-statistic tabular-nums>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="fileState.allFileArr.length"
                        />
                        <template #suffix>
                            <span> 优秀低代码设计作品 </span>
                            <span>
                                <n-icon
                                    size="24"
                                    color="#0e7a0d"
                                    style="padding-top: 6px"
                                >
                                    <EarthFilled />
                                </n-icon>
                            </span>
                        </template>
                    </n-statistic>
                    <n-space vertical style="margin-top: 10px">
                        以下检索作品基于用户可公开作品
                    </n-space>
                </n-card>
                <n-card class="right-card">
                    <!-- const searchState = reactive({
                        searchInp: null,
                        searchType: null,
                        searchPlaceholder: '请输入作品名称搜索',
                    }) -->
                    <div class="search-box">
                        <div>
                            <n-input
                                :placeholder="searchState.searchPlaceholder"
                                class="search-inp"
                                v-model:value="searchState.searchInp"
                            >
                                <template #prefix>
                                    <n-icon
                                        color="#0e7a0d"
                                        :component="Search"
                                    />
                                </template>
                                <template #suffix>
                                    <n-button
                                        strong
                                        secondary
                                        type="tertiary"
                                        style="margin-right: -8px"
                                        @click="handleSearch"
                                    >
                                        开始探索
                                    </n-button>
                                </template>
                            </n-input>
                        </div>
                        <div class="btn-group">
                            <n-button
                                type="primary"
                                ghost
                                @click="resetSearchCate()"
                                >全部</n-button
                            >
                            <n-button
                                type="tertiary"
                                v-for="item in cateState.cateArr"
                                :key="item.cateId"
                                @click="selectSearchCate(item)"
                                >{{ item.cateName }}</n-button
                            >
                        </div>
                    </div>
                </n-card>
            </div>
            <div class="second-row">
                <n-tabs
                    type="line"
                    animated
                    @update:value="handleUpdateValue"
                    v-model:value="tabState.tabValue"
                >
                    <n-tab-pane name="cateAll" tab="全部">
                        <div class="card-group">
                            <div
                                class="card-item"
                                v-for="item in fileState.allFileArr"
                                :key="item.fileId"
                            >
                                <FileInfoCard :fileInfo="item" />
                            </div>
                        </div>
                    </n-tab-pane>
                    <n-tab-pane
                        v-for="item in cateState.cateArr"
                        :key="item.cateId"
                        :name="item.cateId"
                        :tab="item.cateName"
                    >
                        <div v-if="fileState.cateFileArr.length === 0">
                            未找到相应文件
                        </div>
                        <div class="card-group">
                            <div
                                class="card-item"
                                v-for="item in fileState.cateFileArr"
                                :key="item.fileId"
                            >
                                <FileInfoCard :fileInfo="item" />
                            </div>
                        </div>
                    </n-tab-pane>
                    <n-tab-pane name="cateSearch" tab="搜索文件">
                        <div v-if="fileState.searchFileArr.length === 0">
                            未找到相应文件
                        </div>
                        <div class="card-group">
                            <div
                                class="card-item"
                                v-for="item in fileState.searchFileArr"
                                :key="item.fileId"
                            >
                                <FileInfoCard :fileInfo="item" />
                            </div>
                        </div>
                    </n-tab-pane>
                </n-tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { EarthFilled, Search } from '@vicons/carbon'
import { getCategory, getAllFiles } from '@/service'
import FileInfoCard from '@/components/FileInfoCard'

// 挂载
onMounted(() => {
    setCateArr() // 获取所有分类
    setFileAll() // 获取所有文件
})

// 获取所有分类
const cateState = reactive({
    cateArr: [],
})
const setCateArr = () => {
    getCategory().then(
        (response) => {
            cateState.cateArr = response.data.data.map((item) => {
                return {
                    cateId: item.id,
                    cateName: item.attributes.cate_name,
                }
            })
        },
        (error) => {
            console.log(error)
        }
    )
}

// 获取所有文件
const fileState = reactive({
    allFileArr: [],
    cateFileArr: [],
    searchFileArr: [],
})
const setFileAll = () => {
    getAllFiles().then(
        (response) => {
            const resFiles = response.data.data
            let resArr = []
            for (let index = 0; index < resFiles.length; index++) {
                if (
                    resFiles[index].attributes.is_team_file === false &&
                    resFiles[index].attributes.isPublic === true
                ) {
                    const fileObj = {
                        fileId: resFiles[index].id,
                        fileName: resFiles[index].attributes.cre_name,
                        isPublic: resFiles[index].attributes.isPublic,
                        likeNum: resFiles[index].attributes.like_num,
                        copyNum: resFiles[index].attributes.copy_num,
                        fileContent: resFiles[index].attributes.json_content,
                        userName:
                            resFiles[index].attributes.user.data.attributes
                                .username,
                        category: resFiles[index].attributes.category.data.id,
                    }
                    resArr.push(fileObj)
                }
            }

            fileState.allFileArr = [...resArr]
        },
        (error) => {
            console.log(error)
        }
    )
}

// 点击标签更新内容
const handleUpdateValue = (value) => {
    console.log(fileState.searchFileArr.length)
    if (value === 'cateAll' || value === 'cateSearch') {
        return
    } else {
        fileState.cateFileArr = fileState.allFileArr.filter((item) => {
            return item.category === value
        })
    }
}

// 点击搜索框下类别按钮更新输入框placeholder
const searchState = reactive({
    searchInp: null,
    searchType: 'allCate',
    searchPlaceholder: '请输入作品名称搜索',
})
const selectSearchCate = (data) => {
    searchState.searchPlaceholder = `在${data.cateName}类别搜素`
    searchState.searchType = data.cateId
}
const resetSearchCate = () => {
    searchState.searchPlaceholder = '请输入作品名称搜索'
    searchState.searchType = 'allCate'
}

// 搜索
const tabState = reactive({
    tabValue: 'cateAll',
})
const handleSearch = () => {
    if (searchState.searchType === 'allCate') {
        fileState.searchFileArr = fileState.allFileArr.filter((item) => {
            return item.fileName.indexOf(searchState.searchInp) !== -1
        })
    } else {
        fileState.searchFileArr = fileState.allFileArr.filter((item) => {
            return (
                item.category === Number(searchState.searchType) &&
                item.fileName.indexOf(searchState.searchInp) !== -1
            )
        })
    }
    tabState.tabValue = 'cateSearch'
}
</script>

<style lang="scss" scoped>
.commretrieval-wrap {
}

.commretrieval-content {
    padding: 20px;
    .first-row {
        display: flex;
        margin-bottom: 20px;
        .left-card {
            flex: 2;
            margin-right: 20px;
            user-select: none;
        }

        .right-card {
            flex: 4;
            .search-box {
                width: 700px;
                height: 120px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .search-inp {
                    width: 600px;
                    line-height: 45px;
                    margin-bottom: 12px;
                }

                .btn-group {
                    display: flex;
                    width: 600px;
                    .n-button {
                        width: 80px;
                        margin-right: 12px;
                    }
                }
            }
        }
    }
    .second-row {
        .card-group {
            display: flex;
            flex-wrap: wrap;
            .card-item {
                // 待转移到演示电脑上进行微调
                width: 300px;
                height: 240px;
                margin-bottom: 20px;
                margin-right: 30px;
            }
        }
    }
}
</style>