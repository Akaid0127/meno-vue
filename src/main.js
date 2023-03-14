import { createApp } from 'vue'
import router from './router/index'
import naive from './naive/index'
import App from './App.vue'



const app = createApp(App)
// 使用naiveui
app.use(naive)
// 使用vue-router
app.use(router)
// 挂载
app.mount('#app')
