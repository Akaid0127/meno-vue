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



### 4.10 画布组件结构

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



### 4.11 组件属性列表

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



### 4.12右键改变组件层级

就是直接修改z-index就可以



### 4.13 撤销和反撤销操作

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



实现success~~~soeasy















