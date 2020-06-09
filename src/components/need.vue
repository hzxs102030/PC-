<template>
	<div style="display: flex;height: 100px;position: absolute;">
	      <transition name="el-fade-in-linear" >
	        <div class="transition-box" v-show="show3" style="width: 800px;height: 700px;overflow-x: hidden; overflow-y: auto">
			<div style="font-size: 24px;width: 780px;border-bottom: 1px solid rgba(0,255,255);">预订订单
			<i style="color:lightpink;font-size: 18px;"></i></div>
			  <el-table :data="message" border :row-style="tableRowStyle"
    :header-cell-style="tableHeaderColor" style="margin-top: 20px;">
				<el-table-column property="pay_id" label="订单缩略图" width="129">
					<template slot-scope="scope">
						<el-link type="danger" @click="checkDetail(scope.row)" :underline="false">
							<img :src="scope.row.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"
							width="108px">
						</el-link>
					</template>
				</el-table-column>
			    <el-table-column property="pay_id" label="订单编号" width="130"></el-table-column>
			    <el-table-column property="name" label="预订人" width="100"></el-table-column>
			    <el-table-column property="day" label="预定日期" width="150"></el-table-column>
			    <el-table-column property="price" label="价格" width="100"></el-table-column>
				<el-table-column width="100"   label="订单操作">
				<template slot-scope="scope">
					<el-link type="danger" @click="checkDetail(scope.row)" :underline="false">
						<i class="el-icon-delete"></i>前往付款
					</el-link>
				</template>
				</el-table-column>
			  </el-table>	
			</div>
	      </transition>
	</div>
</template>

<script>
export default{
	data(){
		return{
			message:[]
		}
	},
	props:["show3"],
	methods:{
		checkDetail(val){
			
		},
		tableRowStyle({ row, rowIndex }) {
		      return 'background-color: #F7F6Fd'
		    },
		    // 修改table header的背景色
		    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
		      if (rowIndex === 0) {
		        return 'background-color:rgba(0,0,0,0.7);color:rgba(0, 255, 255,0.8);font-weight: 500;border:rgba(0, 255, 255,0.8)'
		      }
		    },
		personal(){
			
		},
		async sel(){
			let f=localStorage.getItem('token').substring(3,14)
			const select =await this.axios.get("rng/selpay",{params:{
				usr:f
			}})
			const delect =await this.axios.get("rng/sku_info")
			let dd=delect.results
			let ss=select.results
			for(let x=0;x<ss.length;x++){
				if(ss[x].flag=="0"){
					for(let y=0;y<dd.length;y++){
							if(ss[x].sku_id==dd[y].sku_id){
									ss[x].ali_image=dd[y].ali_image
									let date =new Date(ss[x].day) 
									ss[x].day = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
									this.message.push(ss[x])
							}
					}
				}
			}
			console.log(this.message)
		}
	},
	mounted(){
		this.sel()
	}
}
</script>

<style>
	.transition-box {
	    margin-bottom: 10px;
	    width: 300px;
	    height: 400px;
	    border-radius: 4px;
	    background-color: rgba(0,0,0,0.7);box-shadow: 0 2px 12px 0 rgba(0, 255, 255, 0.8);
	    color: #fff;
	    padding: 40px 20px;
	    box-sizing: border-box;
	    margin-right: 20px;
	  }
</style>