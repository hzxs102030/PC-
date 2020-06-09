<template>
	<div id="main">
		<div class="sku-box store-content">
			<div style="width: 100%;height: 50px;border-radius: 8px;margin-bottom: 10px;">
				
				<div style="width: 93%;float: left;height: 50px;background-color:white;border-radius: 8px;margin-bottom: 20px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-left:3.5%;">
					<div style="left: 20%;position: absolute;font-size: 24px;top:8px" @click="hangzhou"><i class="el-icon-location-outline" style="color:coral;" ></i><i style="color:cadetblue">杭州</i></div>
					<div style="left: 30%;position: absolute;font-size: 24px;top:5px">
						<div class="block">
						    <el-date-picker
						      v-model="value"
						      type="daterange"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :default-time="['00:00:00', '23:59:59']">
						    </el-date-picker>
						  </div>
						
					</div>
					<div style="left: 30%;position: absolute;font-size: 13px;top:16px">
						<div style="position: relative;left: 135px;">
						入住    
						</div>
						<div style="position: relative;left: 290px;top:-18px">
						离开    
						</div>
					</div>
					<div style="left: 60%;position: absolute;font-size: 16px;top:13px">
						<i style="color: rosybrown;">共{{parseFloat((value[1]-value[0])/86400000).toFixed(0)}}晚</i>
						
					</div>
					<div style="left: 65%;position: absolute;font-size: 16px;top:5px">
						<el-button type="warning" plain @click="find">民宿搜索</el-button>
					</div>
				</div>
				
			</div>
			
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="margin-bottom: 10px;height: 30px;width: 200px;
				position: relative;top:0px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-bottom: 2px sold #EDEDED;border-radius: 3px;">
				  <el-menu-item index="1" style="width: 100px;height: 30px;position: absolute;left: 0px;line-height: 1;
				  background-color:rgb(255,255,255,);padding-top: 8px;border-top-left-radius: 3px;" @click="sort">综合排序</el-menu-item>
				  <el-menu-item index="2" style="width: 100px;height: 30px;position: absolute;left: 100px;line-height: 1;
				  background-color:rgb(255,255,255);padding-top: 8px;" @click="sort2">评分排序</el-menu-item>
				  <el-menu-item index="3" style="width: 100px;height: 30px;position: absolute;left: 200px;line-height: 1;
				  background-color:rgb(255,255,255);padding-top: 8px;border-top-right-radius: 3px;"  @click="sort3" v-if="price">价格排序<i class="el-icon-caret-top"></i></el-menu-item>
				  <el-menu-item index="3" style="width: 100px;height: 30px;position: absolute;left: 200px;line-height: 1;
				  background-color:rgb(255,255,255);padding-top: 8px;border-top-right-radius: 3px;"  @click="sort4" v-else>价格排序<i class="el-icon-caret-bottom
"></i></el-menu-item>
				</el-menu>
			<!-- <div class="sort-option">
				<ul class="line clear">
					<li><a href="javascript:;" class="active">综合排序</a></li>
					<li><a href="javascript:;" class="">销量排序</a></li>
					<li><a href="javascript:;" class="">价格低到高</a></li>
					<li><a href="javascript:;" class="">价格高到低</a></li>
				</ul>
			</div> -->
			<div style="width: 50%;height: 30px;border-radius: 3px;margin-bottom: 10px;background-color:#FFFFFF;
			position: absolute;top:60px;left: 310px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"></div>
			<div class="gray-box">
				<div class="item-box">
					<shop-item v-for="item,index in goodsData" :item="item" :key="index" v-if="item.show==true"></shop-item>
					
				</div>
			</div>
		</div>
		<!-- <prompt></prompt> -->
	</div>
</template>

