const cloud = require('wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
  const { phone, message } = event;
  if (!phone || !message) {
    return {
      code: 400,
      message: '缺少必要参数'
    };
  }
  
  // 模拟短信发送：日志中打印短信内容
  console.log(`发送短信至 ${phone}：${message}`);
  
  // 在实际生产环境下，可以调用第三方短信服务接口，例如阿里云短信、腾讯云短信等

  return {
    code: 200,
    message: '短信发送成功'
  };
}; 