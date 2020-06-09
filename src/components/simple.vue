<template>
	<div style="display: flex;height: 100px;position: absolute;">
	      <transition name="el-fade-in-linear" >
	        <div class="transition-box" v-show="show2" style="width:600px;">
			<div style="font-size: 24px;width: 580px;border-bottom: 1px solid rgba(0,255,255);">我的优惠券</div>	
			<div>账号信息</div>	
			</div>
	      </transition>
	</div>
</template>

<script>
export default{
	data(){
		return{
			
		}
	},
	props:["show2"],
	methods:{
		personal(){
			
		}
	}
}
</script>

<style>
	.transition-box {
	    margin-bottom: 10px;
	    width: 300px;
	    height: 400px;
	    border-radius: 4px;
	    background-color: rgba(0,0,0,0.7);box-shadow: 0 2px 12px 0 rgba(0, 255, 255, 0.8);
	    color: #fff;
	    padding: 40px 20px;
	    box-sizing: border-box;
	    margin-right: 20px;
	  }
</style>