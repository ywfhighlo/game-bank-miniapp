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
      content: '游戏银行小程序 v1.0.0\n为玩家提供便捷的游戏银行服务',
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
