<template>
	<div style="display: flex;height: 100px;position: absolute;left: 0px;top: 220px;">
	      <transition name="el-fade-in-linear">
	        <div class="transition-box" v-show="show" style="height: 290px;">
			<el-form >
			    
			    <el-form-item
			      label="验证码"
			      prop="code"
			      :rules="[
			        { required: true, message: '验证码不能为空'},
			      ]"
			    >
			      <el-input type="code" v-model.number="numberValidateForm.code" autocomplete="off" style="width:65px"></el-input>
											<el-button @click="getcode" :disabled="disabled" v-model="time" style="box-shadow: 0 2px 12px 0 rgba(0, 255, 255, 0.8);color:skyblue;">{{time}}</el-button>
			    </el-form-item>
			    
			    <el-form-item
			      label="新密码"
			      prop="password"
			      :rules="[
			        { required: true, message: '密码不能为空'},  
			      ]"
			    >
			      <el-input type="password" v-model.number="numberValidateForm.password" autocomplete="off" style="width:180px"></el-input>
			  </el-form-item><el-form-item>
			  	<el-button  @click="change" style="width: 120px;box-shadow: 0 2px 12px 0 rgba(0, 255, 0, 0.8);font-size: 18px;color:green;"  size="medium">修改</el-button>
			  	<el-button @click="exit" style="width: 120px;margin-left: 5px;background-color:honeydew;box-shadow: 0 2px 12px 0 rgba(255,0, 0, 0.8);color:firebrick;font-size: 18px;" size="medium">
			  	  退出
			  	</el-button>
			  	
			    </el-form-item>
			  
			</el-form>	
			</div>
	      </transition>
	      
	</div>
</template>

<script>
export default{
	data(){
		return{
			disabled:false,
			time:"获取验证码",
			numberValidateForm: {
			  username: '',
			  password: '',
			  phone:localStorage.getItem('token').substring(3,14),
			  code:'',
			  codex:''
			}
		}
	},
	props:["show"],
	methods:{
		exit(){
			this.$emit('func',false)
		},
		personal(){
			
		},
		getcode(){
			if(!this.numberValidateForm.phone){
				this.$message({
				          message: '警告：请输入手机号',
				          type: 'warning'
				        });
			}
			if( /^1[3|4|5|7|8][0-9]{9}$/.test(this.numberValidateForm.phone)){
				this.disabled=true
				let t=60
				let timer=setInterval(()=>{
					if(t==0){
						clearInterval(timer)
						this.time="重新获取验证码",
						this.disabled=false
					}
					else{
						this.time=t+"s后重试"
						t--
					}
				},1000)
			this.axios.get('rng/message2',{params:this.numberValidateForm}).then(res=>{
				this.numberValidateForm.codex=res.num
				console.log(this.numberValidateForm.codex)
			})
			}
			else{
				this.$message({
				          message: '警告：请输入正确的手机号',
				          type: 'warning'
				        });
			}
		},
		async change(){
			console.log("pw"+this.numberValidateForm.password)
			console.log("ph"+this.numberValidateForm.phone)
			console.log("c"+this.numberValidateForm.code)
			console.log("cx"+this.numberValidateForm.codex)
			if(this.numberValidateForm.password!=''&&this.numberValidateForm.phone!=''&&this.numberValidateForm.code!=''){
			if((this.numberValidateForm.code!='')&&(this.numberValidateForm.code==this.numberValidateForm.codex)){
			let pp=false
				const cp=await this.axios.get("rng/checkphone")
				for(let l=0;l<cp.results.length;l++){
					if(this.numberValidateForm.phone==cp.results[l].phone){
						pp=true
					}
					
				}
				if(pp==true){
					this.axios.get("rng/password",{params:this.numberValidateForm}).then((res) => {
						console.log(res.sql)
						this.drawer=false
						this.$message({
						          message: '修改成功',
						          type: 'success'
						        });
						this.$emit('func',false)		
									
					})
				}	
				else{
						this.$notify({
							          title: '警告',
							          message: '该账户尚未注册，建议注册后使用',
							          type: 'warning'
							        });
					}	
				}
			else{
				this.$notify({
					          title: '警告',
					          message: '请输入正确的验证码',
					          type: 'warning'
					        });
			}}
		else if(this.numberValidateForm.password==''){
			this.$notify({
			          title: '警告',
			          message: '请输入密码',
			          type: 'warning'
			        });}
		else if((this.numberValidateForm.code!=this.numberValidateForm.codex)||(this.numberValidateForm.code=='')){this.$notify({
			          title: '警告',
			          message: '请输入正确的验证码',
			          type: 'warning'
			        });}
		},
	}
}
</script>

<style scoped>
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