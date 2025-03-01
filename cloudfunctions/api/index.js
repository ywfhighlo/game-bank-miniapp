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
  console.log('云函数入口 - 收到请求:', event);
  const { action } = event;
  console.log('请求的action:', action);

  try {
    // 确保必要的集合存在
    await ensureCollectionExists('users');
    await ensureCollectionExists('records');

    switch (action) {
      case 'register':
        console.log('准备调用registerUser函数');
        return await registerUser(event);
      case 'login':
        console.log('准备调用loginUser函数');
        return await loginUser(event);
      case 'wxLogin':
        console.log('准备调用wxLogin函数');
        return await wxLogin(event);
      case 'createRecord':
        console.log('准备调用createRecord函数');
        return await createRecord(event);
      case 'verifyRecord':
        console.log('准备调用verifyRecord函数');
        return await verifyRecord(event);
      case 'getUserRecords':
        console.log('准备调用getUserRecords函数');
        return await getUserRecords(event);
      case 'getUserProfile':
        console.log('准备调用getUserProfile函数');
        return await getUserProfile(event);
      case 'updateHelperPhone':
        console.log('准备调用updateHelperPhone函数');
        return await updateHelperPhone(event);
      case 'updateGameTime':
        console.log('准备调用updateGameTime函数');
        return await updateGameTime(event);
      case 'logLogout':
        console.log('准备调用logLogout函数');
        return await logLogout(event);
      default:
        console.error('未知的action:', action);
        return {
          code: 400,
          message: '未知的操作类型'
        };
    }
  } catch (err) {
    console.error('云函数执行出错:', err);
    return {
      code: 500,
      message: '服务器内部错误: ' + err.message
    };
  }
};

// 注册接口：传入 username, password, helperPhone
async function registerUser(event) {
  console.log('=== registerUser函数开始 ===');
  console.log('接收到的参数:', event);
  
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

  console.log('=== registerUser函数结束 ===');
  return { code: 200, message: '注册成功', userId };
}

// 登录接口：传入 username, password
async function loginUser(event) {
  console.log('=== loginUser函数开始 ===');
  console.log('接收到的参数:', event);
  
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
  console.log('=== loginUser函数结束 ===');
  return { code: 401, message: '用户名或密码错误' };
}

// 提交运动记录接口：传入 userId, duration；生成随机6位验证码（用作短信验证模拟）
async function createRecord(event) {
  console.log('=== createRecord函数开始 ===');
  console.log('接收到的参数:', event);
  
  const { userId, duration } = event;
  if (!userId || !duration) {
    return { code: 400, message: '缺少用户ID或运动时长' };
  }

  try {
    // 生成记录ID
    const recordId = uuidv4();
    
    // 生成6位随机验证码
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('生成的验证码:', verificationCode);

    // 创建运动记录
    const record = {
      recordId,
      userId,
      duration: parseInt(duration),
      createTime: new Date(),
      verificationCode,
      verified: false  // 初始状态为未验证
    };

    console.log('准备创建运动记录:', record);

    // 保存记录到数据库
    await recordsCollection.add({
      data: record
    });

    console.log('运动记录创建成功');

    // 更新用户的运动记录
    await usersCollection.where({
      userId: userId
    }).update({
      data: {
        updateTime: new Date(),
        lastSportTime: new Date()
      }
    });

    console.log('=== createRecord函数结束 ===');

    return {
      code: 200,
      message: '记录创建成功',
      data: {
        recordId,
        verificationCode
      }
    };
  } catch (err) {
    console.error('创建运动记录失败:', err);
    return {
      code: 500,
      message: '创建记录失败: ' + err.message
    };
  }
}

// 验证验证码接口：传入 userId, recordId, code
async function verifyRecord(event) {
  console.log('=== verifyRecord函数开始 ===');
  console.log('接收到的参数:', event);
  
  try {
    const { userId, recordId, code } = event;

    if (!userId || !recordId || !code) {
      return {
        code: 400,
        message: '缺少必要参数'
      };
    }

    // 查询记录
    const recordQuery = await recordsCollection.where({
      recordId: recordId,
      userId: userId
    }).get();

    if (!recordQuery.data || !recordQuery.data.length) {
      return {
        code: 404,
        message: '找不到对应的运动记录'
      };
    }

    const record = recordQuery.data[0];
    console.log('找到的运动记录:', record);

    // 验证码检查
    if (record.verificationCode !== code) {
      return {
        code: 400,
        message: '验证码错误'
      };
    }

    // 更新记录状态为已验证
    const updateResult = await recordsCollection.doc(record._id).update({
      data: {
        verified: true,
        verifyTime: new Date()
      }
    });

    console.log('记录验证结果:', updateResult);

    if (!updateResult.stats.updated) {
      console.error('记录状态更新失败');
      return {
        code: 500,
        message: '验证失败：无法更新记录状态'
      };
    }

    console.log('记录验证成功，已更新状态');

    // 更新用户的游戏时间
    const gameTime = record.duration * 2;  // 运动时间的2倍
    const userUpdateResult = await usersCollection.where({
      userId: userId
    }).update({
      data: {
        gameTime: db.command.inc(gameTime),
        updateTime: new Date()
      }
    });

    console.log('用户游戏时间更新结果:', userUpdateResult);

    console.log('=== verifyRecord函数结束 ===');

    return {
      code: 200,
      message: '验证成功',
      data: {
        gameTime
      }
    };
  } catch (err) {
    console.error('验证记录失败:', err);
    return {
      code: 500,
      message: '验证失败: ' + err.message
    };
  }
}

