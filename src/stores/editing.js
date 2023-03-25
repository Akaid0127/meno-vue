import { collapseProps } from 'naive-ui'
import { defineStore } from 'pinia'

const useEditing = defineStore('editing', {
	actions: {
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
		updateBlock(key, posTop, posLeft) {
			this.pageData.blocks.forEach((item) => {
				if (item.key === key) {
					item.style.top = posTop
					item.style.left = posLeft
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
							top: 300,
							left: 300,
							zIndex: 1,
						},
					}
				]
			},


		}
	}

})

export default useEditing
