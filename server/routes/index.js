var express = require('express');
var router = express.Router();
var connection=require('../db/sql.js');
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
router.get('/list', function(req, res, next) {
	const {phone,username,password}=req.query
  connection.query("select * from usr",function(error, results, fields){
	  res.json({results,
		  
		  })
  })
});
router.get('/fenshu', function(req, res, next) {
  connection.query("select * from pingjia",function(error, results, fields){
	  res.json({results,
		  
		  })
  })
});
router.get('/selfenshu', function(req, res, next) {
	const {phone}=req.query
	var sql='select * from pingjia where name="'+phone+'"';
  connection.query(sql,function(error, results, fields){
	  res.json({results,
		  
		  })
  })
});
router.get('/add', function(req, res, next) {
	const {phone,username,password}=req.query
	var sql='INSERT INTO usr(phone,username,PASSWORD) VALUES("'+phone+'","'+username+'","'+password+'")';
  connection.query(sql,function(err, result){
  })
  connection.query("select * from usr",function(error, results, fields){
  	 res.json({results,
	 sql,
  	 		  })
  })
});
const Core = require('@alicloud/pop-core');

var client = new Core({
  accessKeyId: 'LTAI4FimTQ2SHFR7MmzW3QJL',
  accessKeySecret: 'Aul6L1N5xFgwY2eBh5IBx4IA7z2TF1',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

var requestOption = {
  method: 'POST'
};
router.get('/message', function(req, res, next) {
const {phone}=req.query
var num = Math.floor(Math.random() * 1000000);
var params = {
  "RegionId": "cn-hangzhou",
  "PhoneNumbers": phone,
  "SignName": "落桦民宿",
  "TemplateCode": "SMS_186597017",
  "TemplateParam": "{\"code\":\""+num+"\"}"
}
  client.request('SendSms', params, requestOption).then((result) => {
    console.log(JSON.stringify(result));
  }, (ex) => {
    console.log(ex);
  })
  res.json({num
  		  })
});
router.get('/message2', function(req, res, next) {
const {phone}=req.query
var num = Math.floor(Math.random() * 1000000);
var params = {
  "RegionId": "cn-hangzhou",
  "PhoneNumbers": phone,
  "SignName": "落桦民宿",
  "TemplateCode": "SMS_187741323",
  "TemplateParam": "{\"code\":\""+num+"\"}"
}

  client.request('SendSms', params, requestOption).then((result) => {
    console.log(JSON.stringify(result));
  }, (ex) => {
    console.log(ex);
  })
  res.json({num
  		  })
});
router.get('/password', function(req, res, next) {
const {phone,password}=req.query
var sql='UPDATE usr SET PASSWORD="'+password+'" WHERE phone="'+phone+'"';
  connection.query(sql,function(err, result){
  })
  res.json({sql
  		  })
})
router.get('/goodsData', function(req, res, next) {
  connection.query("select * from goodsData",function(error, results, fields){
	  res.json({results,  
		  })
  })
});
router.get('/sku_info', function(req, res, next) {
  connection.query("select * from sku_info",function(error, results, fields){
	  res.json({results,  
		  })
  })
});
router.get('/sku_list', function(req, res, next) {
  connection.query("select * from sku_list",function(error, results, fields){
	  res.json({results,  
		  })
  })
});
router.get('/ali_images', function(req, res, next) {
  connection.query("select * from ali_images",function(error, results, fields){
	  res.json({results,  
		  })
  })
});
router.get('/selCar',function(req, res, next) {
	const {phone}=req.query
	var sql='select sku_id from usr_list where phone="'+phone+'"';
  connection.query(sql,function(error, results, fields){
	  res.json({results 
		  })
  })
});
router.get('/selData',function(req, res, next) {
	const {phone}=req.query
	var sql='select * from sku_info where sku_id in (select sku_id from usr_list where phone="'+phone+'")';
  connection.query(sql,function(error, results, fields){
	  res.json({results ,sql
		  })
  })
});
router.get('/addCar',function(req, res, next) {
	const {phone,sku_id}=req.query
	var sql='INSERT INTO usr_list(phone,sku_id) VALUES("'+phone+'","'+sku_id+'")';
  connection.query(sql,function(error, results, fields){
	  res.json({sql  
		  })
  })
});
router.get('/pingjia',function(req, res, next) {
	const {sku_id}=req.query
	var sql='select * from pingjia where sku_id="'+sku_id+'"';
  connection.query(sql,function(error, results, fields){
	  res.json({results
		  })
  })
});
router.get('/checkphone',function(req, res, next) {
	const {phone}=req.query
	var sql='select * from usr';
  connection.query(sql,function(error, results, fields){
	  res.json({results
		  })
  })
});
router.get('/inpingjia',function(req, res, next) {
	const {sku_id,name,value2,dynamicTags,textarea,length}=req.query
	if(length==0){
	var sql='INSERT ignore INTO pingjia(sku_id,pingfen,pingjia,name) VALUES("'+sku_id+'","'+value2+'","'+textarea+'","'+name+'")';}
	else if(length==1){
		sql='INSERT ignore INTO pingjia(sku_id,pingfen,pingjia,tag1,name) VALUES("'+sku_id+'","'+value2+'","'+textarea+'","'+dynamicTags[0]+'","'+name+'")';
	}
	else if(length==2){
		sql='INSERT ignore INTO pingjia(sku_id,pingfen,pingjia,tag1,tag2,name) VALUES("'+sku_id+'","'+value2+'","'+textarea+'","'+dynamicTags[0]+'","'+dynamicTags[1]+'","'+name+'")';
	}
	else if(length==3){
		sql='INSERT ignore INTO pingjia(sku_id,pingfen,pingjia,tag1,tag2,tag3,name) VALUES("'+sku_id+'","'+value2+'","'+textarea+'","'+dynamicTags[0]+'","'+dynamicTags[1]+'","'+dynamicTags[2]+'","'+name+'")';
	}
 connection.query(sql,function(error, results, fields){
	  res.json({
		  results,
	  sql
		  })
  })
});
router.get('/dingdan',function(req, res, next) {
	const {sku_id,phone,day}=req.query
	var sql='INSERT ignore INTO dingdan(sku_id,phone,day) VALUES("'+sku_id+'","'+phone+'","'+day+'")';
  connection.query(sql,function(error, results, fields){
	  res.json({results,sql
		  })
  })
});
router.get('/day',function(req, res, next) {
	const {sku_id}=req.query
	var sql='select day from dingdan where sku_id="'+sku_id+'"';
  connection.query(sql,function(error, results, fields){
	  res.json({results,sql
		  })
  })
});

router.get('/delcar',function(req, res, next) {
	const {sku_id,phone}=req.query
	var sql='delete from usr_list where sku_id="'+sku_id+'" AND phone="'+phone+'"';
  connection.query(sql,function(error, results, fields){
	  res.json({results,sql
		  })
  })
});
router.get('/delday',function(req, res, next) {
	const {id}=req.query
	var sql='delete from dingdan where id="'+id+'"';
  connection.query(sql,function(error, results, fields){
	  res.json({results,sql
		  })
  })
});
router.get('/getday',function(req, res, next) {
	var sql='select * from dingdan';
  connection.query(sql,function(error, results, fields){
	  res.json({results
		  })
  })
});
router.get('/gocheck', function(req, res, next) {
const {phone,sku_id}=req.query
var sql='UPDATE dingdan SET flag="1" WHERE phone="'+phone+'" and sku_id="'+sku_id+'"';
  connection.query(sql,function(err, result){
  })
  res.json({sql
  		  })
});
router.get('/gocheck2', function(req, res, next) {
const {phone,sku_id}=req.query
var sql='UPDATE dingdan SET flag="0" WHERE phone="'+phone+'" and sku_id="'+sku_id+'"';
  connection.query(sql,function(err, result){
  })
  res.json({sql
  		  })
});
router.get('/address',function(req, res, next) {
	const {usr,name,phone,address,city,province}=req.query
	var sql='INSERT ignore INTO address(usr,name,phone,address,city,province) VALUES("'+usr+'","'+name+'","'+phone+'","'+address+'","'+city+'","'+province+'")';

 connection.query(sql,function(error, results, fields){
	  res.json({
		  results,
	  sql
		  })
  })
});
router.get('/checkaddress',function(req, res, next) {
	const {usr}=req.query
	var sql='select * from address where usr="'+usr+'"';

 connection.query(sql,function(error, results, fields){
	  res.json({
		  results,
	  sql
		  })
  })
});
router.get('/deladd',function(req, res, next) {
	const {id}=req.query
	var sql='delete from address where id="'+id+'"';
  connection.query(sql,function(error, results, fields){
	  res.json({results,sql
		  })
  })
});
router.get('/pay',function(req, res, next) {
	const {usr,name,phone,address,pay_id,sku_id,day,price}=req.query
	var sql='INSERT ignore INTO pay(usr,name,phone,address,pay_id,sku_id,day,price) VALUES("'+usr+'","'+name+'","'+phone+'","'+address+'","'+pay_id+'","'+sku_id+'","'+day+'","'+price+'")';

 connection.query(sql,function(error, results, fields){
	  res.json({
		  results,
	  sql
		  })
  })
});
router.get('/topay',function(req, res, next) {
	const {pay_id}=req.query
	var sql='select * from pay where pay_id="'+pay_id+'"';

 connection.query(sql,function(error, results, fields){
	  res.json({
		  results,sql
		  })
  })
});
router.get('/selpay',function(req, res, next) {
	const {usr}=req.query
	var sql='select * from pay where usr="'+usr+'"';

 connection.query(sql,function(error, results, fields){
	  res.json({
		  results,sql
		  })
  })
});
module.exports = router;
