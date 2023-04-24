# :construction:施工流水账:construction:



> 此为毕设项目，希望能实现一个代码规范，正儿八经的项目:sunglasses:
>
> 目前施工阶段：低代码开发页面
>



借鉴作品：

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



### 4.7 拖拽组件居中

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





### 4.8 画布组件拖拽

终于实现了

本来是在遍历组件的那个页面整mouse事件的

结果越整越不对劲，无法实现样式改变

最后发现这个效果应该在子组件那个页面进行操作

实现步骤：

- 计算出位移距离
- 修改pinia组件的样式
- 修改子组件的样式（一定要加px）



### 4.9 右键删除组件

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



### 4.10 组件放大缩小

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



### 4.11 画布组件结构

必须规划画布组件结构

首先目前拥有的组件有关结构的属性为z-index

但z-index属于css层级属性，值越大，层级越高



可不可以根据z-index属性定义组件间的嵌套关系（方便后面代码导出）

可以这样：

- z-index值越小
- 显示层级越小
- 嵌套层级越高

同一层级分别嵌套不同数量的子组件怎么办？



任务：

- 定义左侧组件缩略列表
- 组件创建的时候层级为最高层级
- 组件上调层级和下调层级



定义左侧组件缩略列表

直接调用pinia就行

> 很意外，这里简单调用pinia就能实现实时渲染，不得不佩服pinia和vue3组合的强大



接下来实现

- 画布获取焦点的组件，组件缩略列表对应组件背景变灰
- 点击组件缩略列表，画布对应组件获取焦点

意思就是组件焦点的双向操作



vue3的全局事件总线

https://blog.csdn.net/Heartnottowake/article/details/124072686



实现点击组件菜单

画布组件获取焦点



### 4.12 组件属性列表

获取到当前焦点组件（所有属性）

提取当前组件的style对象

提取style对象中所有key形成一个styleKeys的数组

遍历数组

> 打算还是通过全局总线的方式解决getCurStyle



画布组件

```js
// 实现组件焦点效果
const setBlockFocus = (data) => {
    blockState.blocksData.forEach((item) => {
        item.focus = false; // 遍历清空
    });
    blockState.blocksData.forEach((item) => {
        if (item.key === data) {
            editingStore.setCurBlock(item.key); // 更新pinia-editing
            emitter.emit("getCurBlock", item.key); // 获取列表组件焦点
			emitter.emit("getCurStyle", item); // 获取焦点组件属性
            item.focus = true;
        }
    });
};
```

属性组件

```js
// 接收当前组件style
const curState = reactive({
    curStyle: {},
    styleKeys: [],
});
emitter.on("getCurStyle", (data) => {
    curState.curStyle = data.style;
    curState.styleKeys = Object.keys(data.style);
});
```



在通用组件文件夹简历一个styleList键值对应的对象

```
const styleList = {
	"width":"宽度",
	"height":"高度",
	"top":"位置Y",
	"left":"位置X",
	"zIndex":"层级",
}

export default styleList
```



对于样式列表其实就是遍历

考虑到后期样式的多样性，可以使用`v-if`，`v-else-if`

```vue
<div class="list">
    <n-form label-placement="left" label-width="auto">
        <n-form-item
            v-for="(key, index) in curState.styleKeys"
            :key="index"
            :label="styleLabelList[key]"
        >
            <n-input-number v-model:value="curState.curStyle[key]" />
        </n-form-item>
    </n-form>
</div>
```



在画布中拉动组件位置未出现警告

但是在画布中拉动组件大小的时候，出现额外单位、类型不匹配等错误

这是在提交pinia数据的时候没有做好类型装换，需要将string转换为number

修改editshape中提交pinia数据部分

```js
// 修改组件 *注意这里修改pinia中数据的时候一定要去掉单位*
editingStore.updateBlockSize(
    props.curComponent.key,
    Number(pos.top.slice(0, -2)),
    Number(pos.left.slice(0, -2)),
    Number(pos.width.slice(0, -2)),
    Number(pos.height.slice(0, -2))
);
```

修改designsupply中提交pinia数据部分

