import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

//重写push、replace防止控制台报错
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写VueRouter.prototype身上的push方法
VueRouter.prototype.push = function(location, resolve, reject) {
	if (reject && resolve) {
		originPush.call(this, location, resolve, reject);
	}
	else {
		originPush.call(
			this,
			location,
			() => {},
			() => {}
		);
	}
};

//重写VueRouter.prototype身上的replace方法
VueRouter.prototype.replace = function(location, resolve, reject) {
	if (reject && resolve) {
		originReplace.call(this, location, resolve, reject);
	}
	else {
		originReplace.call(
			this,
			location,
			() => {},
			() => {}
		);
	}
};


let router = new VueRouter({
	routes,
	scrollBehavior() {
		return { y: 0 };
	}
});

//路由导航守卫
router.beforeEach((to, from, next) => {
	//如果要去的是登录页，直接放行
	if (to.path === "/login") {
		return next();
	}
	//如果要去的不是登录页，判断是否有token
	let token = sessionStorage.getItem("token");
	if (token) {
		next();
	}
	else {
		next("/login");
	}
});

export default router;
