App({
  globalData: {
    userInfo: null,
    userId: null,
    gameTime: 0,
    gameTimeBalance: 0,
    gameRecords: [],
    dailyLimit: 7200,
    weeklyLimit: 36000,
    restInterval: 1800,
    restDuration: 300,
    sportRecords: [],
    helperPhone: ""  // 新增：帮手手机号码
  },

  onLaunch: function() {
    console.log('App onLaunch');
    
    // 检查基础库版本
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或更高版本的基础库以使用云能力');
    } else {
      // 初始化云开发环境
      wx.cloud.init({
        env: 'gamebank-3gx3otq16ff2ac9d', // 请替换成你的云环境 ID
        traceUser: true
      });
    }

    // 从本地存储恢复用户数据
    const storedUserInfo = wx.getStorageSync('userInfo');
    const userData = wx.getStorageSync('userData');
    
    console.log('从存储恢复用户信息:', storedUserInfo);
    console.log('从存储恢复用户数据:', userData);

    if (storedUserInfo) {
      this.globalData.userInfo = storedUserInfo;
    }

    if (userData) {
      this.globalData.userId = userData.userId;  // 从userData中获取userId
      this.globalData.gameTime = userData.gameTime || 0;
      this.globalData.gameTimeBalance = userData.gameTimeBalance || 0;
      this.globalData.gameRecords = userData.gameRecords || [];
      this.globalData.dailyLimit = userData.dailyLimit || 7200;
      this.globalData.weeklyLimit = userData.weeklyLimit || 36000;
      this.globalData.restInterval = userData.restInterval || 1800;
      this.globalData.restDuration = userData.restDuration || 300;
      this.globalData.helperPhone = userData.helperPhone || "";
    }

    // 检查是否需要重新登录
    if (!this.globalData.userId) {
      console.log('未找到用户ID，需要重新登录');
    } else {
      console.log('已恢复用户ID:', this.globalData.userId);
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
      console.log('Retrieved sportRecords from storage:', storedSportRecords);
      if (storedSportRecords) {
        this.globalData.sportRecords = storedSportRecords;
        console.log('Initialized globalData.sportRecords:', this.globalData.sportRecords);
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
