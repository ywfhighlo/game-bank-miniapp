// 云函数入口文件
const cloud = require('wx-server-sdk');
const axios = require('axios');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
// 数据库集合
const usersCollection = db.collection('users');
const recordsCollection = db.collection('records');

// 简单 UUID 生成方法
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// 云函数入口函数必须导出 main
exports.main = async (event, context) => {
  const action = event.action;
  switch (action) {
    case 'register':
      return await registerUser(event);
    case 'login':
      return await loginUser(event);
    case 'wxLogin':
      return await wxLogin(event);
    case 'createRecord':
      return await createRecord(event);
    case 'verifyRecord':
      return await verifyRecord(event);
    default:
      return { code: 400, message: 'Invalid action' };
  }
};

// 注册接口：传入 username, password, helper_phone
async function registerUser(event) {
  const { username, password, helper_phone } = event;
  if (!username || !password || !helper_phone) {
    return { code: 400, message: '缺少必要字段' };
  }

  // 检查用户名是否已存在
  const existRes = await db.collection('users').where({ username }).get();
  if (existRes.data && existRes.data.length > 0) {
    return { code: 400, message: '用户名已存在' };
  }

  // 生成 userId（当前时间戳加随机数）
  const userId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
  console.log("生成的 userId:", userId);

  // 用 try-catch 捕获数据库写入错误
  try {
    await db.collection('users').add({
      data: {
        userId,
        username,
        password, // 生产环境下请对密码做加密处理
        helper_phone,
        createTime: new Date()
      }
    });
  } catch (err) {
    console.error("添加用户错误:", err);
    return { code: 500, message: "注册失败, 数据库错误" };
  }

  return { code: 200, message: '注册成功', userId };
}

// 登录接口：传入 username, password
async function loginUser(event) {
  const { username, password } = event;
  if (!username || !password) {
    return { code: 400, message: '缺少用户名或密码' };
  }
  const res = await db.collection('users').where({ username, password }).get();
  console.log("登录查询结果：", res.data); // 查看查询结果是否正常
  if (res.data && res.data.length > 0) {
    const token = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
    console.log("登录查询到的 userId：", res.data[0].userId);
    return { code: 200, message: '登录成功', token, userId: res.data[0].userId };
  }
  return { code: 401, message: '用户名或密码错误' };
}

// 提交运动记录接口：传入 userId, duration；生成随机6位验证码（用作短信验证模拟）
async function createRecord(event) {
  const { userId, duration } = event;
  if (!userId || !duration) {
    return { code: 400, message: '缺少 userId 或 duration' };
  }
  const recordId = uuidv4();
  const verificationCode = Math.floor(100000 + Math.random()*900000).toString(); // 生成验证码

  await recordsCollection.add({
    data: {
      recordId,
      userId,
      duration,
      is_verified: false,
      verificationCode, // 模拟发送验证码，实际业务中可以对接短信服务接口
      createTime: new Date()
    }
  });

  // 模拟短信发送：服务器端打印日志。正式环境下应调用短信服务发送验证码给帮手
  console.log(`模拟短信：帮手手机号将收到验证码 ${verificationCode}`);

  return { code: 200, message: '记录提交成功，验证码已发送', recordId };
}

// 验证验证码接口：传入 userId, recordId, code
async function verifyRecord(event) {
  const { userId, recordId, code } = event;
  if (!userId || !recordId || !code) {
    return { code: 400, message: '缺少必要字段' };
  }
  const res = await recordsCollection.where({ recordId, userId }).get();
  if (!res.data || res.data.length === 0) {
    return { code: 404, message: '记录不存在' };
  }
  const record = res.data[0];
  if (record.verificationCode !== code) {
    return { code: 400, message: '验证码错误' };
  }
  // 更新记录状态为已验证
  await recordsCollection.doc(record._id).update({ data: { is_verified: true } });
  return { code: 200, message: '运动记录验证成功' };
}

// 新增微信登录处理逻辑
async function wxLogin(event) {
  const { code } = event;
  if (!code) {
    return { code: 400, message: '缺少微信登录 code' };
  }

  // 请替换以下 APPID 和 APPSECRET 为你自己的小程序的信息
  const appid = 'wxfa2e2aac0a23a52d';
  const secret = 'd31f6143a5c0fd7495b9ac72b5138987';

  try {
    // 调用微信接口获取 openid 和 session_key
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
    const response = await axios.get(url);
    console.log("微信登录接口返回数据：", response.data);

    if (response.data && response.data.openid) {
      const openid = response.data.openid;
      // 查询数据库中是否存在该 openid 对应的用户
      const userQuery = await db.collection('users').where({ openid }).get();
      let userId;
      if (userQuery.data && userQuery.data.length > 0) {
        // 如果用户已存在，直接返回该记录的 userId
        userId = userQuery.data[0].userId;
      } else {
        // 如果用户不存在，则创建新的用户记录
        userId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
        await db.collection('users').add({
          data: {
            openid,
            userId,
            createTime: new Date()
          }
        });
      }
      return { code: 200, message: '微信登录成功', userId };
    } else {
      return { code: 400, message: '微信登录失败，无法获取 openid', data: response.data };
    }
  } catch (err) {
    console.error("微信登录异常：", err);
    return { code: 500, message: '微信登录异常', err };
  }
} 