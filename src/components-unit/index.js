const importFn = require.context('./', true, /\.vue$/)
export default {
	install(app) {
		// 批量注册全局组件
		importFn.keys().forEach(key => {
			// 导入组件
			const component = importFn(key).default
			// 截取组件名称
			const paramsArr = component.__file.split('/')
			// 注册组件
			app.component(paramsArr[2], component)
		})
	}
}