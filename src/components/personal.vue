<template>
	<div style="display: flex;height: 100px;position: absolute;" v-show="show1" >
	      <transition name="el-fade-in-linear" >
	        <div class="transition-box"style="height: 200px;">
			<div style="font-size: 24px;">账号信息</div>	
			<div>用户名：{{me.username}}</div>
			<div v-if="!password" @click="password=!password">密码：<i class="el-icon-zoom-out" style="color: lightyellow;"></i><b style="color:cyan;">{{me.password}}</b></div>
			<div v-else @click="password=!password">密码：<i class="el-icon-view"  style="color: lightyellow;"></i><b style="color:cyan;">******</b></div>
			<div>手机号：{{me.phone}}</div>
			<div style="position: absolute;left: 200px;top: 150px;">
				<el-button plain size="mini" style="box-shadow: 0 2px 12px 0 rgba(0, 255, 0, 0.8);color: green;" @click="pd">修改密码</el-button>	
			</div>
			</div>
	      </transition>
		  <Password v-bind:show="show" @func="getMsgFormSon"></Password>
	</div>
</template>

<script>
	import Password from "../components/password.vue"
export default{
	data(){
		return{
			me:[],
			password:true,
			relname:'',
			show:true
		}
	},
	props:["show1"],
	components:{
		Password
	},
	methods:{
		getMsgFormSon(data){
		                this.show = data
		            },
		pd(){
			this.show=!this.show
		},
		async personal(){
			let tk=localStorage.token.substring(3,14)
			const select=await this.axios.get("/rng/checkphone")
			
			let ss=select.results
			for(let x=0;x<ss.length;x++){
				if(ss[x].phone==tk){
					this.me=ss[x]
				}
			}
		}
	},
	mounted(){
		this.personal()
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