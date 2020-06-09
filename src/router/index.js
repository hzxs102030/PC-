
import Vue from 'vue'
import Router from 'vue-router'
import '@/assets/css/reset.css'
import '@/assets/css/header.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Router)
Vue.use(ElementUI)
import Shop from '../views/shop.vue'
import Item from '../views/item.vue'
import Car from '../views/car.vue'
import Checkout from '../views/checkout.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import axios from "axios"
import Gocheck from '../views/gocheck.vue'
import  VueResource  from 'vue-resource'
import Find from '../views/find.vue'
import People from '../views/people.vue'
Vue.use(VueResource)
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
const vueRouter = new Router({

	mode:"history",
	routes:[
		{ path: '/', 
		redirect: '/Shop' ,
		
		},
		
		{
		path:"/Shop",
		name:"Shop",
		component:resolve=>require(['../views/shop'],resolve)
		
	},
	{
		path:"/Register",
		name:"Register",
		component:resolve=>require(['../views/Register'],resolve)
		
	},
	{
		path:"/People",
		name:"People",
		meta:{
			requireAuth:true,
		},
		component:resolve=>require(['../views/people'],resolve)
		
	},
	{
		path:"/Find",
		name:"Find",
		component:resolve=>require(['../views/find'],resolve)
		
	},
	{
		path:"/item",
		name:"Item",
		component:resolve=>require(['../views/item'],resolve)
	},
	{
		path:"/car",
		name:"Car",
		meta:{
			requireAuth:true,
		},
		component:resolve=>require(['../views/car'],resolve)
	},
	{
		path:"/checkout",
		name:"Checkout",
		component:resolve=>require(['../views/checkout'],resolve),
		meta:{
			requireAuth:true,
		},
	},{
		path:"/gocheck",
		name:"Gocheck",
		component:resolve=>require(['../views/gocheck'],resolve),
		meta:{
			requireAuth:true,
		},
	},
	{
		path:"/Login",
		name:"Login",
		component:resolve=>require(['../views/Login'],resolve)
	},
	
	],
	
})

// vueRouter.beforeEach((to,from,next)=>{
// 	  if(to.path == '/' || to.path == '/item'){
// 	    next();
// 	  }else{
// 	    alert('您还没有登录，请先登录');
// 	    return 
// 	  }
// 	})
export default vueRouter;