Page({
  data: {
    duration: ''
  },
  onInput(e) {
    this.setData({ duration: e.detail.value });
  },
  submitSportRecord() {
    if (!this.data.duration) {
      wx.showToast({
        title: '请输入运动时长',
        icon: 'none'
      });
      return;
    }
    // 此处可添加调用接口记录运动数据的逻辑
    wx.showToast({
      title: '记录成功',
      icon: 'success'
    });
    // 重置输入框
    this.setData({ duration: '' });
  }
}); 