```js
const drop = (event) => {
    // 拖拽结束 添加组件
    const tempComponent = {
        component: componentState.currentComponent.component,
        propValue: componentState.currentComponent.label,
        key: nanoid(),
        focus: false,
        style: {
            width: Number(componentState.currentComponent.width),
            height: Number(componentState.currentComponent.height),
            top: Number(event.offsetY - componentState.currentComponent.height / 2),
            left: Number(event.offsetX - componentState.currentComponent.width / 2),
            zIndex: 1,
        },
    };
    editingStore.addBlock(tempComponent);
};
```



接下来实现修改input内容，实现组件样式调整

改变属性值的同时，怎么改变pinia中组件属性？

设置监听

```js
// 深度监听表单数据
watch(
    () => curState.curStyle,
    (curStyle) => {
		editingStore.updateBlockStyle(curState.curkey,curStyle)
    },
    {
        deep: true,
    }
);
```

在pinia里定义方法

```js
// 更新组件样式
updateBlockStyle(key,curStyle){
    this.pageData.blocks.forEach((item) => {
        if (item.key === key) {
            const styleKeys = Object.keys(curStyle);
            styleKeys.forEach((key) => {
                item.style[key] = curStyle[key]
            })
        }
    })
}
```

这样数据确实是修改了

但是画布上的组件样式并没有修改

还要设置全局事件总线实现样式实时改变

此路不通



样式绑定应该绑定在子组件editblock上

```js
// 组件修改属性样式绑定
emitter.on("setCurStyle", (data) => {
    if (blockState.key === data.key) {
        blockState.style.width = data.style.width + "px";
        blockState.style.height = data.style.height + "px";
        blockState.style.top = data.style.top + "px";
        blockState.style.left = data.style.left + "px";
        blockState.style.zIndex = data.style.zIndex;
    }
}); // 组件属性-->画布
```



### 4.13 右键改变组件层级

就是直接修改z-index就可以



### 4.14 撤销和反撤销操作

首先整理一下目前能够引起editing里数据变化的操作

- 物料区拖拽组件
- 画布拖拽组件
- 放大缩小组件
- ~~改变组件属性（这样无疑增加巨量快照，不可取）~~
- 右键删除组件
- 右键改变组件层级



新建操作快照的状态集中管理：snapshot

```js
import { defineStore } from 'pinia'

const useSnapshot = defineStore('snapshot', {
	actions: {
		// 存入数据快照
		addSnapshot(data) {
			this.snapshotData.push(data)
			this.snapshotIndex++
		},

		// 撤销操作
		cancelOperate() {
			if (this.snapshotIndex !== 0) {
				this.snapshotIndex--
			}
		},

		// 返回操作
		rebackOperate() {
			if (this.snapshotIndex < this.snapshotData.length - 1) {
				this.snapshotIndex++
			}
		},
	},

	state: () => {
		return {
			snapshotData: [[
				{
					component: 'm-text',
					propValue: "hellotext",
					key: "defaultkey1",
					focus: false,
					style: {
						width: 80,
						height: 40,
						top: 100,
						left: 100,
						zIndex: 1,
					},
				},
				{
					component: 'm-button',
					propValue: "hellobutton",
					key: "defaultkey2",
					focus: false,
					style: {
						width: 80,
						height: 40,
						top: 200,
						left: 200,
						zIndex: 1,
					},
				},
				{
					component: 'm-input',
					propValue: "helloinput",
					key: "defaultkey3",
					focus: false,
					style: {
						width: 80,
						height: 40,
						top: 300,
						left: 300,
						zIndex: 1,
					},
				}
			]], // 组件数据快照
			snapshotIndex: 0, // 快照索引从负一开始
		}
	}

})

export default useSnapshot
```



需要设置第一个快照

等后面完善后台之后

拿到的第一个快照是第一次初始化的json数据



在editing操作完成之后

进行快照的存储工作

```js
...
editingStore.addBlock(tempComponent);
// 添加快照
snapshotStore.addSnapshot([...editingStore.pageData.blocks]) // 存储的快照不能是响应式的，需要深拷贝
...
```



在页面的撤销和反撤销按钮绑定事件

```js
// 撤销
const handlePrevious = () => {
    snapshotStore.cancelOperate();
    const tempData = snapshotStore.snapshotData[snapshotStore.snapshotIndex];
    editingStore.resetBlocks(tempData);
};

// 反撤销
const handleReback = () => {
    snapshotStore.rebackOperate();
    const tempData = snapshotStore.snapshotData[snapshotStore.snapshotIndex];
    editingStore.resetBlocks(tempData);
};
```



