<template>
	<div>
		<!--面包屑导航-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品分类</el-breadcrumb-item>
		</el-breadcrumb>
		<br />
		<!--卡片视图区-->
		<el-card>
			<el-row>
				<el-col>
					<el-button type="primary" @click="showAddCateDialog">
						添加分类
					</el-button>
				</el-col>
			</el-row>
			<br />
			<!-- 表格 -->
			<zk-table
				:data="cateList"
				:columns="columns"
				:selection-type="false"
				:expand-type="false"
				:show-index="true"
				:index-text="this.indexText"
				border
				:show-row-hover="false"
			>
				<!-- 是否有效 -->
				<template v-slot:isOk="scope">
					<i
						class="el-icon-success"
						v-if="scope.row.cat_deleted === false"
						style="color: lightgreen;"
					></i>
					<i class="el-icon-error" style="color: red;" v-else></i>
				</template>
				<!-- 排序 -->
				<template v-slot:order="scope">
					<el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
					<el-tag
						size="mini"
						type="success"
						v-else-if="scope.row.cat_level === 1"
						>二级</el-tag
					>
					<el-tag size="mini" type="warning" v-else>三级</el-tag>
				</template>
				<!-- 操作 -->
				<template v-slot:action="scope">
					<el-button
						type="primary"
						icon="el-icon-edit"
						size="small"
						@click="showEditCateDialog(scope.row)"
					>
						编辑
					</el-button>
					<el-button
						type="danger"
						icon="el-icon-delete"
						size="small"
						@click="removeCate(scope.row)"
					>
						删除
					</el-button>
				</template>
			</zk-table>
			<!-- 分页区 -->
			<br />
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.pagenum"
				:page-sizes="[2, 3, 5, 10]"
				:page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</el-card>
		<!-- 添加分类对话框 -->
		<el-dialog
			title="添加分类"
			:visible.sync="addCateDialogVisible"
			width="50%"
			@close="addCateDialogClosed"
		>
			<el-form
				:model="addCateForm"
				:rules="addCateFormRules"
				ref="addCateFormRef"
				label-width="100px"
			>
				<el-form-item label="分类名称:" prop="cat_name">
					<el-input v-model="addCateForm.cat_name"></el-input>
				</el-form-item>
				<el-form-item label="父级分类:">
					<el-cascader
						v-model="selectedKeys"
						:options="parentCateList"
						:props="{ expandTrigger: 'hover', ...cascaderProps }"
						@change="parentCateChanged"
						clearable
						change-on-select
					></el-cascader>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addCateDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addCate">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 编辑分类对话框 -->
		<el-dialog
			title="编辑分类"
			:visible.sync="editCateDialogVisible"
			width="50%"
		>
			<el-form
				:model="editCateForm"
				:rules="editCateFormRules"
				ref="editCateFormRef"
				label-width="100px"
			>
				<el-form-item label="分类名称:" prop="cat_name">
					<el-input v-model="editCateForm.cat_name"></el-input>
				</el-form-item>
				<el-form-item label="父级分类:">
					<el-cascader
						v-model="selectedKeys"
						:options="parentCateList"
						:props="{ expandTrigger: 'hover', ...cascaderProps }"
						@change="parentCateChanged"
						clearable
						change-on-select
					></el-cascader>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editCateDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editCate">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//添加分类表单数据
			addCateForm: {
				// 名称
				cat_name   : "",
				// 父级id
				cat_pid    : 0,
				// 级别
				cat_level  : 0,
				// 是否有效
				cat_deleted: false
			},
			//添加分类表单验证规则
			addCateFormRules    : {cat_name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]},
			//控制添加分类对话框的显示与隐藏
			addCateDialogVisible: false,
			indexText           : "#",
			//查询条件
			queryInfo           : {
				type    : 3,
				pagenum : 1,
				pagesize: 5
			},
			//商品分类数据
			cateList: [],
			//总条数
			total   : 0,
			//表格列
			columns : [
				{
					label: "分类名称",
					prop : "cat_name"
					// width   : '200',
					// align   : 'center',
					// sortable: true
				},
				{
					label   : "是否有效",
					type    : "template",
					template: "isOk"
				},
				{
					label   : "排序",
					type    : "template",
					template: "order"
				},
				{
					label   : "操作",
					type    : "template",
					template: "action"
				}
			],
			//父级分类数据
			parentCateList: [],
			//指定级联选择器的对象
			cascaderProps : {
				value   : "cat_id",
				label   : "cat_name",
				children: "children"
			},
			//选中的父级分类的id
			selectedKeys         : [],
			//当前编辑的显示与隐藏
			editCateDialogVisible: false,
			//当前编辑的分类数据
			editCateForm         : {
				cat_id   : 0,
				cat_name : "",
				cat_level: 0
			},
			//当前编辑的分类数据验证规则
			editCateFormRules: {cat_name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]}
		};
	},
	created() {
		this.getCateList();
	},
	methods: {
		//获取商品分类数据
		async getCateList() {
			const { data: res } = await this.$http.get("categories", {params: this.queryInfo});
			//获取失败
			if (res.meta.status !== 200) {
				return this.$message.error("获取商品分类数据失败");
			}
			//获取成功
			this.cateList = res.data.result;
			//获取总条数
			this.total = res.data.total;
		},
		//页码改变
		handleSizeChange(newSize) {
			this.queryInfo.pagesize = newSize;
			this.getCateList();
		},
		//每页条数改变
		handleCurrentChange(newPage) {
			this.queryInfo.pagenum = newPage;
			this.getCateList();
		},
		//点击按钮显示添加分类对话框
		showAddCateDialog() {
			//获取分类数据
			this.getParentCateList();
			this.addCateDialogVisible = true;
		},
		// 获取父级分类数据
		async getParentCateList() {
			const { data: res } = await this.$http.get("categories", {params: { type: 2 }});
			//获取失败
			if (res.meta.status !== 200) {
				return this.$message.error("获取父级分类数据失败");
			}
			//获取成功
			this.parentCateList = res.data;
		},
		//选择项发生变化时触发
		parentCateChanged() {
			// console.log(this.selectedKeys);
			//如果selectedKeys 数绿中的 length大于0，证明选中的父级分类//反之，就说明没有选中任何父级分类
			if (this.selectedKeys.length > 0) {
				//父级分类的id
				this.addCateForm.cat_pid = this.selectedKeys[
					this.selectedKeys.length - 1
				];
				//为当前分类的等级赋值
				this.addCateForm.cat_level = this.selectedKeys.length;
				return;
			}
			else {
				//没有选中任何父级分类
				this.addCateForm.cat_pid = 0;
				this.addCateForm.cat_level = 0;
			}
		},
		//添加分类
		async addCate() {
			this.$refs.addCateFormRef.validate(async(valid) => {
				if (!valid) {
					return;
				}
				const { data: res } = await this.$http.post(
					"categories",
					this.addCateForm
				);
				//添加失败
				if (res.meta.status !== 201) {
					return this.$message.error("添加分类失败");
				}
				//添加成功
				this.$message.success("添加分类成功");
				//关闭对话框
				this.addCateDialogVisible = false;
				//重新获取商品分类数据
				await this.getCateList();
			});
		},
		addCateDialogClosed() {
			//重置表单
			this.$refs.addCateFormRef.resetFields();
			this.selectedKeys = [];
		},
		//点击按钮编辑分类
		async showEditCateDialog(row) {
			//获取分类数据
			await this.getParentCateList();
			//获取当前分类的数据
			const { data: res } = await this.$http.get(`categories/${row.cat_id}`);
			//获取失败
			if (res.meta.status !== 200) {
				return this.$message.error("获取当前分类数据失败");
			}
			//获取成功
			this.editCateForm = res.data;
			//显示对话框
			this.editCateDialogVisible = true;
		},
		//编辑分类确定
		async editCate() {
			this.$refs.editCateFormRef.validate(async(valid) => {
				if (!valid) {
					return;
				}
				const {data: res} = await this.$http.put(`categories/${this.editCateForm.cat_id}`, {cat_name: this.editCateForm.cat_name});
				//编辑失败
				if (res.meta.status !== 200) {
					return this.$message.error("编辑分类失败");
				}
				//编辑成功
				this.$message.success("编辑分类成功");
				//关闭对话框
				this.editCateDialogVisible = false;
				//重新获取商品分类数据
				await this.getCateList();
			});
		},
		//删除分类使用try{}catch(error){} 进行捕获错误
		async removeCate(row) {
			try {
				const confirmResult = await this.$confirm(
					"此操作将永久删除该分类, 是否继续?",
					"提示",
					{
						confirmButtonText: "确定",
						cancelButtonText : "取消",
						type             : "warning"
					}
				);
				// console.log(confirmResult);
				//点击了确定按钮
				if (confirmResult === "confirm") {
					const { data: res } = await this.$http.delete(
						`categories/${row.cat_id}`
					);
					//删除失败
					if (res.meta.status !== 200) {
						return this.$message.error("删除分类失败");
					}
					//删除成功
					this.$message.success("删除分类成功");
					//重新获取商品分类数据
					await this.getCateList();
				}
			}
			catch (error) {
				//点击了取消按钮
				this.$message.info("已取消删除");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.el-cascader {
	width: 100%;
}
</style>
