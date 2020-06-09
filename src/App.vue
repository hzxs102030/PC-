
<template>
  <div id="app" >
  	<header-nav></header-nav>	
  	<router-view></router-view>
	<bottom></bottom>
  </div>
</template>

<script>

import headerNav from '@/components/header-nav'
import bottom from '@/components/bottom.vue'
export default {
  name: 'app',
  
  components: {
    headerNav,
	bottom
  },
  mounted(){
		// this.axios.get("rng/list").then((res)=>{
		// 	for(let I = 0; I < res.length; I++){
		// 		console.log(res[I])
		// 	}
		// })
		
	},
	methods:{
		getLocation(){
			const self=this;
			AMap.plugin('AMap.Geolocation', function() {
			  var geolocation = new AMap.Geolocation({
			    // 是否使用高精度定位，默认：true
			    enableHighAccuracy: true,
			    // 设置定位超时时间，默认：无穷大
			    // timeout: 10000,
			    // // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
			    // buttonOffset: new AMap.Pixel(10, 20),
			    // //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			    // zoomToAccuracy: true,     
			    // //  定位按钮的排放位置,  RB表示右下
			    // buttonPosition: 'RB'
			  })
			
			  geolocation.getCurrentPosition()
			  AMap.event.addListener(geolocation, 'complete', onComplete)
			  AMap.event.addListener(geolocation, 'error', onError)
			
			  function onComplete (data) {
			    // data是具体的定位信息
				//console.log(data)
				self.$store.dispatch("setLocation",data)
				self.$store.dispatch("setAddress",data.formattedAddress)
			  }
			
			  function onError (data) {
			    // 定位出错
				//console.log(data)
				self.getLngLatLocation()
			  }
			})
		},
		getLngLatLocation(){
			const self=this;
			AMap.plugin('AMap.CitySearch', function () {
			  var citySearch = new AMap.CitySearch()
			  citySearch.getLocalCity(function (status, result) {
			    if (status === 'complete' && result.info === 'OK') {
			      // 查询成功，result即为当前所在城市信息
				  AMap.plugin('AMap.Geocoder', function() {
				    var geocoder = new AMap.Geocoder({
				      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
				      city: result.adcode
				    })
				   
				    var lnglat = result.rectangle.split(";")[0].split(",");
				  
				    geocoder.getAddress(lnglat, function(status, data) {
				      if (status === 'complete' && data.info === 'OK') {
				          // result为对应的地理位置详细信息
						  
						  // let x=result.bounds.xc.R
						  // let y=result.bounds.xc.Q
						  // let z=[]
						  // z.x=x
						  // z.y=y
						  // console.log(z)
						 self.$store.dispatch("setLocation",{
						 							  addressComponent:{
						 								  city:result.city,
						 								  province:result.province,
						 								  },
						 								  formattedAddress:data.regeocode.formattedAddress
						 							  })
						self.$store.dispatch("setAddress",data.regeocode.formattedAddress)  
						// self.$store.dispatch("setIP",z)
				      }
				    })
				  })
			    }
			  })
			})
		}
	},
created () {
	this.getLocation()
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>

</style>