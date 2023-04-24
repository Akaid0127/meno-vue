import Home from "@/views/home"; // 首页
import Work from "@/views/work"; // 工作台
import Design from "@/views/design"; // 设计室
import Login from "@/views/login"; // 登录


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
		component: Work
	},
	
	{
		name:'design',
		path:'/design',
		component:Design
	},
	
	{
		name: 'login',
		path: '/login',
		component: Login
	}
];

export default routes