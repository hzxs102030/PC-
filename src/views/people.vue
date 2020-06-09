<template>
	<div style="width: 80%;height: 700px;">
	<div  style="width: 100px;left: 10%;height: 700px;position: absolute;">
		<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="height: 700px;border-radius: 4px;background-color: rgba(0,0,0,0.7);box-shadow: 0 2px 12px 0 rgba(0, 255, 255, 0.8)">
			<!-- <el-menu
			      default-active="2"
			      class="el-menu-vertical-demo"
			      @open="handleOpen"
			      @close="handleClose"
			      background-color="#545c64"
			      text-color="#fff"
			      active-text-color="#ffd04b"> -->
		  <el-submenu index="1">
		    <template slot="title">
		      <i class="el-icon-connection" style="color:rgba(0, 255, 255, 0.8);"></i>
		      <span slot="title">我的</span>
		    </template>
			<el-menu-item-group>
			  <span slot="title">我的资料</span>
			  <el-menu-item index="1-1" style="color:mediumaquamarine;" @click="newthing"><i class="el-icon-refresh-right" style="color: mediumaquamarine;"></i>更新信息</el-menu-item>
			  <el-menu-item index="1-2" style="color:rosybrown;" @click="newme" ><i class="el-icon-wallet" style="color:rosybrown;"></i>我的优惠</el-menu-item>
			</el-menu-item-group>
		    <el-menu-item-group>
		      <span slot="title">我的订单</span>
		      <el-menu-item index="1-3" style="color: orangered;" @click="pay"  ><i class="el-icon-sell" style="color: orangered;"></i>尚未付款</el-menu-item>
		      <el-menu-item index="1-4" style="color:palevioletred;"  @click="need" ><i class="el-icon-sold-out" style="color:palevioletred;"></i>预订中</el-menu-item>
		    </el-menu-item-group>
		    <el-menu-item-group title="管理地址">
		      <el-menu-item index="1-5" style="color:burlywood;"  @click="address"><i class="el-icon-position" style="color:burlywood;"></i>我的地址</el-menu-item>
		    </el-menu-item-group>
		    <!-- <el-submenu index="1-4">
		      <span slot="title">选项4</span>
		      <el-menu-item index="1-4-1">选项1</el-menu-item>
		    </el-submenu> -->
		  </el-submenu>
		  <el-submenu index="2">
		    
		    <template slot="title">
		      <i class="el-icon-s-comment" style="color:rgba(0, 255, 255, 0.8);"></i>
		      <span slot="title">我的评价</span>
		    </template>
		    <el-menu-item-group>
		      <span slot="title">我的评价</span>
		      <el-menu-item index="2-1" style="color:blueviolet" @click="mything"><i class="el-icon-edit-outline" style="color:blueviolet;"></i>管理评价</el-menu-item>
		      
		    </el-menu-item-group>
		  </el-submenu>
		  
		  <el-menu-item index="4" style="position: relative;top:400px">
		    <i class="el-icon-setting" style="color: white;"></i>
		    <span slot="title">导航四</span>
		  </el-menu-item>
		</el-menu>
	</div>	
	<div style="width: 600px;position: absolute;left: 20%;height: 700px;">
		<Personal v-bind:show1="show1" ></Personal>
		<Simple v-bind:show2="show2"  ></Simple>
		<Need v-bind:show3="show3"  ></Need>
		<Pay v-bind:show4="show4"></Pay>
		<Dizhi v-bind:show5="show5"></Dizhi>
		<Car v-bind:show1="show1" ></Car>
		<Car1 v-bind:show2="show2" ></Car1>
		<Car2 v-bind:show3="show3||show4" ></Car2>
		<Thing v-bind:show6="show6"></Thing>
		<Car3 v-bind:show6="show6" ></Car3>
	</div>
		
	</div>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-submenu:hover{
	  background-color:rgba(0, 255, 255, 0.8);
  }
  
</style>

<script>
	import Car from "../components/car.vue"
	import Car1 from "../components/car1.vue"
	import Car2 from "../components/car2.vue"
	import Car3 from "../components/car3.vue"
	import Dizhi from "../components/dizhi.vue"
import Pay from "../components/pay.vue"
import Thing from "../components/thing.vue"
import Need from "../components/need.vue"
import Simple from "../components/simple.vue"
import Personal from "../components/personal.vue"
  export default {
    data() {
      return {
        isCollapse: true,
		show1: this.$route.query.show1,
		show2: this.$route.query.show2,
		show3: this.$route.query.show3,
		show4: this.$route.query.show4,
		show5: this.$route.query.show5,
		show6: this.$route.query.show6,
      };
    },
	components:{
		Personal,
		Simple,
		Need,
		Pay,
		Dizhi,
		Car,
		Car1,
		Car2,
		Thing,
		Car3,
	},
    methods: {
		newthing(){
			this.show1=!this.show1
			this.show2=false
			this.show3=false
			this.show4=false
			this.show5=false
			this.show6=false
		},
		newme(){
			this.show2=!this.show2
			this.show1=false
			this.show3=false
			this.show4=false
			this.show5=false
			this.show6=false
		},
		need(){
			this.show3=!this.show3
			this.show1=false
			this.show2=false
			this.show4=false
			this.show5=false
			this.show6=false
		},
		pay(){
			this.show4=!this.show4
			this.show1=false
			this.show2=false
			this.show3=false
			this.show5=false
			this.show6=false
		},
		address(){
			this.show5=!this.show5
			this.show1=false
			this.show2=false
			this.show3=false
			this.show4=false
			this.show6=false
		},
		mything(){
			this.show6=!this.show6
			this.show1=false
			this.show2=false
			this.show3=false
			this.show4=false
			this.show5=false
		},
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>