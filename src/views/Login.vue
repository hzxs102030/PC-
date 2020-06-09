<template>
<div style="background-color: white;width:100%;height:1020px;position:absolute;right:0%;">
		<div style="background-image:url(https://i.loli.net/2020/03/29/Dy2LRM3chI8u4Jw.jpg); background-repeat:no-repeat;background-size:100% 100%;width:1229px;height:860px;position:absolute;right:0%;">
		<div style="position: absolute;right:10%;width:350px;height:400px;background-color:#000000; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);background-color: rgba(0,0,0,0.6);top:20%;box-shadow: 0 2px 12px 0 rgba(0, 255, 255, 0.8)" >
		</div>	
		<div style="position: absolute;right:10%;width: 350px;height: 400px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 30px;top:20% ;color: white;" >
			
			<el-tabs v-model="activeName" @tab-click="handleClick" stretch id="ccc">
			    <el-tab-pane label="用户登录" name="first" style="color: white;"  class="hhh">
					
				<el-form :model="numberValidateForm" ref="numberValidateForm" label-width="70px"  class="demo-ruleForm" ><br>
						  <el-form-item
						  class="hhh"
						    label="用户名"
						    prop="username"
						    :rules="[
						      { required: true, message: '用户名不能为空'},
						    ]"
						  >  
						 <el-input type="username" v-model.number="numberValidateForm.username" autocomplete="off" style="width:220px" ></el-input>
						  </el-form-item>
						  <el-form-item
						  class="hhh"
						    label="密码"
						    prop="password"
						    :rules="[
						      { required: true, message: '密码不能为空'},  
						    ]"
						  >
						    <el-input type="password" v-model.number="numberValidateForm.password" autocomplete="off" style="width:220px"></el-input>
					
						<el-link type="primary" @click="xiugai = true"  style="margin-left: 1px;position: absolute;right: 85px;" :underline="false">忘记密码</el-link>
						  </el-form-item>
						  
						  <el-form-item>
							        <el-button  type="primary" @click="kiki" style="width:220px">登录</el-button>
							
						  </el-form-item>
						  
						  <el-dialog  :visible.sync="xiugai" custom-class="mima" >
						    <p style="text-align: center;color: white;font-size: 18px;border-bottom: 2px solid white;">账户密码找回</p>
									<br><br>
						      <el-form-item
							  class="hhh"
						        label="手机号"
						        prop="phone"
						        :rules="[
						          { required: true, message: '手机号不能为空'},
						        ]"
						      >
						        <el-input type="phone" v-model.number="numberValidateForm.phone" autocomplete="off" style="width:220px"></el-input>
						      </el-form-item>
						      
						      <el-form-item
							  class="hhh"
						        label="验证码"
						        prop="code"
						        :rules="[
						          { required: true, message: '验证码不能为空'},
						        ]"
						      >
						        <el-input type="code" v-model.number="numberValidateForm.code" autocomplete="off" style="width:105px"></el-input>
								<el-button @click="getcode" :disabled="disabled" v-model="time">{{time}}</el-button>
						      </el-form-item>
						      
						      <el-form-item
							  class="hhh"
						        label="密码"
						        prop="password"
						        :rules="[
						          { required: true, message: '密码不能为空'},  
						        ]"
						      >
						        <el-input type="password" v-model.number="numberValidateForm.password" autocomplete="off" style="width:220px"></el-input>
						    </el-form-item><el-form-item>
						    	<el-button  type="primary" @click="change">修改后登录</el-button>
						    	<el-button @click="xiugai= false" type="primary" style="margin-left: 1px;background-color:brown;">
						    	  退出修改
						    	</el-button>
						    	
						      </el-form-item>
						    
						  </el-dialog>
					<!-- 	<el-button @click="token" type="primary" >
							  测试
							</el-button> -->
					
						</el-form>	
					
				</el-tab-pane>
					
					
			    <el-tab-pane label="账号注册" name="second" style="color: white;" >
				
				<el-form :model="numberValidateForm" ref="numberValidateForm" label-width="70px" class="demo-ruleForm" >
				  <el-form-item
				  class="hhh"
				    label="用户名"
				    prop="username"
				    :rules="[
				      { required: true, message: '用户名不能为空'
					  },
				    ]"
				  >
				    <el-input type="username" v-model.number="numberValidateForm.username" autocomplete="off" style="width:220px"></el-input>
				  </el-form-item>
				
					<el-form-item
					class="hhh"
				      label="手机号"
				      prop="phone"
				      :rules="[
				        { required: true, message: '手机号不能为空'},
				      ]"
				    >
				      <el-input type="phone" v-model.number="numberValidateForm.phone" autocomplete="off" style="width:220px"></el-input>
				    </el-form-item>
				
				    <el-form-item
					class="hhh"
				      label="验证码"
				      prop="code"
				      :rules="[
				        { required: true, message: '验证码不能为空'},
				      ]"
				    >
				      <el-input type="code" v-model.number="numberValidateForm.code" autocomplete="off" style="width:105px"></el-input><el-button @click="getcode2" :disabled="disabled" v-model="time">{{time}}</el-button>
				    </el-form-item>
					
				  <el-form-item
				  class="hhh"
				    label="密码"
				    prop="password"
				    :rules="[
				      { required: true, message: '密码不能为空'},  
				    ]"
				  >
				    <el-input type="password" v-model.number="numberValidateForm.password" autocomplete="off" style="width:220px"></el-input>
				  </el-form-item>
				  <el-form-item>
					  
				    <el-button type="primary" @click="kiki2" :plain="true" style="width:220px">注册</el-button>
				  </el-form-item>
				</el-form>	
					
				</el-tab-pane>
			  </el-tabs>
			
			
			
			
			
		</div>
	</div>
	
