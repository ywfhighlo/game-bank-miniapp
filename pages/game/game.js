const app = getApp()

Page({
  data: {
    gameTimeBalance: 0,   // 当前剩余游戏余额（单位：分钟）
    elapsedTime: 0,       // 本次游戏已计时秒数
    timer: null,          // 定时器句柄
    gameStarted: false,   // 游戏是否正在进行
    message: '',          // 游戏页提示信息
    gameRecords: []       // 游戏记录
  },

  // 从云端获取最新的用户数据
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
          app.globalData.gameTime = data.gameTime || 0;
          app.globalData.gameRecords = data.gameRecords || [];

          // 更新页面数据
          this.setData({
            gameTimeBalance: data.gameTime || 0,
            gameRecords: data.gameRecords || []
          });

          // 保存到本地存储
          wx.setStorageSync('userData', {
            ...wx.getStorageSync('userData'),
            gameTime: data.gameTime || 0,
            gameRecords: data.gameRecords || []
          });
        } else {
          console.error('获取用户数据失败：', res.result.message);
        }
      },
      fail: err => {
        console.error('调用获取用户数据失败：', err);
      }
    });
  },

  onLoad() {
    this.loadUserData();
  },

  onShow() {
    // 每次显示页面时都刷新数据
    this.loadUserData();
  },

  startGame() {
    if (this.data.gameStarted) {
      // 游戏进行时，点击按钮结束游戏
      clearInterval(this.data.timer);
      const usedSeconds = this.data.elapsedTime;
      
      // 更新用户游戏时间
      if (app.globalData.userId) {
        wx.showLoading({
          title: '保存中...',
          mask: true
        });

        wx.cloud.callFunction({
          name: 'api',
          data: {
            action: 'updateGameTime',
            userId: app.globalData.userId,
            duration: usedSeconds,
            mode: '手动结束'
          },
          success: res => {
            wx.hideLoading();
            console.log('更新游戏时间成功：', res);
            if (res.result.code === 200) {
              // 重新加载数据以显示最新状态
              this.loadUserData();
              const consumedMinutes = res.result.data.consumedTime;
              this.setData({
                message: `游戏结束，消耗 ${consumedMinutes} 分钟`
              });
            } else {
              wx.showToast({
                title: res.result.message || '保存失败',
                icon: 'none'
              });
            }
          },
          fail: err => {
            wx.hideLoading();
            console.error('更新游戏时间失败：', err);
            wx.showToast({
              title: '保存失败',
              icon: 'none'
            });
          }
        });
      }

      this.setData({
        gameStarted: false,
        timer: null,
        elapsedTime: 0
      });

    } else {
      // 游戏未开始时，点击按钮开始游戏
      if (this.data.gameTimeBalance <= 0) {
        wx.showToast({
          title: '游戏时间不足，请先运动获取游戏时间',
          icon: 'none'
        });
        return;
      }

      this.setData({
        gameStarted: true,
        message: '游戏开始！'
      });

      // 启动定时器，每秒更新计时
      const timer = setInterval(() => {
        let time = this.data.elapsedTime + 1;
        this.setData({
          elapsedTime: time,
          message: `游戏进行中：${Math.floor(time / 60)}分${time % 60}秒`
        });

        // 检查是否超过可用时间
        if (time >= this.data.gameTimeBalance * 60) {
          clearInterval(timer);
          
          // 更新游戏时间
          if (app.globalData.userId) {
            wx.showLoading({
              title: '保存中...',
              mask: true
            });

            wx.cloud.callFunction({
              name: 'api',
              data: {
                action: 'updateGameTime',
                userId: app.globalData.userId,
                duration: time,
                mode: '自动结束'
              },
              success: res => {
                wx.hideLoading();
                console.log('更新游戏时间成功：', res);
                if (res.result.code === 200) {
                  // 重新加载数据以显示最新状态
                  this.loadUserData();
                } else {
                  wx.showToast({
                    title: res.result.message || '保存失败',
                    icon: 'none'
                  });
                }
              },
              fail: err => {
                wx.hideLoading();
                console.error('更新游戏时间失败：', err);
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                });
              }
            });
          }

          this.setData({
            gameStarted: false,
            timer: null,
            elapsedTime: 0,
            message: '游戏时间已用完'
          });
        }
      }, 1000);

      this.setData({
        timer
      });
    }
  }
});