在editing中添加重置action，这里需要手动splice清空，才能确保画布响应

```js
// 重置画布组件
resetBlocks(data){
    // console.log(data)
    this.pageData.blocks.splice(0, this.pageData.blocks.length)
    data.forEach((item) => {
        this.pageData.blocks.push(item)
    })
},
```



这样就完成了一个物料区拖拽组件实现的撤销操作



接下来实现画布拖拽组件时记录组件快照

先看一下原组件写法

```js
// 组件选中画布中拖拽
const handleMousedown = (event) => {
	...
    const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
};
```



重点是在鼠标抬起的一瞬间记录组件快照

也就是up这里

以下方法是不对的，前后两次移动的时候，组件的style属性也是响应式的，需要进一步消除响应式

```js
// 添加快照
console.log([...editingStore.pageData.blocks])
// snapshotStore.addSnapshot([...editingStore.pageData.blocks]);
```

```js
// 添加快照
const tempArr = []
editingStore.pageData.blocks.forEach(item => {
    tempArr.push({...item})
});
console.log(tempArr)
// snapshotStore.addSnapshot([...editingStore.pageData.blocks]);
```



如何消除vue对数据的响应式封装

`editingStore.pageData.blocks`是一个对象数组



ES6的拓展运算符属于第一层深拷贝、之后的子层属于浅拷贝，无法消除子层的响应式

这里关于JavaScript的深拷贝和浅拷贝需要记录以下

https://blog.csdn.net/HJHAlone/article/details/124551759



可不可以通过手写深拷贝函数，消除数据的响应式

对snapshot进行修改

```js
// 深拷贝
deepClone(source, target) {
    var _tar = target || {};
    for (var key in source) {
        if (source.hasOwnProperty(key) && source[key] != null) {
            if (typeof source[key] === "object") {
                _tar[key] = (Object.prototype.toString.call(source[key]) === "[object Array]")
                    ? [] : {};
                this.deepClone(source[key], _tar[key]);
            } else {
                _tar[key] = source[key];
            }
        }
    }
    return _tar;
},

// 存入数据快照
addSnapshot(data) {
    const tempArr = []
    data.forEach(item => {
        tempArr.push(this.deepClone(item))
    });
    this.snapshotData.push(tempArr)
    this.snapshotIndex++
},
```



这样确实实现了

但是数据改变，画布组件的效果并没有改变

还是要修改组件的样式效果

在designheader和editblock中应用全局事件总线

```js
// 撤销
const handlePrevious = () => {
    snapshotStore.cancelOperate();
    const tempData = snapshotStore.snapshotData[snapshotStore.snapshotIndex];
    editingStore.resetBlocks(tempData);	
	emitter.emit("setOperateStyle",tempData)
};

// 反撤销
const handleReback = () => {
    snapshotStore.rebackOperate();
    const tempData = snapshotStore.snapshotData[snapshotStore.snapshotIndex];
    editingStore.resetBlocks(tempData);
	emitter.emit("setOperateStyle",tempData)
};
```

```js
emitter.on("setOperateStyle", (data) => {
    console.log(data);
    const tempData = [...data];
    tempData.forEach((item) => {
        if (blockState.key === item.key) {
            blockState.style.top = item.style.top + "px";
            blockState.style.left = item.style.left + "px";
        }
    });
});
```



至此完成了画布拖拽组件撤销和反撤销操作

测试的时候会有小bug，index错位

不知道是不是执行顺序问题，还是全局事件总线存在异步问题，还有可能是内存问题

因为在快照存储的时候，我是将所有组件信息进行存储



接下来实现放大缩小组件的撤销和反撤销操作

先看看放大缩小组件的操作代码（应该是控制shape上的八个小点放大缩小）

```js
// 圆点位置鼠标落下
const handleMouseDownOnPoint = (point) => {
	...
    const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
};
```



直接在鼠标抬起时候添加快照

```js
const up = () => {
    // 添加快照
    snapshotStore.addSnapshot([...editingStore.pageData.blocks]);
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
};
```

接着修改editblock中全局事件总线的监听，添加组件的长度和高度

