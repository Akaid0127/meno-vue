# :construction:施工流水账:construction:



> 此为毕设项目，希望能实现一个代码规范，正儿八经的项目:sunglasses:
>
> 目前施工阶段：低代码开发页面
>
> update_time：2023-03-21



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

我们要先自己构造一些静态数据，能够根据位置渲染内容



### 4.1 完成静态页面

- 顶部工具栏
- 左侧组件栏
- 中间画布栏
- 右侧属性栏



### 4.2 pinia存储json数据

目前主要存储画布上组件信息



### 4.3 vue注册全局组件

需要实现批量注册全局组件

https://blog.csdn.net/weixin_57246557/article/details/119764169

`@/components-unit/index.js`

```js
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
```

`main.js`

```js
import gobalComponents from '@/components-unit/index.js'
...
// 注册全局组件
app.use(gobalComponents)
...
```



### 4.4 更新组件结构

画布组件需要结构更新

目标结构：

```js
{
    component: 'v-text', // 组件名称，需要提前注册到 Vue
    label: '文字', // 左侧组件列表中显示的名字
    icon: 'el-icon-edit', // 左侧组件列表中显示的图标
    propValue: '文字', // 组件所使用的值
    animations: [], // 动画列表
    events: {}, // 事件列表
    style: { // 组件样式
        width: 200,
        height: 33,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '',
        letterSpacing: 0,
        textAlign: '',
        color: '',
    },
}
```



目前结构：

```js
{
    component: 'm-text',
    propValue:"hellotext",
    key: "1",
    style: {
        top: 100,
        left: 100,
        zIndex: 1,
    },
},
```



### 4.5 拖拽开始事件

```vue
<div
    class="component-item"
    v-for="item in tagState.tagList"
    :key="item.id"
    draggable="true"
    @dragstart="($event) => handleDragstart($event,item)"
>{{ item.label }}</div>
```

> v-on简写为@

```js
// 拖拽开始
function handleDragstart(event, item) {
    console.log(item);
    console.log(event);
}
```



vue3的ref绑定

https://blog.csdn.net/ZYS10000/article/details/125679946

vue3子传父，把画布dom传递出去

https://blog.csdn.net/qq_43895215/article/details/124626692

vue3在setup语法糖的情况下如何传context

https://blog.csdn.net/qq_34093387/article/details/126005287



子组件

```js
// 声明ref
const containerDom = ref(null);
let $emit = defineEmits(["getContainerDom"]); // defineEmits需要先声明再使用
const getContainerDom = () => {
    $emit("getContainerDom", containerDom.value);
};

// 挂载
onMounted(() => {
    // mounted之后才能拿到dom节点
    getContainerDom();
});
```

父组件

```vue
<!-- 中间画布区 -->
<div class="center">
    <DesignEdit @getContainerDom="handleContainerDom" />
</div>
```

```js
// 获取containerdom
const handleContainerDom = (containerDom) => {
    console.log(containerDom);
};
```



这样就可以传递画布的DOM到index啦

接下来传递DOM到物料区



这里使用props是无法直接做到子传父之后父传子的效果，需要使用defineExpose（简而言之就是拿到dom定义回调）

父组件

```vue
<!-- 左侧组件栏 -->
<div class="left">
    <DesignSupply ref="supplyRef" />
</div>
```

```js
// 获取containerdom并传递给物料区
const supplyRef = ref();
const handleContainerDom = (containerDom) => {
    supplyRef.value.hasContainerDom(containerDom);
};
```

子组件

```js
// 拿到画布DOM节点
const hasContainerDom = (dom) => {
  console.log(dom)
}
defineExpose({hasContainerDom})
```

成功



### 4.6 拖拽与画布

实现组件拖拽只能作用于画布

```js
// 拿到画布DOM节点
const domState = reactive({ containerDom: null });
const hasContainerDom = (dom) => {
    domState.containerDom = dom;
};
defineExpose({ hasContainerDom });

// 拖拽开始
const handleDragstart = (event, item) => {
	console.log(domState.containerDom)
    domState.containerDom.addEventListener("dragenter", dragenter);
    domState.containerDom.addEventListener("dragover", dragover);
    domState.containerDom.addEventListener("dragleave", dragleave);
    domState.containerDom.addEventListener("drag", drag);
};

// 拖拽API
const dragenter = (event) => {
    event.dataTransfer.dropEffect = "move";
};
const dragover = (event) => {
    event.preventDefault();
};
const dragleave = (event) => {
    event.dataTransfer.dropEffect = "none";
};
const drag = (event) => {};
```



构建组件的时候需要随机生成ID

```
npm i nanoid --save
```

https://blog.csdn.net/CLdemies/article/details/107271727

https://blog.csdn.net/weixin_62639453/article/details/127826255



1. offsetX: 432
2. offsetY: 14

需要复习一下js数组基本操作

https://blog.csdn.net/weixin_43858260/article/details/120648575



用pinia添加组件数组



### 4.6 拖拽组件居中

问题：无法获取拖拽组件的dom节点

解决：直接在componentlist中把组件的宽高给定义出来

在拖拽结束创建组件的时候，给定位减去宽高的一半即可实现效果

```js
style: {
    top: event.offsetY - componentState.currentComponent.height / 2,
    left: event.offsetX - componentState.currentComponent.width / 2,
    zIndex: 1,
},
```





### 4.7 画布组件拖拽

终于实现了

本来是在遍历组件的那个页面整mouse事件的

结果越整越不对劲，无法实现样式改变

最后发现这个效果应该在子组件那个页面进行操作

实现步骤：

- 计算出位移距离
- 修改pinia组件的样式
- 修改子组件的样式（一定要加px）

































































