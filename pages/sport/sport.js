const app = getApp();

Page({
  data: {
    duration: '',
    recordId: '',
    code: ''
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
  // onInput 事件处理函数，用于接收用户的输入
  onInput(e) {
    console.log("输入运动时长:", e.detail.value);
    this.setData({ duration: e.detail.value });
  },
  // 提交运动记录方法
  submitSportRecord() {
    const app = getApp();
    const userId = app.globalData.userId || wx.getStorageSync('userId');
    console.log("提交记录时全局 userId:", userId);
    if (!userId) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    const duration = parseFloat(this.data.duration);
    if (!duration || duration <= 0) {
      wx.showToast({ title: '请输入有效运动时长', icon: 'none' });
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
          wx.showToast({ title: '记录提交成功，验证码已发送', icon: 'success' });
          this.setData({ recordId: res.result.recordId });
        } else {
          wx.showToast({ title: res.result.message, icon: 'none' });
        }
      },
      fail: err => {
        wx.showToast({ title: '云函数调用失败', icon: 'none' });
      }
    });
    this.setData({ duration: '' });
  },
  // 输入验证码时的处理函数
  onInputCode(e) {
    this.setData({ code: e.detail.value });
  },
  // 验证记录方法
  verifyRecord() {
    const userId = app.globalData.userId || wx.getStorageSync('userId');
    console.log("验证记录时的 userId:", userId);
    if (!userId) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    if (!this.data.recordId || !this.data.code) {
      wx.showToast({ title: '记录ID或验证码不能为空', icon: 'none' });
      return;
    }
    wx.cloud.callFunction({
      name: 'api',
      data: {
        action: 'verifyRecord',
        userId,
        recordId: this.data.recordId,
        code: this.data.code
      },
      success: res => {
        if (res.result.code === 200) {
          wx.showToast({ title: '记录验证成功', icon: 'success' });
        } else {
          wx.showToast({ title: res.result.message, icon: 'none' });
        }
      },
      fail: err => {
        wx.showToast({ title: '云函数调用失败', icon: 'none' });
      }
    });
  }
}); 