```js
emitter.on("setOperateStyle", (data) => {
    data.forEach((item) => {
        if (blockState.key === item.key) {
            blockState.style.width = item.style.width + "px";
            blockState.style.height = item.style.height + "px";
            blockState.style.top = item.style.top + "px";
            blockState.style.left = item.style.left + "px";
        }
    });
}); // 组件操作-->画布
```



接下来实现以下两个步骤的快照

- 右键删除组件
- 右键改变组件层级

这部分应该在designedit里的右键菜单部分

```js
const delComponent = () => {
    editingStore.delBlock(componentState.currentComponentKey);
    contextState.show = false;
}; // 删除组件
const upComponent = () => {
	editingStore.updateBlockZindex(componentState.currentComponentKey,"up")
    contextState.show = false;
}; // 上移组件
const downComponent = () => {
	editingStore.updateBlockZindex(componentState.currentComponentKey,"down")
    contextState.show = false;
}; // 下移组件
```



实现逻辑有问题

用户不断不断操作

snapshotIndex不断增加，跟随数据增加

但是用户撤销的时候，snapshotIndex减少，

这时候用户再进行操作，存储的数据位置



time1用户四次操作，snapshotData存储4个，snapshotIndex加为4，页面四个按钮

time2用户撤销两次操作，snapshotData仍存储4个，snapshotIndex变为2，页面两个按钮

time3用户继续添加输入框1，snapshotData存储5个，snapshotIndex变为3，页面两个按钮、一个输入框

time4用户返回一次操作，snapshotData存储5个，snapshotIndex变为4，页面显示的是四个按钮



按用户的逻辑，这时候应该显示两个按钮，但是页面显示了四个按钮，这就是因为指针错位

先把所有快照列出来，看一看

| 1     | 2     | 3     | 4     | 5       |
| ----- | ----- | ----- | ----- | ------- |
| 按钮1 | 按钮1 | 按钮1 | 按钮1 | 按钮1   |
|       | 按钮2 | 按钮2 | 按钮2 | 按钮2   |
|       |       | 按钮3 | 按钮3 | 输入框1 |
|       |       |       | 按钮4 |         |
|       |       |       |       |         |
|       |       |       |       |         |

按照用户的逻辑快照是不是应该是这样

| 1     | 2     | 3     | 4     | 5     | 6     | 7       | 8     |
| ----- | ----- | ----- | ----- | ----- | ----- | ------- | ----- |
| 按钮1 | 按钮1 | 按钮1 | 按钮1 | 按钮1 | 按钮1 | 按钮1   | 按钮1 |
|       | 按钮2 | 按钮2 | 按钮2 | 按钮2 | 按钮2 | 按钮2   | 按钮2 |
|       |       | 按钮3 | 按钮3 | 按钮3 |       | 输入框1 |       |
|       |       |       | 按钮4 |       |       |         |       |
|       |       |       |       |       |       |         |       |
|       |       |       |       |       |       |         |       |

找到原因了，在撤销和反撤销的时候没有存储快照

继续修改snapshot中撤销和反撤销操作源码



又有错误

在返回的时候应该是不用存储快照的

先这样吧

```js
// 撤销操作
cancelOperate(data) {
    if (this.snapshotIndex !== 0) {
        const tempArr = []
        data.forEach(item => {
            tempArr.push(this.deepClone(item))
        });
        console.log(tempArr)
        this.snapshotData.push(tempArr)
        this.snapshotIndex--
    }
},

// 返回操作
rebackOperate(data) {
    if (this.snapshotIndex < this.snapshotData.length - 1) {
        const tempArr = []
        data.forEach(item => {
            tempArr.push(this.deepClone(item))
        });
        console.log(tempArr)
        this.snapshotData.push(tempArr)
        this.snapshotIndex++
    }
},
```



### 4.15 样式修改

目前注册的组件有三个

- 文本
- 按钮
- 输入框

先对以上进行样式修改



目前的样式很简单，就是

- width
- height
- top
- left
- zIndex



需要添加

- background-color背景颜色
  - hex
- border-style边框类型
  - `dotted` - 定义点线边框
  - `dashed` - 定义虚线边框
  - `solid` - 定义实线边框
  - `double` - 定义双边框
  - `none` - 定义无边框
- border-width边框宽度
- border-color边框颜色
- opacity透明度
- border-radius圆角边框
- color文本颜色
- font-style字体样式
- font-weight字体粗细
- font-size字体大小



修改完成后三个组件的基本样式

```js
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
```



