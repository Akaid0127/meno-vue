import Home from "@/views/home";
import Work from "@/views/work";


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
	}
];

export default routes