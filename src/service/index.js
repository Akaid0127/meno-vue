import { affixProps } from "naive-ui";
import axios from "./axios";

// 用户登录
export const userLogin = (data) => {
    return axios({
        url: 'api/auth/local',
        method: 'post',
        data: {
            identifier: data.userName,
            password: data.passward,
        }
    })
}

// 用户注册
export const userReg = (data) => {
    return axios({
        url: 'api/auth/local/register',
        method: 'post',
        data: {
            username: data.userName,
            email: data.email,
            password: data.passward,
        }
    })
}

// 获取单个用户的文件夹
export const getUserFold = (data) => {
    return axios({
        url: `api/users/${data.id}?populate=folds`,
        method: 'get',
    })
}

// 获取单个用户的文件
export const getUserFile = (data) => {
    return axios({
        url: `api/users/${data.id}?populate=creations`,
        method: 'get',
    })
}

// 添加文件夹
export const postFold = (data) => {
    return axios({
        url: 'api/folds',
        method: 'post',
        data: {
            data: {
                fold_name: data.fold_name,
                user: data.user,
                is_team_fold: data.is_team_fold,
                creations: data.creations,
                folds: data.folds,
                team: data.team,
            }

        }
    })
}

// 个人修改文件图片
export const postFileWithImage = (data) => {
    const formData = new FormData();

    formData.append("files", data.cover);
    return axios({
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        url: `api/upload/`,
        method: 'post',
        data: formData
    })
}

export const postFileWithImageNext = (data) => {
    return axios({
        url: `api/creations/${data.id}`,
        method: 'put',
        data: {
            data: {
                cover: data.cover,
            }
        }
    })
}

// 添加文件
export const postFile = (data) => {
    return axios({
        url: 'api/creations',
        method: 'post',
        data: {
            data: {
                cre_name: data.cre_name,
                cre_status: data.cre_status,
                isPublic: data.isPublic,
                is_team_file: data.is_team_file,
                json_content: data.json_content,
                fold: data.fold,
                category: data.category,
                user: data.user,
                team: data.team,
                like_num: 0,
                copy_num: 0,
            }
        }
    })
}

// 获取所有分类
export const getCategory = () => {
    return axios({
        url: 'api/categories',
        method: 'get',
    })
}

// 获取文件夹下所有文件
export const getFoldFiles = (data) => {
    return axios({
        url: `api/folds/${data.id}?populate=creations`,
        method: 'get',
    })
}

// 根据ID获取文件
export const getFile = (data) => {
    return axios({
        url: `api/creations/${data.id}?populate=fold,user,team,category`,
        method: 'get',
    })
}

// 修改作品content
export const putFileContent = (data) => {
    return axios({
        url: `api/creations/${data.id}`,
        method: 'put',
        data: {
            data: {
                json_content: data.json_content,
            }
        }
    })
}

// 修改文件夹
export const putFoldInfo = (data) => {
    return axios({
        url: `api/folds/${data.id}`,
        method: 'put',
        data: {
            data: {
                fold_name: data.fold_name,
            }
        }
    })
}

// 修改文件
export const putFileInfo = (data) => {
    return axios({
        url: `api/creations/${data.id}`,
        method: 'put',
        data: {
            data: {
                cre_name: data.cre_name,
                isPublic: data.isPublic,
                fold: data.fold,
                category: data.category
            }
        }
    })
}

// 删除文件夹
export const deleteFold = (data) => {
    return axios({
        url: `api/folds/${data.id}`,
        method: 'delete',
    })
}

// 删除文件
export const deleteFile = (data) => {
    return axios({
        url: `api/creations/${data.id}`,
        method: 'delete',
    })
}

// 获取用户
export const getUserSelf = () => {
    return axios({
        url: "api/users/me",
        method: 'get',
    })
}

// 获取所有文件
export const getAllFiles = () => {
    return axios({
        url: "/api/creations?populate=user,category",
        method: 'get',
    })
}

// 获取文件（populate图片）
export const getSingleFiles = (data) => {
    return axios({
        url: `/api/creations/${data.id}?populate=cover`,
        method: 'get',
    })
}

// 获取图片
export const getImage = (data) => {
    return axios({
        url: `${data.url}`,
        method: 'get',
    })
}

