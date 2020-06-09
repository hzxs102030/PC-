const Core = require('@alicloud/pop-core');

var client = new Core({
  accessKeyId: 'LTAI4FimTQ2SHFR7MmzW3QJL',
  accessKeySecret: 'Aul6L1N5xFgwY2eBh5IBx4IA7z2TF1',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

var params = {
  "RegionId": "cn-hangzhou",
  "PhoneNumbers": "13567177852",
  "SignName": "落桦民宿",
  "TemplateCode": "SMS_186597017",
  "TemplateParam": "{\"code\":\"123\"}"
}

var requestOption = {
  method: 'POST'
};

client.request('SendSms', params, requestOption).then((result) => {
  console.log(JSON.stringify(result));
}, (ex) => {
  console.log(ex);
}).lsten(8888)

 
