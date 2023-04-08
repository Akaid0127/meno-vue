import { defineStore } from 'pinia'

const useEditing = defineStore('editing', {
	actions: {
		// 重置组件
		resetBlocks(data) {
			this.pageData.blocks.splice(0, this.pageData.blocks.length)
			data.forEach((item) => {
				this.pageData.blocks.push(item)
			})
		},

		// 设置当前正在操作组件
		setCurBlock(keyString) {
			this.curData.curBlockKey = keyString
		},

		// 添加组价
		addBlock(currentComponent) {
			this.pageData.blocks.push(currentComponent)
		},

		// 删除组件
		delBlock(currentComponentKey) {
			// 从后向前遍历，这样就算后面的数据前移，也不影响继续遍历
			for (let i = this.pageData.blocks.length - 1; i >= 0; i--) {
				if (this.pageData.blocks[i].key === currentComponentKey) {
					this.pageData.blocks.splice(i, 1);
				}
			}
		},

		// 更新组件位置
		updateBlockPos(key, posTop, posLeft) {
			this.pageData.blocks.forEach((item) => {
				if (item.key === key) {
					item.style.top = posTop
					item.style.left = posLeft
				}
			})
		},

		// 更新组件大小
		updateBlockSize(key, posTop, posLeft, posWidth, posHeight) {
			this.pageData.blocks.forEach((item) => {
				if (item.key === key) {
					item.style.top = posTop
					item.style.left = posLeft
					item.style.width = posWidth
					item.style.height = posHeight
				}
			})
		},

		// 更新组件层级
		updateBlockZindex(key, circums) {
			this.pageData.blocks.forEach((item) => {
				if (item.key === key) {
					if (circums === "up")
						item.style.zIndex++
					else if (circums === "down")
						item.style.zIndex--
				}
			})
		},

		// 更新组件样式
		updateBlockStyle(key, curStyle) {
			this.pageData.blocks.forEach((item) => {
				if (item.key === key) {
					const styleKeys = Object.keys(curStyle);
					styleKeys.forEach((key) => {
						item.style[key] = curStyle[key]
					})
				}
			})
		},

		// 更新组件内容（普通组件）
		updateBlockContent(key, curValue) {
			this.pageData.blocks.forEach((item) => {
				if (item.key === key) {
					item.propValue = curValue
				}
			})
		},

		// 更新组件内容（图片组件）
		updateImgContent(key, curValue, curUrl) {
			this.pageData.blocks.forEach((item) => {
				if (item.key === key) {
					item.propValue = curValue
					item.propUrl = curUrl
				}
			})
		},

		// 更新组件内容（图标组件）
		updateIconContent(key, curValue) {
			this.pageData.blocks.forEach((item) => {
				if (item.key === key) {
					item.propValue = curValue
				}
			})
		}
	},

	state: () => {
		return {
			count: 99,
			pageData: {
				container: {
					width: 1200,
					height: 800,
				},
				blocks: [
					{
						component: 'm-text',
						propValue: "hellotext",
						key: "defaultkey1",
						focus: false,
						styleDefault: {
						},
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
						styleDefault: {
						},
						style: {
							width: 80,
							height: 40,
							top: 200,
							left: 200,
							zIndex: 1,
							backgroundColor: "#DAF0E4",
							borderStyle: "solid",
							borderWidth: 1,
							borderColor: "#DAF0E4",
							opacity: 1,
							borderRadius: 4,
							color: "#3DA36A",
							fontSize: 14,
						},
					},
					{
						component: 'm-input',
						propValue: "helloinput",
						key: "defaultkey3",
						focus: false,
						styleDefault: {
						},
						style: {
							width: 80,
							height: 40,
							top: 300,
							left: 300,
							zIndex: 1,
							backgroundColor: "#FFFFFF",
							borderStyle: "solid",
							borderWidth: 1,
							borderColor: "#5EA47EFF",
							opacity: 1,
							borderRadius: 4,
							fontSize: 14,
						},
					}
				]
			},

			curData: {
				curBlockKey: ""
			}
		}
	}

})

export default useEditing
