import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });
const types={
		SET_LOCATION:"SET_LOCATION",
		SET_ADDRESS:"SET_ADDRESS",
	}
let store=new Vuex.Store({
	types,
	state:{
		ip:null,
		location:{},
		address:"",
		ip:[],
		token:'',
		add:"",
		carPanelData:[],
		receiveInfo:[],
		
		maxOff:false,
		carshow:false,
		carTimer:null,
		ball:{
			show:false,
			el:null,
			img:''
		}
	},
	getters:{
		location:state=>state.location,
		address:state=>state.address,
		totleCount(state){
			let count=0
			state.carPanelData.forEach((goods)=>{
				count+=goods.count
			})
			return count
		},
		totlePrice(state){
			let price=0
			state.carPanelData.forEach((goods)=>{
				price+=goods.price
			})
			return price
		},
		allChecked(state){
			let allChecked =true
			state.carPanelData.forEach((goods)=>{
				if (!goods.checked){
				allChecked =false
				return }
			})
			return allChecked
		},
		checkedCount(state){
			let count=0
			state.carPanelData.forEach((goods)=>{
				if (goods.checked)
				count+=goods.count
				 
			})
			return count
		},
		checkedPrice(state){
			let price=0
			state.carPanelData.forEach((goods)=>{
				if (goods.checked)
				price +=goods.price*goods.count
			})
			return price 
		},
		checkedGoods(state){
			let checkedGoods=[]
			state.carPanelData.forEach((goods)=>{
				 	if(goods.checked){
						checkedGoods.push(goods)
					}
			})
		
			return checkedGoods
		}
		
		
	},
	
	mutations:{
		[types.SET_LOCATION](state,location){
			if(location){
				state.location=location
			}
			else{
				state.location=null
			}
		},
		[types.SET_ADDRESS](state,address){
			if(address){
				state.address=address
			}
			else{
				state.address=""
			}
		},
		settoken(state,token){
			state.token=token
		},
		setip(state,ip){
			state.ip=ip
		},
		addCarPanelData(state,data){
			let bOff=true
			if(!state.ball.show){
				state.carPanelData.forEach((goods)=>{
				if(goods.sku_id===data.info.sku_id){
					goods.count+=data.count
					
					bOff=false
					if(goods.count>goods.limit_num){
						goods.count-=data.count
						state.maxOff=true
						return
					}
					
					state.ball.show=true
					state.ball.img=data.info.ali_image
					state.ball.el=event.path[0]
					
				}
			})
			if(bOff){
			let goodsData=data.info
			Vue.set(goodsData,"count",data.count)
			Vue.set(goodsData,"checked",true)
			state.carPanelData.push(goodsData)
			state.ball.show=true
			state.ball.img=data.info.ali_image
			state.ball.el=event.path[0]
			
			}
			
			}	
		},
		gotocar(state,data){
			state.ball.show=true
			state.ball.img=data.dd.ali_image
			state.ball.el=data.bb.path[0]
			console.log(data.bb.path[0])
		},
		delCarPanelData(state,id){
			state.carPanelData.forEach((goods,index)=>{
				if(goods.sku_id===id){
					state.carPanelData.splice(index,1)
					return
				}
			})
		},
		carPanelData1(state,data){
			state.carPanelData=data
		},
		count1(state,data){
			state.carPanelData.count=count
		},
		delCheckGoods(state){
			
			let i=state.carPanelData.length
			while(i--){
				if(state.carPanelData[i].checked){
					state.carPanelData.splice(i,1)
				}
			}
		},
		
		closePrompt(state){
			state.maxOff=false
		},
		showcar(state){
			clearTimeout(state.carTimer)
			state.carshow=true
		},
		
		hidecar(state){
			state.carTimer=setTimeout(()=>{
				state.carshow=false
			},200)
			
		},
		hidecar2(state){
			state.carTimer=setTimeout(()=>{
				state.carshow=false
			},1000)
			
		},
		plusCarPanelData(state,id){
			state.carPanelData.forEach((goods,index)=>{
				if(goods.sku_id===id){
					if(goods.count>=goods.limit_num) return
					goods.count ++
					return
				}
			})
		},
		subCarPanelData(state,id){
			state.carPanelData.forEach((goods,index)=>{
				if(goods.sku_id===id){
					if(goods.count<=1) return
					goods.count --
					return
				}
			})
		},
		// checkGoods(state,id){
		// 	state.carPanelData.forEach((goods,index)=>{
		// 		if(goods.sku_id===id){
		// 			goods.checked=!goods.checked
		// 			return
		// 		}
		// 	})
		// },
		allCheckGoods(state,allChecked){
			state.carPanelData.forEach((goods,index)=>{
				 	goods.checked=!allChecked
					return
				
			})
		},
		submitReceive(state,data){
			if(data.default){
				state.receiveInfo.forEach((receive)=>{
					receive.default=false
					
				})
				state.receiveInfo.push(data)
			}
		}
	},
	actions:{
		setLocation:({commit},location)=>{
			commit(types.SET_LOCATION,location)
		},
		setAddress:({commit},address)=>{
			commit(types.SET_ADDRESS,address)
		},
		
	},
	
})
export default store;