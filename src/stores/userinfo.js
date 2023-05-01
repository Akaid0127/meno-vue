import { defineStore } from 'pinia'

const useUserinfo = defineStore('userinfo', {
	actions: {
		// 设置用户基本信息
		// 需要持久存储
		setUserInfo(data){
			this.userInfo.userId = data.userId
			this.userInfo.userName = data.userName
			this.userInfo.userEmail = data.userEmail
		}
	},

	state: () => {
		return {
			userInfo:{
				userId:'',
				userName:'',
				userEmail:'',
			}
		}
	}

})

export default useUserinfo
