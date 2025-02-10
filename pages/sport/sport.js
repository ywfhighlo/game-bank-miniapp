const app = getApp();

Page({
  data: {
    duration: '',            // 用户输入的运动时长（分钟）
    pendingRecord: null,     // 保存待验证记录（例如：{ duration: 10 }）
    verificationCode: ''     // 用户输入的验证码
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
  // 记录输入时长
  onInput(e) {
    this.setData({ duration: e.detail.value });
  },
  // 提交运动记录，调用云函数发送短信（模拟发送短信，验证码固定为123456）
  submitSportRecord() {
    const duration = parseInt(this.data.duration);
    if (!duration || duration <= 0) {
      wx.showToast({
        title: '请输入有效的运动时长',
        icon: 'none'
      });
      return;
    }
    const userId = app.globalData.userId || wx.getStorageSync('userId');
    if (!userId) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.cloud.callFunction({
      name: 'api',
      data: {
        action: 'createRecord',
        userId,
        duration
      },
      success: res => {
        if (res.result.code === 200) {
          wx.showToast({
            title: '记录提交成功，验证码已发送',
            icon: 'success'
          });
          // 保存待验证记录，待用户输入验证码后确认兑换
          this.setData({ pendingRecord: { duration } });
        } else {
          wx.showToast({ title: res.result.message, icon: 'none' });
        }
      },
      fail: err => {
        wx.showToast({ title: '记录提交失败', icon: 'none' });
      }
    });
  },
  // 记录输入的验证码
  onInputVerification(e) {
    this.setData({ verificationCode: e.detail.value });
  },
  // 确认验证码，验证成功则增加游戏时间
  confirmRecord() {
    const code = this.data.verificationCode;
    if (code !== "123456") {
      wx.showToast({
        title: '验证码不正确',
        icon: 'none'
      });
      return;
    }
    const pendingRecord = this.data.pendingRecord;
    if (pendingRecord && pendingRecord.duration > 0) {
      // 增加全局游戏时间余额
      app.globalData.gameTimeBalance += pendingRecord.duration;
      wx.showToast({
        title: `验证成功，增加 ${pendingRecord.duration} 分钟游戏时间`,
        icon: 'success'
      });
      // 保存运动记录到全局 sportRecords 数组中
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
      // 重置待验证状态与输入
      this.setData({
        pendingRecord: null,
        verificationCode: '',
        duration: ''
      });
    }
  }
}); 