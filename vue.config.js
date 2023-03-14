const { defineConfig } = require('@vue/cli-service')
// 配置别名
const path = require('path');
function resolve(dir) {
	// path.join(__dirname)设置绝对路径
	return path.join(__dirname, dir)
}

module.exports = defineConfig({
	transpileDependencies: true,
	// 关闭lint校验
	lintOnSave: false,
	// 配置scss
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'scss',
			patterns: []
		}
	},
	// 配置别名
	chainWebpack: (config) => {
		config.resolve.alias
			//set第一个参数：设置的别名，第二个参数：设置的路径
			//注意 store 和 router 没必要配置
			.set('@', resolve('./src'))
			.set('components', resolve('./src/components'))
			.set('assets', resolve('./src/assets'))
			.set('styles', resolve('./src/styles'))
	},
})
