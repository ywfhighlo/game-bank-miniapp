App({
  globalData: {
    userInfo: null,
    isParent: false,
    gameTimeBalance: 0,
    dailyLimit: 7200, // 2小时，单位：秒
    weeklyLimit: 36000, // 10小时，单位：秒
    restInterval: 1800, // 30分钟，单位：秒
    restDuration: 300, // 5分钟，单位：秒
  },

  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})
