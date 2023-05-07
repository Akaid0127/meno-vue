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