// 微信登录接口：传入 code
async function wxLogin(event) {
  console.log('=== wxLogin函数开始 ===');
  console.log('接收到的参数:', event);
  
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

    console.log('=== wxLogin函数结束 ===');
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
  console.log('=== getUserProfile函数开始 ===');
  console.log('接收到的参数:', event);
  
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

    console.log('=== getUserProfile函数结束 ===');
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
  console.log('=== getUserRecords函数开始 ===');
  console.log('接收到的参数:', event);
  
  try {
    const { userId } = event;
    console.log('Getting records for userId:', userId);

    // 测试查询：获取任意记录
    try {
      console.log('=== 测试查询开始 ===');
      // 1. 先获取所有记录
      const allRecords = await db.collection('records').limit(10).get();
      console.log('所有记录（最多10条）:', allRecords.data);

      // 2. 获取所有verified的记录
      const verifiedRecords = await db.collection('records')
        .where({
          verified: true
        })
        .limit(10)
        .get();
      console.log('已验证的记录（最多10条）:', verifiedRecords.data);

      // 3. 获取当前用户的所有记录（不管verified状态）
      const userRecords = await db.collection('records')
        .where({
          userId: userId
        })
        .limit(10)
        .get();
      console.log('当前用户的记录（最多10条）:', userRecords.data);
      console.log('=== 测试查询结束 ===');
    } catch (testErr) {
      console.error('测试查询失败:', testErr);
    }

    // 获取用户信息
    console.log('开始查询用户信息');
    const userQuery = await usersCollection.where({ userId }).get();
    console.log('用户查询结果:', userQuery);
    
    if (!userQuery.data || !userQuery.data.length) {
      console.error('User not found:', userId);
      return {
        code: 404,
        message: '用户不存在'
      };
    }

    const user = userQuery.data[0];
    console.log('Found user data:', user);

    // 获取最近5条运动记录
    console.log('开始查询运动记录');
    console.log('查询条件:', {
      userId: userId,
      verified: true
    });
    
    try {
      const recentRecords = await db.collection('records')
        .where({
          userId: userId,
          verified: true
        })
        .orderBy('createTime', 'desc')
        .limit(5)
        .get();

      console.log('运动记录查询结果:', recentRecords);
      console.log('原始运动记录数据:', recentRecords.data);

      if (!recentRecords.data || recentRecords.data.length === 0) {
        console.log('未找到运动记录。查询条件:', {
          userId: userId,
          verified: true
        });
      }

      // 格式化运动记录用于显示
      const formattedRecords = recentRecords.data.map(record => {
        console.log('格式化记录:', record);
        return {
          duration: record.duration,
          time: new Date(record.createTime).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }).replace(/\//g, '-'),
          type: '运动'
        };
      });

      console.log('格式化后的运动记录:', formattedRecords);

      // 计算今日游戏时间
      const todayGameRecords = (user.gameRecords || []).filter(record => {
        const recordDate = new Date(record.time);
        const today = new Date();
        return recordDate.getDate() === today.getDate() &&
          recordDate.getMonth() === today.getMonth() &&
          recordDate.getFullYear() === today.getFullYear();
      });

      const todayGameTime = todayGameRecords.reduce((total, record) => total + record.duration, 0);

      // 计算本周游戏时间
      const weekGameRecords = (user.gameRecords || []).filter(record => {
        const recordDate = new Date(record.time);
        const today = new Date();
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
        weekStart.setHours(0, 0, 0, 0);
        return recordDate >= weekStart;
      });

      const weekGameTime = weekGameRecords.reduce((total, record) => total + record.duration, 0);

      const responseData = {
        recentRecords: formattedRecords,
        gameRecords: user.gameRecords || [],
        todayGameTime,
        weekGameTime,
        gameTimeBalance: user.gameTime || 0,
        dailyLimit: user.dailyLimit || 7200,
        weeklyLimit: user.weeklyLimit || 36000,
        restInterval: user.restInterval || 1800,
        restDuration: user.restDuration || 300
      };

      console.log('最终返回数据:', responseData);
      console.log('=== getUserRecords函数结束 ===');

      return {
        code: 200,
        message: '获取记录成功',
        data: responseData
      };
    } catch (queryErr) {
      console.error('查询运动记录时出错:', queryErr);
      console.error('错误堆栈:', queryErr.stack);
      throw queryErr;
    }
  } catch (err) {
    console.error('getUserRecords函数出错:', err);
    console.error('错误堆栈:', err.stack);
    return {
      code: 500,
      message: '获取记录失败: ' + err.message
    };
  }
}

// 更新帮手手机号
async function updateHelperPhone(event) {
  console.log('=== updateHelperPhone函数开始 ===');
  console.log('接收到的参数:', event);
  
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

    console.log('=== updateHelperPhone函数结束 ===');
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
  console.log('=== updateGameTime函数开始 ===');
  console.log('接收到的参数:', event);
  
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

    console.log('=== updateGameTime函数结束 ===');
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
  console.log('=== logLogout函数开始 ===');
  console.log('接收到的参数:', event);
  
  const { userId, nickName } = event;
  if (!userId) {
    return { code: 400, message: '缺少用户ID' };
  }

  try {
    console.log(`用户退出登录：${userId}, 昵称: ${nickName || '未知'}`);
    console.log('=== logLogout函数结束 ===');
    return {
      code: 200,
      message: '退出成功'
    };
  } catch (err) {
    console.error('记录退出日志失败：', err);
    return { code: 500, message: '记录退出日志失败', error: err };
  }
}