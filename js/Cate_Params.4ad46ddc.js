"use strict";(self["webpackChunkBack_end_management_system_E_commerce"]=self["webpackChunkBack_end_management_system_E_commerce"]||[]).push([[470],{4863:function(t,e,a){a.r(e),a.d(e,{default:function(){return c}});var i=function(){var t=this,e=t._self._c;return e("div",[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),e("el-breadcrumb-item",[t._v("商品管理")]),e("el-breadcrumb-item",[t._v("商品分类")])],1),e("br"),e("el-card",[e("el-row",[e("el-col",[e("el-button",{attrs:{type:"primary"},on:{click:t.showAddCateDialog}},[t._v(" 添加分类 ")])],1)],1),e("br"),e("zk-table",{attrs:{data:t.cateList,columns:t.columns,"selection-type":!1,"expand-type":!1,"show-index":!0,"index-text":this.indexText,border:"","show-row-hover":!1},scopedSlots:t._u([{key:"isOk",fn:function(t){return[!1===t.row.cat_deleted?e("i",{staticClass:"el-icon-success",staticStyle:{color:"lightgreen"}}):e("i",{staticClass:"el-icon-error",staticStyle:{color:"red"}})]}},{key:"order",fn:function(a){return[0===a.row.cat_level?e("el-tag",{attrs:{size:"mini"}},[t._v("一级")]):1===a.row.cat_level?e("el-tag",{attrs:{size:"mini",type:"success"}},[t._v("二级")]):e("el-tag",{attrs:{size:"mini",type:"warning"}},[t._v("三级")])]}},{key:"action",fn:function(a){return[e("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},on:{click:function(e){return t.showEditCateDialog(a.row)}}},[t._v(" 编辑 ")]),e("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"small"},on:{click:function(e){return t.removeCate(a.row)}}},[t._v(" 删除 ")])]}}])}),e("br"),e("el-pagination",{attrs:{"current-page":t.queryInfo.pagenum,"page-sizes":[2,3,5,10],"page-size":t.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),e("el-dialog",{attrs:{title:"添加分类",visible:t.addCateDialogVisible,width:"50%"},on:{"update:visible":function(e){t.addCateDialogVisible=e},close:t.addCateDialogClosed}},[e("el-form",{ref:"addCateFormRef",attrs:{model:t.addCateForm,rules:t.addCateFormRules,"label-width":"100px"}},[e("el-form-item",{attrs:{label:"分类名称:",prop:"cat_name"}},[e("el-input",{model:{value:t.addCateForm.cat_name,callback:function(e){t.$set(t.addCateForm,"cat_name",e)},expression:"addCateForm.cat_name"}})],1),e("el-form-item",{attrs:{label:"父级分类:"}},[e("el-cascader",{attrs:{options:t.parentCateList,props:{expandTrigger:"hover",...t.cascaderProps},clearable:"","change-on-select":""},on:{change:t.parentCateChanged},model:{value:t.selectedKeys,callback:function(e){t.selectedKeys=e},expression:"selectedKeys"}})],1)],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.addCateDialogVisible=!1}}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.addCate}},[t._v("确 定")])],1)],1),e("el-dialog",{attrs:{title:"编辑分类",visible:t.editCateDialogVisible,width:"50%"},on:{"update:visible":function(e){t.editCateDialogVisible=e}}},[e("el-form",{ref:"editCateFormRef",attrs:{model:t.editCateForm,rules:t.editCateFormRules,"label-width":"100px"}},[e("el-form-item",{attrs:{label:"分类名称:",prop:"cat_name"}},[e("el-input",{model:{value:t.editCateForm.cat_name,callback:function(e){t.$set(t.editCateForm,"cat_name",e)},expression:"editCateForm.cat_name"}})],1),e("el-form-item",{attrs:{label:"父级分类:"}},[e("el-cascader",{attrs:{options:t.parentCateList,props:{expandTrigger:"hover",...t.cascaderProps},clearable:"","change-on-select":""},on:{change:t.parentCateChanged},model:{value:t.selectedKeys,callback:function(e){t.selectedKeys=e},expression:"selectedKeys"}})],1)],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.editCateDialogVisible=!1}}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.editCate}},[t._v("确 定")])],1)],1)],1)},s=[],r={data(){return{addCateForm:{cat_name:"",cat_pid:0,cat_level:0,cat_deleted:!1},addCateFormRules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"}]},addCateDialogVisible:!1,indexText:"#",queryInfo:{type:3,pagenum:1,pagesize:5},cateList:[],total:0,columns:[{label:"分类名称",prop:"cat_name"},{label:"是否有效",type:"template",template:"isOk"},{label:"排序",type:"template",template:"order"},{label:"操作",type:"template",template:"action"}],parentCateList:[],cascaderProps:{value:"cat_id",label:"cat_name",children:"children"},selectedKeys:[],editCateDialogVisible:!1,editCateForm:{cat_id:0,cat_name:"",cat_level:0},editCateFormRules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"}]}}},created(){this.getCateList()},methods:{async getCateList(){const{data:t}=await this.$http.get("categories",{params:this.queryInfo});if(200!==t.meta.status)return this.$message.error("获取商品分类数据失败");this.cateList=t.data.result,this.total=t.data.total},handleSizeChange(t){this.queryInfo.pagesize=t,this.getCateList()},handleCurrentChange(t){this.queryInfo.pagenum=t,this.getCateList()},showAddCateDialog(){this.getParentCateList(),this.addCateDialogVisible=!0},async getParentCateList(){const{data:t}=await this.$http.get("categories",{params:{type:2}});if(200!==t.meta.status)return this.$message.error("获取父级分类数据失败");this.parentCateList=t.data},parentCateChanged(){if(this.selectedKeys.length>0)return this.addCateForm.cat_pid=this.selectedKeys[this.selectedKeys.length-1],void(this.addCateForm.cat_level=this.selectedKeys.length);this.addCateForm.cat_pid=0,this.addCateForm.cat_level=0},async addCate(){this.$refs.addCateFormRef.validate((async t=>{if(!t)return;const{data:e}=await this.$http.post("categories",this.addCateForm);if(201!==e.meta.status)return this.$message.error("添加分类失败");this.$message.success("添加分类成功"),this.addCateDialogVisible=!1,await this.getCateList()}))},addCateDialogClosed(){this.$refs.addCateFormRef.resetFields(),this.selectedKeys=[]},async showEditCateDialog(t){await this.getParentCateList();const{data:e}=await this.$http.get(`categories/${t.cat_id}`);if(200!==e.meta.status)return this.$message.error("获取当前分类数据失败");this.editCateForm=e.data,this.editCateDialogVisible=!0},async editCate(){this.$refs.editCateFormRef.validate((async t=>{if(!t)return;const{data:e}=await this.$http.put(`categories/${this.editCateForm.cat_id}`,{cat_name:this.editCateForm.cat_name});if(200!==e.meta.status)return this.$message.error("编辑分类失败");this.$message.success("编辑分类成功"),this.editCateDialogVisible=!1,await this.getCateList()}))},async removeCate(t){try{const e=await this.$confirm("此操作将永久删除该分类, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"});if("confirm"===e){const{data:e}=await this.$http.delete(`categories/${t.cat_id}`);if(200!==e.meta.status)return this.$message.error("删除分类失败");this.$message.success("删除分类成功"),await this.getCateList()}}catch(e){this.$message.info("已取消删除")}}}},l=r,n=a(1001),o=(0,n.Z)(l,i,s,!1,null,"4102a0b5",null),c=o.exports},9517:function(t,e,a){a.r(e),a.d(e,{default:function(){return c}});var i=function(){var t=this,e=t._self._c;return e("div",[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),e("el-breadcrumb-item",[t._v("商品管理")]),e("el-breadcrumb-item",[t._v("商品分类")])],1),e("br"),e("el-card",[e("el-alert",{attrs:{title:"注意：商品参数只能添加三级分类",type:"warning",closable:"","show-icon":""}}),e("br"),e("el-row",{staticClass:"cat_opt"},[e("span",[t._v("选择商品分类:")]),e("el-cascader",{attrs:{options:t.catList,props:{expandTrigger:"hover",...t.cateProps}},on:{change:t.handleChange},model:{value:t.SelectedCateKeys,callback:function(e){t.SelectedCateKeys=e},expression:"SelectedCateKeys"}})],1),e("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[e("el-tab-pane",{attrs:{label:"动态参数",name:"many"}},[e("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isBtnDisabled},on:{click:function(e){t.addDialogVisible=!0}}},[t._v("添加参数")]),e("br"),e("br"),e("el-table",{attrs:{data:t.manyTableData,border:"",stripe:""}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(a){return[t._l(a.row.attr_vals,(function(i,s){return e("el-tag",{key:s,attrs:{closable:"",type:""},on:{close:function(e){return t.handleClose(s,a.row)}}},[t._v(t._s(i))])})),a.row.inputVisible?e("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(e){return t.handleInputConfirm(a.row)}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm(a.row)}},model:{value:a.row.inputValue,callback:function(e){t.$set(a.row,"inputValue","string"===typeof e?e.trim():e)},expression:"scope.row.inputValue"}}):e("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(e){return t.showInput(a.row)}}},[t._v("+ New Tag")])]}}])}),e("el-table-column",{attrs:{type:"index",label:"#"}}),e("el-table-column",{attrs:{label:"参数名称",prop:"attr_name"}}),e("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(e){return t.showEditDialog(a.row.attr_id)}}},[t._v("编辑")]),e("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(e){return t.removeParams(a.row.attr_id)}}},[t._v("删除")])]}}])})],1)],1),e("el-tab-pane",{attrs:{label:"静态属性",name:"only"}},[e("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isBtnDisabled},on:{click:function(e){t.addDialogVisible=!0}}},[t._v("添加属性")]),e("br"),e("br"),e("el-table",{attrs:{data:t.onlyTableData,border:"",stripe:""}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(a){return[t._l(a.row.attr_vals,(function(i,s){return e("el-tag",{key:s,attrs:{closable:"",type:""},on:{close:function(e){return t.handleClose(s,a.row)}}},[t._v(t._s(i))])})),a.row.inputVisible?e("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(e){return t.handleInputConfirm(a.row)}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm(a.row)}},model:{value:a.row.inputValue,callback:function(e){t.$set(a.row,"inputValue","string"===typeof e?e.trim():e)},expression:"scope.row.inputValue"}}):e("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(e){return t.showInput(a.row)}}},[t._v("+ New Tag")])]}}])}),e("el-table-column",{attrs:{type:"index",label:"#"}}),e("el-table-column",{attrs:{label:"属性名称",prop:"attr_name"}}),e("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(e){return t.showEditDialog(a.row.attr_id)}}},[t._v("编辑")]),e("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(e){return t.removeParams(a.row.attr_id)}}},[t._v("删除")])]}}])})],1)],1)],1)],1),e("el-dialog",{attrs:{title:`添加${t.title}`,visible:t.addDialogVisible,width:"50%"},on:{"update:visible":function(e){t.addDialogVisible=e},close:t.addDialogClosed}},[e("el-form",{ref:"addFormRef",attrs:{model:t.addForm,rules:t.addFormRules,"label-width":"100px"}},[e("el-form-item",{attrs:{label:t.title,prop:"attr_name"}},[e("el-input",{model:{value:t.addForm.attr_name,callback:function(e){t.$set(t.addForm,"attr_name",e)},expression:"addForm.attr_name"}})],1)],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.addDialogVisible=!1}}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.addParams}},[t._v("确 定")])],1)],1),e("el-dialog",{attrs:{title:`修改${t.title}`,visible:t.editDialogVisible,width:"50%"},on:{"update:visible":function(e){t.editDialogVisible=e},close:t.editDialogClosed}},[e("el-form",{ref:"editFormRef",attrs:{model:t.editForm,rules:t.editFormRules,"label-width":"100px"}},[e("el-form-item",{attrs:{label:t.title,prop:"attr_name"}},[e("el-input",{model:{value:t.editForm.attr_name,callback:function(e){t.$set(t.editForm,"attr_name",e)},expression:"editForm.attr_name"}})],1)],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.editDialogVisible=!1}}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.editParams}},[t._v("确 定")])],1)],1)],1)},s=[],r=(a(7658),{data(){return{catList:[],cateProps:{value:"cat_id",label:"cat_name",children:"children"},SelectedCateKeys:[],activeName:"many",manyTableData:[],onlyTableData:[],addDialogVisible:!1,addForm:{attr_name:""},addFormRules:{attr_name:[{required:!0,message:"请输入参数名称",trigger:"blur"}]},editDialogVisible:!1,editForm:{attr_name:""},editFormRules:{attr_name:[{required:!0,message:"请输入参数名称",trigger:"blur"}]}}},created(){this.getParamsList()},methods:{async getParamsList(){const{data:t}=await this.$http.get("categories");if(200!==t.meta.status)return this.$message.error("获取商品分类列表失败");this.catList=t.data},handleChange(){this.getParamsData()},handleClick(){this.getParamsData()},async getParamsData(){const{data:t}=await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:this.activeName}});if(200!==t.meta.status)return this.$message.error("获取参数列表失败");t.data.forEach((t=>{t.attr_vals=t.attr_vals?t.attr_vals.split(","):[],t.inputVisible=!1,t.inputValue=""})),"many"===this.activeName?this.manyTableData=t.data:this.onlyTableData=t.data},addDialogClosed(){this.$refs.addFormRef.resetFields()},addParams(){this.$refs.addFormRef.validate((async t=>{if(!t)return;const{data:e}=await this.$http.post(`categories/${this.cateId}/attributes`,{attr_name:this.addForm.attr_name,attr_sel:this.activeName});if(201!==e.meta.status)return this.$message.error("添加参数失败");this.$message.success("添加参数成功"),this.addDialogVisible=!1,await this.getParamsData()}))},async showEditDialog(t){const{data:e}=await this.$http.get(`categories/${this.cateId}/attributes/${t}`,{params:{attr_sel:this.activeName}});if(200!==e.meta.status)return this.$message.error("查询参数信息失败");this.editForm=e.data,this.editDialogVisible=!0},editDialogClosed(){this.$refs.editFormRef.resetFields()},editParams(){this.$refs.editFormRef.validate((async t=>{if(!t)return;const{data:e}=await this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`,{attr_name:this.editForm.attr_name,attr_sel:this.activeName});if(200!==e.meta.status)return this.$message.error("修改参数失败");this.$message.success("修改参数成功"),this.editDialogVisible=!1,await this.getParamsData()}))},async removeParams(t){const e=await this.$confirm("此操作将永久删除该参数, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"});if("cancel"===e)return this.$message.info("已取消删除");const{data:a}=await this.$http.delete(`categories/${this.cateId}/attributes/${t}`,{params:{attr_sel:this.activeName}});if(200!==a.meta.status)return this.$message.error("删除参数失败");this.$message.success("删除参数成功"),await this.getParamsData()},async handleInputConfirm(t){if(0===t.inputValue.trim().length)return t.inputValue="",void(t.inputVisible=!1);t.attr_vals.push(t.inputValue.trim()),t.inputValue="",t.inputVisible=!1,await this.saveAttrValue(t)},showInput(t){t.inputVisible=!0,this.$nextTick((()=>{this.$refs.saveTagInput.$refs.input.focus()}))},async saveAttrValue(t){const{data:e}=await this.$http.put(`categories/${this.cateId}/attributes/${t.attr_id}`,{attr_name:t.attr_name,attr_sel:t.attr_sel,attr_vals:t.attr_vals.join(",")});if(200!==e.meta.status)return this.$message.error("修改参数值失败");this.$message.success("修改参数值成功")},async handleClose(t,e){e.attr_vals.splice(t,1),await this.saveAttrValue(e)}},computed:{isBtnDisabled(){return 3!==this.SelectedCateKeys.length},cateId(){return this.SelectedCateKeys[2]},title(){return"many"===this.activeName?"动态参数":"静态属性"}}}),l=r,n=a(1001),o=(0,n.Z)(l,i,s,!1,null,"6275935e",null),c=o.exports}}]);
//# sourceMappingURL=Cate_Params.4ad46ddc.js.map