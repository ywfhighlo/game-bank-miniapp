const app = getApp();

Page({
  data: {
    user: {},
    helperPhone: ''
  },
  onLoad() {
    // 从本地缓存中获取用户信息
    const user = wx.getStorageSync('userInfo');
    if (user) {
      this.setData({ user });
    }
    // 尝试获取本地缓存中的帮手手机号码
    const storedPhone = wx.getStorageSync('helperPhone');
    if (storedPhone) {
      this.setData({
        helperPhone: storedPhone
      });
    }
  },
  logout() {
    app.globalData.userId = null;
    wx.removeStorageSync('userId');
    wx.showToast({ title: '已退出登录', icon: 'success' });
    // 跳转到登录页面
    wx.redirectTo({
      url: '/pages/login/login'
    });
  },
  onInputHelperPhone(e) {
    this.setData({
      helperPhone: e.detail.value
    });
  },
  saveHelperPhone() {
    const phone = this.data.helperPhone;
    if (!phone) {
      wx.showToast({
        title: '请输入有效的手机号码',
        icon: 'none'
      });
      return;
    }
    // 保存到本地缓存与全局数据
    wx.setStorageSync('helperPhone', phone);
    getApp().globalData.helperPhone = phone;
    wx.showToast({
      title: '手机号码保存成功',
      icon: 'success'
    });
  },
  sendTestSMS() {
    const phone = this.data.helperPhone;
    if (!phone) {
      wx.showToast({
        title: '请先设置帮手手机号码',
        icon: 'none'
      });
      return;
    }
    // 调用云函数发送短信
    wx.cloud.callFunction({
      name: 'sendHelperSMS',
      data: {
        phone: phone,
        message: '这是测试短信，您的短信发送功能正常。'
      },
      success: res => {
        console.log('短信发送成功', res);
        wx.showToast({
          title: '测试短信已发送',
          icon: 'success'
        });
      },
      fail: err => {
        console.error('短信发送失败', err);
        wx.showToast({
          title: '短信发送失败',
          icon: 'none'
        });
      }
    });
  }
}); 