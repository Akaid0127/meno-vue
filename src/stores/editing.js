import { defineStore } from 'pinia'

const useEditing = defineStore('editing', {
	actions: {
		addBlock(currentComponent) {
			this.pageData.blocks.push(currentComponent)
		},
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
						key: "1",
						style: {
							top: 100,
							left: 100,
							zIndex: 1,
						},
					},
					{
						component: 'm-button',
						propValue: "hellobutton",
						key: "2",
						style: {
							top: 200,
							left: 200,
							zIndex: 1,
						},
					},
					{
						component: 'm-input',
						propValue: "helloinput",
						key: "3",
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
