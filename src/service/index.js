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
                creations: data.creations
            }

        }
    })
}

// 添加文件




