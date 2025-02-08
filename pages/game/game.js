const app = getApp()

Page({
  data: {
    gameTimeBalance: 0
  },
  onLoad() {
    // 从全局数据中获取游戏时间余额
    this.setData({
      gameTimeBalance: app.globalData.gameTimeBalance
    });
  },
  startGame() {
    wx.showToast({
      title: '游戏开始',
      icon: 'success'
    });
    // 实际逻辑待完善：启动游戏计时、休息提醒等
  }
}); 