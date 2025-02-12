// 云函数入口文件
const cloud = require('wx-server-sdk');
const axios = require('axios');

cloud.init({
  env: 'gamebank-3gx3otq16ff2ac9d'  // 使用具体的环境ID而不是DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const command = db.command;  // 获取数据库操作符

// 确保数据库集合存在的辅助函数
async function ensureCollectionExists(collectionName) {
  try {
    await db.createCollection(collectionName);
    console.log(`Created collection: ${collectionName}`);
  } catch (err) {
    // 如果集合已存在，会抛出错误，这是正常的
    console.log(`Collection ${collectionName} already exists or error:`, err);
  }
}

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
  // 确保必要的集合存在
  await ensureCollectionExists('users');
  await ensureCollectionExists('records');

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
    case 'getUserRecords':
      return await getUserRecords(event);
    case 'getUserProfile':
      return await getUserProfile(event);
    case 'updateHelperPhone':
      return await updateHelperPhone(event);
    case 'updateGameTime':
      return await updateGameTime(event);
    case 'logLogout':
      return await logLogout(event);
    default:
      return { code: 400, message: '未知的操作类型' };
  }
};

// 注册接口：传入 username, password, helperPhone
async function registerUser(event) {
  const { username, password, helperPhone } = event;
  if (!username || !password || !helperPhone) {
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
        helperPhone,
        createTime: new Date(),
        updateTime: new Date()
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
    return { code: 400, message: '缺少用户ID或运动时长' };
  }

  try {
    // 生成随机验证码
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const recordId = uuidv4();
    const record = {
      recordId,
      userId,
      duration: parseInt(duration),
      verifyCode,
      status: 'pending',
      createTime: new Date(),
      updateTime: new Date()
    };

    // 添加记录
    await recordsCollection.add({
      data: record
    });

    // 更新用户运动时间和游戏时间
    await usersCollection.where({
      userId: userId
    }).update({
      data: {
        sportTime: command.inc(parseInt(duration)),
        gameTime: command.inc(parseInt(duration)),  // 同时增加游戏时间
        updateTime: new Date()
      }
    });

    return {
      code: 200,
      message: '记录创建成功',
      data: {
        recordId,
        verifyCode
      }
    };
  } catch (err) {
    console.error("创建记录失败：", err);
    return { code: 500, message: '创建记录失败', error: err };
  }
}

// 验证验证码接口：传入 userId, recordId, code
async function verifyRecord(event) {
  const { userId, recordId, code } = event;
  if (!userId || !recordId || !code) {
    return { code: 400, message: '缺少必要参数' };
  }

  try {
    // 查询记录
    const recordQuery = await recordsCollection.where({
      userId,
      recordId,
      status: 'pending'
    }).get();

    if (!recordQuery.data || recordQuery.data.length === 0) {
      return { code: 404, message: '记录不存在或已验证' };
    }

    const record = recordQuery.data[0];
    if (record.verifyCode !== code) {
      return { code: 400, message: '验证码错误' };
    }

    const now = new Date();
    const duration = parseInt(record.duration);

    // 更新记录状态为已验证
    await recordsCollection.where({ recordId }).update({
      data: {
        status: 'verified',
        verifyTime: now
      }
    });

    // 更新用户游戏时间
    await usersCollection.where({
      userId: userId
    }).update({
      data: {
        gameTime: command.inc(duration),  // 增加游戏时间
        updateTime: now
      }
    });

    return {
      code: 200,
      message: '验证成功',
      data: {
        recordId,
        duration
      }
    };
  } catch (err) {
    console.error("验证记录失败：", err);
    return { code: 500, message: '验证记录失败', error: err };
  }
}

