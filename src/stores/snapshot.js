import { defineStore } from 'pinia'

const useSnapshot = defineStore('snapshot', {
	actions: {
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
			this.snapshotData.push(tempArr)
		},

		// 撤销操作
		cancelOperate() {
			if (this.snapshotIndex !== 0) {
				this.snapshotIndex--
			}
		},

		// 返回操作
		rebackOperate() {
			if (this.snapshotIndex < this.snapshotData.length - 1) {
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
					},
				}
			]], // 组件数据快照
			snapshotIndex: 0, // 快照索引从负一开始
		}
	}

})

export default useSnapshot
