<template>
  <div class="item" style="height: 320px;border-radius: 8px;" >
    <div style="height: 320px;position:relative;top:-40px">
	<div  style="width: 80px;height: 100px;position: absolute;right: 10px;background-color:rgba(0,0,0,0.6);border-radius: 2px;z-index: 10;">
				<div  style="width:38px;height: 25px;margin: 0 auto;"><i style="color: white;font-size:18px;text-align: center;">评分</i></div>  
				<div  style="width:55px;height: 35px;border-top: 1px white solid;border-bottom: 1px white solid;margin: 0 auto;" v-if="item.pingfen"><i style="color:orange;font-size: 24px;text-align: center;">{{item.pingfen}}</i></div> 
				<div  style="width:55px;height: 35px;border-top: 1px white solid;border-bottom: 1px white solid;margin: 0 auto;" v-else><i style="color:orange;font-size: 24px;text-align: center;">NAN</i></div> 
				  <div  style="width:80px;height: 30px;margin: 0 auto;color: white;font-size:5px;text-align: center;font-size:12px;" v-if="item.renshu"><i>{{item.renshu}}人<br>参与了评论</i></div> 
				  <div  style="width:80px;height: 30px;margin: 0 auto;color: white;font-size:5px;text-align: center;font-size:12px;" v-else><i>尚未有评论</i></div> 
	</div>
	
      <div class="item-img">
        <img
          :alt="item.name"
          :src="
            item.sku_info[itemIndex].ali_image +
              '?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'
          "
          style="opacity: 1;width: 99%;border-radius: 8px;position:relative;top:-7px"
        />
      </div>
      <h6>{{ item.name }}</h6>
      <h3>{{ item.name_title }}</h3>
      <div class="params-colors">
        <ul class="colors-list">
         <!-- <li v-for="(sku, index) in item.sku_info">
            <a
              href="javascript:;"
              :class="{ active: index == itemIndex }"
              :title="sku.spec_json.show_name"
              @click="tableIndex(index)"
              ><img
                :src="
                  'http://img01.smartisanos.cn/' +
                    sku.spec_json.image+
                    '/20X20.jpg'
                "
            /></a>
          </li> -->
        </ul>
		
      </div>
      <div class="item-btns clearfix" style="position: absolute;top:270px;height: 30px;z-index: 100;">
        <span class="item-gray-btn"
          ><router-link :to="{name:'Item',query:{itemId:item.sku_info[itemIndex].sku_id}}">查看详情 </router-link></span
        ><span
          class="item-blue-btn"
          @click="addCar(item.sku_info[itemIndex])"
          
          @mouseleave="hidecarButton"
          >加入收藏
        </span>
      </div>
      <div class="item-price clearfix" style="position:absolute;top:250px;height: 30px;z-index: 100;right: 40%;">
        <i>¥</i><span>{{ item.price }}<i style="color:#616161">/晚</i></span>
      </div>
      <div class="discount-icon">false</div>
      <div class="item-cover">
        <router-link :to="{name:'Item',query:{itemId:item.sku_info[itemIndex].sku_id}}"></router-link>
		
      </div>
	 
    </div>
  </div>
</template>
<style>

</style>
<script>
export default {
  data() {
    return {
		show:false,
      itemIndex: 0,
	  token:"",

    };
  },
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    ball () {
      return this.$store.state.ball
    },
  },
  watch: {
       // 如果路由有变化，会再次执行该方法
       "$route": "fenshu",
	   item(){
		   return this.item
	   }
      },
  methods: {
	 fenshu(){},
    showcarButton() {
      this.$store.commit("showcar");
    },
    hidecarButton() {
      this.$store.commit("hidecar2");
    },
    tableIndex(index) {
      this.itemIndex = index;
    },
    async addCar(dd){
		let add=dd.sku_id
		let bb=event
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
			
			this.show=true
			let f=true
			
			const select=await this.axios.get("rng/selCar",{params:{phone:this.token.substring(3,14)}})
			for(let x=0;x<select.results.length;x++){
				if(select.results[x].sku_id==add){
					f=false
					
				}
			}
			// 
			
			if(f==false){
				this.$message({
					          message: '警告：已经收藏过该物品',
					          type: 'warning'
					        });
			}
			else{
				await this.axios.get("rng/addCar",{params:{sku_id:add,phone:this.token.substring(3,14)}}).then(
					this.$store.commit('gotocar',{dd,bb})
				)
				this.$message({
			          message: '房源收藏成功',
			          type: 'success'
			        });
					
			}
			
		}
    },
  },
};
</script>

<style></style>
