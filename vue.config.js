module.exports = {

productionSourceMap:false,
  lintOnSave: false,
  configureWebpack:{
  	devServer:{
		port:8080,
		proxy: {
		    '/rng': {     //这里最好有一个 /
		        target: 'http://localhost:3000',  // 后台接口域名
		  
		        changeOrigin: true,  //是否跨域
		        pathRewrite:{
		            '^/rng':''
		        }
		    },
		  	'/api': {     //这里最好有一个 /
		  	    target: 'https://ele-interface.herokuapp.com/api/',  // 后台接口域名
		  			  
		  	    changeOrigin: true,  //是否跨域
		  	    pathRewrite:{
		  	        '^/api':''
		  	    }
		  	},	  
		},
  		disableHostCheck: true
  	},
	
  },
};
