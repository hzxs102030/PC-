<template>
	<li class="nav-cart" @mouseenter="showcarButton" @mouseleave="hidecarButton">
		<i class="el-icon-goods ball-rect" style="font-size:30px;color:#000000;;"></i>
		<!--根据class改变颜色-->
		<span class="cart-empty-num cart-num" :class="{'cart-num':count>0}" style="position:absolute;top:15px;right:18px" v-if="count>0">
			<i>{{count}}</i>
		</span>
		<div class="nav-cart-wrapper" v-if="carshow">
			<div class="nav-cart-list">
				<div class="empty" v-if="count==0">
					<h3>购物车为空</h3>
					<p>您还没有选购任何商品，现在前往商城选购吧!</p>
				</div>
				<div class="full" v-else>
					<div class="nav-cart-items"  style="overflow-x: hidden;
        overflow-y: scroll;height:325px;right: -15px;position:relative;">
						<ul>
							<li class="clear" v-for="item,index in carPanelData">
								<div class="cart-item js-cart-item cart-item-sell">
									<div class="cart-item-inner">
										<div class="item-thumb">
											<img :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'">
										</div>
										<div class="item-desc">
											<div class="cart-cell">
												<h4> 
												<router-link :to="{name:'Item',query:{itemId:item.sku_id}}">{{item.title}}</router-link>
													
												</h4>
												<p class="attrs">
													<span>{{item.spec_json.show_name}}</span>
												</p>
												<h6 style="float: right;">
													<span class="price-icon">单价：¥</span><span class="price-num">{{item.price}}/晚</span><span class="item-num">{{item.count}}</span>
												</h6>
											</div>
										</div>
										<div class="del-btn" @click="delPanelHandle(item.sku_id)">删除</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="nav-cart-total">
						<p>共 <strong class="ng-binding">{{count}}</strong> 件商品</p>
						<!-- <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{totle}}</span></h5> -->
						<h6>
							<router-link class="nav-cart-btn" to="/car" style="font-size: 16px;"><i class="el-icon-shopping-cart-2"></i>去收藏夹</router-link>
							
						</h6>
					</div>
				</div>
			</div>
		</div>
		<transition
			name="ball"
			v-on:before-enter="beforeEnter"
			v-on:enter="Enter"
			v-on:after-enter="afterEnter"
			v-bind:css="true"
		>
			<div class="addcart-mask" v-show="ball.show">
				<img class="mask-item"/>
				<!-- <div class="mask-item" style="width: 30px;height: 30px;background-color: palegoldenrod;"/> -->
			</div>
		</transition>
	</li>
</template>

<script>
	export default{
		data(){
			return{
				carPanelData:[],
				count:0,

			}
		},
		computed:{
			totle(){
				return this.$store.getters.totlePrice
			},
			carshow(){
				return this.$store.state.carshow
			},
			ball(){
				return this.$store.state.ball
			}
			
		
		},
		methods:{
			async delPanelHandle(id){
				this.$store.commit('delCarPanelData',id)
				const select=await this.axios.get("rng/delcar",{params:{
					phone:this.token.substring(3,14),
					sku_id:id
					}}).then(res=>console.log(res.sql))
				this.count-=1
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
					// for(let y=0;y<this.ali_images.length;y++){
					// 	if(this.sku_info[x].sku_id==this.ali_images[y].sku_id){
							
					// 		ssr=ssr.concat(this.ali_images[y].images) 
					// 	}
					// }
					//
					// this.sku_info[x].ali_images=ssr
					// for(let z=0;z<this.sku_list.length;z++){
					// 	if(String(this.sku_info[x].sku_id).substring(0,7)==String(this.sku_list[z].id).substring(0,7)){
					// 		wwr=wwr.concat(this.sku_list[z])
					// 	}
					// }
					// this.sku_info[x].sku_list=wwr
				}
				console.log(this.$store.state.carPanelData)
				this.$store.commit("showcar")
				}
				
			},
			hidecarButton(){
				this.$store.commit("hidecar")
			},
			beforeEnter(el){
				let rect=this.ball.el.getBoundingClientRect()
				let rectCar=document.getElementsByClassName("ball-rect")[0].getBoundingClientRect()
				let ball=document.getElementsByClassName("mask-item")[0]
				let x=(rectCar.left+16)-(rect.left+rect.width/2)
				let y=rect.top+rect.height/2-rectCar.top+5-16
				el.style.transform='translate3d(0,'+y+'px,0)'
				ball.style.transform='translate3d(-'+x+'px,0,0)'
				ball.src=this.ball.img
			},
			Enter(el){
				let a=el.offsetHeight
				el.a=a
				el.style.transform='translate3d(0,0,0)'
				document.getElementsByClassName("mask-item")[0].style.transform='translate3d(0,0,0)'
			},
			afterEnter(){
				this.ball.show=false
			}
			
		}
		
	}
</script>

<style>
	.ball-enter-active{
		transition: 1s cubic-bezier(.32,.89,.72,1.32);
	}
	.ball-enter-active .mask-item {
		
		
		transition: 1s cubic-bezier(0,0,1, 1);
	}
	.mask-item{border-radius:30px;
		width: 30px;} 
	.nav-cart{
		z-index:999;
	}
</style>
