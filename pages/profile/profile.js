Page({
  data: {
    user: {}
  },
  onLoad() {
    // 从本地缓存中获取用户信息
    const user = wx.getStorageSync('userInfo');
    if (user) {
      this.setData({ user });
    }
  },
  logout() {
    const app = getApp();
    app.globalData.userId = null;
    wx.removeStorageSync('userId');
    wx.showToast({ title: '已退出登录', icon: 'success' });
    // 跳转到登录页面
    wx.redirectTo({
      url: '/pages/login/login'
    });
  }
}); 