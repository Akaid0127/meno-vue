import { createApp } from 'vue'
import router from './router/index'
import naive from './naive/index'
import App from './App.vue'
import pinia from './stores'
import gobalComponents from '@/components-unit/index.js'

// 创建app
const app = createApp(App)

// 使用naiveui
app.use(naive)
// 使用vue-router
app.use(router)
// 使用pinia
app.use(pinia)
// 注册全局组件
app.use(gobalComponents)
// 挂载
app.mount('#app')
