// 登录页面的 JS
Page({
  data: {
    username: "",
    password: ""
  },
  
  // 用户授权后保存信息并跳转到首页
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 必填字段，解释获取用户信息的用途
      success: (res) => {
        const userInfo = res.userInfo;
        // 保存用户信息到本地缓存及全局数据中
        wx.setStorageSync('userInfo', userInfo);
        getApp().globalData.userInfo = userInfo;
        wx.redirectTo({
          url: '/pages/index/index'
        });
      },
      fail: () => {
        wx.showToast({
          title: '授权失败，请重试',
          icon: 'none'
        });
      }
    });
  },

  // 示例：登录成功后调用后端登录接口，获取 token 并保存到全局数据
  bindUsernameInput(e) {
    this.setData({ username: e.detail.value });
  },
  bindPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },
  login() {
    const app = getApp();
    wx.cloud.callFunction({
      name: 'api', // 云函数名称
      data: {
        action: 'login',
        username: this.data.username,
        password: this.data.password
      },
      success: res => {
        console.log('登录返回结果:', res);
        if (res.result.code === 200) {
          // 保存 userId 在全局变量中
          app.globalData.userId = res.result.userId;
          console.log("登录后全局 userId:", app.globalData.userId);
          getApp().globalData.token = res.result.token;
          wx.showToast({ title: '登录成功', icon: 'success' });
        } else {
          wx.showToast({ title: res.result.message, icon: 'none' });
        }
      },
      fail: err => {
        wx.showToast({ title: '登录接口调用失败', icon: 'none' });
      }
    });
  }
}); 