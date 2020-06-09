<template>
  <div>
    <div id="container" style="width:590px; height:360px"></div>
	<div id="panel" style=""></div>
  </div>
</template>
<script>
  var map
  export default {
	  props:{
	  	demo:{
	  		required:true
	  	}
	  },
	  data(){
		return{
		}  
	  },
    mounted: function () {
      this.init()
    },	 
  //     init: function () {
  //       map = new AMap.Map('container', {
		// 	 mapStyle: 'amap://styles/whitesmoke',
  //         center: [116.397428, 39.90923],
  //         resizeEnable: true,
  //         zoom: 13
  //       })
  //       var startLngLat =[]
		// AMap.plugin('AMap.CitySearch', function () {
		//   var citySearch = new AMap.CitySearch()
		//   citySearch.getLocalCity(function (status, result) {
		//     if (status === 'complete' && result.info === 'OK') {
		//       // 查询成功，result即为当前所在城市信息
		// 	  AMap.plugin('AMap.Geocoder', function() {
		// 	    var geocoder = new AMap.Geocoder({
		// 	      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
		// 	      city: result.adcode
		// 	    })
			   
		// 	    var lnglat = result.rectangle.split(";")[0].split(",");
			  
		// 	    geocoder.getAddress(lnglat, function(status, data) {
		// 	      if (status === 'complete' && data.info === 'OK') {
		// 			startLngLat=result.rectangle.split(";")
		// 			AMap.plugin('AMap.Driving', function() {
		// 			var driving = new AMap.Driving({
		//     // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
		// 			map: map,
		//             center:map.getCenter()
		// 			})
					
		// 			var endLngLat = [116.427281, 39.903719]
		// 			startLngLat=[119.8824799,29.95931271]
		// 			driving.search(startLngLat[0], endLngLat, function (status, result) {
		//     // 未出错时，result即是对应的路线规划方案
		// 				console.log(result)
		// 			})
		// 			})
		// 	      }
		// 	    })
		// 	  })
		//     }
		//   })
		// })
  //     }
	watch:{
		newName:{
			handler(val) {
			      this.newName=val
				  this.init()
			    },
			deep: true,
		}
	},
	computed: {
	      newName: {
			  get:function(){
				  return this.$store.getters.address
			  },
				set:function(val){
					return val
				}
	      }
	    },
    methods: {
    async init() {
		let address=this.$store.getters.address
		var endLngLat=[this.demo.yy,this.demo.xx]
		
        map =await new AMap.Map('container', {
			 mapStyle: 'amap://styles/whitesmoke',
          center: [116.397428, 39.90923],
          resizeEnable: true,
          zoom: 13
        })

		AMap.plugin('AMap.CitySearch', function () {
		  var citySearch = new AMap.CitySearch()
		  citySearch.getLocalCity(function (status, result) {
		    if (status === 'complete' && result.info === 'OK') {
		      // 查询成功，result即为当前所在城市信息
			  AMap.plugin('AMap.Geocoder', function() {
			    var geocoder = new AMap.Geocoder({
			      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
			    })
			    var lnglat = result.rectangle.split(";")[0].split(",");
			
			if(address!=""){
				geocoder.getLocation(address, function(status, result) {
				    if (status === 'complete' && result.info === 'OK') {

					 var startLngLat=[]
					 startLngLat.push(result.geocodes[0].location.R)
					 startLngLat.push(result.geocodes[0].location.Q)
					 AMap.plugin('AMap.Driving', function() {
					 var driving = new AMap.Driving({
					     // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
					         map: map,
					             
					   })
					 
					   driving.search(startLngLat, endLngLat, function (status, result) {
					     // 未出错时，result即是对应的路线规划方案
					 	console.log(result)
					   })
					 })
				    }
				  })
			}
			else{
				geocoder.getAddress(lnglat, function(status, data) {
			      if (status === 'complete' && data.info === 'OK') {
					var startLngLat=[]
					startLngLat.push(result.rectangle.split(";")[0].split(",")[0])
					startLngLat.push(result.rectangle.split(";")[0].split(",")[1])
					  AMap.plugin('AMap.Driving', function() {
          var driving = new AMap.Driving({
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                map: map,
                    
          })

          driving.search(startLngLat, endLngLat, function (status, result) {
            // 未出错时，result即是对应的路线规划方案
			console.log(result)
          })
        })
					
					
			      }
			    })
			}
				
				
				
			
			  })
		    }
		  })
		})		
		
		
		
		
		
		
		
      
      }
    }
  }
</script>
<style>
</style>