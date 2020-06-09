<template>
	<div>
		<div style="width: 80%;height: 600px;background-color: white;position: absolute;left: 10%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
			<el-steps :active="2" style="width: 60%;position: absolute;left: 20%;top:5%">
			  <el-step  description="选择商品" icon="el-icon-goods"></el-step>
			  <el-step description="完成下单" icon="el-icon-s-goods"></el-step>
			  <el-step  description="支付尾款" icon="el-icon-s-claim"></el-step>
			  <el-step description="拎包入住" icon="el-icon-cold-drink"></el-step>

			</el-steps>
			<div>
				 <div style="width: 80%;position: absolute;left: 10%;top:15%">
				    
				     <span>再去挑点</span>
					
				     <el-divider direction="vertical"></el-divider>
					 <span>返回我的收藏夹</span>
				     <el-divider direction="vertical"></el-divider>
				     <span>个人中心</span>
				   </div>
			</div>
			<div style="width: 90%;position: absolute;left: 5%;top:25%">
				<div>
				    <span style="font-size: 32px;">订单详情</span>
				    <el-divider content-position="left"><i class="el-icon-tickets"></i>订单编号<i style="color: red;">{{id}}</i></el-divider>
				    <div v-if="dingdan[0]">
						<span>收件人：{{dingdan[0].name}}</span>
					<br>
					<span>发票地址：{{dingdan[0].address}}</span>
					<br>
					<span>联系电话：{{dingdan[0].phone}}</span>
					</div>
					
				    <el-divider  content-position="left"><i class="el-icon-link"></i>商品简息</el-divider>
				    <ul >
						<li v-for="item,index in carPanelData" :key="index" v-if="item.checked==true">{{item.title}}</li>
					</ul>
				    <el-divider content-position="right" ><i class="el-icon-shopping-cart-1" style="font-size: 20px;">总价格：</i>
					<i style="color: red;font-size: 24px;" v-if="carPanelData.count>88">{{carPanelData.count}}</i>
					<i style="color: red;font-size: 24px;" v-else>{{carPanelData.count+8}}</i>
					元</el-divider>
				  </div>
			</div>
			<div style="width:30%;position: absolute;right: 5%;top:85%">
				<el-button-group>
				  <el-button type="primary" icon="el-icon-bottom-left" style="background-color:green;width: 130px;border: 1px solid #00B7FF;" @click="dialogVisible = true">微信支付</el-button>
				  <el-button type="primary" style="width: 130px;border: 1px solid green;" @click="dialogVisible = true">支付宝<i class="el-icon-bottom-right"></i></el-button>
				</el-button-group>
			</div>
		</div>
		<el-dialog
		  title="Sorry"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <span>接口尚在开发中</span>
		</el-dialog>
	</div>
</template>

<script>

export default{
data(){
	return{
		dialogVisible: false,
	id:this.$route.query.id,
	dingdan:[],
	token:"",
	carPanelData:[],
	flag:false,
	checkedGoods:[]
	}
},
watch:{
carPanelData(){
				return this.carPanelData
			}
		},
methods:{
	async a(){
		const sl=await this.axios.get("rng/topay",{params:{
			pay_id:this.$route.query.id
		}})
		//console.log(sl.results)
		this.dingdan=(sl.results)
		},
		
	async show(){
		console.log(this.$route.query.checkedGoods)
		// this.token=localStorage.getItem('token')
			// const select=await this.axios.get("rng/selData",{params:{phone:this.token.substring(3,14)}})
			// const www=await this.axios.get("rng/getday")
			// this.carPanelData=select.results
			// let ddd=www.results
			// this.$store.commit('carPanelData1',this.carPanelData)
			// if(this.carPanelData!=""){this.count=this.carPanelData.length}
			// for(let x=0;x<this.carPanelData.length;x++){
			// 	let ssr=[]
			// 	let wwr=[]
			// 	let ssb=[]
			// 			ssb=ssb.concat(this.carPanelData[x].image)
			// 			ssb=ssb.concat(this.carPanelData[x].show_name)
			// 			this.carPanelData[x].spec_json=ssb
			// 			let ccc=0
			// 			for(let y=0;y<ddd.length;y++){
			// 				if(ddd[y].sku_id==this.carPanelData[x].sku_id){
			// 					ccc++
			// 				}
			// 			}
			// 			let num=0
			// 			num=ccc
			// 			this.carPanelData[x].num=num
			// 			this.carPanelData[x].checked=false
			// }
			// const select2=await this.axios.get("rng/getday")
			// let check=select2.results
			// this.dd=select2.results
			// let number=0
			// let count=0
			// for(let x=0;x<check.length;x++){
			// 	if(check[x].flag==1){
			// 		for(let y=0;y<this.carPanelData.length;y++){
			// 			if(check[x].sku_id==this.carPanelData[y].sku_id){
			// 				this.carPanelData[y].checked=true
			// 				number++
			// 			}
			// 		}
			// 	}
			// }
			// this.carPanelData.number=number
			
			// for(let w=0;w<this.carPanelData.length;w++){
			// 	if(this.carPanelData[w].checked==true){
			// 		count+=this.carPanelData[w].num*this.carPanelData[w].price
			// 	}
				
			// }
			// this.carPanelData.count=count
			// //this.$store.commit("showcar")
			// this.flag=true
			this.checkedGoods=this.$route.query.checkedGoods
			const select2=await this.axios.get("rng/getday")
				let check=select2.results
				this.dd=select2.results
				let number=0
				let count=0
			for(let x=0;x<check.length;x++){
					if(check[x].flag==1){
						for(let y=0;y<this.checkedGoods.length;y++){
							if(check[x].sku_id==this.checkedGoods[y].sku_id){
								if(this.checkedGoods[y].checked==true){
									number++
								}
								
							}
						}
					}
			}
			this.checkedGoods.number=number
			for(let w=0;w<this.checkedGoods.length;w++){
					if(this.checkedGoods[w].checked==true){
						count+=this.checkedGoods[w].num*this.checkedGoods[w].price
					}
					
				}
				this.checkedGoods.count=count
			console.log(this.checkedGoods)
			this.carPanelData=this.checkedGoods
		},
	},

mounted(){
	this.a()
	this.show()
}
 }
</script>

<style>
</style>
