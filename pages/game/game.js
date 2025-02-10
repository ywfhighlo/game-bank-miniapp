const app = getApp()

Page({
  data: {
    gameTimeBalance: 0,   // 当前剩余游戏余额（单位：分钟）
    elapsedTime: 0,       // 本次游戏已计时秒数
    timer: null,          // 定时器句柄
    gameStarted: false,   // 游戏是否正在进行
    message: ''           // 游戏页提示信息
  },
  onLoad() {
    // 根据是否已登录，展示相应的数据（未登录则为初始的临时数据）
    this.setData({
      gameTimeBalance: app.globalData.gameTimeBalance || 0
    });
  },
  startGame() {
    if (this.data.gameStarted) {
      // 游戏进行时，点击按钮结束游戏
      clearInterval(this.data.timer);
      const usedMinutes = Math.ceil(this.data.elapsedTime / 60);
      let newBalance = Number(app.globalData.gameTimeBalance) - usedMinutes;
      if (newBalance < 0) {
        newBalance = 0;
      }
      // 记录游戏记录（手动结束）
      const now = new Date().toLocaleString();
      const record = {
        type: '游戏',
        duration: usedMinutes,
        time: now,
        mode: '手动结束'
      };
      if (!app.globalData.gameRecords) {
        app.globalData.gameRecords = [];
      }
      app.globalData.gameRecords.push(record);
      
      // 只有登录后才持久化数据
      if (app.globalData.userInfo) {
        wx.setStorageSync('gameTimeBalance', newBalance);
      }
      
      app.globalData.gameTimeBalance = newBalance;
      
      this.setData({
        gameStarted: false,
        timer: null,
        elapsedTime: 0,
        gameTimeBalance: newBalance,
        message: `游戏结束，扣除 ${usedMinutes} 分钟`
      });
    } else {
      // 游戏开始前判断余额是否充足
      if (Number(app.globalData.gameTimeBalance) <= 0) {
        this.setData({
          message: '游戏时间不足'
        });
        return;
      }
      // 游戏开始提示
      this.setData({
        message: '游戏开始'
      });
      const timer = setInterval(() => {
        this.setData({
          elapsedTime: this.data.elapsedTime + 1
        });
        let availableSeconds = Number(app.globalData.gameTimeBalance) * 60;
        if (this.data.elapsedTime >= availableSeconds) {
          clearInterval(timer);
          const now = new Date().toLocaleString();
          const record = {
            type: '游戏',
            duration: app.globalData.gameTimeBalance,
            time: now,
            mode: '自动结束'
          };
          if (!app.globalData.gameRecords) {
            app.globalData.gameRecords = [];
          }
          app.globalData.gameRecords.push(record);
          // 仅在登录状态下持久化更新
          if (app.globalData.userInfo) {
            wx.setStorageSync('gameTimeBalance', 0);
          }
          app.globalData.gameTimeBalance = 0;
          this.setData({
            gameStarted: false,
            timer: null,
            elapsedTime: 0,
            gameTimeBalance: 0,
            message: '游戏时间已用完'
          });
        }
      }, 1000);
      this.setData({
        timer: timer,
        gameStarted: true
      });
    }
  }
}); 