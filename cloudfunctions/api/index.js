// 云函数入口文件
const cloud = require('wx-server-sdk');
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

exports.main = async (event, context) => {
  const action = event.action;
  switch (action) {
    case 'register':
      return await registerUser(event);
    case 'login':
      return await loginUser(event);
    case 'createRecord':
      return await createRecord(event);
    case 'verifyRecord':
      return await verifyRecord(event);
    default:
      return {
        code: 400,
        message: 'Invalid action'
      };
  }
};

// 注册接口：传入 username, password, helper_phone
async function registerUser(event) {
  const { username, password, helper_phone } = event;
  if (!username || !password || !helper_phone) {
    return { code: 400, message: '缺少必要字段' };
  }

  // 检查用户名是否已存在
  const existRes = await usersCollection.where({ username }).get();
  if (existRes.data && existRes.data.length > 0) {
    return { code: 400, message: '用户名已存在' };
  }
  
  const userId = uuidv4();
  await usersCollection.add({
    data: {
      userId,
      username,
      password,  // 生产环境下请进行加密处理
      helper_phone,
      createTime: new Date()
    }
  });
  return { code: 200, message: '注册成功', userId };
}

// 登录接口：传入 username, password
async function loginUser(event) {
  const { username, password } = event;
  if (!username || !password) {
    return { code: 400, message: '缺少用户名或密码' };
  }
  const res = await usersCollection.where({ username, password }).get();
  if (res.data && res.data.length > 0) {
    const token = uuidv4();
    // 这里可以将 token 信息写回数据库，便于后续校验
    return { code: 200, message: '登录成功', token, userId: res.data[0].userId };
  } else {
    return { code: 401, message: '用户名或密码错误' };
  }
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