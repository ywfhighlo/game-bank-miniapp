App({
  globalData: {
    userInfo: null,
    isParent: false,
    gameTimeBalance: 0,
    dailyLimit: 7200, // 2小时，单位：秒
    weeklyLimit: 36000, // 10小时，单位：秒
    restInterval: 1800, // 30分钟，单位：秒
    restDuration: 300, // 5分钟，单位：秒
    sportRecords: [],
    gameRecords: [],
    helperPhone: ""  // 新增：帮手手机号码
  },

  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或更高版本的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'gamebank-3gx3otq16ff2ac9d', // 请替换成你的云环境 ID
        traceUser: true
      });
    }
    
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
