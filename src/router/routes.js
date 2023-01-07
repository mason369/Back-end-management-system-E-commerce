export default [
	//重定向
	{
		path    : "/",
		redirect: "/login"
	},
	//导入登录组件
	{
		path     : "/login",
		component: () => import("@/components/Login"),
		name     : "login"
	},
	//导入主页组件
	{
		path     : "/home",
		component: () => import("@/components/Home"),
		name     : "home",
		redirect : "/welcome",
		children : [
			{
			//导入欢迎组件
				path     : "/welcome",
				component: () => import("@/components/Welcome"),
				name     : "welcome"
			},
			{
			//导入用户组件
				path     : "/users",
				component: () => import("@/components/user/Users"),
				name     : "users"
			},
			//导入权限组件
			{
				path     : "/rights",
				component: () => import("@/components/power/Rights"),
				name     : "rights"
			},
			//导入角色组件
			{
				path     : "/roles",
				component: () => import("@/components/power/Roles"),
				name     : "roles"
			},
			//导入商品分类组件
			{
				path     : "/categories",
				component: () => import("@/components/goods/Cate"),
				name     : "categories"
			},
			//导入商品参数组件
			{
				path     : "/params",
				component: () => import("@/components/goods/Params"),
				name     : "params"
			},
			//导入商品列表组件
			{
				path     : "/goods",
				component: () => import("@/components/goods/List"),
				name     : "goods"
			},
			//导入添加商品组件
			{
				path     : "/goods/add",
				component: () => import("@/components/goods/Add"),
				name     : "add"
			}
		]
	}
];