// 获取用户team
export const getUserTeamAll = () => {
    return axios({
        url: `/api/users/me?populate=teams`,
        method: 'get',
    })
}

// 获取单一团队管理员
export const getTeamManager = (data) => {
    return axios({
        url: `/api/teams/${data.id}?populate=user_manager`,
        method: 'get',
    })
}

// 获取单一团队所有信息
export const getTeamManagerInfo = (data) => {
    return axios({
        url: `/api/teams/${data.id}?populate=users_lists,user_manager,users_operate,users_visit,creations,folds,tasks`,
        method: 'get',
    })
}

// 修改团队成员身份
export const pullTeamMemberIdentity = (data) => {
    return axios({
        url: `api/teams/${data.id}?populate=users_operate,users_visit`,
        method: 'put',
        data: {
            data: {
                users_operate: data.usersOperate,
                users_visit: data.usersVisit
            }
        }
    })
}

// 修改团队成员（主要是用户是否存在于团队）
export const pullTeamMemberList = (data) => {
    return axios({
        url: `api/teams/${data.id}?populate=users_operate,users_visit,users_lists`,
        method: 'put',
        data: {
            data: {
                users_operate: data.usersOperate,
                users_visit: data.usersVisit,
                users_lists: data.usersLists
            }
        }
    })
}

// 获取团队文件夹
export const getTeamFolds = (data) => {
    return axios({
        url: `api/teams/${data.id}?populate=folds`,
        method: 'get',
    })
}

// 获取任务看板(任务负责人)
export const getTaskCoder = (data) => {
    return axios({
        url: `api/tasks/${data.id}?populate=coder`
    })
}

// 添加任务看板
export const postTask = (data) => {
    return axios({
        url: `api/tasks`,
        method: 'post',
        data: {
            data: {
                task_name: data.task_name,
                task_title: data.task_title,
                task_content: data.task_content,
                task_status: data.task_status,
                task_priority: data.task_priority,
                deadline: data.deadline,
                coder: data.coder,
                team: data.team,
            }
        }
    })
}

// 创建团队
export const postNewTeam = (data) => {
    return axios({
        url: `api/teams`,
        method: 'post',
        data: {
            data: {
                team_name: data.team_name,
                user_manager: data.user_manager,
                users_operate: data.users_operate,
                users_visit: data.users_visit,
                creations: data.creations,
                tasks: data.tasks,
                folds: data.folds,
                users_lists: data.users_lists,
            }
        }
    })
}

// 获取所有团队
export const getTeamAll = () => {
    return axios({
        url: `api/teams?populate=users_visit,users_lists`,
        method: 'get',
    })
}

// 获取特定团队的访客列表
export const getTeamVisit = (data) => {
    return axios({
        url: `api/teams/${data.id}?populate=users_visit`,
        method: 'get',
    })
}

// 加入团队
export const putNewTeam = (data) => {
    return axios({
        url: `api/teams/${data.id}`,
        method: 'put',
        data: {
            data: {
                users_visit: data.users_visit,
                users_lists: data.users_lists,
            }
        }
    })
}

// 点赞作品
export const likeCreation = (data) => {
	return axios({
		url: `api/creations/${data.id}`,
		method: 'put',
		data: {
			data: {
				like_num: data.like_num,
			}
		}
	})
}

// 复用作品次数增加
export const copyCreation = (data) => {
	return axios({
		url: `api/creations/${data.id}`,
		method: 'put',
		data: {
			data: {
				copy_num: data.copy_num,
			}
		}
	})
}

// 复用作品增加作品
export const copyCreationPostFile = (data) => {
	return axios({
		url: 'api/creations',
		method: 'post',
		data: {
			data: {
				cre_name: data.cre_name,
				cre_status: data.cre_status,
				isPublic: data.isPublic,
				is_team_file: data.is_team_file,
				json_content: data.json_content,
				fold: data.fold,
				category: data.category,
				user: data.user,
				team: data.team,
				cover: data.cover,
				like_num: 0,
				copy_num: 0,
			}
		}
	})
}

// 复用获取文件
export const copyGetFile = (data) => {
	return axios({
		url: `api/creations/${data.id}?populate=fold,user,team,category,cover`,
		method: 'get',
	})
}