<script>
	
	import shopItem from "../components/shop-item"
	import prompt from "../components/prompt"
	
	function sortBykey(ary, key) {
	  return ary.sort(function (a, b) {
	    let x = a[key]
	    let y = b[key]
	    return ((x > y) ? -1 : (x < y) ? 1 : 0)
	  })
	}
	function sortBykey2(ary, key) {
	  return ary.sort(function (a, b) {
	    let x = a[key]
	    let y = b[key]
	    return ((x < y) ? -1 : (x > y) ? 1 : 0)
	  })
	}
	export default{
		data(){
			return{
				price:true,
				activeIndex: '1',
				value: [new Date(), (new Date()).getTime()+24*60*60*1000],
				goodsData:[],
					  mmp:[]
			}
		},
		watch:{
			value(){
				//console.log(this.value)
				
			},
			goodsData(val){
				this.goodsData=val
			}
		},
		computed: {
		    sortgoodsData: function () {
		      return sortBykey(this.goodsData, 'pingfen')
		    },
			sortgoods: function () {
		      return sortBykey(this.goodsData, 'id')
		    },
			sortgoodsup: function () {
			  return sortBykey(this.goodsData, 'price')
			},
			sortgoodsdown: function () {
			  return sortBykey2(this.goodsData, 'price')
			},
		  },
		components:{
			shopItem,
			prompt
		},
		methods: {
			sort(){
				this.sortgoods	
			},
			sort2(){
				this.sortgoodsData
			},
			sort3(){
				this.sortgoodsup
				this.price=false
			},
			sort4(){
				this.sortgoodsdown
				this.price=true
			},
			async find(){
				const select=await this.axios.get('rng/getday')
				let day=select.results
				//console.log(this.value[0].getTime())
					// console.log(new Date(day[x].day).getTime())
				for(let y=0;y<this.goodsData.length;y++){
					this.goodsData[y].show=true
					for(let x=0;x<day.length;x++){
						if(this.goodsData[y].id==String(day[x].sku_id).substring(0,7)){
							if(new Date(day[x].day).getTime()>=new Date(this.value[0]).getTime()&&new Date(day[x].day).getTime()<=new Date(this.value[1]).getTime()){
								this.goodsData[y].show=false
							}
						}
						
					}
				}
			this.$router.push({
				path:'/Find',
				query:{
					goodsData:this.goodsData
				}
			})
				
			},
			hangzhou(){
				this.$message({
				          message: 'Sorry,当前仅支持杭州市',
				          type: 'warning'
				        });
			},
			async token(){
				const ree=await this.axios.get('rng/goodsData')
				const fee=await this.axios.get('rng/sku_info')
				const ddd=await this.axios.get('rng/fenshu')
				let www=ddd.results
						this.goodsData=ree.results
						this.sku_info=fee.results
				
					for(let x=0;x<this.goodsData.length;x++){
						let ssr=[]
						this.goodsData[x].show=true
					for(let y=0;y<this.sku_info.length;y++){
						let str=String(this.sku_info[y].sku_id).substring(0,7)
						
						if(this.goodsData[x].id==str){
							let ssb=[]
							// console.log(this.goodsData[x])
							// console.log(this.numberValidateForm)
							ssb=ssb.concat(this.sku_info[y].image)
							ssb=ssb.concat(this.sku_info[y].show_name)
							// ssd=ssd.concat(this.sku_info[y].sku_id)
							// ssd=ssd.concat(this.sku_info[y].title)
							// ssd=ssd.concat(this.sku_info[y].sub_title)
							// ssd=ssd.concat(this.sku_info[y].ali_image)
							// ssd=ssd.concat(this.sku_info[y].price)
							// ssd=ssd.concat(this.sku_info[y].limit_num)
							this.sku_info[y].spec_json=ssb
							ssr=ssr.concat(this.sku_info[y]) 
							
						}
						
					}
				this.goodsData[x].sku_info=ssr
				}
				
				for(let x=0;x<this.goodsData.length;x++){
					
					let num=0.0
						let n=0
					for(let y=0;y<www.length;y++){
						
						
						if(www[y].sku_id==this.goodsData[x].id){
							
							num+=parseInt(www[y].pingfen)
							n++
						}
						
					}
					if(num==0){
						this.goodsData[x].pingfen=0.0
					}
					else{
						this.goodsData[x].pingfen=(num/n).toFixed(2)
					}
						
						this.goodsData[x].renshu=n
				}
				console.log(this.goodsData.sort(this.goodsData.pingfen));
				// console.log( this.$store.state.token.substring(0,11))
			},
			// async fenshu(){
			// 	const select=await this.axios.get("rng/fenshu")
			// 	let fen=select.results
			
					
			// 		let num=0
			// 		let n=0	
			// 			for(let x=0;x<fen.length;x++){
							
			// 				if(fen[x].sku_id==String(this.$router.props.item.id).substring(0,7)){
			// 				num+=parseInt(fen[x].pingfen)
			// 				n++
			// 			}
			// 		}
			// 		this.mmp.pingfen=(num/n).toFixed(2)
			// 		this.mmp.ren=n
			
			// 		console.log(this.mmp)
			// }
			},
			mounted(){
				// this.fenshu()
				this.token()
				//console.log(this.goodsData)
			}
	}
</script>