// 微信登录接口：传入 code
async function wxLogin(event) {
  const { code } = event;
  if (!code) {
    return { code: 400, message: '缺少code' };
  }

  try {
    // 获取 openid，在云函数中可以直接通过 context 获取
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID;

    if (!openid) {
      console.error('获取openid失败');
      return { code: 500, message: '获取openid失败' };
    }

    console.log('用户登录，openid:', openid);

    // 查询用户是否存在
    const userQuery = await db.collection('users').where({
      openid: openid
    }).get();

    let userId;
    let userData;
    const token = Date.now().toString() + Math.floor(Math.random() * 1000).toString();

    if (!userQuery.data || userQuery.data.length === 0) {
      // 用户不存在，创建新用户
      userId = uuidv4();
      userData = {
        userId,
        openid,
        token,
        createTime: new Date(),
        updateTime: new Date(),
        sportTime: 0,
        gameTime: 0,
        sportRecords: [],
        gameRecords: [],
        dailyLimit: 7200,    // 每日运动上限，默认7200秒（2小时）
        weeklyLimit: 36000,  // 每周运动上限，默认36000秒（10小时）
        restInterval: 1800,  // 休息间隔，默认1800秒（30分钟）
        restDuration: 300,   // 休息时长，默认300秒（5分钟）
        helperPhone: ''      // 帮手手机号，初始为空
      };

      try {
        await db.collection('users').add({
          data: userData
        });
      } catch (err) {
        console.error('创建用户失败：', err);
        return { code: 500, message: '创建用户失败', error: err };
      }
    } else {
      // 用户已存在，更新token
      userData = userQuery.data[0];
      userId = userData.userId;
      
      try {
        await db.collection('users').where({ userId }).update({
          data: {
            token,
            updateTime: new Date()
          }
        });
        userData.token = token;
        userData.updateTime = new Date();
      } catch (err) {
        console.error('更新用户token失败：', err);
        return { code: 500, message: '更新用户token失败', error: err };
      }
    }

    return {
      code: 200,
      message: '登录成功',
      data: userData
    };
  } catch (err) {
    console.error('微信登录失败：', err);
    return { code: 500, message: '微信登录失败', error: err };
  }
}

// 获取用户资料接口：传入 userId
async function getUserProfile(event) {
  const { userId } = event;
  if (!userId) {
    return { code: 400, message: '缺少 userId' };
  }

  try {
    // 查询用户信息
    const userQuery = await db.collection('users').where({ userId }).get();
    if (!userQuery.data || userQuery.data.length === 0) {
      return { code: 404, message: '用户不存在' };
    }

    const user = userQuery.data[0];

    return {
      code: 200,
      message: '获取用户资料成功',
      data: {
        helperPhone: user.helperPhone || '',
        userId: user.userId,
        nickName: user.nickName,
        avatarUrl: user.avatarUrl,
        settings: user.settings || {}
      }
    };
  } catch (err) {
    console.error("获取用户资料失败：", err);
    return { code: 500, message: '获取用户资料失败', error: err };
  }
}

// 获取用户记录接口：传入 userId
async function getUserRecords(event) {
  const { userId } = event;
  if (!userId) {
    return { code: 400, message: '缺少 userId' };
  }

  try {
    // 查询用户信息
    const userQuery = await db.collection('users').where({ userId }).get();
    if (!userQuery.data || userQuery.data.length === 0) {
      return { code: 404, message: '用户不存在' };
    }

    const user = userQuery.data[0];

    // 查询最近的运动记录
    const recentRecords = await recordsCollection
      .where({
        userId,
        status: 'verified'
      })
      .orderBy('createTime', 'desc')
      .limit(10)
      .get();

    // 计算今日游戏时间
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayGameRecords = (user.gameRecords || []).filter(record => {
      const recordDate = new Date(record.time);
      return recordDate >= today;
    });
    const todayGameTime = todayGameRecords.reduce((total, record) => total + (record.duration || 0), 0);

    // 计算本周游戏时间
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // 设置为本周日
    weekStart.setHours(0, 0, 0, 0);
    const weekGameRecords = (user.gameRecords || []).filter(record => {
      const recordDate = new Date(record.time);
      return recordDate >= weekStart;
    });
    const weekGameTime = weekGameRecords.reduce((total, record) => total + (record.duration || 0), 0);

    return {
      code: 200,
      message: '获取记录成功',
      data: {
        sportTime: user.sportTime || 0,
        gameTime: user.gameTime || 0,
        todayGameTime,
        weekGameTime,
        sportRecords: user.sportRecords || [],
        gameRecords: user.gameRecords || [],
        recentRecords: recentRecords.data || []
      }
    };
  } catch (err) {
    console.error("获取用户记录失败：", err);
    return { code: 500, message: '获取用户记录失败', error: err };
  }
}

