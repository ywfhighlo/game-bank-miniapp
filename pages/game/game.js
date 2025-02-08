const app = getApp()

Page({
  data: {
    gameTimeBalance: 0,   // 游戏余额（单位：分钟）
    elapsedTime: 0,       // 本次游戏已计时秒数
    timer: null,          // 定时器句柄
    gameStarted: false    // 游戏是否正在运行
  },
  onLoad() {
    // 从全局数据中获取最新游戏时间余额
    this.setData({
      gameTimeBalance: app.globalData.gameTimeBalance || 0
    });
  },
  startGame() {
    if (this.data.gameStarted) {
      // 游戏正在运行，点击则手动结束游戏
      clearInterval(this.data.timer);
      // 将已计秒数转换为分钟（向上取整）
      const usedMinutes = Math.ceil(this.data.elapsedTime / 60);
      let newBalance = app.globalData.gameTimeBalance - usedMinutes;
      if (newBalance < 0) {
        newBalance = 0;
      }
      // 记录本次游戏记录，标识手动结束
      const now = new Date();
      const record = {
        type: '游戏',
        duration: usedMinutes,       // 本次扣除的游戏时长
        time: now.toLocaleString(),  // 记录时间
        mode: '手动结束'
      };
      if (!app.globalData.gameRecords) {
        app.globalData.gameRecords = [];
      }
      app.globalData.gameRecords.push(record);
      
      // 更新全局余额
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
      // 如果没有足够游戏时间，提示
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
      // 启动计时器，每秒累计已运行的秒数
      const timer = setInterval(() => {
        this.setData({
          elapsedTime: this.data.elapsedTime + 1
        });
        // 自动结束：当累计的秒数达到或超过可用游戏时间转换的秒数
        let availableSeconds = app.globalData.gameTimeBalance * 60;
        if (this.data.elapsedTime >= availableSeconds) {
          clearInterval(this.data.timer);
          const now = new Date();
          // 本次游戏使用了所有剩余的游戏时间
          const record = {
            type: '游戏',
            duration: app.globalData.gameTimeBalance,
            time: now.toLocaleString(),
            mode: '自动结束'
          };
          if (!app.globalData.gameRecords) {
            app.globalData.gameRecords = [];
          }
          app.globalData.gameRecords.push(record);
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