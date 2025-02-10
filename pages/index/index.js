const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    gameTimeBalance: 0,
    todayGameTime: 0,
    weekGameTime: 0,
    sportRecords: [],
    gameRecords: []
  },

  onLoad() {
    // 如果已存在用户信息，则直接显示
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    }
    // 从全局变量中读取持久化的游戏时间余额和记录数据
    this.setData({
      gameTimeBalance: app.globalData.gameTimeBalance || 0,
      sportRecords: app.globalData.sportRecords || [],
      gameRecords: app.globalData.gameRecords || []
    });
  },

  onShow() {
    // 每次页面显示时，重新从全局数据中同步最新数据
    this.setData({
      gameTimeBalance: app.globalData.gameTimeBalance || 0,
      sportRecords: app.globalData.sportRecords || [],
      gameRecords: app.globalData.gameRecords || []
    });
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
  }
});
