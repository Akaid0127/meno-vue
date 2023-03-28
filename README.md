# :construction:施工流水账:construction:



> 此为毕设项目，希望能实现一个代码规范，正儿八经的项目:sunglasses:
>
> 目前施工阶段：低代码开发页面
>
> update_time：2023-03-28



借鉴平台：

低代码（可视化拖拽）教学项目https://github.com/woai3c/visual-drag-demo

即时设计https://js.design/



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



安装vue-contextmenu

```
npm i vue3-contextmenu --save
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



### 4.8 右键删除组件

右键点击事件的绑定

在npm上找到一个vue3的右击事件组件

```
npm install -save @imengyu/vue3-context-menu
```

在main中引入

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
...
// 右键菜单
app.use(ContextMenu)    
...
```

在组件中使用

```js
import { ContextMenu } from "@imengyu/vue3-context-menu"; // 一定要结构写法，否则会警告
```

添加组件

```html
<div v-for="item in blockState.blocksData" :key="item.key">
    <edit-block :block="item" @contextmenu="$event=>onContextMenu($event)"></edit-block>
</div>
<context-menu
    :show="contextState.show"
    @close="closeContextMenu"
    :options="contextState.optionsComponent"
>
    <context-menu-item label="删除组件" @click="delComponent" />
    <context-menu-sperator />
    <context-menu-item label="上移组件" @click="upComponent" />
    <context-menu-item label="下移组件" @click="downComponent" />
</context-menu>
```

绑定事件

```js
// 右键菜单
const contextState = reactive({
    show: false, // 弹框是否显示
    //For component
    optionsComponent: {
        zIndex: 99,
        minWidth: 100,
        x: 100,
        y: 500,
    },
});

const onContextMenu = (e) => {
    e.preventDefault();
    console.log("onButtonClick");
    //显示组件菜单
    contextState.optionsComponent.x = e.x;
    contextState.optionsComponent.y = e.y;
    contextState.show = true;
};

// 右键弹框意外关闭一定要设false
const closeContextMenu = () => {
    contextState.show = false;
};

const delComponent = () => {
    console.log("删除组价");
    contextState.show = false;
};

const upComponent = () => {
    console.log("上移组件");
    contextState.show = false;
};

const downComponent = () => {
    console.log("下移组件");
    contextState.show = false;
};
```



目前定义了功能项：

- 删除组件
- 上移组件
- 上移组件



删除组件在delComponent方法中定义就行

提前在pinia存储中写好action，参数为待删除组价的key值

pinia

```js
// 删除组件
delBlock(currentComponentKey) {
    // 从后向前遍历，这样就算后面的数据前移，也不影响继续遍历
    for (let i = this.pageData.blocks.length - 1; i >= 0; i--) {
        if (this.pageData.blocks[i].key === currentComponentKey) {
            this.pageData.blocks.splice(i, 1);
        }
    }
},
```

画布组件

```js
// 需要拿到当前操作组件的key
const componentState = reactive({
    currentComponentKey: "",
});
...
const delComponent = () => {
	editingStore.delBlock(componentState.currentComponentKey)
    contextState.show = false;
};
```



上移图层下移图层想后面整完div区域划分和组件属性定义再整



todofix：

- 组件拖拽出界
- 消息提醒
- 组件移动过程中pinia也是不断变化



### 4.9 组件放大缩小

css cursor属性

https://blog.csdn.net/ixygj197875/article/details/79338360



根据物料宽高计算组件八个原点的位置

以及每个原点对应的cursor手势进行修改

```js
const pointList = ["t", "r", "b", "l", "lt", "rt", "lb", "rb"];
const cursorList = ["n", "e", "s", "w", "nw", "ne", "sw", "se"];
```

```js
const getPointStyle = (point) => {
    // 获取组件宽高
    const width = props.curComponent.style.width;
    const height = props.curComponent.style.height;

    const curCursor = cursorList[pointList.indexOf(point)];

    const hasT = /t/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);
    const hasR = /r/.test(point);

    let newLeft = 0;
    let newTop = 0;

    // 四个角的点
    if (point.length === 2) {
        newLeft = hasL ? 0 : width;
        newTop = hasT ? 0 : height;
    } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
            newLeft = width / 2;
            newTop = hasT ? 0 : height;
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
            newLeft = hasL ? 0 : width;
            newTop = Math.floor(height / 2);
        }
    }

    const style = {
        marginLeft: hasR ? "-4px" : "-3px",
        marginTop: "-3px",
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: curCursor + "-resize",
    };

    return style;
};
```



在左侧物料区组价拖拽结束的时候需要将组件样式进行完美修改

这样拖拽结束组件才有宽高属性

