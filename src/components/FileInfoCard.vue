<template>
    <div class="file-card">
        <div class="file-image">
            <img :src="fileState.fileCover" alt="详情" />
        </div>
        <div class="info-content">
            <div class="left">
                <div class="title">{{ fileInfo.fileName }}</div>
                <div class="user">{{ fileInfo.userName }}</div>
            </div>

            <div class="right">
                <div class="opre-like">
                    <n-icon>
                        <Favorite />
                    </n-icon>
                    {{ fileInfo.likeNum }}
                </div>
                <div class="opre-copy">
                    <n-icon>
                        <Copy />
                    </n-icon>
                    {{ fileInfo.copyNum }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { Favorite, Copy } from "@vicons/carbon";
import { getSingleFiles, getImage } from "@/service";

const props = defineProps(["fileInfo"]);

onMounted(() => {
    setFileCover();
});

// 设置文件封面
const fileState = reactive({
    fileInfo: props.fileInfo,
    fileCover: "",
});
const setFileCover = () => {
    getSingleFiles({ id: fileState.fileInfo.fileId }).then(
        (response) => {
            const coverUrl = `http://localhost:1337${response.data.data.attributes.cover.data.attributes.formats.small.url}`;
            fileState.fileCover = coverUrl;
        },
        (error) => {
            console.log(error);
        }
    );
    // console.log(fileState.fileInfo.fileId);
    // console.log(fileState.fileInfo.fileContent);
};
</script>

<style lang="scss" scoped>
.file-card {
    width: 100%;
    height: 100%;
    border: 1px solid #d4d7de;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .file-image {
        background-color: #d4d7de;
        width: 100%;
		height: 200px;
        flex: 3;
        img {
            display: block;
            width: 100%;
            height: 180px;
            object-fit: cover;
        }
    }

    .info-content {
        width: 100%;
		height: 40px;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        .left {
            display: flex;
            flex-direction: column;
            cursor: text;
            .title {
                font-size: 16px;
                color: #303133;
            }

            .user {
                font-size: 12px;
                color: #909399;
            }
        }
        .right {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .n-icon {
                margin-bottom: 4px;
                margin-right: 4px;
            }

            .opre-like {
                display: flex;
                align-items: center;
                font-size: 16px;
                color: #303133;
                cursor: pointer;
            }

            .opre-copy {
                display: flex;
                align-items: center;
                font-size: 16px;
                color: #303133;
                cursor: pointer;
            }
        }
    }
}
</style>