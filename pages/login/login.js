// 登录页面的 JS
Page({
  data: {
    // 如果采用微信授权登录，不需要传统的用户名、密码输入框
    // 你可以将输入框隐藏或取消绑定
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

  // 改为微信授权登录函数
  login() {
    console.log("点击了微信登录按钮");
    
    // 获取微信登录凭证
    wx.login({
      success: res => {
        console.log("wx.login 返回的 code:", res.code);
        if (res.code) {
          // 调用云函数进行微信登录，将 code 传过去，由云函数用 code 获取 openid 或其他信息
          wx.cloud.callFunction({
            name: 'api',
            data: {
              action: 'wxLogin',
              code: res.code
            },
            success: result => {
              console.log('微信登录成功，返回结果：', result);
              if (result.result.code === 200) {
                const userId = result.result.userId;
                const app = getApp();
                app.globalData.userId = userId;
                wx.setStorageSync('userId', userId);
                console.log("登录成功后保存的 userId:", userId);
                wx.showToast({ title: '登录成功', icon: 'success' });
                wx.switchTab({ url: '/pages/sport/sport' });
              }
            },
            fail: err => {
              console.error("调用 wxLogin 云函数失败：", err);
            }
          });
        } else {
          console.error("wx.login 获取 code 失败", res);
          wx.showToast({ title: '微信登录失败', icon: 'none' });
        }
      },
      fail: err => {
        console.error("wx.login 调用失败：", err);
        wx.showToast({ title: '微信登录接口调用失败', icon: 'none' });
      }
    });
  }
}); 