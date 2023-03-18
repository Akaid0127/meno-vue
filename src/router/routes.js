import Home from "@/views/home";
import Work from "@/views/work";
import Design from "@/views/design";


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
	}
];

export default routes