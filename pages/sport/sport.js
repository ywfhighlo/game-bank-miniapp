const app = getApp();

Page({
  data: {
    duration: '',
    recordId: '',
    code: ''
  },
  onInputDuration(e) {
    this.setData({ duration: e.detail.value });
  },
  submitSportRecord() {
    const duration = parseFloat(this.data.duration);
    if (!duration || duration <= 0) {
      wx.showToast({ title: '请输入有效运动时长', icon: 'none' });
      return;
    }
    // 确保用户已登录
    const userId = app.globalData.userId;
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
  // 提交验证码
  verifyRecord() {
    const userId = app.globalData.userId;
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
  },
  // 输入验证码时调用
  onInputCode(e) {
    this.setData({ code: e.detail.value });
  }
}); 