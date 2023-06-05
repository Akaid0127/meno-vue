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
                <div class="opre-like" @click="likeOpre">
                    <n-icon>
                        <ThumbsUp />
                    </n-icon>
                    {{ fileState.fileInfo.likeNum }}
                </div>
                <div class="opre-copy" @click="copyOpre">
                    <n-icon>
                        <Copy />
                    </n-icon>
                    {{ fileState.fileInfo.copyNum }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { ThumbsUp, Copy, Cost } from "@vicons/carbon";
import {
    getSingleFiles,
    getImage,
    likeCreation,
    copyCreation,
    copyGetFile,
    copyCreationPostFile,
    getUserFold,
} from "@/service";
import { useMessage } from "naive-ui";
import useUserinfo from "@/stores/userinfo";

const props = defineProps(["fileInfo"]);

const message = useMessage();

const userinfoStore = useUserinfo(); // 用户状态

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
};

// 作品点赞成功
const likeOpre = () => {
    likeCreation({
        id: fileState.fileInfo.fileId,
        like_num: Number(fileState.fileInfo.likeNum) + 1,
    }).then(
        (response) => {
            console.log(response.data.data.attributes.like_num);
            fileState.fileInfo.likeNum = response.data.data.attributes.like_num;
            message.success("已成功支持作品一次");
        },
        (error) => {
            console.log(error);
        }
    );
};

// 作品复用成功
const copyOpre = () => {
    copyGetFile({ id: fileState.fileInfo.fileId }).then(
        (response) => {
            console.log(response.data.data);
            const resData = response.data.data.attributes;

            const data = {
                cre_name: resData.cre_name,
                cre_status: resData.cre_status,
                isPublic: resData.isPublic,
                is_team_file: resData.is_team_file,
                json_content: resData.json_content,
                team: null,

                fold: resData.fold,
                category: 1,
                user: userinfoStore.userInfo.userId,
                cover: resData.cover.data.id,
            };

            getUserFold({ id: userinfoStore.userInfo.userId }).then(
                (response) => {
                    data.fold = response.data.folds[0].id;

                    copyCreationPostFile(data).then(
                        (response) => {
                            console.log(response);
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
                },
                (error) => {
                    console.log(error);
                }
            );

            addCopyNum();
        },
        (error) => {
            console.log(error);
        }
    );

    const addCopyNum = () => {
        copyCreation({
            id: fileState.fileInfo.fileId,
            copy_num: Number(fileState.fileInfo.copyNum) + 1,
        }).then(
            (response) => {
                console.log(response.data.data.attributes.copy_num);
                fileState.fileInfo.copyNum =
                    response.data.data.attributes.copy_num;
                message.success("作品复用成功，请返回个人工作台查看");
            },
            (error) => {
                console.log(error);
            }
        );
    };
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