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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        gameTimeBalance: app.globalData.gameTimeBalance,
        sportRecords: app.globalData.sportRecords,
        gameRecords: app.globalData.gameRecords

      });
    }
  },

  onShow() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        gameTimeBalance: app.globalData.gameTimeBalance,
        sportRecords: app.globalData.sportRecords,
        gameRecords: app.globalData.gameRecords
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
  }
});
