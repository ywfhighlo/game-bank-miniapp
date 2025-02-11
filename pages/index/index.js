const app = getApp()

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    gameTimeBalance: 0,
    todayGameTime: 0,
    weekGameTime: 0,
    sportRecords: [],
    gameRecords: []
  },

  onLoad() {
    // 检查本地存储和全局状态
    const userInfo = wx.getStorageSync('userInfo') || app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true,
        gameTimeBalance: app.globalData.gameTimeBalance || 0,
        sportRecords: app.globalData.sportRecords || [],
        gameRecords: app.globalData.gameRecords || []
      });
    }
  },

  onShow() {
    // 每次显示页面时检查登录状态
    const userInfo = wx.getStorageSync('userInfo') || app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true,
        gameTimeBalance: app.globalData.gameTimeBalance || 0,
        sportRecords: app.globalData.sportRecords || [],
        gameRecords: app.globalData.gameRecords || []
      });
    }
  },

  getUserInfo(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
    }
  },

  navigateToSport() {
    wx.switchTab({
      url: '/pages/sport/sport'
    });
  },

  navigateToGame() {
    wx.switchTab({
      url: '/pages/game/game'
    });
  },

  onLogin() {
    wx.getUserProfile({
      desc: '用于登录',
      success: res => {
        app.reLogin(res.userInfo, () => {
          this.setData({
            userInfo: app.globalData.userInfo,
            gameTimeBalance: app.globalData.gameTimeBalance,
            sportRecords: app.globalData.sportRecords,
            gameRecords: app.globalData.gameRecords
          });
        });
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
      },
      fail: err => {
        console.error('登录失败', err);
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  }
});
