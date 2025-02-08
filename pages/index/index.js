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
    gameRecords: []  // 新增：最近游戏记录
  },

  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
    
    // 初次加载时更新数据
    this.getGameTimeInfo();
    this.getSportRecords();
    this.getGameRecords();
  },

  // 每次页面显示时更新最新数据
  onShow() {
    this.getGameTimeInfo();
    this.getSportRecords();
    this.getGameRecords();
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

  getGameTimeInfo() {
    // 从全局获取游戏余额
    this.setData({
      gameTimeBalance: app.globalData.gameTimeBalance,
      todayGameTime: 0,
      weekGameTime: 0
    });
  },

  // 获取最近运动记录
  getSportRecords() {
    this.setData({
      sportRecords: app.globalData.sportRecords || []
    });
  },

  // 新增：获取最近游戏记录
  getGameRecords() {
    this.setData({
      gameRecords: app.globalData.gameRecords || []
    });
  },

  navigateToSport() {
    wx.switchTab({
      url: '/pages/sport/sport'
    })
  },

  navigateToGame() {
    wx.switchTab({
      url: '/pages/game/game'
    })
  }
})
