<template>
<div style="position: absolute;left:30%" >
	
	<el-form :model="numberValidateForm" ref="numberValidateForm" label-width="150px" class="demo-ruleForm" >
	  <el-form-item
	    label="用户名"
	    prop="username"
	    :rules="[
	      { required: true, message: '用户名不能为空'},
	    ]"
	  >
	    <el-input type="username" v-model.number="numberValidateForm.username" autocomplete="off" style="width:150px"></el-input><el-button @click="resetUsername">重置</el-button>
	  </el-form-item>

		<el-form-item
	      label="手机号"
	      prop="phone"
	      :rules="[
	        { required: true, message: '手机号不能为空'},
	      ]"
	    >
	      <el-input type="phone" v-model.number="numberValidateForm.phone" autocomplete="off" style="width:150px"></el-input><el-button @click="getcode" :disabled="disabled" v-model="time">{{time}}</el-button>
	    </el-form-item>

	    <el-form-item
	      label="验证码"
	      prop="code"
	      :rules="[
	        { required: true, message: '验证码不能为空'},
	      ]"
	    >
	      <el-input type="code" v-model.number="numberValidateForm.code" autocomplete="off" style="width:150px"></el-input><el-button @click="resetUsername" >重置</el-button>
	    </el-form-item>
		
	  <el-form-item
	    label="密码"
	    prop="password"
	    :rules="[
	      { required: true, message: '密码不能为空'},  
	    ]"
	  >
	    <el-input type="password" v-model.number="numberValidateForm.password" autocomplete="off" style="width:150px"></el-input><el-button @click="resetPassword">重置</el-button>
	  </el-form-item>
	  <el-form-item>
		  
	    <el-button type="primary" @click="kiki" :plain="true" >注册</el-button>
		 
	    <router-link tag="el-button" to="/Login" type="primary" @click="submitForm('numberValidateForm')">登录界面</router-link>
	  </el-form-item>
	</el-form>	
</div>	
</template>
<style>
</style>
<script>
 export default {
    data() {
      return {disabled:false,
				time:"获取验证码",
        numberValidateForm: {
          username: '',
		  password: '',
		  phone:'',
		  code:'',
		  codex:''
        }
      };
    },
    methods: {
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
						this.time="已发送："+t+"后重试"
						t--
					}
				},1000)
			this.axios.get('rng/message',{params:this.numberValidateForm}).then(res=>{
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
		
		kiki(){let input=true
				let inpuu=true
			if(this.numberValidateForm.username&&this.numberValidateForm.password!=''&&this.numberValidateForm.phone!=''&&this.numberValidateForm.code!=''){
				this.axios.get("rng/list").then((res)=>{
					let king=res.results
				  	for(let I = 0; I < king.length; I++){
				  		if(king[I].username==this.numberValidateForm.username){
				  				input=false
				  			}
						if(king[I].phone==this.numberValidateForm.phone){
								inpuu=false
							}
				  	}
					
					if(input==true){
						if(inpuu==true){
							
						if((this.numberValidateForm.code!='')&&(this.numberValidateForm.code==this.numberValidateForm.codex)){
							
							this.axios.get("rng/add",{params:this.numberValidateForm}).then((res) => {
								console.log(res.sql)
											this.$store.commit('settoken','FHN'+this.numberValidateForm.phone+(new Date().getTime()+60*60*1000))
											window.localStorage.setItem('token','FHN'+this.numberValidateForm.phone+(new Date().getTime()+60*60*1000))
											if(this.$route.query.redirect){
												this.$router.replace({path:this.$route.query.redirect})
											}
											else{
												this.$router.replace({path:"/Shop"})
											}
							})
						}
					else{
						this.$message.error('错误：请输入正确的验证码');
					}
			}
			else{
				this.$message({
				          message: '警告：该手机账户已经存在',
				          type: 'warning'
				        });
			}
			}
			else{
				this.$message({
				          message: '警告：该用户名已经存在',
				          type: 'warning'
				        });
			}
				  })
			}
			else if((this.numberValidateForm.username=='')&&(this.numberValidateForm.password=='')){this.$message.error('错误：请输入账户和密码');}
			else if(this.numberValidateForm.password==''){this.$message.error('错误：请输入密码');}
			else if(this.numberValidateForm.username==''){this.$message.error('错误：请输入账户');}
			else if((this.numberValidateForm.code!=this.numberValidateForm.codex)||(this.numberValidateForm.code=='')){this.$message.error('错误：请输入正确的验证码');}
			
			
		},
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetPassword() {
        this.numberValidateForm.password='';
      },
	  resetUsername() {
	    this.numberValidateForm.username='';
	  },
	  // submitHandler(e){
	  // 	e.preventDefault(),
	  // 	this.axios.get('/api/Register',{params:this.numberValidateForm}).then(res=>{
	  // 		alert(res.success)
	  // 	}).catch(err=>{
	  // 		console.log(err)
	  // 	})
	  // 	},
	  // resetHandler(){}
    }
  }
</script>