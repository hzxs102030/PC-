<template>
	<div style="display: flex;height: 100px;position: absolute;" v-show="show5" >
	      <transition name="el-fade-in-linear" >
	        <div class="transition-box"style="width: 730px;height: 700px;overflow-x: hidden; overflow-y: auto">
			<div style="font-size: 24px;width: 710px;border-bottom: 1px solid rgba(0,255,255);">管理联系地址
			<i style="color:lightpink;font-size: 18px;"></i>
			<el-link type="primary" style="position: absolute;right: 30px;color: rgba(0,255,255);top:50px" :underline="false"><i class="el-icon-circle-plus-outline" @click="show=!show">添加新地址</i></el-link>
			</div>
			  	<el-table :data="receiveInfo" border :row-style="tableRowStyle"
			  	:header-cell-style="tableHeaderColor" style="margin-top: 20px;">
			  				<el-table-column property="name" label="联系人" width="129"></el-table-column>
							<el-table-column property="phone" label="联系电话" width="130"></el-table-column>
			  			    <el-table-column property="address" label="联系地址" width="250"></el-table-column>
			  				<el-table-column width="180"   label="订单操作">
			  				<template slot-scope="scope">
			  					<el-link  @click="checkDetail(scope.row)" :underline="false">
			  						<i class="el-icon-s-tools"></i>修改信息
			  					</el-link>
			  				
									<el-link type="danger" @click="checkDetail2(scope.row)" :underline="false">
										<i class="el-icon-delete"></i>删除信息
									</el-link>
								</template>
							</el-table-column>
			  	</el-table>
			  			
			  		
			</div>
	      </transition>
	<AddressP v-bind:show="show" @func="getMsgFormSon" @funb="getb"></AddressP>	  
	</div>
</template>

<script>
import AddressP from "../components/address-p"
export default{
	data(){
		return{
			show:true,
			message:[],
			receiveInfo:[],
			showx:false,
			receiveIndex:0,
		}
	},
	props:["show5"],
	components:{AddressP},
		
	methods:{
		getb(data){
		                this.show=data
		            },
		getMsgFormSon(data){
		                this.receiveInfo.push(data)
						console.log(data)
		                this.receiveIndex=0
		            },
		checkReceive(index){
			this.receiveIndex=index
		},
		checkDetail(val){
			
		},
		checkDetail2(val){
			
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
		async addressALL(){
			const sl=await this.axios.get("rng/checkaddress",{params:{
				usr:localStorage.getItem('token').substring(3,14),
				}})
			this.receiveInfo=sl.results
			console.log(sl)
		},
		showPop(){
			this.popShow=true
		},
	},
	mounted(){
		this.addressALL()
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