// 更新帮手手机号
async function updateHelperPhone(event) {
  const { userId, helperPhone } = event;
  if (!userId || !helperPhone) {
    return { code: 400, message: '缺少用户ID或手机号' };
  }

  try {
    // 查询用户是否存在
    const userQuery = await db.collection('users').where({ userId }).get();
    if (!userQuery.data || userQuery.data.length === 0) {
      return { code: 404, message: '用户不存在' };
    }

    // 更新帮手手机号
    await db.collection('users').where({ userId }).update({
      data: {
        helperPhone,
        updateTime: new Date()
      }
    });

    return { 
      code: 200, 
      message: '帮手手机号更新成功',
      helperPhone 
    };
  } catch (err) {
    console.error("更新帮手手机号失败：", err);
    return { code: 500, message: '更新帮手手机号失败', error: err };
  }
}

// 更新游戏时间
async function updateGameTime(event) {
  const { userId, duration, mode } = event;
  if (!userId || !duration) {
    return { code: 400, message: '缺少用户ID或游戏时长' };
  }

  try {
    // 查询用户当前游戏时间
    const userQuery = await usersCollection.where({
      userId: userId
    }).get();

    if (!userQuery.data || userQuery.data.length === 0) {
      return { code: 404, message: '用户不存在' };
    }

    const user = userQuery.data[0];
    const currentGameTime = user.gameTime || 0;
    // 不足一分钟按一分钟算
    const consumeMinutes = Math.ceil(duration / 60);

    // 检查游戏时间是否足够
    if (currentGameTime < consumeMinutes) {
      return { code: 400, message: '游戏时间不足' };
    }

    const now = new Date();
    // 创建新的游戏记录
    const gameRecord = {
      recordId: uuidv4(),
      duration: consumeMinutes,
      createTime: now,
      mode: mode || '手动结束'
    };

    // 获取现有游戏记录
    const gameRecords = user.gameRecords || [];
    
    // 添加新记录到数组开头
    gameRecords.unshift(gameRecord);

    // 如果记录超过50条，删除最老的记录
    if (gameRecords.length > 50) {
      gameRecords.pop();
    }

    // 更新用户游戏时间和记录
    await usersCollection.where({
      userId: userId
    }).update({
      data: {
        gameTime: command.inc(-consumeMinutes),  // 减去消耗的游戏时间（分钟）
        gameRecords: gameRecords,
        updateTime: now
      }
    });

    // 添加游戏记录到records集合
    await recordsCollection.add({
      data: {
        recordId: gameRecord.recordId,
        userId,
        type: 'game',
        duration: consumeMinutes,
        mode: gameRecord.mode,
        createTime: now,
        updateTime: now
      }
    });

    return {
      code: 200,
      message: '游戏时间更新成功',
      data: {
        remainingTime: currentGameTime - consumeMinutes,
        consumedTime: consumeMinutes,
        gameRecord
      }
    };
  } catch (err) {
    console.error("更新游戏时间失败：", err);
    return { code: 500, message: '更新游戏时间失败', error: err };
  }
}

// 记录退出登录日志
async function logLogout(event) {
  const { userId, nickName } = event;
  if (!userId) {
    return { code: 400, message: '缺少用户ID' };
  }

  try {
    console.log(`用户退出登录：${userId}, 昵称: ${nickName || '未知'}`);
    return {
      code: 200,
      message: '退出成功'
    };
  } catch (err) {
    console.error('记录退出日志失败：', err);
    return { code: 500, message: '记录退出日志失败', error: err };
  }
}