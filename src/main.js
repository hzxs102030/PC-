import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
//import 'amfe-flexible'
import axios from 'axios'
Vue.config.productionTip = false;
Vue.prototype.axios=axios
import setAxios from './setaxios.js'
setAxios()
import  VueResource  from 'vue-resource'
Vue.use(VueResource)


router.beforeEach((to,from,next)=>{
	store.commit('settoken',localStorage.getItem('token'))
	if(to.meta.requireAuth){
		if(store.state.token){
			next()
		}else{
			next({
				path:'/Login',
				query:{redirect:to.fullPath}
			})
		}
	}
	else{
		next()
	}
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
