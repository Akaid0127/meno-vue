// 按需全局安装naiveui组件
import {
	create,
	NButton,
	NCard,
	NInput,
	NLayout,
	NLayoutSider,
	NLayoutHeader,
	NLayoutContent,
	NLayoutFooter,
	NIcon,
	NAvatar,
	NForm,
	NFormItem,
	NInputNumber,
	NColorPicker,
	NSelect
} from 'naive-ui'

const naive = create({
	components: [
		NButton,
		NCard,
		NInput,
		NLayout,
		NLayoutSider,
		NLayoutHeader,
		NLayoutContent,
		NLayoutFooter,
		NIcon,
		NAvatar,
		NForm,
		NFormItem,
		NInputNumber,
		NColorPicker,
		NSelect
	]
})

export default naive