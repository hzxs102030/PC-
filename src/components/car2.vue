<template>
	<div style="display: flex;height: 100px;position: absolute;left:820px">
	      <transition name="el-fade-in-linear" >
	        <div class="transition-box" v-show="show3" style="width: 310px;height: 700px;">
			<div style="font-size: 24px;width: 290px;border-bottom: 1px solid rgba(0,255,255);">收藏夹
			<i style="color:lightpink;font-size: 18px;"></i></div>
			<el-table :data="carPanelData" border :row-style="tableRowStyle"
			:header-cell-style="tableHeaderColor" style="margin-top: 20px;">
						<el-table-column property="pay_id" label="订单图" width="86">
							<template slot-scope="scope">
								<el-link type="danger" @click="checkDetail(scope.row)" :underline="false">
									<img :src="scope.row.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"
									width="72px">
								</el-link>
							</template>
						</el-table-column>
					    <el-table-column property="sku_id" label="订单编号" width="90"></el-table-column>
						<el-table-column width="93"   label="订单操作">
						<template slot-scope="scope">
							<el-link type="danger" @click="checkDetail(scope.row)" :underline="false">
								<i class="el-icon-delete"></i>前往订单
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
			token:"",
			carPanelData:[]
		}
	},
	props:["show3"],
	mounted(){
		this.showcarButton()
	},
	methods:{
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
		async showcarButton(){
			this.token=localStorage.getItem('token')
			if(this.token==null){}
			else{
				this.token=localStorage.getItem('token')
			const select=await this.axios.get("rng/selData",{params:{phone:this.token.substring(3,14)}})
			
			this.carPanelData=select.results
			this.$store.commit('carPanelData1',this.carPanelData)
			if(this.carPanelData!=""){this.count=this.carPanelData.length}
			for(let x=0;x<this.carPanelData.length;x++){
				let ssr=[]
				let wwr=[]
				let ssb=[]
						ssb=ssb.concat(this.carPanelData[x].image)
						ssb=ssb.concat(this.carPanelData[x].show_name)
						this.carPanelData[x].spec_json=ssb

			}
			console.log(this.$store.state.carPanelData)
			}
			
		},
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