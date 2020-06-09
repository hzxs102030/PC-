import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios'
import store from './store/index.js'
import router from './router/index.js'
export default function setAxios(){
	axios.interceptors.request.use(
	config=>{
		if(store.state.token){
			config.headers.token=store.state.token
		}
		return config
	}
	)
	
	axios.interceptors.response.use(
		response=>{
			if(response.status==200){
				const data=response.data
				if(data.code==-1){
					store.commit('settoken','')
					localStorage.removeItem('token')
					router.replace({path:'/Login'})
				}
				return data
			}
			return response
		}
	)
}