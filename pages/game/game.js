const app = getApp()

Page({
  data: {
    gameTimeBalance: 0,   // 游戏剩余时间（单位：分钟）
    elapsedTime: 0,       // 本次游戏已计时秒数
    timer: null,          // 定时器句柄
    gameStarted: false    // 游戏是否正在运行
  },
  onLoad() {
    // 从全局数据中获取游戏时间余额
    this.setData({
      gameTimeBalance: app.globalData.gameTimeBalance
    });
  },
  startGame() {
    if (this.data.gameStarted) {
      // 游戏正在运行，点击则结束游戏
      clearInterval(this.data.timer);
      // 已计时秒数按分钟向上取整作为扣除时间
      let usedMinutes = Math.ceil(this.data.elapsedTime / 60);
      let newBalance = app.globalData.gameTimeBalance - usedMinutes;
      if (newBalance < 0) {
        newBalance = 0;
      }
      app.globalData.gameTimeBalance = newBalance;
      wx.showToast({
        title: `游戏结束，使用了 ${usedMinutes} 分钟`,
        icon: 'none'
      });
      this.setData({
        gameStarted: false,
        timer: null,
        elapsedTime: 0,
        gameTimeBalance: newBalance
      });
    } else {
      // 如果没有可用时间，提示不能开始游戏
      if (app.globalData.gameTimeBalance <= 0) {
        wx.showToast({
          title: "游戏时间不足",
          icon: "none"
        });
        return;
      }
      wx.showToast({
        title: '游戏开始',
        icon: 'success'
      });
      // 开始游戏计时，并每秒更新
      const timer = setInterval(() => {
        this.setData({
          elapsedTime: this.data.elapsedTime + 1
        });
        // 自动结束：当已用秒数达到可用游戏时间（转换为秒）时
        let availableSeconds = app.globalData.gameTimeBalance * 60;
        if (this.data.elapsedTime >= availableSeconds) {
          clearInterval(this.data.timer);
          // 此时扣除所有剩余的游戏时间
          wx.showToast({
            title: '游戏时间已用完',
            icon: 'none'
          });
          app.globalData.gameTimeBalance = 0;
          this.setData({
            gameStarted: false,
            timer: null,
            elapsedTime: 0,
            gameTimeBalance: 0
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