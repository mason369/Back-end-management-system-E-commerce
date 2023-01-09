<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>订单管理</el-breadcrumb-item>
			<el-breadcrumb-item>订单列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图 -->
		<br />
		<el-card>
			<el-row>
				<el-col :span="8">
					<el-input placeholder="请输入内容">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
			</el-row>
			<!-- 订单列表数据 -->
			<br />
			<el-table :data="orderlist" border stripe>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column label="订单编号" prop="order_number"></el-table-column>
				<el-table-column label="订单价格" prop="order_price"></el-table-column>
				<el-table-column label="是否付款" prop="pay_status">
					<template v-slot="scope">
						<el-tag v-if="scope.row.pay_status == 1" type="success"
							>已付款</el-tag
						>
						<el-tag v-else type="danger">未付款</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="是否发货" prop="is_send"></el-table-column>
				<el-table-column label="下单时间" prop="create_time">
					<template v-slot="scope">
						{{ scope.row.create_time | dateFormat }}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template>
						<!-- 带图标的button -->
						<el-button
							type="primary"
							icon="el-icon-edit"
							size="mini"
							@click="showEditDialog"
						></el-button>
						<el-button
							type="success"
							icon="el-icon-location"
							size="mini"
							@click="showProgressBox"
						></el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<br />
			<el-pagination
				background
				:current-page="queryInfo.pagenum"
				:page-sizes="[5, 10, 15, 20]"
				:page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>
		</el-card>
		<!-- 修改地址对话框 -->
		<el-dialog
			title="修改地址"
			:visible.sync="editAddressDialogVisible"
			width="50%"
		>
			<el-form
				ref="editAddressForm"
				:model="editAddressForm"
				label-width="100px"
				:rules="editAddressFormRules"
			>
				<el-form-item label="省市区县" prop="address1">
					<el-cascader
						:options="cityData"
						v-model="editAddressForm.address1"
					></el-cascader>
				</el-form-item>
				<el-form-item label="详细地址" prop="address2">
					<el-input v-model="editAddressForm.address2"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addressDialogClosed">取 消</el-button>
				<el-button type="primary" @click="editAddress">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 展示物流进度的对话框 -->
		<el-dialog title="物流进度" :visible.sync="progressBoxVisible" width="50%">
			<!-- 时间线 -->
			<el-timeline>
				<el-timeline-item
					v-for="(item, index) in progressInfo"
					:key="index"
					:timestamp="item.time"
				>
					{{ item.context }}
				</el-timeline-item>
			</el-timeline>
		</el-dialog>
	</div>
</template>

<script>
import cityData from "./citydata";
export default {
	data() {
		return {
			queryInfo: {
				query   : "",
				pagenum : 1,
				pagesize: 10
			},
			total                   : 0,
			orderlist               : [],
			editAddressDialogVisible: false,
			editAddressForm         : {
				address1: [],
				address2: ""
			},
			editAddressFormRules: {
				address1: [{ required: true, message: "请输入省市区县", trigger: "blur" }],
				address2: [{ required: true, message: "请输入详细地址", trigger: "blur" }]
			},
			cityData,
			progressBoxVisible: false,
			progressInfo      : []
		};
	},
	methods: {
		async getOrderList() {
			const { data: res } = await this.$http.get("orders", {params: this.queryInfo});
			//获取数据失败
			if (res.meta.status !== 200) {
				return this.$message.error("获取订单列表失败");
			}
			//获取数据成功
			this.orderlist = res.data.goods;
			this.total = res.data.total;
		},
		//页码改变
		handleSizeChange(newSize) {
			this.queryInfo.pagesize = newSize;
			this.getOrderList();
		},
		//每页条数改变
		handleCurrentChange(newPage) {
			this.queryInfo.pagenum = newPage;
			this.getOrderList();
		},
		//编辑按钮展示对话框
		showEditDialog() {
			this.editAddressDialogVisible = true;
		},
		//取消
		addressDialogClosed() {
			this.$refs.editAddressForm.resetFields();
			this.editAddressDialogVisible = false;
		},
		//修改地址
		editAddress() {
			this.$refs.editAddressForm.validate(async(valid) => {
				if (!valid) {
					return false;
				}
				const { data: res } = await this.$http.put(
					"orders/:id",
					this.editAddressForm
				);
				if (res.meta.status !== 200) {
					return this.$message.error("修改地址失败");
				}
				this.$message.success("修改地址成功");
				this.editAddressDialogVisible = false;
				await this.getOrderList();
			});
		},
		//显示物流进度
		async showProgressBox() {
			this.progressBoxVisible = true;
			const { data: res } = await this.$http.get("kuaidi/1106975712662");
			//获取数据失败
			if (res.meta.status !== 200) {
				return this.$message.error("获取物流进度失败");
			}
			//获取数据成功
			this.progressBoxVisible = true;
			this.progressInfo = res.data;
			console.log(this.progressInfo);
		}
	},
	mounted() {
		this.getOrderList();
	}
};
</script>

<style lang="scss" scoped>
::v-deep .el-table .el-table__cell {
	text-align: center;
}
.el-cascader {
	width: 100%;
}
</style>