组件样式表

|                 | m-text | m-button | m-input |      |      |      |      |      |      |
| --------------- | ------ | -------- | ------- | ---- | ---- | ---- | ---- | ---- | ---- |
| width           | √      | √        | √       |      |      |      |      |      |      |
| height          | √      | √        | √       |      |      |      |      |      |      |
| zIndex          | √      | √        | √       |      |      |      |      |      |      |
| backgroundColor | √      | √        | √       |      |      |      |      |      |      |
| borderStyle     | √      |          |         |      |      |      |      |      |      |
| borderWidth     | √      |          |         |      |      |      |      |      |      |
| borderColor     | √      |          |         |      |      |      |      |      |      |
| opacity         | √      | √        | √       |      |      |      |      |      |      |
| borderRadius    | √      | √        | √       |      |      |      |      |      |      |
| color           | √      | √        |         |      |      |      |      |      |      |
| fontStyle       | √      |          |         |      |      |      |      |      |      |
| fontWeight      | √      |          |         |      |      |      |      |      |      |
| fontSize        | √      | √        | √       |      |      |      |      |      |      |



### 4.16 注册更多组件

希望实现的组件有

- 矩形（文本组件去掉文字及文字相关属性）

- 圆形（边框圆角百分之50）

- 图片

- 图标




按钮和输入框的原生效果需要消除

```css
button{
	//边框清掉
	border:0;
	outline:none;
	//背景颜色清掉
	background-color: transparent;
}
```



修改组件结构

增加styleDefault固有样式

例如圆形

```js
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
```

在supply物料区中修改

```js
const tempComponent = {
    component: componentState.currentComponent.component,
    propValue: componentState.currentComponent.label,
    key: nanoid(),
    focus: false,
    style: {
        width: Number(componentState.currentComponent.style.width),
        height: Number(componentState.currentComponent.style.height),
        top: Number(
            event.offsetY - componentState.currentComponent.style.height / 2
        ),
        left: Number(
            event.offsetX - componentState.currentComponent.style.width / 2
        ),
        zIndex: Number(componentState.currentComponent.style.zIndex),
    },
    styleDefault: {
        ...componentState.currentComponent.styleDefault,
    },
};

if (tempComponent.component === "m-text") {
    ...
} 
...
else if (tempComponent.component === "m-circular") {
    tempComponent.style = {
        ...tempComponent.style,
        backgroundColor:
            componentState.currentComponent.style.backgroundColor,
        borderStyle: componentState.currentComponent.style.borderStyle,
        borderWidth: Number(
            componentState.currentComponent.style.borderWidth
        ),
        borderColor: componentState.currentComponent.style.borderColor,
        opacity: Number(componentState.currentComponent.style.opacity),
    };
}

```



实现图片组件

注意src要动态引入使用require才能引入本地图片

```vue
<template>
    <img
        class="image-wrap"
        :src="props.propUrl?props.propUrl:require('@/assets/testImage.jpg')"
        :style="{
			width:compState.propStyle.width,
			height:compState.propStyle.height,
		}"
    />
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps(["propStyle", "propUrl"]);
const compState = reactive({
    propStyle: props.propStyle,
});
</script>
```



在组件属性attr中修改表单

简单来说就是给图片组件加一个propUrl的属性

用来存放http链接地址

```html
<n-form-item
    v-if="curState.curComponent==='m-rectangle'
    ||curState.curComponent==='m-circular'
    ||curState.curComponent==='m-image'"
    label="组件名称"
>
    <n-input
        v-model:value="curState.curValue"
        type="text"
        placeholder="请输入组件名称"
    />
</n-form-item>

<n-form-item v-if="curState.curComponent==='m-image'" label="图片链接">
    <n-input
        v-model:value="curState.curImgUrl"
        type="textarea"
        placeholder="请输入图片链接(http://...)"
    />
</n-form-item>
```



图标组件怎么实现？

SVG图标？？

普通html图标的实现

```html
<style>
    .svgLog{
        width: 50px;
        height: 50px;
        color: aqua;
    }
</style>


<div class="svgLog">
    <svg>...</svg>
</div>
```



怎么取到特定svg图标

打算使用v-html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<div id="app">
			<p v-text="msg"></p>
			<p v-html="msg"></p>
			<p>{{msg}}</p>
		</div>
		<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
		<script>
			new Vue({
				el: "#app",
				data: {
					msg: "<span>Hello Vue</span>",
				},
			});
		</script>
	</body>
