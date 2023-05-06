import axios from "./axios";

// 用户登录
export const userLogin = (data) => {
	return axios({
		url: 'api/auth/local',
		method: 'post',
		data:{
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
		url: `/api/users/${data.id}?populate=folds`,
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




