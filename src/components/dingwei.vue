<template>
<div>
	<el-dialog
	  title="提示"
	  :visible.sync="drawer"
	  width="500px"
	  height="400px"
	  custom-class="dw"
	  >
		<div style="width: 100%;height:400px;":before-close="handleClose">
					  
					  <div slot="reference" style="background-color:#EDEDED;color:#000000;width:100%;height: 30px;padding-top: 15px;padding-bottom: 10px;
				  						position:absolute;left: 0%;top:0px; text-align: center">当前地址:<i class="el-icon-location-information"></i>{{address}}</div>
					
					<div style="height:100%;padding-top: 10px;
				  						position:absolute;top:60px; text-align: center;width: 100%;left:0">
						<el-button  style="width: 23%;background-color: write;margin-right: 2.5%;" @click="innerDrawer = true">
						    {{cityx}}<i class="el-icon-arrow-down el-icon--right"></i>
						  </el-button>
						
						<el-input style="width: 68%;" v-model="search_val" placeholder="小区/写字楼/学校等" id="search"></el-input>
						<div style="width:100%;height:380px;overflow-x: hidden; overflow-y: auto;">
								<ul v-for="(item,index) in areaList" :key="index">
								<li class="infinite-list-item" style="text-align: left;font-size:12px;border: 1px solid #DCDFE6;border-radius: 5px;position: relative;width: 67%;left:30%; margin-top: 1px;" @click="selectAddress(item)">
									<el-dropdown-item icon="el-icon-location" style="">
									{{item.name}}
									<p style="text-align:center;font-size:16px;border-top:1px solid #000000;"> {{item.district}}{{item.address}}</p>
									</el-dropdown-item>
									
								</li>
							</ul>
						</div>
					</div>
					
				  </div>
	
	
	</el-dialog>
	<el-dialog
	  title="提示"
	  :visible.sync="innerDrawer"
	  width="500px"
	  height="400px"
	  :before-close="handleClose">
	  <div style="width: 100%;height: 400px;background-color: write;">
	  			     			  
	  			     			  <div slot="reference" style="background-color:#EDEDED;color:#000000;width:100%;height: 30px;padding-top: 15px;padding-bottom: 10px;left: 0%;
	  			     						position:absolute;top:0px; text-align: center">当前城市:<i class="el-icon-location-information"></i>{{cityx}}</div>
	  						
	  						
	  						
	  							<div @mouseenter="kk()" @mouseleave="hh()">
	  								<el-button  style="width: 100%;background-color: write;"  > 
	  			     		     {{p1}}<i class="el-icon-arrow-down el-icon--right"></i>
	  			     		    </el-button>
	  							<transition name = "fade">
	  							  <div style="width:100%;height:330px;overflow-x: hidden; overflow-y: auto;border-bottom:1px solid #DCDFE6 ;" v-if="chanceProvince"> 
	  			     		    <ul v-for="(item,index) in c" :key="index" >
	  								
	  			     		      	<li style="text-align: center;font-size:15px;border: 1px solid #DCDFE6;width:100%;padding:5px;" @click="PC(item)"><el-dropdown-item icon="el-icon-caret-bottom
	  " style="">
	  			     		      		{{item.name}}</el-dropdown-item>
	  			     		      	</li>
	  			     		      </ul>
	  			     		    </div >
	  							</transition>
	  							
	  							</div>
	  							<div @mouseenter="ww()" @mouseleave="qq()">
	  								<el-button  style="width: 100%;background-color: write;"  > 
	  							  城市选择<i class="el-icon-arrow-down el-icon--right"></i>
	  							</el-button>
	  							<transition name = "fade">
	  							  <div style="width:100%;height:350px;overflow-x: hidden; overflow-y: auto;border-bottom:1px solid #DCDFE6 ;" v-if="chanceCity"> 
	  							<ul v-for="(item,index) in cc" :key="index" >
	  							  	<li style="text-align: center;font-size:15px;border: 1px solid #DCDFE6;width:100%;padding:5px;" @click="CC(item.name)"><el-dropdown-item icon="el-icon-caret-left
	  							  	" style="">{{item.name}}</el-dropdown-item>
	  							  				     		      	</li>
	  							  </ul>
	  							</div >
	  							</transition>
	  							</div>
	  				 </div>
	</el-dialog>
	
</div>
	
</template>

<script>
export default{
	data(){
		return{
			opencar:false,
			cityx:"杭州",
			drawer: false,
			innerDrawer: false,
			flag:false,
			p1:"省份选择",
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
				//console.log(this.cityx)
			}
			
		}
		},
	watch:{
			search_val(){
				this.searchPlace()
			},
			
		},
	methods:{
		handleClose(done) {
		        this.$confirm('确定定位到'+this.cityx+'吗')
		          .then(_ => {
		            done();
		          })
		          .catch(_ => {});
		      },
		selectAddress(item){
			this.$store.dispatch("setAddress",item.district+item.address+item.name)
			this.drawer=false
			this.$emit('my-event')
			this.$message({
			          message: '已成功定位到'+this.address,
			          type: 'success'
			        });
		},
		searchPlace(){
			const self=this;
			AMap.plugin('AMap.Autocomplete', function(){
			  // 实例化Autocomplete
			  var autoOptions = {
			    // input 为绑定输入提示功能的input的DOM ID
			    city:self.cityx
			  }
			  var autoComplete= new AMap.Autocomplete(autoOptions);
			  // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
			  autoComplete.search(self.search_val,function(status,result){
				  self.areaList=result.tips
				  console.log(result)
			  })
			})
		},
		handleClose(done) {
		        this.$confirm('确定定位到'+this.cityx+'吗')
		          .then(_ => {
		            done();
		          })
		          .catch(_ => {});
		      },
		PC(item){
			this.cc=item.districtList
			this.p1=item.name
			this.chanceProvince=false
			
		},
		CC(item){
						this.cityx=item
						this.chanceCity=false
						this.innerDrawer=false,
						this.$message({
						          message: '已成功定位到'+this.cityx,
						          type: 'success'
						        });
						
					},
		qq(){
			this.chanceCity=false
		},
		ww(){
			this.chanceCity=true},
		hh(){
			this.chanceProvince=false
		},
		kk(){
			const self=this;
			self.chanceProvince=true
			//const ree=await this.axios.get('rng/goodsData')
			AMap.plugin('AMap.DistrictSearch', function () {
			  var districtSearch = new AMap.DistrictSearch({
			    // 关键字对应的行政区级别，country表示国家
			    level: 'province',
			    //  显示下级行政区级数，1表示返回下一级行政区
			    subdistrict: 2
			  })
			  
			  // 搜索所有省/直辖市信息
			  districtSearch.search('中国', function(status, result) {
			    // 查询成功时，result即为对应的行政区信息
				self.c=result.districtList[0].districtList
			  })
			})
			
			
			// console.log( this.$store.state.token.substring(0,11))
		},
	},
	mounted(){
		
	}
}
</script>

<style>
.dw{background-color: rgba(0,0,0,0.7);}
</style>
