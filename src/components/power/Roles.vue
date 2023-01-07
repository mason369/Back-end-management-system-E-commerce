<template>
	<div>
		<!--面包屑导航-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>角色管理</el-breadcrumb-item>
			<el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!--卡片视图区-->
		<br />
		<el-card>
			<el-row>
				<el-button type="primary">添加角色</el-button>
			</el-row>
			<!--角色列表-->
			<br />
			<el-table :data="roleList" border stripe>
				<el-table-column type="expand">
					<!-- // 展开行模板 -->
					<template v-slot="scope">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-row
								v-for="(item1, i1) in scope.row.children"
								:key="item1.id"
								:class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
							>
								<!-- 一级权限 -->
								<el-col :span="5">
									<el-tag
										closable
										@close="removeRightById(scope.row, item1.id)"
									>
										{{ item1.authName }}</el-tag
									>
									<i class="el-icon-arrow-right"></i>
								</el-col>

								<!-- 二、三级权限 -->
								<el-col :span="19">
									<el-row
										v-for="(item2, i2) in item1.children"
										:key="item2.id"
										:class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
									>
										<el-col :span="6">
											<el-tag
												closable
												@close="removeRightById(scope.row, item2.id)"
												type="success"
											>
												{{ item2.authName }}</el-tag
											>
											<i class="el-icon-arrow-right"></i>
										</el-col>
										<el-col :span="18">
											<el-tag
												type="warning"
												v-for="item3 in item2.children"
												:key="item3.id"
												closable
												@close="removeRightById(scope.row, item3.id)"
											>
												{{ item3.authName }}
											</el-tag>
										</el-col>
									</el-row>
								</el-col>
							</el-row>
						</el-form>
					</template>
				</el-table-column>
				<!-- 索引列 -->
				<el-table-column prop="id" label="ID" width="100"></el-table-column>
				<el-table-column prop="roleName" label="角色名称"></el-table-column>
				<el-table-column prop="roleDesc" label="角色描述"></el-table-column>
				<el-table-column label="操作" width="180">
					<template v-slot="scope">
						<el-button
							type="text"
							size="mini"
							@click="showSetRightsDialog(scope.row)"
							>分配权限</el-button
						>
						<el-button
							type="text"
							size="mini"
							@click="showEditDialog(scope.row.id + '')"
							>编辑</el-button
						>
						<el-button
							type="text"
							size="mini"
							@click="removeUserById(scope.row.id)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- //修改角色对话框 -->
		<el-dialog title="修改角色" :visible.sync="editDialogVisible" width="50%">
			<el-form ref="editForm" :model="roleList" label-width="80px">
				<el-form-item label="角色名称">
					<el-input v-model="roleList.roleName"></el-input>
				</el-form-item>
				<el-form-item label="角色描述">
					<el-input v-model="roleList.roleDesc"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editRole">确 定</el-button>
			</span>
		</el-dialog>
		<!-- //分配权限对话框 -->
		<el-dialog
			title="分配权限"
			:visible.sync="setRightsDialogVisible"
			width="50%"
			@close="setRightsDialogClose"
		>
			<!-- 树形 -->
			<el-tree
				ref="treeRef"
				:data="rightsList"
				:props="treeProps"
				show-checkbox
				node-key="id"
				default-expand-all
				:default-checked-keys="defKeys"
			></el-tree>

			<span slot="footer" class="dialog-footer">
				<el-button @click="setRightsDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="allotRights">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//控制对话框的显示与隐藏
			setRightsDialogVisible: false,
			//角色列表数据
			roleList              : [],
			//修改角色框的显示与隐藏
			editDialogVisible     : false,
			//所有权限列表
			rightsList            : [],
			//树形控件的配置
			treeProps             : {
				label   : "authName",
				children: "children"
			},
			//默认选中的权限
			defKeys: [],
			//分配权限的角色id
			roleId : ""
		};
	},
	created() {
		//获取角色列表数据
		this.getRoleList();
	},
	methods: {
		//获取角色列表数据
		async getRoleList() {
			//发送请求
			const { data: res } = await this.$http.get("roles");
			//判断是否获取成功
			if (res.meta.status !== 200) {
				return this.$message.error("获取角色列表失败");
			}
			//获取成功
			this.roleList = res.data;
		},

		//删除角色
		async removeUserById(id) {
			//提示用户是否删除
			const confirmResult = await this.$confirm(
				"此操作将永久删除该角色, 是否继续?",
				"提示",
				{
					confirmButtonText: "确定",
					cancelButtonText : "取消",
					type             : "warning"
				}
			);
			//判断用户是否点击了取消按钮
			if (confirmResult === "cancel") {
				return this.$message.info("已取消删除");
			}
			//发送请求
			const { data: res } = await this.$http.delete(`roles/${id}`);
			//判断是否删除成功
			if (res.meta.status !== 200) {
				return this.$message.error("删除角色失败");
			}
			//删除成功
			this.$message.success("删除角色成功");
			//重新获取角色列表数据
			await this.getRoleList();
		},
		//展示修改角色对话框
		async showEditDialog(id) {
			//发送请求
			const { data: res } = await this.$http.get(`roles/${id}`);
			//判断是否获取成功
			if (res.meta.status !== 200) {
				return this.$message.error("获取角色信息失败");
			}
			//获取成功
			this.roleList = res.data;
			//显示修改角色对话框
			this.editDialogVisible = true;
		},
		//修改角色信息并提交
		async editRole() {
			//获取表单数据
			const { roleName, roleDesc } = this.roleList;
			//发送请求
			const { data: res } = await this.$http.put(`roles/${this.roleList.id}`, {
				roleName,
				roleDesc
			});
			//判断是否修改成功
			if (res.meta.status !== 200) {
				return this.$message.error(res.meta.msg);
			}
			//修改成功
			this.$message.success("修改角色信息成功");
			//关闭对话框
			this.editDialogVisible = false;
			//重新获取角色列表数据
			await this.getRoleList();
		},
		//根据id删除对应的权限
		async removeRightById(role, rightId) {
			//弹窗提示用户是否删除
			const confirmResult = await this.$confirm(
				"此操作将永久删除该文件, 是否继续?",
				"提示",
				{
					confirmButtonText: "确定",
					cancelButtonText : "取消",
					type             : "warning"
				}
			).catch((err) => err);
			//判断用户是否点击了取消按钮
			if (confirmResult !== "confirm") {
				return this.$message.info("已取消删除");
			}
			//发送请求
			const { data: res } = await this.$http.delete(
				`roles/${role.id}/rights/${rightId}`
			);
			//判断是否删除成功
			if (res.meta.status !== 200) {
				return this.$message.error("删除权限失败");
			}
			//删除成功
			this.$message.success("删除权限成功");
			//重新获取角色列表数据
			role.children = res.data;
		},
		//展示分配权限对话框
		async showSetRightsDialog(role) {
			this.roleId = role.id;
			//发送请求
			const { data: res } = await this.$http.get("rights/tree");
			//判断是否获取成功
			if (res.meta.status !== 200) {
				return this.$message.error("获取权限列表失败");
			}
			//获取成功
			this.rightsList = res.data;

			//获取当前角色已经拥有的权限
			this.getDefKeys(role, this.defKeys);

			//展示分配权限对话框
			this.setRightsDialogVisible = true;
		},
		//通过递归的形式，获取角色下所有三级权限的id，并保存到 defKeys数组中
		getDefKeys(node, arr) {
			if (!node.children) {
				return arr.push(node.id);
			}
			node.children.forEach((item) => {
				this.getDefKeys(item, arr);
			});
		},
		// 分配权限关闭
		setRightsDialogClose() {
			//清空默认选中的权限
			this.defKeys = [];
		},
		//点击为角色分配权限
		async allotRights() {
			const keys = [
				...this.$refs.treeRef.getCheckedKeys(),
				...this.$refs.treeRef.getHalfCheckedKeys()
			];
			const idStr = keys.join(",");
			//发送请求
			const { data: res } = await this.$http.post(
				`roles/${this.roleId}/rights`,
				{ rids: idStr }
			);
			//判断是否分配成功
			if (res.meta.status !== 200) {
				return this.$message.error("分配权限失败");
			}
			//分配成功
			this.$message.success("分配权限成功");
			//关闭对话框
			this.setRightsDialogVisible = false;
			//重新获取角色列表数据
			await this.getRoleList();
		}
	}
};
</script>

<style scoped lang="scss">
.el-tag {
	margin: 7px 7px 7px 30px;
}
.bdtop {
	border-top: 1px solid #eee;
}
.bdbottom {
	border-bottom: 1px solid #eee;
}
.vcenter {
	display: flex;
	align-items: center;
}
</style>
