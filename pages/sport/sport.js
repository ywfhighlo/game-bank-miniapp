const app = getApp();

Page({
  data: {
    duration: ''
  },
  onInput(e) {
    this.setData({ duration: e.detail.value });
  },
  submitSportRecord() {
    const duration = parseInt(this.data.duration);
    if (!duration || duration <= 0) {
      wx.showToast({
        title: '请输入有效的运动时长',
        icon: 'none'
      });
      return;
    }
    // 将运动时长兑换为游戏时间（假设1:1兑换）
    app.globalData.gameTimeBalance += duration;
    
    // 保存当前的运动记录到全局变量中
    const now = new Date();
    const record = {
      type: '运动',
      duration: duration,
      time: now.toLocaleString()
    };
    if (!app.globalData.sportRecords) {
      app.globalData.sportRecords = [];
    }
    app.globalData.sportRecords.push(record);
    
    wx.showToast({
      title: `记录成功，增加 ${duration} 分钟游戏时间`,
      icon: 'success'
    });
    // 重置输入框
    this.setData({ duration: '' });
  }
}); 