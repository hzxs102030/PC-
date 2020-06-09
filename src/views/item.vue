<template>
  <div id="main" v-if="itemInfo">
	  <div  style="width: 80px;height: 100px;position: absolute;left: 20px;background-color:#FFFFFF;opacity: 60%;border-radius: 5px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
	  			<div  style="width:38px;height: 25px;margin: 0 auto;"><i style="color:#000000;font-size:18px;text-align: center;">评分</i></div>  
	  			<div  style="width:55px;height: 35px;border-top: 1px #000000 solid;border-bottom: 1px #000000 solid;margin: 0 auto;"><i style="color:orange;font-size: 24px;text-align: center;">{{item.pingfen}}</i></div> 
	  			  <div  style="width:80px;height: 30px;margin: 0 auto;color:#000000;font-size:5px;text-align: center;"><i>{{item.ren}}人<br>参与了评论</i></div> 
	  </div>
	  <div  style="width:150px;height: 120px;position: absolute;right: 20px;background-color:#FFFFFF;opacity: 60%;border-radius: 5px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
		  <div  style="width:140px;height: 25px;margin-left: 10px;"><i style="color:#000000;font-size:18px;text-align: center;">房源位置</i></div>
	  			<div  style="width:140px;height: 25px;margin-left:5px;border-top: 1px #000000 solid;"><i class="el-icon-location-outline" style="color: green;"></i><i style="color:green;font-size:18px;text-align: center;">{{itemInfo.city}}</i></div>  
	  			<div  style="width:140px;height: 35px;margin: 0 auto;"><i style="color:darkred;font-size: 14px;text-align: center;">{{itemInfo.address}}</i></div> 
	  			   
	  </div>
	  <div  style="width:150px;height: 100px;position: absolute;right: 20px;top:240px;background-color:#FFFFFF;opacity: 60%;border-radius: 5px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
	  		 
	  			<div  style="width:140px;height: 25px;margin-left:10px;"><i class="el-icon-office-building" style="color:orangered;">面积：</i><i style="color:blueviolet;font-size:18px;text-align: center;" >{{itemInfo.data.mianji}}m²</i></div>  
	  			<div  style="width:140px;height: 25px;margin-left:10px;"><i class="el-icon-s-home" style="color:orangered;">
				卧室：</i><i style="color:green;text-align: center;" >{{itemInfo.data.wo}}间</i><br>
				</div>  
	  			 <div  style="width:140px;height: 25px;margin-left:10px;">
	  			 <i style="color:deeppink;text-align: center;" class="el-icon-menu">{{itemInfo.data.wei}}卫{{itemInfo.data.ting}}厅{{itemInfo.data.chu}}厨</i>
	  			 </div>  
				 <div  style="width:140px;height: 25px;margin-left:10px;"><i class="el-icon-cold-drink" style="color:steelblue;">
				 宜居：</i><i style="color:green;text-align: center;" >{{itemInfo.data.peo}}人</i><br>
				 </div>
	  </div>
	  <div  style="width:150px;height: 200px;position: absolute;right: 20px;top:360px;background-color:#FFFFFF;opacity: 60%;border-radius: 5px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
	  		 
	  			<div  style="width:100px;height: 25px;margin-left:20px;margin-top:10px;">
					 <el-checkbox  v-model="itemInfo.data.che" ><i class="el-icon-s-flag">免费停车</i></el-checkbox>
					 <el-checkbox  v-model="itemInfo.data.dianti" ><i class="el-icon-thumb">电梯</i></el-checkbox>
					 <el-checkbox  v-model="itemInfo.data.wifi" ><i class="el-icon-check">WI-FI</i></el-checkbox>
					 <el-checkbox  v-model="itemInfo.data.men" ><i class="el-icon-key">电子门禁</i></el-checkbox>
					 <el-checkbox  v-model="itemInfo.data.chaoshi" ><i class="el-icon-ice-drink">超市</i></el-checkbox>
					 <el-checkbox  v-model="itemInfo.data.yuan" ><i class="el-icon-guide">公园</i></el-checkbox>
					 <el-checkbox  v-model="itemInfo.data.can" ><i class="el-icon-fork-spoon">餐厅</i></el-checkbox>
					 <el-checkbox  v-model="itemInfo.data.jian" ><i class="el-icon-soccer">健身房</i></el-checkbox>
