<template>
		<div id="header" >
			<div class="nav-global" style="background-color: #EDEDED;">
				<div class="container">
					 
					<router-link to="/" style="width: 50px;height: 50px;border-radius: 50px;font-size: 30px;margin-top: 30px;" class="el-icon-s-shop" tag="button">
						</router-link>
					<ul class="nav-aside">
						<li >
						<el-button  @click="open1" type="primary" slot="reference" style="background-color:white;color: #000000;
						position:absolute;top:-5px;right:10px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
					  border:1px solid  #EDEDED;" v-if="address"><i class="el-icon-location-information"></i>{{address}}
					  </el-button>
					  <el-button  @click="open1" type="primary" slot="reference" style="background-color:white;color: #000000;
					  						position:absolute;top:-5px;right:10px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
					  border:1px solid  #EDEDED;" v-else><i class="el-icon-loading"></i>正在获取地址
					  </el-button>
							<li class="nav-user">
							<i class="el-icon-user" style="font-size:30px;color: #000000;" @mouseenter="enter"></i>
							<!--active-->
							<div class="nav-user-wrapper"    >
								<div class="nav-user-list" v-if="opencar==true">
									<dl class="nav-user-avatar" >
										<dd><span class="ng-scope"></span></dd>
										<dt class="ng-binding">{{token.substring(3,14)}}</dt>
									</dl>
									<ul>
										
										<li class="support">
											<router-link :to="{name:'People',query:{show1:true}}">我的主页</router-link>
										</li>
										<li class="order">
											<router-link :to="{name:'People',query:{show4:true}}">我的订单</router-link></li>
										<li class="coupon">
											<router-link :to="{name:'People',query:{show2:true}}">我的优惠</router-link>
										</li>
										<li class="address">
											<router-link :to="{name:'People',query:{show5:true}}">收货地址</router-link>
										</li>
										<li class="logout"><a @click="exit">退出</a></li>
									</ul>
								</div>
							</div>
							<div class="nav-user-wrapper"  v-if="opencar==false">
								<div class="nav-user-list">
									<dl class="nav-user-avatar" >
										
									</dl>
									<ul>
										<li style="padding-bottom: 30px;"><a @click="exit"><i class="el-icon-user-solid" style="font-size: 32px;"></i>登录账户</a></li>
									</ul>
								</div>
							</div>
						</li>
						<!--active-->
						<i class="el-icon-mobile-phone" style="font-size:30px;color:#000000;" @click="phone"></i>
						
						<car-panel></car-panel>
					</ul>
					
				</div>
			</div>
<Dingwei ref="mychild"></Dingwei>


		</div>
		
</template>
<style>
.fade-enter,.fade-leave-to{
			opacity: 0;
		
			}
				
.fade-enter-to{
			}
.fade-enter-active{
				
				transition:2s ease;
			}
.fade-leave-active{
				transition:0.2s ease;
			}
.checkaddress{
	size: 30%;
}
</style>
<script>
import Dingwei from "../components/dingwei.vue"
	import carPanel from "@/components/car-panel"
	export default{
		data(){
			return{
				opencar:false,
				cityx:"杭州",
				drawer: false,
				innerDrawer: false,
				flag:false,
				p1:"浙江省",
				token:"",
					search_val:"",
					areaList:"",
					city_val:"",
					keys:[],
					c:[],
					cc:[],
					disabled:"true",
					allcities:[],
					searchList:[],
					chanceProvince:false,
					chanceCity:false
			}
		},
		watch:{
			search_val(){
				this.searchPlace()
			},
			token(){
				return this.token
			}
			
		},
		computed:{
			address(){
				return this.$store.getters.address
			},
			city:{
				get:function(){
					this.cityx= (this.$store.getters.location.addressComponent.city||
				this.$store.getters.location.addressComponent.province)
				return this.$store.getters.location.addressComponent.city||
				this.$store.getters.location.addressComponent.province
				},
				set:function(value){
					this.cityx=value
					console.log(this.cityx)
				}
				
			}
		},
		components:{carPanel,Dingwei},
		methods:{
			enter(){
				this.token=localStorage.token
				console.log(localStorage.token)
				if(this.token!=null){
					this.opencar=true
					this.token=this.token
				}
			},
			open1() {
				this.$refs.mychild.drawer=true
				if(this.flag==false){
					const h = this.$createElement;
			        this.$notify({
			          title: '数据加载中',
			          message: h('i', { style: 'color: teal'}, '可能需要一段时间，请稍等...')
			        });
				}
			        
			      },

			
			
			// searchCity(){
			// AMap.plugin('AMap.DistrictSearch', function () {
			//   var districtSearch = new AMap.DistrictSearch({
			//     // 关键字对应的行政区级别，country表示国家
			//     level: 'country',
			//     //  显示下级行政区级数，1表示返回下一级行政区
			//     subdistrict: 1
			//   })
			  
			//   // 搜索所有省/直辖市信息
			//   districtSearch.search('中国', function(status, result) {
			//     // 查询成功时，result即为对应的行政区信息
			//   })
			// })	
			// },
			phone(){
				
				const h = this.$createElement;
				this.$notify({
				          title: '手机访问',
				          dangerouslyUseHTMLString: true,
				          message: '<i class="el-icon-camera" style="color:green">请使用手机扫描下面二维码</i><br><i style="color:red">移动端123.57.243.126:8081/</i><img src="https://i.loli.net/2020/05/25/enPXrEjJTsI9Nit.png " height="200px">',
						  offset: 100
				        });
			},
			exit(){
				this.$store.commit('settoken','')
				localStorage.removeItem('token')
				this.$router.push({
					path:'/Login'
				})
				this.$message({
				          message: '已跳转到登录页面',
				          type: 'success'
				        });
						
			}
		},
		mounted(){
			this.enter()
		}
	}
</script>