// 登录页面的 JS
Page({
  data: {},
  
  // 用户授权后保存信息并跳转到首页
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 必填字段，解释获取用户信息的用途
      success: (res) => {
        const userInfo = res.userInfo;
        // 保存用户信息到本地缓存及全局数据中
        wx.setStorageSync('userInfo', userInfo);
        getApp().globalData.userInfo = userInfo;
        wx.redirectTo({
          url: '/pages/index/index'
        });
      },
      fail: () => {
        wx.showToast({
          title: '授权失败，请重试',
          icon: 'none'
        });
      }
    });
  }
}); 