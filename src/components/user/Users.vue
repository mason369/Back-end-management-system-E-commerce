/* eslint-disable no-unused-vars*/
<template>
	<div>
		<!--面包屑导航-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!--卡片视图区-->
		<br />
		<el-card>
			<el-row :gutter="20">
				<el-col :span="8">
					<!-- 搜索 -->
					<el-input
						placeholder="请输入内容"
						class="input-with-select"
						v-model="queryInfo.query"
						clearable
						@clear="getUserList"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="getUserList"
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addDialogVisible = true"
						>添加用户</el-button
					>
				</el-col>
			</el-row>
			<!-- 用户列表 -->
			<br />
			<el-table :data="userList" border stripe>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column label="姓名" prop="username"></el-table-column>
				<el-table-column label="邮箱" prop="email"></el-table-column>
				<el-table-column label="电话" prop="mobile"></el-table-column>
				<el-table-column label="角色" prop="role_name"></el-table-column>
				<el-table-column label="状态">
					<template v-slot="scope">
						<el-switch
							@change="userStateChanged(scope.row)"
							v-model="scope.row.mg_state"
						>
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template v-slot="scope">
						<el-button
							type="primary"
							icon="el-icon-edit"
							size="mini"
							@click="showEditDialog(scope.row.id)"
						></el-button>
						<el-button
							type="danger"
							icon="el-icon-delete"
							size="mini"
							@click="removeUserById(scope.row.id)"
						></el-button>
						<el-tooltip
							effect="dark"
							content="分配角色"
							placement="top"
							:enterable="false"
						>
							<el-button
								type="warning"
								icon="el-icon-setting"
								size="mini"
								@click="setRole(scope.row)"
							></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<br />
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.pagenum"
				:page-sizes="[1, 2, 3, 4]"
				:page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</el-card>
		<!-- //添加用户对话框 -->
		<el-dialog
			title="添加用户"
			:visible.sync="addDialogVisible"
			width="30%"
			@close="addDialogClosed"
		>
			<!-- main -->
			<el-form
				:model="addForm"
				:rules="addFormRules"
				ref="addFormRef"
				label-width="70px"
			>
				<el-form-item label="用户名" prop="username">
					<el-input v-model="addForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="addForm.password"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="addForm.email"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="mobile">
					<el-input v-model="addForm.mobile"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部内容 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUser">确 定</el-button>
			</span>
		</el-dialog>
		<!-- //修改用户对话框 -->
		<el-dialog
			title="修改用户"
			:visible.sync="editDialogVisible"
			width="50%"
			@close="editDialogClosed"
		>
			<el-form
				:model="editForm"
				:rules="editFormRules"
				ref="editFormRef"
				label-width="70px"
			>
				<el-form-item label="用户名">
					<el-input v-model="editForm.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="editForm.email"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="mobile">
					<el-input v-model="editForm.mobile"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editUserInfo">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 分配角色对话框 -->
		<el-dialog
			title="分配角色"
			:visible.sync="setRoleDialogVisible"
			width="50%"
			@close="setRoleDialogClose"
		>
			<div>
				<p>当前的用户:{{ userInfo.username }}</p>
				<br />
				<p>当前的角色:{{ userInfo.role_name }}</p>
				<br />
				<p>
					分配新角色:
					<el-select v-model="selectedRoleId" placeholder="请选择">
						<el-option
							v-for="item in rolesList"
							:key="item.id"
							:label="item.roleName"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="setRoleDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveRoleInfo">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		//邮箱规则
		var checkEmail = (rule, value, cb) => {
			const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if (!regEmail.test(value)) {
				cb(new Error("邮箱格式不正确"));
			}
			else {
				cb();
			}
		};
		//手机号规则
		var checkMobile = (rule, value, cb) => {
			const regMobile = /^1[3-9]\d{9}$/;
			if (!regMobile.test(value)) {
				cb(new Error("手机号格式不正确"));
			}
			else {
				cb();
			}
		};
		return {
			//获取用户列表的参数
			queryInfo: {
				query   : "",
				pagenum : 1,
				pagesize: 2
			},
			//用户列表数据
			userList        : [],
			//总数据
			total           : 0,
			//添加用户框的显示与隐藏
			addDialogVisible: false,
			//用户的表单数据
			addForm         : {
				username: "",
				password: "",
				email   : "",
				mobile  : ""
			},
			//表单验证对象
			addFormRules: {
				username: [
					{ required: true, message: "请输入用户名", trigger: "blur" },
					{ min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" }
				],
				password: [
					{ required: true, message: "请输入密码", trigger: "blur" },
					{ min: 6, max: 12, message: "长度在6到12个字符", trigger: "blur" }
				],
				email: [
					{ required: true, message: "请输入邮箱", trigger: "blur" },
					{ type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
				],
				mobile: [
					{ required: true, message: "请输入手机号", trigger: "blur" },
					{
						pattern: /^1[3456789]\d{9}$/,
						message: "请输入正确的手机号",
						trigger: "blur"
					}
				]
			},
			//修改用户框的显示与隐藏
			editDialogVisible: false,
			//查询到的用户数据
			editForm         : {},
			//修改用户表单验证对象
			editFormRules    : {
				email: [
					{ required: true, message: "请输入邮箱", trigger: "blur" },
					{ validator: checkEmail, trigger: "blur" }
				],
				mobile: [
					{ required: true, message: "请输入手机号", trigger: "blur" },
					{
						validator: checkMobile,
						trigger  : "blur"
					}
				]
			},
			//分配角色框的显示与隐藏
			setRoleDialogVisible: false,
			//需要被分配的用户信息
			userInfo            : {},
			//所有角色列表
			rolesList           : [],
			//已选中的id
			selectedRoleId      : ""
		};
	},
	created() {
		this.getUserList();
	},
	methods: {
		async getUserList() {
			const { data: res } = await this.$http.get("users", {params: this.queryInfo});
			//数据获取失败
			if (res.meta.status !== 200) {
				return this.$message.error("获取用户列表失败");
			}
			this.userList = res.data.users;
			this.total = res.data.total;
		},
		//页码改变
		handleSizeChange(val) {
			this.queryInfo.pagesize = val;
			this.getUserList();
		},
		//页码值改变
		handleCurrentChange(val) {
			this.queryInfo.pagenum = val;
			this.getUserList();
		},
		//用户状态改变
		async userStateChanged(userInfo) {
			const { data: result } = await this.$http.put(
				`users/${userInfo.id}/state/${userInfo.mg_state}`
			);
			//修改失败
			if (result.meta.status !== 200) {
				userInfo.mg_state = !userInfo.mg_state;
				return this.$message.error("修改用户状态失败");
			}
			this.$message.success("修改用户状态成功");
		},
		//添加用户关闭
		addDialogClosed() {
			this.$refs.addFormRef.resetFields();
		},
		//添加用户
		addUser() {
			this.$refs.addFormRef.validate(async(valid) => {
				//验证失败
				if (!valid) {
					return;
				}
				const { data: result } = await this.$http.post("users", this.addForm);
				//添加失败
				if (result.meta.status !== 201) {
					return this.$message.error("添加用户失败");
				}
				this.$message.success("添加用户成功");
				//关闭对话框
				this.addDialogVisible = false;
				//重新获取用户列表
				await this.getUserList();
			});
		},
		//展示编辑用户对话框
		async showEditDialog(id) {
			const { data: result } = await this.$http.get(`users/${id}`);
			//获取失败
			if (result.meta.status !== 200) {
				return this.$message.error("获取用户信息失败");
			}
			this.editForm = result.data;
			this.editDialogVisible = true;
		},
		//编辑用户关闭
		editDialogClosed() {
			this.$refs.editFormRef.resetFields();
		},
		//修改用户信息并提交
		editUserInfo() {
			this.$refs.editFormRef.validate(async(valid) => {
				//验证失败
				if (!valid) {
					return;
				}
				const { data: result } = await this.$http.put(
					`users/${this.editForm.id}`,
					this.editForm
				);
				//修改失败
				if (result.meta.status !== 200) {
					return this.$message.error("修改用户信息失败");
				}
				this.$message.success("修改用户信息成功");
				//关闭对话框
				this.editDialogVisible = false;
				//重新获取用户列表
				await this.getUserList();
			});
		},
		//删除用户
		async removeUserById(id) {
			const confirmResult = await this.$confirm(
				"此操作将永久删除该用户, 是否继续?",
				"提示",
				{
					confirmButtonText: "确定",
					cancelButtonText : "取消",
					type             : "warning"
				}
			).catch((err) => err);
			//取消删除
			if (confirmResult === "cancel") {
				return this.$message.info("已取消删除");
			}
			const { data: result } = await this.$http.delete(`users/${id}`);
			//删除失败
			if (result.meta.status !== 200) {
				return this.$message.error("删除用户失败");
			}
			this.$message.success("删除用户成功");
			//重新获取用户列表
			await this.getUserList();
		},
		// 展示分配角色对话框
		async setRole(userInfo) {
			this.userInfo = userInfo;
			//在展示对话框之前，获取所有角色的列表
			const { data: result } = await this.$http.get("roles");
			if (result.meta.status !== 200) {
				return this.$message.error("获取角色列表失败");
			}
			this.rolesList = result.data;
			this.setRoleDialogVisible = true;
		},
		// 点击按钮分配角色
		async saveRoleInfo() {
			if (!this.userInfo.id) {
				return this.$message.error("用户id不存在");
			}
			const {data: res} = await this.$http.put(`users/${this.userInfo.id}/role`, {rid: this.selectedRoleId});
			if (res.meta.status !== 200) {
				return this.$message.error("分配角色失败");
			}
			this.$message.success("分配角色成功");
			this.setRoleDialogVisible = false;
			//重新获取用户列表
			await this.getUserList();
		},
		// //监听分配角色对话框的关闭事件
		setRoleDialogClose() {
			this.selectedRoleId = "";
			this.userInfo = {};
		}
	}
};
</script>

<style scoped lang="scss">
.el-card {
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
.el-table {
	font-size: 14px;
}
</style>
