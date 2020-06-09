<template>
	<div style="display: flex;height: 100px;position: absolute;">
	      <transition name="el-fade-in-linear" >
	        <div class="transition-box" v-show="show" style="left: 750px;position: absolute;height: 420px;width: 400px;">
			<el-form :model="receive" :rules="rules" ref="receive" label-width="100px" class="demo-ruleForm" >
			  <el-form-item label="联系人姓名" prop="name" >
			    <el-input v-model="receive.name" @blur="inspectName" @focus="clickName"></el-input>
			  </el-form-item>
			  <el-form-item label="联系人电话" prop="phone">
			    <el-input v-model="receive.phone"></el-input>
				<el-link type="primary" @click="checkphone" :underline="false" v-if="checked" style="color: rgba(0,255,255)"><i class="el-icon-message-solid"></i>使用默认号码</el-link >
				<el-link type="info" @click="checkphone" :underline="false" v-else><i class="el-icon-bell"></i>使用默认号码</el-link >
			  </el-form-item>
			  <el-form-item label="联系地址" prop="address">
			    <el-input type="textarea" v-model="receive.address" :disabled="true"></el-input>
				<el-link type="primary" @click="checkadd" :underline="false" v-if="checked2" style="color: rgba(0,255,255)"><i class="el-icon-s-promotion"></i>使用当前定位</el-link >
				<el-link type="info" @click="checkadd" :underline="false" v-else><i class="el-icon-position"></i>使用当前定位</el-link ><el-link type="success" @click="open1" :underline="false" style="float: right;"><i class="el-icon-refresh"></i>重新获得地址</el-link >
			  </el-form-item>
			  <el-form-item>
				<el-button plain  style="box-shadow: 0 2px 12px 0 rgba(0, 255, 0, 0.8);color: green;" @click="submitReceiveHandle">立即创建</el-button>
					<el-button plain style="box-shadow: 0 2px 12px 0 rgba(255, 0, 0, 0.8);color: red;" @click="exit">退出修改</el-button>
			  </el-form-item>
			</el-form>
			
			</div>
	      </transition>
		  <Dingwei ref="mychild" @my-event="getMyEvent"></Dingwei>
	</div>
</template>

<script>
import Dingwei from "../components/dingwei.vue"
export default{
	data(){
		return{
			phoneError:true,
			nameError:true,
			flag:false,
			checked: false,
			checked2: true,
			receive: {
			         "name": "",
			         "phone":"",
			         "province": this.$store.getters.location.addressComponent.province,
			         "city": this.$store.getters.location.addressComponent.city,
			         "county": "",
			         "address":this.$store.getters.address,
			        },
			        rules: {
			          name: [
			            { required: true, message: '请输入联系人姓名', trigger: 'blur' },
			            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
			          ],
			          phone: [
			            { required: true, message: '请输入联系人电话', trigger: 'blur' },
			            { min: 11, max: 11, message: '请输入正常联系方式', trigger: 'blur' }
			          ],
					  address: [
					    { required: true, message: '请输入联系地址', trigger: 'blur' },
			            { min: 1, max: 50, message: '请输入地址', trigger: 'blur' }
					  ],
			        }
		}
	},
	props:["show"],
	components:{
		Dingwei
	},
	watch:{
		receive:{
			handler(){
				this.inspectFlag()
			},
			deep:true
		}
	},
	methods:{
		exit(){
			this.$emit('func',false)
		},
		personal(){
			
		},
		getMyEvent(){
		        this.receive.address=this.$store.getters.address 
				this.receive.province=this.$store.getters.location.addressComponent.province
				this.receive.city=this.$store.getters.location.addressComponent.city
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
		 submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            alert('submit!');
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		      },
		      resetForm(formName) {
		        this.$refs[formName].resetFields();
		      },
			  checkphone(){
				  console.log(localStorage.token.substring(3,14))
			  	if(this.checked==true){
			  		this.receive.phone=""
			  		this.checked=false
			  	}
			  	else{this.checked=true
			  		this.receive.phone=localStorage.token.substring(3,14)
			  		this.phoneError=false
			  	}
			  	
			  },
			  checkadd(){
			  	if(this.checked2==true){
			  		this.receive.address=""
			  		this.checked2=false
			  	}
			  	else{this.checked2=true
			  		this.receive.address=this.$store.getters.address
			  		this.receive.province=this.$store.getters.location.addressComponent.province
			  		this.receive.city=this.$store.getters.location.addressComponent.city
			  		
			  	}
			  	
			  },
			  inspectFlag(){
			  	console.log(this.nameError)
			  	if((!this.nameError) && (!this.phoneError) && this.receive.province && this.receive.city  && this.receive.address){
			  		this.flag=true
			  	}
			  	else{
			  		this.flag=false
			  	}
			  },
			  clickPhone(){
			  	this.phoneError=false
			  },
			  inspectName(){
			  	if(this.receive.name!=''){
			  		this.nameError=false
			  	}
			  	else{
			  		this.nameError=true
			  	}
			  },
			  clickName(){
			  	this.nameError=false
			  },
			  async submitReceiveHandle(){

			  	if(this.flag){
			  		await this.axios.get("rng/address",{params:{
			  			usr:localStorage.token.substring(3,14),
			  			phone:this.receive.phone,
			  			address:this.receive.address,
			  			name:this.receive.name,
			  			province:this.$store.getters.location.addressComponent.province,
			  			city:this.$store.getters.location.addressComponent.city
			  		}}).then(res=>console.log(res.sql))
					this.$emit('funb',false)
			  		this.$emit('func',this.receive)
			  		this.$store.commit("submitReceive",this.receive)
			  		
			  	}
			  },
			  exit(){
				  this.$emit('funb',false)
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