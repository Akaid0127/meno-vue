// 物料栏组件拖入画布初始状态
const componentList = [
	{
		id: 1,
		label: "文本",
		component: "m-text",
		style: {
			width: "80",
			height: "40",
			zIndex: 1,
			backgroundColor: "#FFFFFF",
			borderStyle: "solid",
			borderWidth: "1",
			borderColor: "#112D4E",
			opacity: "1",
			borderRadius: "0",
			color: "#000000",
			fontStyle: "normal",
			fontWeight: "normal",
			fontSize: "14",
		}
	},
	{
		id: 2,
		label: "按钮",
		component: "m-button",
		style: {
			width: "80",
			height: "40",
			zIndex: 1,
			backgroundColor: "#FFFFFF",
			opacity: "1",
			borderRadius: "6",
			color: "#606266",
			fontSize: "14",
		}
	},
	{
		id: 3,
		label: "输入框",
		component: "m-input",
		style: {
			width: "80",
			height: "40",
			zIndex: 1,
			backgroundColor: "#FFFFFF",
			borderWidth: "1",
			borderColor: "#DCDFE6",
			opacity: "1",
			borderRadius: "6",
			fontSize: "14",
		}
	},
]

export default componentList