# :construction:施工流水账:construction:



> 此为毕设项目，希望能实现一个代码规范，正儿八经的项目:sunglasses:
>
> 目前施工阶段：低代码开发页面
>
> update_time：2023-03-18



借鉴平台：

零壤

即时设计



## 零、项目运行

依赖安装

```
npm install
```

项目启动

```
npm run serve
```

项目编译

```
npm run build
```



## 一、项目初始化

### 1.1 项目包管理

关于-g，-s，-d的区别

- npm install moduleName

  安装依赖到 mode_modules 目录下，不写入节点,，npm install 时不下载该依赖

- npm install -g moduleName

  全局安装,不在 mode_modules 目录下，不写入节点， npm install 时不下载该依赖

- npm install -save moduleName

  安装依赖到 mode_modules 目录下,写入dependencies节点，npm install 时下载该依赖，一般安装生成环境所用依赖，如 vue，element-ui，echarts…

- npm install -save -dev moduleName

  安装依赖到 mode_modules 目录下，写入devDependencies节点，npm install 时下载该依赖，一般安装开发环境所用依赖，如 wabpack, babel…



安装sass

```
npm install node-sass -D
```

```
npm install sass-loader -D
```

```
npm install sass -D
```

```js
// vue.config.js中配置
module.exports ={
    pluginOptions:{
        'style-resources-loader':{
            preProcessor:'scss',
            patterns:[]
        }
    }
}
```



安装NaiveUI

```
npm i naive-ui -D
```



安装字体库

```
npm i @vicons/carbon -D
```



配置路由

```
npm i vue-router@4
```

```
https://blog.csdn.net/wsjzzcbq/article/details/117789118
https://blog.csdn.net/weixin_30522095/article/details/98983026
```



### 1.2 实现icon替换

直接将设计好的logo转换为ico类型文件



### 1.3 网页title修改

看PS功底了，实现了黑、绿、白三色title



### 1.4 命名规范

对于前端来说，网页元素名称的规范性可以加强团队内部成员的沟通，同时还可以提高后期维护和运行。

网页的元素命名主要是针对id和class进行的，但是针对网页的命名并没有什么标准，但是大部分是业界公认的规则。



### 1.5 页面结构

组件划分清晰，争取单行lint文件不超过300行



### 1.6 创建style文件夹

| 文件        | 说明       |
| ----------- | ---------- |
| base.scss   | 基本共用   |
| themes.scss | 主题       |
| font.css    | 文字、字体 |



### 1.7 配置路径别名

在MVVM框架中，大多数业务逻辑都组件化

极大的减轻了代码的冗余度，如果组件的层次比较深的话，组件的import就比较费劲

在import时使用“…/…/components/test”的方式，组件的import就会稍显混乱、组件代码不容易维护

为了可高效的、快速的维护组件代码，废弃“…/…/”的组件引入方式，配置一个组件路径重写的方式引入组件



在vue.config.js中：

```js
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
```



## 二、首页静态页面

###  2.1 主题化

暂时做了导航栏的主题化

- 颜色采用scss变量定义的minix规则
- 图片采用动态图片切换
- 图标采用v-if切换



### 2.2 Navbar

导航栏



### 2.3 第一个展示卡片

实现了一个背景动态渐变



## 三、工作台静态页面

需要总结

- css的transform
- css的boxshadow



### 3.1 实现侧边导航栏

如果我们只是简单的加上伪类，由于div等元素无法接受键盘或其他用户事件

即不支持:focus伪类，可通过增加tabIndex属性使其支持:focus

```
https://blog.csdn.net/qq_44267691/article/details/128036879
```



### 3.2 实现顶部工具栏

一如既往，没什么好说的



### 3.3 实现内容区域按钮

一如既往，没什么好说的



## 四、低代码开发页面

我们要先自己构造一些假数据，能够根据位置渲染内容



### 4.1 完成静态页面

- 顶部工具栏
- 左侧组件栏
- 中间画布栏
- 右侧属性栏



### 4.2 pinia存储json数据





















