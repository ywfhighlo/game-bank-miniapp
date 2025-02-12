Page({
  data: {},

  onHelpFeedback() {
    wx.showModal({
      title: '帮助与反馈',
      content: '如需帮助或反馈问题，请联系客服。',
      showCancel: false
    });
  },

  onAbout() {
    wx.showModal({
      title: '关于',
      content: '动乐时光小程序 v1.0.0\n鼓励用户运动来兑换游戏时间，帮助用户培养健康的生活习惯。',
      showCancel: false
    });
  },

  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除用户信息
          getApp().globalData.userInfo = null;
          wx.setStorageSync('userInfo', null);
          
          // 返回到个人页面并刷新
          const pages = getCurrentPages();
          const profilePage = pages[pages.length - 2];
          if (profilePage) {
            profilePage.setData({
              hasUserInfo: false,
              userInfo: null
            });
          }
          wx.navigateBack();
        }
      }
    });
  }
});