</div>  
	  			
	  </div>
    <div class="store-content item">
      <div class="item-box">
        <div class="gallery-wrapper" >
          <div class="gallery">
            <div class="thumbnail">
              <ul style="overflow-x: hidden;
        overflow-y: scroll;height:325px;position:relative;top:-15px;left:-40px">
                <li :class="{ 'on': index == imgIndex }" @click="tableImg(index)"
                  v-for="(img, index) in itemInfo.ali_images"
                >
                  <img
                    :src="
                      img +
                        '?x-oss-process=image/resize,w_54/quality,Q_90/format,webp'
                    "
					style="width: 54px;"
                  />
                </li>
              </ul>
            </div>
            <div class="thumb" @mouseenter="mmm" >
              <ul style="z-index:1000;position:relative;margin-bottom: 0px;">
                <li :class="{ 'on': index == imgIndex }"
                  v-for="(img, index) in itemInfo.ali_images"
                >
                  <!-- <img
                    :src="
                      img +
                        '?x-oss-process=image/resize,w_440/quality,Q_90/format,webp'
                    "
                  /> -->
				  <div class="demo-image__preview" style="position:relative;top:-10px;left:-74px" >
				  <el-image 
				      style="width: 510px"
				      :src="img"
				      :preview-src-list="itemInfo.ali_images">
				    </el-image>
					</div>
                </li>
              </ul>
            </div>
          </div>
		<div class="banner" style="position:absolute;left:20px;width: 580px;top:460px;height:200px;">
			<div class="sku-dynamic-params-panel">
			  <div class="sku-dynamic-params clear">
			    <span class="params-name">其他户型</span>
			    <ul class="params-colors">
			      <li
			        :class="{ cur: color.id == $route.query.itemId }"
			        v-for="(color, index) in itemInfo.sku_list"
					style="background-color: #000000;"
			      >
							<router-link :title="color.color" :to="{name:'Item',query:{itemId:color.id}}">
								<img
			              :src="
			                color.image +
			                  '?x-oss-process=image/resize,w_54/quality,Q_90/format,webp'
			              "
									/></router-link>
			        
			      </li>
			    </ul>
			  </div>
			
			</div>
		</div>  
        </div>
        <div class="banner" style="position:absolute;right:20px;width: 580px;top:10px;height:520px;">
          <div class="sku-custom-title">
			  <div style="position:absolute;right:0px;"><el-link type="warning" :underline="false"><i class="el-icon-star-on"></i>加入收藏夹</el-link></div>
            <div class="params-price">
              <span
                ><em>¥</em><i>{{ itemInfo.price }}</i></span
              >
            </div>
			
            <div class="params-info" style="width: 100%;">
              <h4>{{ itemInfo.title }}</h4>
              <h6>{{ itemInfo.sub_title }}</h6>
            </div>
			
          </div>
		  <Mmap v-bind:demo="itemInfo"></Mmap>
          
          <div class="sku-status" style="position:absolute;top:450px;width: 100%;">
            <div class="cart-operation-wrapper clearfix" >
              
			  
              
			  <Time v-bind:demo="itemInfo"></Time>
            </div>
          </div>
        </div>
      </div>
    </div>
	
	<Pingjia></Pingjia>
  </div>
</template>
<style>

