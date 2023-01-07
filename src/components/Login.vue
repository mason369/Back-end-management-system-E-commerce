<template>
	<div class="login-container">
		<div class="login-box">
			<!--头像-->
			<div class="avatar-box">
				<img src="../assets/logo.png" alt=""/>
			</div>
			<!--登录表单区-->
			<el-form
				label-width="0px"
				class="login-form"
				:model="loginForm"
				:rules="loginRules"
				ref="loginFormRef"
			>
				<!--用户名 -->
				<el-form-item prop="username">
					<el-input
						prefix-icon="iconfont icon-user"
						v-model="loginForm.username"
						placeholder="admin"
					></el-input>
				</el-form-item>
				<!--密码-->
				<el-form-item prop="password">
					<el-input
						prefix-icon="iconfont icon-3702mima"
						v-model="loginForm.password"
						type="password"
						placeholder="123456"
					></el-input>
				</el-form-item>
				<!-- 按钮区域 -->
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			//登录表单对象
			loginForm: {
				username: "",
				password: ""
			},
			loginRules: {
				username: [
					{required: true, message: "用户名不能为空", trigger: "blur"},
					{
						min    : 3,
						max    : 10,
						message: "用户名长度在3-10个字符之间",
						trigger: "blur"
					}
				],
				password: [
					{
						min    : 6,
						max    : 10,
						message: "长度在 6 到 10 个字符",
						trigger: "blur"
					},
					{required: true, message: "密码不能为空", trigger: "blur"}
				]
			}
		};
	},
	methods: {
		//重置登录表单
		resetLoginForm() {
			this.$refs.loginFormRef.resetFields();
		},
		//	登录表单验证
		login() {
			this.$refs.loginFormRef.validate(async valid => {
				if (!valid) {
					return;
				}
				//发送登录请求
				const {data:res} = await this.$http.post("login", this.loginForm);
				//登录失败
				if (res.meta.status !== 200) {
					return this.$message.error("登录失败");
				}
				//登陆成功
				this.$message.success("登录成功");
				//将token保存到本地
				sessionStorage.setItem("token", res.data.token);
				//跳转到后台首页
				this.$router.push("/home");
			});
		}
	}
};
</script>

<style lang="scss" scoped>
//登录组件背景颜色
.login-container {
	background-color: #2b4b6b;
	height: 100vh;
}

//登录盒子居中
.login-box {
	width: 420px;
	height: 300px;
	background-color: #fff;
	border-radius: 5px;
	//定位居中
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	
	.avatar-box {
		height: 130px;
		width: 130px;
		padding: 12px;
		border-radius: 50%;
		border: 1px solid #ccc;
		background-color: #fff;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		
		img {
			height: 100%;
			width: 100%;
			border-radius: 50%;
			background-color: #eee;
		}
	}
	
	.btns {
		display: flex;
		justify-content: flex-end;
	}
	
	.login-form {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
	}
}
</style>
