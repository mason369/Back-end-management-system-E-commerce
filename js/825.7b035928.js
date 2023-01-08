"use strict";(self["webpackChunkBack_end_management_system_E_commerce"]=self["webpackChunkBack_end_management_system_E_commerce"]||[]).push([[825],{825:function(t,e,a){a.r(e),a.d(e,{default:function(){return m}});var s=function(){var t=this,e=t._self._c;return e("div",[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),e("el-breadcrumb-item",[t._v("商品管理")]),e("el-breadcrumb-item",[t._v("商品列表")])],1),e("br"),e("el-card",[e("el-alert",{attrs:{title:"添加商品信息",type:"info",center:"","show-icon":"",closable:!1}}),e("br"),e("el-steps",{attrs:{space:200,active:t.activeIndex-0,"finish-status":"success","align-center":""}},[e("el-step",{attrs:{title:"基本信息"}}),e("el-step",{attrs:{title:"商品参数"}}),e("el-step",{attrs:{title:"商品属性"}}),e("el-step",{attrs:{title:"商品图片"}}),e("el-step",{attrs:{title:"商品内容"}}),e("el-step",{attrs:{title:"完成"}})],1),e("br"),e("el-form",{ref:"addFormRef",attrs:{model:t.addForm,rules:t.addFormRules,"label-width":"100px","label-position":"top"}},[e("el-tabs",{attrs:{"tab-position":"left","before-leave":t.beforeTabLeave},on:{"tab-click":t.tabClicked},model:{value:t.activeIndex,callback:function(e){t.activeIndex=e},expression:"activeIndex"}},[e("el-tab-pane",{attrs:{label:"基本信息",name:"0"}},[e("el-form-item",{attrs:{label:"商品名称",prop:"goods_name"}},[e("el-input",{model:{value:t.addForm.goods_name,callback:function(e){t.$set(t.addForm,"goods_name",e)},expression:"addForm.goods_name"}})],1),e("el-form-item",{attrs:{label:"商品价格",prop:"goods_price"}},[e("el-input",{attrs:{type:"number"},model:{value:t.addForm.goods_price,callback:function(e){t.$set(t.addForm,"goods_price",e)},expression:"addForm.goods_price"}})],1),e("el-form-item",{attrs:{label:"商品重量",prop:"goods_weight",type:"number"}},[e("el-input",{model:{value:t.addForm.goods_weight,callback:function(e){t.$set(t.addForm,"goods_weight",e)},expression:"addForm.goods_weight"}})],1),e("el-form-item",{attrs:{label:"商品数量",prop:"goods_number",type:"number"}},[e("el-input",{model:{value:t.addForm.goods_number,callback:function(e){t.$set(t.addForm,"goods_number",e)},expression:"addForm.goods_number"}})],1),e("el-form-item",{attrs:{label:"商品分类",prop:"goods_cat"}},[e("el-cascader",{attrs:{options:t.cateList,props:{expandTrigger:"hover",...t.cateProps}},on:{change:t.handleChange},model:{value:t.addForm.goods_cat,callback:function(e){t.$set(t.addForm,"goods_cat",e)},expression:"addForm.goods_cat"}})],1)],1),e("el-tab-pane",{attrs:{label:"商品参数",name:"1"}},t._l(t.manyTableData,(function(a){return e("el-form-item",{key:a.attr_id,attrs:{label:a.attr_name}},[e("el-checkbox-group",{model:{value:a.attr_vals,callback:function(e){t.$set(a,"attr_vals",e)},expression:"item.attr_vals"}},t._l(a.attr_vals,(function(t,a){return e("el-checkbox",{key:a,attrs:{label:t,border:""}})})),1)],1)})),1),e("el-tab-pane",{attrs:{label:"商品属性",name:"2"}},t._l(t.onlyTableData,(function(a){return e("el-form-item",{key:a.attr_id,attrs:{label:a.attr_name}},[e("el-input",{model:{value:a.attr_vals,callback:function(e){t.$set(a,"attr_vals",e)},expression:"item.attr_vals"}})],1)})),1),e("el-tab-pane",{attrs:{label:"商品图片",name:"3"}},[e("el-upload",{attrs:{action:t.uploadUrl,"on-preview":t.handlePreview,"on-remove":t.handleRemove,headers:t.headers,"list-type":"picture","on-success":t.handleSuccess}},[e("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1)],1),e("el-tab-pane",{attrs:{label:"商品内容",name:"4"}},[e("quill-editor",{ref:"myQuillEditor",model:{value:t.addForm.goods_introduce,callback:function(e){t.$set(t.addForm,"goods_introduce",e)},expression:"addForm.goods_introduce"}}),e("br"),e("el-button",{attrs:{type:"primary"},on:{click:t.addGoods}},[t._v("添加商品")])],1)],1)],1)],1),e("br"),e("el-dialog",{attrs:{title:"提示",visible:t.previewVisible,width:"50%"},on:{"update:visible":function(e){t.previewVisible=e}}},[e("img",{staticClass:"previewImg",attrs:{src:t.previewPath}})])],1)},r=[],o=(a(7658),a(6486)),i=a.n(o),l={data(){return{activeIndex:0,addForm:{goods_name:"",goods_price:"",goods_number:"",goods_weight:"",goods_cat:[],goods_state:"",goods_is_promote:"",promote_start_date:"",promote_end_date:"",goods_img:"",goods_imgs:[],goods_content:"",pics:[],goods_introduce:"",attrs:[]},addFormRules:{goods_name:[{required:!0,message:"请输入商品名称",trigger:"blur"}],goods_price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],goods_number:[{required:!0,message:"请输入商品数量",trigger:"blur"}],goods_weight:[{required:!0,message:"请输入商品重量",trigger:"blur"}],goods_cat:[{required:!0,message:"请选择商品分类",trigger:"change"}]},cateList:[],cateProps:{label:"cat_name",value:"cat_id",children:"children"},manyTableData:[],onlyTableData:[],uploadUrl:"https://lianghj.top:8888/api/private/v1/upload",headers:{Authorization:sessionStorage.getItem("token")},previewPath:"",previewVisible:!1}},methods:{async getCateList(){const t=await this.$http.get("categories");if(200!==t.data.meta.status)return this.$message.error("获取分类列表失败");this.cateList=t.data.data},handleChange(){3!==this.addForm.goods_cat.length&&(this.$message.error("请选择三级分类"),this.addForm.goods_cat=[])},beforeTabLeave(t,e){if("0"===e&&3!==this.addForm.goods_cat.length)return this.$message.error("请选择三级分类"),!1},async tabClicked(){if("1"===this.activeIndex){const{data:t}=await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:"many"}});if(200!==t.meta.status)return this.$message.error("获取商品参数失败");t.data.forEach((t=>{t.attr_vals=0===t.attr_vals.length?[]:t.attr_vals.split(",")})),this.manyTableData=t.data}else if("2"===this.activeIndex){const{data:t}=await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:"only"}});if(200!==t.meta.status)return this.$message.error("获取静态属性失败");t.data.forEach((t=>{t.attr_vals=0===t.attr_vals.length?[]:t.attr_vals.split(",")})),this.onlyTableData=t.data}},handlePreview(t){this.previewPath=t.response.data.url,this.previewVisible=!0},handleRemove(t){const e=t.response.data.tmp_path,a=this.addForm.pics.findIndex((t=>t.pic===e));this.addForm.pics.splice(a,1)},handleSuccess(t){const e={pic:t.data.tmp_path};this.addForm.pics.push(e)},async addGoods(){this.$refs.addFormRef.validate((async t=>{if(!t)return this.$message.error("请完善商品信息");const e=i().cloneDeep(this.addForm);e.goods_cat=e.goods_cat.join(","),this.manyTableData.forEach((t=>{const e={attr_id:t.attr_id,attr_sel:t.attr_sel,attr_vals:t.attr_vals.join(" ")};this.addForm.attrs.push(e)})),this.onlyTableData.forEach((t=>{const e={attr_id:t.attr_id,attr_sel:t.attr_sel,attr_vals:t.attr_vals};this.addForm.attrs.push(e)})),e.attrs=this.addForm.attrs;const{data:a}=await this.$http.post("goods",e);if(201!==a.meta.status)return this.$message.error("添加商品失败");this.$message.success("添加商品成功"),await this.$router.push("/goods")}))}},mounted(){this.getCateList()},computed:{cateId(){return 3===this.addForm.goods_cat.length?this.addForm.goods_cat[2]:null}}},d=l,n=a(1001),c=(0,n.Z)(d,s,r,!1,null,"4320ee4d",null),m=c.exports}}]);
//# sourceMappingURL=825.7b035928.js.map