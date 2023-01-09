import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//使用element ui插件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

//富文本编辑器
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor);

//导入nprogress
import NProgress from "nprogress";
import "nprogress/nprogress.css";


//导入axios
import axios from "axios";
//配置axios的基础路径
axios.defaults.baseURL = "https://lianghj.top:8888/api/private/v1/";
Vue.prototype.$http = axios;
//请求拦截器,在request拦截器中展示进度条NProgress.start()
axios.interceptors.request.use((config) => {
	config.headers.Authorization = window.sessionStorage.getItem("token");
	NProgress.start();
	return config;
});
//在response拦截器中隐藏进度条NProgress.done()
axios.interceptors.response.use((config) => {
	NProgress.done();
	return config;
})

//导入表格树插件
import ZkTable from "vue-table-with-tree-grid";
Vue.use(ZkTable);

Vue.filter("dateFormat", function(originVal){
	const dt = new Date(originVal)
	const y = dt.getFullYear()
	const m = (dt.getMonth() + 1 + "").padStart(2, "0")
	const d = (dt.getDate() + "").padStart(2, "0")
	const hh = (dt.getHours() + "").padStart(2, "0")
	const mm = (dt.getMinutes() + "").padStart(2, "0")
	const ss = (dt.getSeconds() + "").padStart(2, "0")
	return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

//导入图标字体
import "./assets/fonts/iconfont.css";

//全局样式表
import "./assets/scss/global.scss";

Vue.config.productionTip = false;

new Vue({ router, render: (h) => h(App) }).$mount("#app");