</div>


</template>
<style>
.el-tabs__item{color:#FFFFFF;}
.hhh .el-form-item__label{color:#ffffff;}
.hhh .el-tab-pane__item{color:#FFFFFF;}
.mima{width: 350px;background-color:#707F76;opacity: 95%;position: absolute;right:40%;top:11%}
</style>
<script>
 export default {
    data() {
      return {
		  
		  xiugai:false,
		  activeName: 'first',
		disabled:false,
		drawer: false,
		time:"获取验证码",
		direction: 'rtl',
		//
		//goodsData:[],
		sku_info:[],
		sku_list:[],
		ali_images:[],
		c:[],
		//
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

		getcode2(){
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
kiki2(){let input=true
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
								this.$message({
								          message: '登陆成功，欢迎您',
								          type: 'success'
								        });
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
		handleClick(tab, event) {
		        console.log(tab, event);
		      },
		handleClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
		            done();
		          })
		          .catch(_ => {});
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
							          message: '登陆成功，欢迎您',
							          type: 'success'
							        });
										this.$store.commit('settoken','')
										localStorage.removeItem('token')
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
      kiki(){
		
		let fleg=1
		if((this.numberValidateForm.username=='')&&(this.numberValidateForm.password=='')){this.$message.error('错误：请输入账户和密码');fleg=0}
		else if(this.numberValidateForm.password==''){this.$message.error('错误：请输入密码');fleg=0}
		else if(this.numberValidateForm.username==''){this.$message.error('错误：请输入账户');fleg=0}
		this.axios.get("rng/list",{params:this.numberValidateForm}).then((res)=>{
			let king=res.results
			let flag=1
		  	for(let I = 0; I < king.length; I++){
				
		  		if(king[I].username==this.numberValidateForm.username){
		  				if(king[I].password==this.numberValidateForm.password){
								flag=0
								this.$message({
								          message: '登陆成功，欢迎您',
								          type: 'success'
								        });
								this.$store.commit('settoken','')
								localStorage.removeItem('token')
		  						this.$store.commit('settoken','FHN'+king[I].phone+(new Date().getTime()+60*60*1000))
		  						window.localStorage.setItem('token','FHN'+king[I].phone+(new Date().getTime()+60*60*1000))
		  						if(this.$route.query.redirect){
		  							this.$router.replace({path:this.$route.query.redirect})
		  						}
		  						else{
		  							this.$router.replace({path:"/Shop"})
		  						}
		  					}
		  			}	
		  	}
			if(flag==1&&fleg==1){
					this.$message({
					          message: '警告：用户或密码输入错误',
					          type: 'warning'
					        });
				}
		  })
	  },
      resetPassword() {
        this.numberValidateForm.password='';
      },
	  resetUsername() {
	    this.numberValidateForm.username='';
	  },
	  
	  // 	async submitHandler(e){
	  // 		e.preventDefault()
	  // 		try{
	  // 			const result=await this.axios.get('/api/Login',{params:this.numberValidateForm})
	  // 			// console.log(result.data.token)
				
	  // 			if(result.code=='0'){
	  // 				this.$store.commit('settoken',result.token)
	  // 				window.localStorage.setItem('token',result.token)
	  // 				if(this.$route.query.redirect){
	  // 					this.$router.replace({path:this.$route.query.redirect})
	  // 				}
	  // 				else{
	  // 					this.$router.replace({path:"/Shop"})
	  // 				}
	  // 			}
	  // 			else{alert(result.message)}
	  // 		}catch(err){
	  // 			console.log(err)
	  // 		}
	  // 		},
	  
    }
  }
</script>