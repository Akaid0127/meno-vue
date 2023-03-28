import { collapseProps } from 'naive-ui'
import { defineStore } from 'pinia'

const useEditing = defineStore('editing', {
	actions: {
		// 设置当前正在操作组件
		setCurBlock(curBlock) {
			this.curData.curBlock = curBlock
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
		}
	},

	state: () => {
		return {
			count: 99,
			pageData: {
				container: {
					width: 1400,
					height: 800,
				},
				blocks: [
					{
						component: 'm-text',
						propValue: "hellotext",
						key: "defaultkey1",
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
						style: {
							width: 80,
							height: 40,
							top: 300,
							left: 300,
							zIndex: 1,
						},
					}
				]
			},

			curData: {
				curBlock: {}
			}
		}
	}

})

export default useEditing