</style>
<script>
//import itemsData from "../store/newItemsData.js";
import Pingjia from "../components/pingjia.vue";
import Mmap from "../components/map";
import Time from "../components/time";
export default {
  data() {
    return {
		tf:false,
		show:false,
      itemsData:[],
	  sku_info:[],
	  sku_list:[],
	  ali_images:[],
      itemId: this.$route.query.itemId,
      imgIndex: 0,
	  count:1,
	  timer: null,
	  item:[]
    };
  },
  watch:{
	  '$route.query.itemId'(){
		  this.itemId=this.$route.query.itemId
		  this.imgIndex=0
	  }
  },
  computed: {
	  
    itemInfo() {
      let itemInfo=this.itemsData.filter(item => {
        return Number(item.sku_id) === Number(this.itemId);
      })[0];
      return itemInfo;
    }
	
  },
  components:{
  	Mmap,Pingjia,Time
  },
  methods:{
	  mmm(){
		  if(this.show==false){this.$notify({
		            title: '点击浏览大图',
		            message: '点图图片可查看详情',
		            position: 'top-left',

		          });
				  this.show=true
				  }
		  
	  },
	  async token(){
		
	  	//const ree=await this.axios.get('rng/goodsData')
	  	const fee=await this.axios.get('rng/sku_info')
	  	const dee=await this.axios.get('rng/sku_list')
	  	const gee=await this.axios.get('rng/ali_images')
		const hee=await this.axios.get('rng/goodsData')
	  			//this.goodsData=ree.results
	  			this.sku_info=fee.results
	  			this.sku_list=dee.results
	  			this.ali_images=gee.results
				let mmd=hee.results
	  	for(let x=0;x<this.sku_info.length;x++){
	  		let ssr=[]
	  		let wwr=[]
	  		let ssb=[]
	  				ssb=ssb.concat(this.sku_info[x].image)
	  				ssb=ssb.concat(this.sku_info[x].show_name)
	  				this.sku_info[x].spec_json=ssb
	  		for(let y=0;y<this.ali_images.length;y++){
	  			if(this.sku_info[x].sku_id==this.ali_images[y].sku_id){
	  				
	  				ssr=ssr.concat(this.ali_images[y].images) 
	  			}
	  		}
			
			if(this.itemId==this.sku_info[x].sku_id){
				for(let z=0;z<mmd.length;z++){
				if(String(this.itemId).substring(0,7)==mmd[z].id){
					this.sku_info[x].data=mmd[z]
					if(this.sku_info[x].data.che==1){this.sku_info[x].data.che=true}
					if(this.sku_info[x].data.dianti==1){this.sku_info[x].data.dianti=true}
					if(this.sku_info[x].data.wifi==1){this.sku_info[x].data.wifi=true}
					if(this.sku_info[x].data.men==1){this.sku_info[x].data.men=true}
					if(this.sku_info[x].data.chaoshi==1){this.sku_info[x].data.chaoshi=true}
					if(this.sku_info[x].data.yuan==1){this.sku_info[x].data.yuan=true}
					if(this.sku_info[x].data.can==1){this.sku_info[x].data.can=true}
					if(this.sku_info[x].data.jian==1){this.sku_info[x].data.jian=true}
					
				}
			}
			}
			
	  		//
	  		this.sku_info[x].ali_images=ssr
	  		for(let z=0;z<this.sku_list.length;z++){
	  			if(String(this.sku_info[x].sku_id).substring(0,7)==String(this.sku_list[z].id).substring(0,7)){
	  				wwr=wwr.concat(this.sku_list[z])
	  			}
	  		}
	  		this.sku_info[x].sku_list=wwr
	  	}

	  	//console.log(this.sku_info)
	  	this.itemsData=this.sku_info
		console.log(this.itemsData)
	  },
	  tableImg(index){
		  this.imgIndex=index
	  },
	  async addCar(add){
	  	this.token=localStorage.getItem('token')
	  	if(!this.token){
	  		this.$store.commit('settoken','')
	  		localStorage.removeItem('token')
	  		this.$router.push({
	  			path:'/Login'
	  		})
	  		this.$message({
	  		          message: '已经跳转到登录页面',
	  		          type: 'success'
	  		        });
	  	}
	  	else{
	  		let f=true
	  		const select=await this.axios.get("rng/selCar",{params:{phone:this.token.substring(3,14)}})
	  		for(let x=0;x<select.results.length;x++){
	  			if(select.results[x].sku_id==add){
	  				f=false
	  			}
	  		}
	  		if(f==false){
	  			this.$message({
	  				          message: '警告：已经收藏过该物品',
	  				          type: 'warning'
	  				        });
	  		}
	  		else{
	  			this.axios.get("rng/addCar",{params:{sku_id:add,phone:this.token.substring(3,14)}}).then((res) => {
	  					f=true
	  			})
	  			this.$message({
	  		          message: '房源收藏成功',
	  		          type: 'success'
	  		        });
	  		}
	  		
	  	}
	  },
	  addCount(){
		  this.count++
		  if(this.count>this.itemInfo.limit_num){
			  this.count=this.itemInfo.limit_num
		  }
	  },
	  subCount(){
	  		  this.count--
			  if(this.count==0){
			  			  this.count=1
			  }
	  },
	  async fenshu(){
	  	const select=await this.axios.get("rng/fenshu")
	  	let fen=select.results
	  		let num=0
	  		let n=0	
	  			for(let x=0;x<fen.length;x++){
	  				
	  				if(fen[x].sku_id==String(this.$route.query.itemId).substring(0,7)){
	  				num+=parseInt(fen[x].pingfen)
	  				n++
	  			}
	  		}
	  		this.item.pingfen=(num/n).toFixed(2)
	  		this.item.ren=n
	  this.tf=true
	  		
	  }
  },
  mounted(){
	  
	  this.fenshu()
	  this.token()
	  
  }
};
</script>

