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
    
    // 检查本地缓存中是否有已登录的用户信息，若有则加载持久化数据
    const storedUser = wx.getStorageSync('userInfo');
    if (storedUser) {
      this.globalData.userInfo = storedUser;
      this.loadPersistentData();
    } else {
      // 如果本地无用户信息，则进行微信登录及授权获取用户信息
      wx.login({
        success: res => {
          // 登录成功后的自定义逻辑
        }
      });
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                this.globalData.userInfo = res.userInfo;
                wx.setStorageSync('userInfo', res.userInfo);
                this.loadPersistentData();
              }
            });
          }
        }
      });
    }
  },

  // 用户登录成功后加载持久化数据
  loadPersistentData() {
    try {
      const storedGameBalance = wx.getStorageSync('gameTimeBalance');
      if (storedGameBalance !== null && storedGameBalance !== undefined) {
        this.globalData.gameTimeBalance = Number(storedGameBalance);
      }
      const storedSportRecords = wx.getStorageSync('sportRecords');
      if (storedSportRecords) {
        this.globalData.sportRecords = storedSportRecords;
      }
      const storedGameRecords = wx.getStorageSync('gameRecords');
      if (storedGameRecords) {
        this.globalData.gameRecords = storedGameRecords;
      }
      const storedHelperPhone = wx.getStorageSync('helperPhone');
      if (storedHelperPhone) {
        this.globalData.helperPhone = storedHelperPhone;
      }
    } catch (e) {
      console.error("加载持久化数据失败", e);
    }
  },

  // 新增通用重新登录接口
  reLogin(newUser, callback) {
    this.globalData.userInfo = newUser;
    wx.setStorageSync('userInfo', newUser);
    this.loadPersistentData();
    if (callback && typeof callback === 'function') {
      callback();
    }
  }
})
