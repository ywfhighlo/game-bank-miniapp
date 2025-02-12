const app = getApp();

Page({
  data: {
    duration: '',            // 用户输入的运动时长（分钟）
    pendingRecord: null,     // 保存待验证记录（例如：{ duration: 10 }）
    verificationCode: '',    // 用户输入的验证码
    message: ''              // 用于页面下方显示提示信息
  },
  // 页面加载时检查用户登录状态
  onLoad() {
    // 尝试从全局变量和本地缓存中读取 userId
    const userId = app.globalData.userId || wx.getStorageSync('userId');
    console.log("运动页面加载时获取的 userId:", userId);
    if (!userId) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      // 跳转到登录页面
      wx.navigateTo({
        url: '/pages/login/login'
      });
    }
  },
  onShow() {
    const app = getApp();
    const userId = app.globalData.userId || wx.getStorageSync('userId');
    console.log("运动页面 onShow 时获取的 userId:", userId);
  },
  // 记录输入时长，清空提示信息
  onInput(e) {
    this.setData({ 
      duration: e.detail.value,
      message: ''
    });
  },
  // 提交运动记录
  submitSportRecord() {
    const app = getApp();
    const userId = app.globalData.userId || wx.getStorageSync('userId');
    
    if (!userId) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      });
      // 延迟跳转到登录页面
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/login/login'
        });
      }, 1500);
      return;
    }

    const duration = parseInt(this.data.duration);
    if (!duration || duration <= 0) {
      wx.showToast({
        title: '请先开始运动',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '提交中...',
      mask: true
    });

    const token = app.globalData.token || wx.getStorageSync('token');
    wx.cloud.callFunction({
      name: 'api',
      data: {
        action: 'createRecord',
        userId: userId,
        token: token,
        duration: duration
      },
      success: res => {
        wx.hideLoading();
        console.log('提交运动记录结果：', res);
        if (res.result.code === 200) {
          this.setData({
            message: '记录提交成功，验证码已发送',
            pendingRecord: { duration }
          });
        } else {
          this.setData({ message: res.result.message });
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error('提交运动记录失败：', err);
        this.setData({ message: '记录提交失败' });
      }
    });
  },
  // 记录验证码输入，同时清空提示消息
  onInputVerification(e) {
    this.setData({ 
      verificationCode: e.detail.value,
      message: ''
    });
  },
  // 确认验证码，验证成功则增加游戏时间，并更新提示信息显示
  confirmRecord() {
    const code = this.data.verificationCode;
    if (code !== "123456") {
      this.setData({
        message: '验证码不正确'
      });
      return;
    }
    const pendingRecord = this.data.pendingRecord;
    if (pendingRecord && pendingRecord.duration > 0) {
      // 累加当前运动时长到全局游戏余额
      app.globalData.gameTimeBalance = Number(app.globalData.gameTimeBalance) + Number(pendingRecord.duration);
      
      // 如果用户已登录才保存到持久化存储，否则只保留当前会话的临时数据
      if (app.globalData.userInfo) {
        wx.setStorageSync('gameTimeBalance', app.globalData.gameTimeBalance);
      }

      this.setData({
        message: `验证成功，增加 ${pendingRecord.duration} 分钟游戏时间`,
        pendingRecord: null,
        verificationCode: '',
        duration: ''
      });

      const now = new Date().toLocaleString();
      const record = {
        type: '运动',
        duration: pendingRecord.duration,
        time: now
      };
      if (!app.globalData.sportRecords) {
        app.globalData.sportRecords = [];
      }
      app.globalData.sportRecords.push(record);
      if (app.globalData.userInfo) {
        wx.setStorageSync('sportRecords', app.globalData.sportRecords);
      }
    }
  }
}); 