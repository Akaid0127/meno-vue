import Home from "@/views/home"; // 首页
import Work from "@/views/work"; // 工作台
import Design from "@/views/design"; // 设计室
import Login from "@/views/login"; // 登录
import Community from "@/views/community"; // 资源社区

import WorkFile from "@/views/work/components/WorkFile"; // 工作台个人文件
import WorkRecent from "@/views/work/components/WorkRecent"; // 工作台最近文件

import WorkTeam from "@/views/work/components/WorkTeam"; // 团队



import Test from '@/views/test';

const routes = [
    {
        name: "index",
        path: "/",
        redirect: { name: 'home' }
    },

    {
        name: 'home',
        path: '/home',
        component: Home
    },

    {
        name: 'work',
        path: '/work',
        component: Work,
        redirect: { name: 'workFile' },
        children: [
            { name: 'workFile', path: '/work/file', component: WorkFile },
            { name: 'workRecent', path: '/work/recent', component: WorkRecent },
            { name: 'workTeam', path: '/work/team', component: WorkTeam },
        ],

    },

    {
        name: 'design',
        path: '/design',
        component: Design
    },

    {
        name: 'community',
        path: '/community',
        component: Community
    },

    {
        name: 'login',
        path: '/login',
        component: Login
    }
];

export default routes