</html>
```



将所有的svg图标加载为类对象数组

```js
curSvg = {
    {
        name:"Plus",
        svgValue:"<svg>...<svg>"
    },
}
svgArr = [
    {
        name:"Plus",
        svgValue:"<svg>...<svg>"
    },
    {
        name:"Minus",
        svgValue:"<svg>...<svg>"
    },
    {
        name:"CirclePlus",
        svgValue:"<svg>...<svg>"
    },
]
```

图标组件结构

```html
<div class="svgLog" v-html="curSvg.svgValue">
    <svg>...</svg>
</div>
```



成功实现图标组件

```html
<template>
    <div
        class="icon-wrap"
        v-html="svgArr[props.propIndex].svgValue"
        :style="{
			width:comState.comStyle.width,
			height:comState.comStyle.height,
		}"
    ></div>
</template>

<script setup>
import { reactive } from "vue";
import svgArr from "../iconData";
const props = defineProps(["propStyle", "propIndex"]);
const comState = reactive({
    comStyle: props.propStyle,
});
</script>
```



接下来就是把element图标全部搬过来



### 4.17 JSON显示

选用naive模态组件

安装highlight.js实现代码高亮

使用n-config-provider组件

使用n-code组件



找了一圈代码格式化的插件，

没想到JSON.stringify的第三个参数可以直接调整缩进和换行

```
JSON.stringify(value, replacer, space)
```

1. value：第一个参数，将要序列后成 JSON 字符串的值。
2. replacer：【可选】第二个参数
   1. 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；
   2. 如果参数是一个数组，则仅转换该数组中具有键值的成员。成员的转换顺序与键在数组中的顺序一样。
   3. 如果该参数为未提供或者null ，则对象所有的属性都会被序列化。
3. space：【可选】第三个参数，美化文本格式，文本添加缩进、空格和换行符，
   1. 如果 该参数 是一个数字，则返回值文本在每个级别缩进指定数目的空格
   2. 该参数最大值为10，如果 该参数大于 10，则文本缩进 10 个空格。
   3. 该参数也可以使用非数字，如：\t。最大值为10

```html
<n-button @click="handleDeriveJson">JSON</n-button>
<n-modal
    v-model:show="showModal.jsonModal"
    class="custom-card"
    preset="card"
    :style="{width:'740px',height:'700px'}"
    title="JSON数据"
    size="huge"
    :bordered="true"
    :segmented="{content:'soft',footer:'soft'}"
>
    <n-scrollbar style="max-height: 560px" trigger="none">
        <n-code
            :code="codeState.jsonCode"
            language="javascript"
            show-line-numbers
            trim
        />
    </n-scrollbar>
</n-modal>
```

```js
const handleDeriveJson = () => {
    showModal.jsonModal = true;
    const jsonData = JSON.stringify(editingStore.pageData.blocks, null, 2);
    codeState.jsonCode = `${jsonData}`;
};
```



### 4.18 HTML显示

打算使用json2html

http://www.json2html.com/docs/#main-type-dom

>json2html is an open source javascript library that uses js templates to render JSON objects into HTML.
>
>Build lightning fast, interactive client side templates using nothing but javascript.

json2html是一个开源javascript库，它使用js模板将JSON对象呈现为HTML。

只使用javascript构建闪电般快速的交互式客户端模板。



需要实现

- 标签解析
- 属性解析
- 样式解析



json2html有三种解析html模板的方式分别是

- dom
- block
- component



JavaScript如何读取和修改本地文件（FileReader）

浏览器中的 JavaScript 是没有文件操作的能力的（基于安全，不能直接操作本地文件）

但是 Node 中的 JavaScript 具有文件操作的能力



导出html应该是相对简单的，因为js的writer()语法就可以实现输出

```
let resHtml = `<!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1.0">
                    ${.htmlContent}
                    </body>
                </html>`
       writer(`${new Date().getTime()}.html`, resHtml, "utf-8");
