const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave           : false
});
module.exports = {
	lintOnSave  : false,
	publicPath  : "/Back-end-management-system-E-commerce/",
	chainWebpack: (config) => {
		// 发布模式
		config.when(process.env.NODE_ENV === "production", (config) => {
			config.entry("app").clear().add("./src/main-prod.js");
			config.plugin("html").tap((args) => {
				args[0].isProd = true;
				return args;
			});
		});
		// 开发模式
		config.when(process.env.NODE_ENV === "development", (config) => {
			config.entry("app").clear().add("./src/main-dev.js");
			config.plugin("html").tap((args) => {
				args[0].isProd = false;
				return args;
			});
		});
	}
};
