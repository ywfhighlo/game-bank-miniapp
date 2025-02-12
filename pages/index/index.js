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
    gameRecords: [],
    totalSportTime: 0,
    dailyLimit: 7200,
    weeklyLimit: 36000,
    restInterval: 1800,
    restDuration: 300
  },

  // 获取用户运动记录和游戏时间数据
  loadUserData() {
    if (!app.globalData.userId) {
      console.log('用户未登录，跳过加载数据');
      return;
    }

    console.log('开始加载用户数据');
    wx.cloud.callFunction({
      name: 'api',
      data: {
        action: 'getUserRecords',
        userId: app.globalData.userId
      },
      success: res => {
        console.log('获取用户数据成功：', res);
        if (res.result.code === 200) {
          const data = res.result.data;
          
          // 更新全局数据
          app.globalData.gameTime = data.gameTime;
          app.globalData.sportRecords = data.sportRecords;
          app.globalData.gameRecords = data.gameRecords || [];
          app.globalData.dailyLimit = data.dailyLimit;
          app.globalData.weeklyLimit = data.weeklyLimit;
          app.globalData.restInterval = data.restInterval;
          app.globalData.restDuration = data.restDuration;

          // 更新页面数据
          this.setData({
            gameTimeBalance: data.gameTime,
            sportRecords: data.sportRecords.slice(0, 5), // 只显示最近5条运动记录
            gameRecords: (data.gameRecords || []).slice(0, 5), // 只显示最近5条游戏记录
            totalSportTime: data.totalSportTime,
            todayGameTime: data.todayGameTime || 0,
            weekGameTime: data.weekGameTime || 0,
            dailyLimit: data.dailyLimit,
            weeklyLimit: data.weeklyLimit,
            restInterval: data.restInterval,
            restDuration: data.restDuration
          });

          // 保存到本地存储
          wx.setStorageSync('userData', {
            gameTime: data.gameTime,
            sportRecords: data.sportRecords,
            gameRecords: data.gameRecords || [],
            totalSportTime: data.totalSportTime,
            todayGameTime: data.todayGameTime || 0,
            weekGameTime: data.weekGameTime || 0,
            dailyLimit: data.dailyLimit,
            weeklyLimit: data.weeklyLimit,
            restInterval: data.restInterval,
            restDuration: data.restDuration
          });
        } else {
          console.error('获取用户数据失败：', res.result.message);
          wx.showToast({
            title: '数据加载失败',
            icon: 'none'
          });
        }
      },
      fail: err => {
        console.error('获取用户数据失败：', err);
        wx.showToast({
          title: '获取数据失败',
          icon: 'none'
        });
      }
    });
  },

  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      this.loadUserData();
    }
  },

  onShow() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      this.loadUserData();
    }
  },

  getUserInfo(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      this.loadUserData();
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
