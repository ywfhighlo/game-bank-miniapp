const app = getApp()

Page({
  data: {
    gameTimeBalance: 0,   // 当前剩余游戏余额（单位：分钟）
    elapsedTime: 0,       // 本次游戏已计时秒数
    timer: null,          // 定时器句柄
    gameStarted: false,   // 游戏是否正在进行
    message: '',          // 游戏页提示信息
    gameRecords: [],       // 游戏记录
    touchStartX: 0,
    touchStartY: 0,
    isSliding: false,
    slideClass: ''
  },

  onLoad() {
    console.log('Game page onLoad');
    this.loadUserData();
  },

  onShow() {
    console.log('Game page onShow');
    // 每次显示页面时重新加载数据
    this.loadUserData();
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
        console.log('获取用户数据成功：', res.result);
        if (res.result.code === 200) {
          const data = res.result.data;
          console.log('获取到的数据：', data);
          
          // 更新全局数据
          app.globalData.gameTimeBalance = data.gameTimeBalance;
          app.globalData.gameRecords = data.gameRecords || [];

          // 更新页面数据
          const pageData = {
            gameTimeBalance: data.gameTimeBalance || 0,
            gameRecords: data.gameRecords || []
          };
          
          console.log('准备更新页面数据：', pageData);
          this.setData(pageData);
          console.log('页面数据更新完成');

          // 保存到本地存储
          const userData = wx.getStorageSync('userData') || {};
          wx.setStorageSync('userData', {
            ...userData,
            gameTimeBalance: data.gameTimeBalance || 0,
            gameRecords: data.gameRecords || []
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
  },

  // 触摸开始事件
  touchStart(e) {
    if (this.data.isSliding) return;
    
    this.setData({
      touchStartX: e.touches[0].clientX,
      touchStartY: e.touches[0].clientY
    });
  },

  // 触摸移动事件
  touchMove(e) {
    if (this.data.isSliding) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const deltaX = touchEndX - this.data.touchStartX;
    const deltaY = touchEndY - this.data.touchStartY;

    // 判断是水平滑动还是垂直滑动
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // 水平滑动
      if (Math.abs(deltaX) > 50) { // 滑动距离超过50才触发
        if (deltaX > 0) {
          // 右滑，返回主页
          this.setData({
            isSliding: true,
            slideClass: 'slide-right-animation'
          });
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/index/index'
            });
          }, 300);
        } else {
          // 左滑，返回上一页
          this.setData({
            isSliding: true,
            slideClass: 'slide-left-animation'
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 300);
        }
      }
    }
  },

  // 触摸结束事件
  touchEnd() {
    if (!this.data.isSliding) {
      this.setData({
        touchStartX: 0,
        touchStartY: 0
      });
    }
  }
});