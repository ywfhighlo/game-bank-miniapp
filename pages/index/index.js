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
    
    // 获取游戏时间余额和运动记录
    this.getGameTimeInfo()
    this.getSportRecords()
  },

  // 每次页面显示时更新游戏时间余额和运动记录
  onShow() {
    this.getGameTimeInfo()
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
    // 获取全局最新游戏时间余额
    this.setData({
      gameTimeBalance: app.globalData.gameTimeBalance,
      todayGameTime: 0,
      weekGameTime: 0
    })
  },

  getSportRecords() {
    // 从全局变量中获取运动记录，如果没有则返回空数组
    this.setData({
      sportRecords: app.globalData.sportRecords || []
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
