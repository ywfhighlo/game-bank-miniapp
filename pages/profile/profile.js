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
    wx.clearStorageSync();
    wx.redirectTo({
      url: '/pages/login/login'
    });
  }
}); 