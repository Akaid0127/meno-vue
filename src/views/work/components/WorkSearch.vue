<template>
    <div class="worksearch-wrap">
        <div class="worksearch-content">
            <div class="left">
                <div class="search">
                    <n-input
                        placeholder="输入文件名称搜索文件"
                        v-model:value="searchState.searchValue"
                    >
                        <template #prefix>
                            <n-icon :component="Search" @click="handleSearch" />
                        </template>
                    </n-input>
                </div>
                <div class="split-line"></div>
                <div class="add">
                    <n-button circle @click="handleSearch" size="small">
                        <template #icon>
                            <n-icon size="14">
                                <Search />
                            </n-icon>
                        </template>
                    </n-button>
                </div>
            </div>

            <div class="right">
                <div class="function-btn">
                    <n-button>
                        <n-icon> <CopyLink /> </n-icon>其他文件迁移
                    </n-button>
                </div>
                <div class="split-line"></div>
                <div class="theme">
                    <!-- 主题化 -->
                    <n-icon>
                        <Sun />
                    </n-icon>
                </div>
                <div class="user">
                    <n-button strong secondary circle type="primary">
                           {{ props.userName }}
                    </n-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useMessage } from "naive-ui";

import {
    Search,
    Sun,
    Moon,
    CopyLink,
    CloudDownload,
    Chat,
} from "@vicons/carbon";

// props
const props = defineProps(["userName"]);

// emit
const emit = defineEmits(["getSearchVaule"]);

// naive message
const message = useMessage();

// 搜索
const searchState = reactive({
    searchValue: "",
});
const handleSearch = () => {
    if (searchState.searchValue !== "") {
        emit("getSearchVaule", { searchValue: searchState.searchValue });
    } else if (searchState.searchValue === "") {
        message.warning("搜索输入为空");
    } else {
        message.error("系统错误");
    }
};
</script>

<style lang="scss" scoped>
.worksearch-content {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .split-line {
        background: rgba(218, 218, 220, 0.6);
        width: 1px;
        height: 20px;
        margin: 10px;
    }
    .left {
        display: flex;
        align-items: center;
        .search {
            margin-left: 10px;
            margin-right: 6px;
            .n-input {
                width: 300px;
                border-radius: 5px;
            }
        }

        .add {
            display: flex;
            align-items: center;
        }
    }
    .right {
        display: flex;
        align-items: center;
        .function-btn {
            margin-right: 10px;
            .n-button {
                border-radius: 5px;
            }
            .n-icon {
                margin-right: 4px;
            }
        }

        .theme {
            .n-icon {
                display: flex;
                align-items: center;
                font-size: 20px;
                margin-right: 18px;
                margin-left: 8px;
            }
        }

    }
}
</style>