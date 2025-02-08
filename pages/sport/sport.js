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
    // 记录运动成功后，将运动时长（单位：分钟）兑换为游戏时间，假设1:1兑换
    app.globalData.gameTimeBalance += duration;
    
    wx.showToast({
      title: `记录成功，增加 ${duration} 分钟游戏时间`,
      icon: 'success'
    });
    // 重置输入框
    this.setData({ duration: '' });
  }
}); 