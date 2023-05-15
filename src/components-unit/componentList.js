// 物料栏组件拖入画布初始状态
const componentList = [
    {
        id: 1,
        label: "文本",
        component: "m-text",
        styleDefault: {
        },
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
        styleDefault: {
        },
        style: {
            width: "80",
            height: "40",
            zIndex: 1,
            backgroundColor: "#DAF0E4",
            borderStyle: "solid",
            borderWidth: "1",
            borderColor: "#DAF0E4",
            opacity: "1",
            borderRadius: "4",
            color: "#3DA36A",
            fontSize: "14",
        }
    },
    {
        id: 3,
        label: "输入框",
        component: "m-input",
        styleDefault: {
        },
        style: {
            width: "80",
            height: "40",
            zIndex: 1,
            backgroundColor: "#FFFFFF",
            borderStyle: "solid",
            borderWidth: "1",
            borderColor: "#5EA47EFF",
            opacity: "1",
            borderRadius: "6",
            fontSize: "14",
        }
    },
    {
        id: 4,
        label: "矩形",
        component: "m-rectangle",
        styleDefault: {
        },
        style: {
            width: "100",
            height: "120",
            zIndex: 1,
            backgroundColor: "#DAF0E4",
            borderStyle: "solid",
            borderWidth: "2",
            borderColor: "#18A058",
            opacity: "1",
            borderRadius: "0",
        }
    },
    {
        id: 5,
        label: "圆形",
        component: "m-circular",
        styleDefault: {
            borderRadius: "50%"
        },
        style: {
            width: "100",
            height: "100",
            zIndex: 1,
            backgroundColor: "#DAF0E4",
            borderStyle: "solid",
            borderWidth: "2",
            borderColor: "#18A058",
            opacity: "1",
        }
    },

    {
        id: 6,
        label: "图片",
        component: "m-image",
        styleDefault: {
        },
        style: {
            width: "240",
            height: "140",
            zIndex: 1,
            borderStyle: "solid",
            borderWidth: "1",
            borderColor: "#18A058",
            opacity: "1",
        }
    },

    {
        id: 7,
        label: "图标",
        component: "m-icon",
        styleDefault: {
        },
        style: {
            width: "26",
            height: "26",
            zIndex: 1,
            backgroundColor: "#00000000",
            color: "#747679",
            opacity: "1",
            borderRadius: "5",
        }
    },
]

export default componentList