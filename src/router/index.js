import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { NFadeInExpandTransition } from 'naive-ui/es/_internal';

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else if (to.path === '/home') {
        next()
    } else {
        if (localStorage.getItem('userJwt') === null) {
            window.$message.warning('用户未登录，需要重新登录')
            next(`/login`);
        } else {
            next()
        }
    }
});

export default router