import { defineStore } from 'pinia'

const useSnapshot = defineStore('snapshot', {
	actions: {
		// 重置操作快照
		resetSnapshot(data) {
			this.snapshotData.splice(0, this.snapshotData.length)
			this.snapshotData.push(JSON.parse(JSON.stringify(data))) // 注意消除响应式
			this.snapshotIndex = 0
		},

		// 深拷贝
		deepClone(source, target) {
			var _tar = target || {};
			for (var key in source) {
				if (source.hasOwnProperty(key) && source[key] != null) {
					if (typeof source[key] === "object") {
						_tar[key] = (Object.prototype.toString.call(source[key]) === "[object Array]")
							? [] : {};
						this.deepClone(source[key], _tar[key]);
					} else {
						_tar[key] = source[key];
					}
				}
			}
			return _tar;
		},

		// 存入数据快照
		addSnapshot(data) {
			this.snapshotIndex++
			const tempArr = []
			data.forEach(item => {
				tempArr.push(this.deepClone(item))
			});
			// console.log(tempArr)
			this.snapshotData.push(tempArr)
		},

		// 撤销操作
		cancelOperate(data) {
			if (this.snapshotIndex !== 0) {
				const tempArr = []
				data.forEach(item => {
					tempArr.push(this.deepClone(item))
				});
				// console.log(tempArr)
				this.snapshotData.push(tempArr)
				this.snapshotIndex--
			}
		},

		// 返回操作
		rebackOperate(data) {
			if (this.snapshotIndex < this.snapshotData.length - 1) {
				const tempArr = []
				data.forEach(item => {
					tempArr.push(this.deepClone(item))
				});
				// console.log(tempArr)
				this.snapshotData.push(tempArr)
				this.snapshotIndex++
			}
		},
	},

	state: () => {
		return {
			snapshotData: [[
				{
					component: 'm-text',
					propValue: "hellotext",
					key: "defaultkey1",
					focus: false,
					style: {
						width: 80,
						height: 40,
						top: 100,
						left: 100,
						zIndex: 1,
						backgroundColor: "#FFFFFF",
						borderStyle: "solid",
						borderWidth: 1,
						borderColor: "#112D4E",
						opacity: 1,
						borderRadius: 4,
						color: "#000000",
						fontStyle: "normal",
						fontWeight: "normal",
						fontSize: 14,
					},
				},
				{
					component: 'm-button',
					propValue: "hellobutton",
					key: "defaultkey2",
					focus: false,
					style: {
						width: 80,
						height: 40,
						top: 200,
						left: 200,
						zIndex: 1,
						backgroundColor: "#FFFFFF",
						borderWidth: 1,
						borderColor: "#DCDFE6",
						opacity: 1,
						borderRadius: 6,
						color: "#606266",
						fontSize: 14,
					},
				},
				{
					component: 'm-input',
					propValue: "helloinput",
					key: "defaultkey3",
					focus: false,
					style: {
						width: 80,
						height: 40,
						top: 300,
						left: 300,
						zIndex: 1,
						backgroundColor: "#FFFFFF",
						opacity: 1,
						borderRadius: 6,
						fontSize: 14,
					},
				}
			]], // 组件数据快照
			snapshotIndex: 0, // 快照索引从负一开始
		}
	}

})

export default useSnapshot
