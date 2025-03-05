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
    restDuration: 300,
    countdown: '',
    holidayType: '',
    holidayDates: {
      winterStart: '2024-01-15',
      winterEnd: '2024-02-15',
      summerStart: '2024-07-01',
      summerEnd: '2024-08-31'
    }
  },

  // 获取用户运动记录和游戏时间数据
  loadUserData() {
    console.log('=== loadUserData开始 ===');
    console.log('当前globalData:', app.globalData);
    
    if (!app.globalData.userId) {
      console.log('用户未登录，尝试从storage恢复');
      // 尝试从storage获取用户信息
      const storedUserInfo = wx.getStorageSync('userInfo');
      const userData = wx.getStorageSync('userData');
      console.log('Storage中的用户信息:', storedUserInfo);
      console.log('Storage中的用户数据:', userData);
      
      if (userData && userData.userId) {
        console.log('从storage恢复用户ID:', userData.userId);
        app.globalData.userId = userData.userId;
      } else {
        console.log('找不到用户登录信息，需要先登录');
        return;
      }
    }

    console.log('准备调用云函数 getUserRecords');
    console.log('使用的userId:', app.globalData.userId);
    
    wx.cloud.callFunction({
      name: 'api',
      data: {
        action: 'getUserRecords',
        userId: app.globalData.userId
      },
      success: res => {
        console.log('调用云函数成功，完整响应：', res);
        console.log('云函数返回数据：', res.result);
        
        if (res.result.code === 200) {
          const data = res.result.data;
          console.log('获取到的数据详情：', data);
          console.log('运动记录数据：', data.recentRecords);
          
          // 更新全局数据
          app.globalData.gameTimeBalance = data.gameTimeBalance;
          app.globalData.gameRecords = data.gameRecords || [];
          app.globalData.dailyLimit = data.dailyLimit;
          app.globalData.weeklyLimit = data.weeklyLimit;
          app.globalData.restInterval = data.restInterval;
          app.globalData.restDuration = data.restDuration;

          // 更新页面数据
          const pageData = {
            gameTimeBalance: data.gameTimeBalance || 0,
            sportRecords: data.recentRecords || [],
            gameRecords: (data.gameRecords || []).slice(0, 5),
            totalSportTime: data.sportTime || 0,
            todayGameTime: data.todayGameTime || 0,
            weekGameTime: data.weekGameTime || 0,
            dailyLimit: data.dailyLimit,
            weeklyLimit: data.weeklyLimit,
            restInterval: data.restInterval,
            restDuration: data.restDuration
          };
          
          console.log('准备更新页面数据：', pageData);
          console.log('运动记录数组长度：', (data.recentRecords || []).length);
          console.log('运动记录具体内容：', data.recentRecords);
          
          this.setData(pageData, () => {
            console.log('页面数据更新完成');
            console.log('当前页面运动记录：', this.data.sportRecords);
            console.log('=== loadUserData结束 ===');
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
        console.error('调用云函数失败：', err);
        wx.showToast({
          title: '获取数据失败',
          icon: 'none'
        });
      }
    });
  },

  onLoad() {
    console.log('Index page onLoad');
    console.log('Global user info:', app.globalData.userInfo);
    console.log('Global userId:', app.globalData.userId);
    
    // 初始化倒计时
    this.updateCountdown();
    // 每分钟更新一次倒计时
    setInterval(() => {
      this.updateCountdown();
    }, 60000);
    
    // 检查用户是否已登录
    const storedUserInfo = wx.getStorageSync('userInfo');
    if (storedUserInfo && storedUserInfo.userId) {
      console.log('Found stored user info:', storedUserInfo);
      app.globalData.userInfo = storedUserInfo;
      app.globalData.userId = storedUserInfo.userId;
      this.setData({
        userInfo: storedUserInfo,
        hasUserInfo: true
      });
      this.loadUserData();
    } else {
      console.log('No stored user info found');
    }
  },

  onShow() {
    console.log('Index page onShow');
    console.log('Current globalData:', app.globalData);
    // 每次显示页面时重新加载数据
    if (app.globalData.userId) {
      this.loadUserData();
    } else {
      console.log('No userId in globalData, checking storage...');
      const storedUserInfo = wx.getStorageSync('userInfo');
      if (storedUserInfo && storedUserInfo.userId) {
        console.log('Found userId in storage:', storedUserInfo.userId);
        app.globalData.userId = storedUserInfo.userId;
        this.loadUserData();
      } else {
        console.log('No user info found in storage');
      }
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
    wx.navigateTo({
      url: '/pages/sport/sport',
      webviewId: Date.now()
    });
  },

  navigateToGame() {
    wx.navigateTo({
      url: '/pages/game/game',
      webviewId: Date.now()
    });
  },

  navigateToCountdown() {
    wx.navigateTo({
      url: '/pages/holiday-countdown/holiday-countdown',
      webviewId: Date.now()
    });
  },

  navigateToQuote() {
    wx.navigateTo({
      url: '/pages/daily-inspiration/daily-inspiration',
      webviewId: Date.now()
    });
  },

  navigateToMoodCard() {
    wx.navigateTo({
      url: '/pages/mood-card/mood-card',
      webviewId: Date.now()
    });
  },

  navigateToPoetry() {
    wx.navigateTo({
      url: '/pages/poetry-challenge/poetry-challenge',
      webviewId: Date.now()
    });
  },
  navigateToMoodCard() {
    wx.navigateTo({
      url: '/pages/mood-card/mood-card'
    });
  },

  updateCountdown() {
    const now = new Date();
    const year = now.getFullYear();
    const winterStart = new Date(this.data.holidayDates.winterStart);
    const summerStart = new Date(this.data.holidayDates.summerStart);
    
    let targetDate;
    let holidayType;
    
    if (now < winterStart) {
      targetDate = winterStart;
      holidayType = '寒假';
    } else if (now < summerStart) {
      targetDate = summerStart;
      holidayType = '暑假';
    } else {
      // 如果当前日期超过今年暑假，则计算到下一年寒假的时间
      const nextYearWinter = new Date(year + 1 + '-01-15');
      targetDate = nextYearWinter;
      holidayType = '寒假';
    }
    
    const timeDiff = targetDate - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    this.setData({
      countdown: `距离${holidayType}还有 ${days}天${hours}小时${minutes}分钟`,
      holidayType: holidayType
    });
  }
});