```js
const drop = (event) => {
	// 拖拽结束
    const tempComponent = {
        component: componentState.currentComponent.component,
        propValue: componentState.currentComponent.label,
        key: nanoid(),
        style: {
			width:componentState.currentComponent.width,
			height:componentState.currentComponent.height,
            top: event.offsetY - componentState.currentComponent.height / 2,
            left: event.offsetX - componentState.currentComponent.width / 2,
            zIndex: 1,
        },
    };
    editingStore.addBlock(tempComponent);
};
```



实现点击组件才显示shape



- 所有blocks
- 当前点击的block



点击当前block

setpinia里当前block

遍历所有blocks

如果item.key === curBlock.key，则active true

如果item.key !== curBlock.key，则active false



选中当前组件添加一个focus属性

```js
// 实现点击组件焦点
const handleClickBlock = (block) => {
    // 遍历清空
    blockState.blocksData.forEach((item) => {
        item.focus = false;
    });
    blockState.blocksData.forEach((item) => {
        if (item.key === block.key) {
            item.focus = true;
        }
    });
};
```



交给props一层一层传递

```html
<div v-for="item in blockState.blocksData" :key="item.key">
    <edit-block
        :block="item"
        :blockFocus="item.focus"
        @click="handleClickBlock(item)"
        @contextmenu="$event=>onContextMenu($event,item)"
    ></edit-block>
</div>
```

```vue
<edit-shape
    :defaultStyle="blockStyle"
    :curComponent="props.block"
    :curActive="props.blockFocus"
>
    <component
        class="block"
        :is="props.block.component"
        :propValue="props.block.propValue"
        @mousedown="$event => handleMousedown($event)"
    >组件</component>
</edit-shape>
```

```vue
<div
    class="edit-shape"
    :style="props.defaultStyle"
    @mousedown="handleMouseDown"
>
    <div
        class="shape-point"
        v-for="(item, index) in pointList"
        :key="index"
        v-show="props.curActive"
        @mousedown="handleMouseDownOnPoint(item)"
        :style="getPointStyle(item)"
    ></div>
    <!-- 插槽接收component -->
    <slot></slot>
</div>
```



给选中的组件设置外轮廓

```vue
<div
    :class="props.curActive?'edit-shape-line':'edit-shape'"
    :style="props.defaultStyle"
    @mousedown="handleMouseDown"
>
    ...
</div>
```

```scss
.edit-shape {
    position: absolute;
    outline: 1px solid transparent;
}

.edit-shape-line {
    position: absolute;
    outline: 1px solid #59c7f9;
    .shape-point {
        position: absolute;
        background: #fff;
        border: 1px solid #59c7f9;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        z-index: 99;
    }
}
```



放大缩小

- 点击小圆点时，记录点击的坐标 xy
- 假设我们现在向下拖动，那么 y 坐标就会增大
- 用新的 y 坐标减去原来的 y 坐标，就可以知道在纵轴方向的移动距离是多少
- 最后再将移动距离加上原来组件的高度，就可以得出新的组件高度
- 如果是正数，说明是往下拉，组件的高度在增加。如果是负数，说明是往上拉，组件的高度在减少



```js
const handleMouseDownOnPoint = (point) => {
    const downEvent = window.event;
    downEvent.stopPropagation();
    downEvent.preventDefault();
    const pos = { ...props.defaultStyle };

    const height = Number(pos.height.slice(0, -2));
    const width = Number(pos.width.slice(0, -2));
    const top = Number(pos.top.slice(0, -2));
    const left = Number(pos.left.slice(0, -2));
    const startX = downEvent.clientX;
    const startY = downEvent.clientY;

    const move = (moveEvent) => {
        const currX = moveEvent.clientX;
        const currY = moveEvent.clientY;
        const disY = currY - startY;
        const disX = currX - startX;
        const hasT = /t/.test(point);
        const hasB = /b/.test(point);
        const hasL = /l/.test(point);
        const hasR = /r/.test(point);
        const newHeight = height + (hasT ? -disY : hasB ? disY : 0);
        const newWidth = width + (hasL ? -disX : hasR ? disX : 0);

        pos.height = (newHeight > 0 ? newHeight : 0) + "px";
        pos.width = (newWidth > 0 ? newWidth : 0) + "px";
        pos.left = left + (hasL ? disX : 0) + "px";
        pos.top = top + (hasT ? disY : 0) + "px";

		// 修改组件
        editingStore.updateBlockSize(
            props.curComponent.key,
            pos.top,
            pos.left,
            pos.width,
            pos.height
        );
        // 修改样式
		emit("blockStyle", pos);
    };

    const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
};
```



这一功能完成之后出现一些problem：

- 圆点并不会跟随改变
- 组件本身长宽也不会改变
- 组件改变大小后无法拖拽



用了一下午解决了这些问题

总的来说就是props有时候并不能直接拿来用

最好做一层reactive封装





























