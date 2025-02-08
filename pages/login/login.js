// 登录页面的 JS
Page({
  data: {},
  
  // 用户授权后保存信息并跳转到首页
  handleUserInfo(e) {
    if (e.detail.userInfo) {
      // 可将用户信息保存到全局或本地缓存中
      wx.setStorageSync('userInfo', e.detail.userInfo);
      // 跳转到首页
      wx.redirectTo({
        url: '/pages/index/index'
      });
    } else {
      wx.showToast({
        title: '授权失败，请重试',
        icon: 'none'
      });
    }
  }
}); 