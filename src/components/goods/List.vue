<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图 -->
		<br />
		<el-card>
			<el-row :gutter="20">
				<el-col :span="8">
					<el-input
						placeholder="请输入内容"
						v-model="queryInfo.query"
						clearable
						@clear="getGoods"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="getGoods"
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<!-- 添加商品按钮 -->
					<el-button type="primary" icon="el-icon-plus" @click="goAddPage">
						添加商品
					</el-button>
				</el-col>
			</el-row>
			<!-- table表格区域 -->
			<br />
			<el-table :data="goodsList" border stripe>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="goods_name" label="商品名称"></el-table-column>
				<el-table-column
					prop="goods_price"
					label="商品价格(元)"
					width="90px"
				></el-table-column>
				<el-table-column
					prop="goods_number"
					width="90px"
					label="商品数量"
				></el-table-column>
				<el-table-column
					prop="goods_weight"
					width="90px"
					label="商品重量"
				></el-table-column>
				<el-table-column
					prop="goods_state"
					width="90px"
					label="商品状态"
				></el-table-column>
				<el-table-column prop="add_time" label="添加时间" width="160px">
					<template v-slot="scope">
						{{ scope.row.add_time | dateFormat }}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="140">
					<template v-slot="scope">
						<el-button type="text" size="small">编辑</el-button>
						<el-button
							type="text"
							size="small"
							@click="removeById(scope.row.goods_id)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页区域 -->
			<br />
			<el-pagination
				background
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
				:current-page="queryInfo.pagenum"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//查询参数
			queryInfo: {
				query   : "",
				pagenum : 1,
				pagesize: 10
			},
			//商品列表数据
			goodsList: [],
			//总条数
			total    : 0
		};
	},
	methods: {
		//获取商品列表数据
		async getGoods() {
			const { data: res } = await this.$http.get("goods", {params: this.queryInfo});
			//获取失败
			if (res.meta.status !== 200) {
				return this.$message.error("获取商品列表失败！");
			}
			//获取成功
			this.$message.success("获取商品列表成功！");
			this.goodsList = res.data.goods;
			this.total = res.data.total;
		},
		//页码改变时触发
		handleCurrentChange(newPage) {
			this.queryInfo.pagenum = newPage;
			this.getGoods();
		},
		//每页条数改变时触发
		handleSizeChange(newSize) {
			this.queryInfo.pagesize = newSize;
			this.getGoods();
		},
		//删除商品,弹出确认框
		async removeById(id) {
			const confirmResult = await this.$confirm(
				"此操作将永久删除该商品, 是否继续?",
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
			//确认删除
			const { data: res } = await this.$http.delete(`goods/${id}`);
			//删除失败
			if (res.meta.status !== 200) {
				return this.$message.error("删除商品失败！");
			}
			//删除成功
			this.$message.success("删除商品成功！");
			await this.getGoods();
		},
		//添加商品
		goAddPage() {
			this.$router.push("/goods/add");
		}
	},
	mounted() {
		this.getGoods();
	}
};
</script>

<style lang="scss" scoped>
::v-deep .el-table .el-table__cell {
	text-align: center;
}
</style>