<style>
	@charset "utf-8";
	.sku-box{
	    position: relative;
	}
	.sort-option{
	    border-top: 1px solid #D8D8D8;
	    color: #999;
	}
	.sort-option ul{
	    height: 60px;
	    line-height: 60px;
	}
	.sort-option li{
	    position: relative;
	    float: left;
	    padding-left: 42px;
	}
	.sort-option li:first-child{
		padding-left: 9px;
	}
	.sort-option li:before{
		content: ' ';
	    display: block;
	    position: absolute;
	    left: 20px;
	    top: 50%;
	    width: 2px;
	    height: 2px;
	    margin-top: -1px;
	    background: #C7C7C7;
	}
	.sort-option li:first-child:before{
		display: none;
	}
	.sort-option a{
		display: block;
	    font-size: 12px;
	    color: #999;
	}
	.sort-option a.active, .sort-option a:hover{
	    color: #5683EA;
	}
	.gray-box{
		overflow: hidden;
	    background: #EDEDED;
	    border-radius: 8px;
	    border: 0px solid #dcdcdc;
	    border-color: rgba(0,0,0,.14);
	   /* box-shadow: 0 3px 8px -6px rgba(0,0,0,.1); */
	}
	.sku-box .item-box{
		clear: both;
	    overflow: hidden;
	    margin: 0 -1px -1px -1px;
	}
	.sku-box .item{
	    position: relative;
	    float: left;
	    border-right: 1px solid #efefef;
	    border-bottom: 1px solid #efefef;
	    width: 25%;
	    height: 429px;
	    background: #ffffff;
		/* background-color:rgba(0,0,0,0.9) */;
	    box-sizing: border-box
	}
	.sku-box .item:hover{
		box-shadow: 0 0 38px rgba(0,0,0,.08) inset;
	    transition: all .15s ease;
	}
	.sku-box .item .item-img img{
		display: block;
	    width: 206px;
	    height: 206px;
	    margin: 50px auto 10px;
	}
	.sku-box .item h3, .sku-box .item h6{
		overflow: hidden;
	    text-align: center;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.sku-box .item h6{
	    line-height: 1.2;
	    font-size: 16px;
	    color: #424242;
	    margin: 0 auto;
	    padding: 0 14px;
	}
	.sku-box .item h3{
		line-height: 1.2;
	    font-size: 12px;
	    color: #d0d0d0;
	    margin: 8px auto 14px;
	}
	.sku-box .item .params-colors{
		margin-top: 23px;
	    text-align: center;
	}
	.sku-box .item .colors-list{
		display: inline-block;
	    overflow: hidden;
	}
	.sku-box .item .colors-list li{
		float: left;
	    margin: 0 5px;
	}
	.sku-box .item .colors-list>li a{
		width: 8px;
	    height: 8px;
	    border: 1px solid #e5e5e5;
	    -webkit-border-radius: 50%;
	    -moz-border-radius: 50%;
	    border-radius: 50%;
	    padding: 2px;
	    display: block;
	}
	.sku-box .item .colors-list>li a.active{
	    box-shadow: inset 0 0 0 1px #b2b2b2;
	    border-color: #b2b2b2;
	}
	.sku-box .item .colors-list>li img{
	    width: inherit;
	    height: inherit;
	    border-radius: 50%;
	    display: block;
	}
	.sku-box .item .item-btns{
	    position: absolute;
	    left: 0;
	    right: 0;
	    bottom: 29px;
	    text-align: center;
	    opacity: 0;
	    z-index: 10;
	}
	.sku-box .item:hover .item-btns{
	    opacity: 1;
	    transition: all .2s ease-in;
	}
	.sku-box .item .item-btns .item-blue-btn, .sku-box .item .item-btns .item-disabled-btn, .sku-box .item .item-btns .item-gray-btn, .sku-box .item .item-btns .item-green-btn{
		display: inline-block;
	    box-sizing: border-box;
	    width: 100px;
	    height: 30px;
	    font-size: 16px;
	    line-height: 28px;
	    border-radius: 4px;
	    cursor: pointer;
	    font-weight: 200;
	    transition: all .1s ease;
	}
	.sku-box .item .item-btns .item-gray-btn{
		border: 1px solid #d5d5d5;
	    color: #646464;
	}
	.sku-box .item .item-btns .item-gray-btn a{
	    display: block;
	    color: #a1a1a1;
	}
	.sku-box .item .item-btns .item-gray-btn:hover{
		background-image: linear-gradient(#f6f6f6,#ededed);
	}
	.sku-box .item .item-btns .item-blue-btn{
		background-color: #5c85e5;
	    background-image: linear-gradient(#779ae9,#5078df);
	    border: 1px solid #5c81e3;
	    color: #fff;
	    margin-left: 10px;
	}
	.sku-box .item .item-btns .item-blue-btn:hover{
		border: 1px solid #5374c8;
	    background-color: #5074db;
	    background-image: linear-gradient(#6e8ed5,#4769c2);
	}
	.sku-box .item .item-btns .item-blue-btn:active{
		border: 1px solid #3e61d7;
	    background-color: #5c85e5;
	    background-image: linear-gradient(#4d72de,#6189e6);
	}
	.sku-box .item .item-price{
		font-family: Arial;
	    color: #c30a18;
	    margin-top: 24px;
	    text-align: center;
	    opacity: 1;
	}
	.sku-box .item .item-price i{
	    font-size: 16px;
	}
	.sku-box .item .item-price span{
		font-size: 18px;
	    padding-left: 4px;
	}
	.sku-box .item:hover .item-price{
		opacity: 0;
	    transition: all .1s ease-out;
	}
	.sku-box .item .discount-icon{
		display: none;
	}
	.sku-box .item .item-cover a{
		display: block;
	    position: absolute;
	    left: 0;
	    top: 0;
	    z-index: 20;
	    width: 100%;
	    height: 310px;
	}

</style>
