<template>
<div style="position: absolute;left: 250px;">			
<el-button-group>
				  <el-button type="primary" icon="el-icon-date" style="height: 50px;background-color: #EDEDED;color: #000000;border: deeppink 1px solid;font-size: 18px;" @click="gettime" >择日入住</el-button>
                <el-button type="primary" style="height: 50px;background-color:deeppink;border:#000000 1px solid;border-left: deeppink;font-size: 18px" @click="gettime">加入订单<i class="el-icon-shopping-cart-full"></i></el-button>
			  </el-button-group>
			 <el-dialog title="订单详情" :visible.sync="uptime" custom-class="shijian">
				 <div style="width:650px;height:400px;">
		
		<div>
			<el-collapse v-model="activeNames" @change="handleChange" style="height: 400px;overflow-x: hidden; overflow-y: auto">
			  <el-collapse-item name="2"><template slot="title">预订时间：
		<div class="block">
		    <el-date-picker
		      type="dates"
		      v-model="day"
			  :picker-options="pickerOptions"
			  format="yyyy 年 MM 月 dd 日"
			  :clearable="false"
			  >
		    </el-date-picker>
			
		  </div><div v-if="value5" style="font-size: 18px;color:mediumorchid;"><i class="el-icon-caret-left" style="color: darkred;"></i>当前已选择{{value5.length}}天</div>
		</template>
			    <el-tag
			      :key="index"
			      v-for="tag,index in value5"
			      closable
				  :style="randomRgb3()"
			      :disable-transitions="false"
			      @close="handleClose(tag)"
				  
				  >
			      {{tag}}
			    </el-tag>
			  </el-collapse-item>
			  <el-collapse-item title="商品详情" name="1">
			    <div>房源：{{ demo.title }}</div>
			    <div>详情：{{ demo.sub_title }}</div>
				<div>价格：<i style="color: orangered;"><em>¥</em>{{ demo.price }}</i></div>
			  </el-collapse-item>
			  <el-collapse-item title="订单确认" name="4">
				<div v-if="value5.length<1">
					<div>请先选择日期。</div>
				</div>
				<div v-else>
					<div>您选择房源<i style="color:hotpink;font-size:18px;">{{ demo.title }}</i>的预订日期为<el-tag
			      :key="index"
			      v-for="tag,index in value5"
			      closable
				  :style="randomRgb3()"
			      :disable-transitions="false"
			      @close="handleClose(tag)">
			      {{tag}}
			    </el-tag>
				其中，该房源每日价格为<i style="color:red;font-size:18px;">{{ demo.price }}</i>元，合计<i style="color:salmon;font-size:24px;">{{demo.price*value5.length}}</i>元，确认无误后点击下方按键跳转支付。</div>
				</div>
			    
			  </el-collapse-item>
			</el-collapse>
		</div>
				 </div>

			   <div slot="footer" class="dialog-footer">
			     <el-button type="primary" @click="dingdan(demo,value5)"><i class="el-icon-shopping-cart-1"></i>前往支付</el-button>
			   </div>
			 </el-dialog> 
	   
</div>
</template>
<style>
.shijian{width:750px}
</style>
<script>
export default {
    data() {
      return {uptime:false,
	  activeNames: ['4'],
        pickerOptions: {
                  disabledDate(time) {
                    return time.getTime() < Date.now();
                  }
                },  

        value2: "",
		value3: [],
		value4: [],
		token:localStorage.getItem('token'),
		dialogTableVisible: false,
		        dialogFormVisible: false,
		        form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
      };
    },
		props:{
			demo:{
				required:true
			}
		},
	watch:{
		
	},
	computed:{
		day:{
			get:function(){
				return this.value3
			},
			set:function(val){
				console.log(this.value4)
				console.log(val)
				if(val[0]==null){
					return this.value3
					}
				else{
					// val.splice(0,this.value3.length);
				for(let z=0;z<this.value4.length;z++){
					
					if(String(val[val.length-1]).substring(0,15)==this.value4[z]){
						if(val.length!=this.value4.length){
							this.$message({
					          message: 'Sorry,该房源已被预订，请选择其它日期',
					          type: 'warning'
					        })
						}
						
					}
				}
				this.value3=this.value4
				let w=[]
				for(let x=0;x<val.length;x++){
					w=w.concat(String(val[x]).substring(0,15))
				}
				
				for(let x=0;x<w.length;x++){
					let ff=0
					for(let y=0;y<this.value4.length;y++){
						if(w[x]==this.value4[y]){
							ff=1
							}
					}
					if(ff==0){
					this.value3=this.value3.concat(String(w[x]))	

					}
				}
				
				return this.value3
				}
				
			}
				},
		value5(){
			let t=[]
			
			for(let x=this.value4.length;x<this.day.length;x++){
				
				t=t.concat(this.day[x])
				//console.log(this.day[x])
			}
			return t
			
		}
	},
	methods:{
		
		async dingdan(z,y){
			let add=z.sku_id
			let bb=event
			//console.log(z.sku_id)
			//console.log(y[0])
			if(this.value5.length>0){
				for(let x=0;x<y.length;x++){
				await this.axios.get("rng/dingdan",{params:{
				sku_id:z.sku_id,
				phone:localStorage.getItem('token').substring(3,14),
				day:y[x]
				}})
			}
			let f=true
			
			const select=await this.axios.get("rng/selCar",{params:{phone:this.token.substring(3,14)}})
			for(let x=0;x<select.results.length;x++){
				if(select.results[x].sku_id==add){
					f=false
					
				}
			}
			// 
			
			if(f==true){
				await this.axios.get("rng/addCar",{params:{sku_id:add,phone:this.token.substring(3,14)}}).then(
				)
					
			}
			
			
			
			this.$router.push({
				path:'/car'
			})
			}
			else{
				this.$message({
				          message: '结算失败，请先选择日期',
				          type: 'warning'
				        });
			}
			
		},
		randomRgb3() {
		        let R = Math.floor(Math.random() * 255);
		        let G = Math.floor(Math.random() * 255);
		        let B = Math.floor(Math.random() * 255);
				let r = Math.floor(Math.random() * 255);
				let g = Math.floor(Math.random() * 255);
				let b = Math.floor(Math.random() * 255);
		        return {
		          color: 'rgb(' + r + ',' + g + ',' + b + ')',
				  background: 'rgb(' + 255 + ',' + 240 + ',' + 245 + ')',
				  border:'1px solid rgb(' + R + ',' + G + ',' + B + ')',
		        };
		      },
		handleClose(tag) {
			
		        this.day.splice(this.day.indexOf(tag), 1);
		      },
		randomRgb(){
		        return {
		          border:'1px solid rgb(' + 255 + ',' +255 + ',' +255+ ')',
		        };
		      },
		handleChange(val) {
		      },
		async gettime(){
			this.token=localStorage.getItem('token')
			if(this.token==null){
				this.$router.push({
					path:'/Login'
				})
				this.$message({
					
				          message: '已跳转到登录页面',
				          type: 'success'
				        });
			}
			else{
				
				
			this.uptime=!this.uptime
			const select=await this.axios.get("rng/day",{params:{
			sku_id:this.demo.sku_id
			}})
			//this.value2=String(select.results)
			if(this.value2.length<1){
				for(let x=0;x<select.results.length;x++){
					let a=new Date(select.results[x].day)
					
					this.value3=this.value3.concat(String(a).substring(0,15))
					//console.log(this.value3)
			}
		}
		this.value4=this.value3
			
			
			
			}
			
		}
	},
  };
</script>

<style>
</style>
