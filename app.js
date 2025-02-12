App({
  globalData: {
    userInfo: null,
    userId: null,
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

    // 检查本地缓存中是否有已登录的用户信息
    const storedUser = wx.getStorageSync('userInfo');
    const storedUserId = wx.getStorageSync('userId');
    if (storedUser && storedUserId) {
      this.globalData.userInfo = storedUser;
      this.globalData.userId = storedUserId;
      this.loadPersistentData();
    } else {
      // 如果没有登录信息，重定向到登录页
      wx.redirectTo({
        url: '/pages/login/login'
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
  }
});