```



FileSaver.js 是在客户端保存文件的解决方案，非常适合在客户端生成文件的 Web 应用程序



响应式非常简单，只需要

```js
// 消除响应式
let jsonData = JSON.parse(JSON.stringify(objData)) 
```



对于不提供npm客户端的包直接import

```
import './json2html.min';
```



目前的组件信息

1. **component**: "m-text"
2. **focus**: false
3. **key**: "defaultkey1"
4. **propValue**: "hellotext"
5. **style**: {width: 80, height: 40, top: 100, left: 100, zIndex: 1, …}
6. **styleDefault**: {}



obj转html

1. 拿到组件数组，消除响应式
2. 遍历组件数组，匹配对应组件标签
3. 填入标签模板，加上组件属性
4. 插入html模板返回

```js
function objToHtml(objData) {
	const jsonData = JSON.parse(JSON.stringify(objData)) // 消除响应式

	let comTemplateArr = [] // 组件模板数组
	let resTemplate = "" // 结果组件模板

	jsonData.forEach(item => {
		if (item.component === "m-text") {
			let data = [{ "propValue": item.propValue },];
			let template = { '<>': 'div', 'html': '${propValue}' };
			comTemplateArr.push(json2html.render(data, template))
		}
		else if (item.component === "m-button") {
			let data = [{ "propValue": item.propValue },];
			let template = { '<>': 'button', 'html': '${propValue}' };
			comTemplateArr.push(json2html.render(data, template))
		}
		else if (item.component === "m-input") {
			let data = [{ "propValue": "", "placeValue": item.propValue },];
			let template = { '<>': 'input', 'html': 'propValue', 'placeholder': '${placeValue}' };
			comTemplateArr.push(json2html.render(data, template))
		}
		else if (item.component === "m-rectangle") {
			let data = [{ "propValue": "" }];
			let template = { '<>': 'div', 'html': '${propValue}' };
			comTemplateArr.push(json2html.render(data, template))
		}
		else if (item.component === "m-circular") {
			let data = [{ "propValue": "" }];
			let template = { '<>': 'div', 'html': '${propValue}' };
			comTemplateArr.push(json2html.render(data, template))
		}
		else if (item.component === "m-image") {
			let data = [{ "propValue": "", "srcValue": `${item.propUrl}` }];
			let template = { '<>': 'img', 'html': '${propValue}', 'src': '${srcValue}' };
			comTemplateArr.push(json2html.render(data, template))
		}
		else if (item.component === "m-icon") {
			console.log(item.propIndex)
			let data = [{ "propValue": `${svgArr[item.propIndex].svgValue}` },];
			let template = { '<>': 'div', 'html': '${propValue}' };
			comTemplateArr.push(json2html.render(data, template))
		}
	});

	comTemplateArr.forEach((item) => {
		resTemplate = resTemplate + item + "\n\t"
	})


	// HTML模板
	let htmlData = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	<!-- insert components -->
</body>
</html>`

	const insertComIndex = htmlData.indexOf("<!-- insert components -->")
	htmlData = htmlData.slice(0, insertComIndex) + resTemplate + htmlData.slice(insertComIndex)

	return htmlData
}

```



如何转化组件样式

首先我们拥有组件的key作为唯一标识

可以采用`componentType-key`作为class名

class内容怎么确定？

已有组件的style对象，可以拿到style的key数组

直接插入不就行了吗?

不行，有些css属性在class里使用`-`连接，而对象中采用驼峰命名

需要对属性名做处理

```js
let comCssArr = [] // 组件样式数组
let comCssRes = "" // 组件样式字符串

const cssKeyTransform = (sourceString) => {
    const sourceLen = sourceString.length
    for (let i = 0; i < sourceLen; i++) {
        if (sourceString[i] === sourceString[i].toUpperCase()) {
            sourceString = sourceString.slice(0, i) + `-${sourceString[i].toLowerCase()}` + sourceString.slice(i + 1, sourceLen)
        }
    }
    return sourceString
} // backgroundColor to background-color

jsonData.forEach(item => {
    const keyArr = Object.keys(item.style)
    let cssStringArr = []
    keyArr.forEach((key) => {
        if (key === "width" || key === "height" || key === "top" || key === "left" ||
            key === "borderWidth" || key === "borderRadius" || key === "fontSize") {
            let cssString = `${cssKeyTransform(key)}:${item.style[key]}px;`
            cssStringArr.push(cssString)
        } else {
            let cssString = `${cssKeyTransform(key)}:${item.style[key]};`
            cssStringArr.push(cssString)
        }
    })
    let sentenceRes = ""
    cssStringArr.forEach((i) => {
        sentenceRes = sentenceRes + "\t\t" + i + "\n"
    })
    let comCssString = `.${item.component}-${item.key}{\n${sentenceRes}\t}`
    comCssArr.push(comCssString)
})

comCssArr.forEach((item) => {
    comCssRes = comCssRes + item + "\n\n\t"
})

```



### 4.19 导出JSON和HTML

使用file-saver

- mode：导出的文件后缀
- htmlString：导出的文件内容

```js
import { saveAs } from 'file-saver';

// 导出html
function exportHtml(mode, htmlString) {
	let blob = new Blob([htmlString], { type: "text/plain;charset=utf-8" });
	saveAs(blob, `testFile.${mode}`);
}

export default exportHtml
```



就下来就可以正式开始后台Strapi的编写了

增删改查

低代码页面的遗留问题：

- 组件的拖动会超出限定范围
- 组件属性的事件未定义

日后再解决



## 五、数据结构设计

以上完成的低代码页面开发平台作为作品导出

接下整理系统的数据结构

所有自创建表均包含`id`，`createdAt`，`updatedAt`

### 5.1 用户

User

| 字段      | 类型     | 说明               | 约束                           |
| --------- | -------- | ------------------ | ------------------------------ |
| username  | text     | 用户姓名           |                                |
| email     | email    | 用户邮箱           |                                |
| password  | password | 用户密码           |                                |
| creations | relation | 用户所拥有的产品   | User belongs to many Creations |
| folds     | relation | 用户所拥有的文件夹 | User belongs to many Folds     |
| team      | relation | 用户所在的team     | Team has many Users            |



### 5.2 作品

Creation

| 字段                   | 类型     | 说明           | 约束                        |
| ---------------------- | -------- | -------------- | --------------------------- |
| crea_name              | text     | 作品名称       |                             |
| crea_status            | text     | 作品状态       |                             |
| isPublic               | boolean  | 作品是否公开   |                             |
| json_content           | json     | 内容           |                             |
| users_permissions_user | relation | 作品作者       | User has many Creations     |
| fold                   | relation | 作品所属文件夹 | Fold has many Creations     |
| category               | relation | 作品分类       | Category has many Creations |



### 5.3 作品文件夹

Fold

| 字段                   | 类型     | 说明           | 约束                           |
| ---------------------- | -------- | -------------- | ------------------------------ |
| fold_name              | text     | 文件夹名称     |                                |
| users_permissions_user | relation | 文件夹所属用户 | User has many Folds            |
| creations              | relation | 文件夹下的作品 | Fold belongs to many Creations |



### 5.4 作品类别

Category

| 字段      | 类型     | 说明         | 约束                               |
| --------- | -------- | ------------ | ---------------------------------- |
| cate_name | text     | 类别名称     |                                    |
| creations | relation | 类别下的作品 | Category belongs to many Creations |



### 5.5 团队

Team

| 字段          | 类型     | 说明     | 约束                           |
| ------------- | -------- | -------- | ------------------------------ |
| team_name     | text     | 团队名称 |                                |
| users_list    | relation | 团队成员 | Team belongs to many Users     |
| user_manager  | relation | 管理员   | Team has one User              |
| users_operate | relation | 成员列表 | Team has many Users            |
| users_visit   | relation | 访客列表 | Team has many Users            |
| creations     | relation | 团队作品 | Team belongs to many Creations |









## 六、 用户注册登录

### 项目创建

创建Strapi项目`meno-server`

后台账号密码

```
Email:
lzy127125@163.com
Password:
Lzy127127
```



### 身份认证

注册auth用户

发送特定的post请求

```
http://localhost:1337/api/auth/loacl/register
```

数据参数JSON（不需要data）

```json
{
	"username":"Andy",
	"email":"andy@andy.andy",
    "password":"password!"
}
```



response

```json
{
	"jwt":"asdsadrsygwg...",
    "user":{
        ...
    }
}
```



在需求auth用户的请求中需要

在Headers指定一个

```
KEY:Authorization
VALUE:Bearer asdasawdawd(刚才的jwt安全令牌)
```



### 用户注册登录

首先在后台注册一个权限用户

```
andy
andy@meno.com
123123
```



## 七、配置Axios

安装axios

```
npm install --save axios vue-axios
```

































































