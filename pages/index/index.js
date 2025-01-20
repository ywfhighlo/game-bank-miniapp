const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    gameTimeBalance: 0,
    todayGameTime: 0,
    weekGameTime: 0,
    sportRecords: []
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
    
    // 获取游戏时间余额和使用情况
    this.getGameTimeInfo()
    // 获取最近运动记录
    this.getSportRecords()
  },

  getUserInfo(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },

  getGameTimeInfo() {
    // TODO: 从服务器获取游戏时间信息
    this.setData({
      gameTimeBalance: app.globalData.gameTimeBalance,
      todayGameTime: 0,
      weekGameTime: 0
    })
  },

  getSportRecords() {
    // TODO: 从服务器获取运动记录
    this.setData({
      sportRecords: []
    })
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