<style>
.item .item-box {
  width: 1098px;
  padding: 60px;
  margin-bottom: 20px;
  display: table;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}
.banner,
.gallery-wrapper {
  display: table-cell;
}
.gallery-wrapper {
  vertical-align: top;
}
.gallery {
  float: left;
  width: 540px;
  height: 440px;
  display: table-cell;
}
.thumb,
.thumbnail {
  display: table-cell;
  vertical-align: middle;
}

.thumbnail li {
  width: 54px;
  height: 36px;
  margin-top: 10px;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  cursor: pointer;
}
.thumbnail li:first-child {
  margin-top: 0;
}
.thumbnail li.on {
  padding: 10px;
  border: 3px solid #ccc;
  border: 3px solid rgba(0, 0, 0, 0.2);
}
item-box img {
  max-width: 100%;
  height: auto;
}
.thumb > ul {
  margin-left: 20px;
  width: 440px;
  height: 340px;
  position: relative;
}
.thumb li {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
  opacity: 0;
  text-align: center;
  user-select: none;
}
.thumb li.on {
  animation: thumb-change 0.35s ease-out 1;
  position: relative;
  display: block;
  z-index: 1;
  opacity: 1;
}
.item-box .banner {
  vertical-align: middle;
  width: 450px;
  margin-left: 10px;
}
.item-box .banner .sku-custom-title {
  overflow: hidden;
  padding: 8px 8px 18px 10px;
  position: relative;
}
.item-box .banner .params-price {
  position: absolute;
  right: 8px;
  bottom: 19px;
}
.item-box .banner .params-price span {
  display: block;
  color: #de4037;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: right;
}
.item-box .banner .params-price span i {
  padding-left: 2px;
  font-size: 24px;
}
.item-box .banner .sku-custom-title .params-info {
  width: 360px;
}
.item-box .banner .sku-custom-title h4 {
  font-size: 24px;
  line-height: 1.25;
  color: #000;
  margin-bottom: 13px;
}
.item-box .banner .sku-custom-title h6 {
  font-size: 14px;
  line-height: 1.5;
  color: #bdbdbd;
}
.item-box .banner .sku-dynamic-params-panel {
  padding: 29px 0 8px 10px;
  border-top: 1px solid #ebebeb;
}
.item-box .banner .sku-dynamic-params {
  margin-bottom: 19px;
}
.item-box .banner .params-name {
  float: left;
  padding-right: 20px;
  font-size: 14px;
  color: #8d8d8d;
  line-height: 36px;
}
.item-box .banner .sku-dynamic-params .params-colors {
  float: left;
  line-height: 36px;
  margin: -10px 0 0 -10px;
  width: 402px;
}
.item-box .banner .sku-dynamic-params .params-colors > li {
  float: left;
  margin: 10px 0 0 10px;
}
.item-box .banner .sku-dynamic-params .params-colors > li a {
  display: block;
  width: 54px;
  height: 36px;
  border: 2px solid #e5e5e5;
  padding: 3px;
  text-align: center;
  color: #757575;
}
.item-box .banner .sku-dynamic-params .params-colors > li.cur a {
  border-color: #b2b2b2;
  box-shadow: inset 0 0 0 1px #b2b2b2;
}
.item-box .banner .sku-dynamic-params .params-colors > li i,
.item-box .banner .sku-dynamic-params .params-colors > li img {
  position: relative;
  display: block;
  width: 100%;
}
.item-box .banner .sku-dynamic-params {
  margin-bottom: 19px;
}
.item-box .banner .params-detail {
  line-height: 36px;
  float: left;
  width: 392px;
}
.item-box .item-num {
  float: left;
  width: 128px;
}
.item-box .item-num .down:before,
.item-box .item-num .up:before {
  content: "";
  position: absolute;
  left: -4px;
  right: -4px;
  top: 0;
  height: 45px;
  background: url(../assets/img/cart-updown-item.png) no-repeat;
  background-size: 100% auto;
}
.item-box .item-num .down:before {
  content: " ";
  background-position: 0 -60px;
}
.item-box .item-num .down:hover:before {
  content: " ";
  background-position: 0 -180px;
}
.item-box .item-num .down.down-disabled:before,
.item-box .item-num .down.down-disabled:hover:before {
  content: " ";
  background-position: 0 -300px;
}
.item-box .item-num .down,
.item-box .item-num .up {
  position: relative;
  float: left;
  display: inline-block;
  width: 36px;
  height: 36px;
  line-height: 40px;
  text-indent: -9999em;
  cursor: pointer;
  user-select: none;
}
.item-box .item-num .down.down-disabled,
.item-box .item-num .up.up-disabled {
  cursor: not-allowed;
}
.item-box .item-num .up:before {
  background-position: 0 0;
}
.item-box .item-num .up:hover:before {
  background-position: 0 -120px;
}
.item-box .item-num .up.up-disabled:before,
.item-box .item-num .up.up-disabled:hover:before {
  content: " ";
  background-position: 0 -240px;
}
.item-box .item-num .num {
  position: relative;
  overflow: hidden;
  float: left;
  display: inline-block;
  width: 56px;
  height: 18px;
  margin: 7px 0 0;
  border: none;
  border-radius: 3px;
  line-height: 18px;
  text-align: center;
  font-size: 14px;
}
.item-box .item-num input {
  width: 56px;
  height: 18px;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  padding: 0;
}
.item-box .item-num ul {
  /*display: none;*/
  position: absolute;
  left: 0;
  top: 0;
  width: 56px;
}
.item-box .item-num ul li {
  width: 56px;
  height: 18px;
}
.item-box .sku-status {
  position: relative;
  border-top: 1px solid #ebebeb;
  padding: 30px 0 0 10px;
}
.item-box .blue-title-btn {
  float: left;
  display: inline-block;
  width: 143px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  border-radius: 7px;
  border: 1px solid #5c81e3;
  background-color: #5c85e5;
  background-image: linear-gradient(#779ae9, #5078df);
  color: #fff;
  cursor: pointer;
}
.item-box .blue-title-btn:hover {
  transition: all 0.15s ease-out;
  box-shadow: inset 0 1px 1px #7696de, inset 0 0 2px #627dca,
    inset 0 -2px 3px #5a77c7, inset 0 0 100px rgba(48, 77, 147, 0.4);
}
.item-box .blue-title-btn a,
.item-box .green-title-btn a {
  color: #fff;
}
.item-box .cart-operation-wrapper .gray-title-btn {
  margin-left: 20px;
}
.item-box .gray-title-btn {
  display: inline-block;
  width: 143px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  background: linear-gradient(#fff, #fafafa);
  border: 1px solid #e0e0e0;
  border-radius: 7px;
  color: #8c8c8c;
  cursor: pointer;
}
.item-box .gray-title-btn:hover {
  transition: all 0.15s ease-out;
  background: linear-gradient(#f6f6f6, #ededed);
}
</style>
