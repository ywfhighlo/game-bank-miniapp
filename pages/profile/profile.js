const app = getApp();

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user: {},
    helperPhone: '',
    maskedPhone: '',
    message: ''
  },
  onLoad() {
    // 检查全局状态中是否已有用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    }
    // 从本地缓存中获取用户信息
    const user = wx.getStorageSync('userInfo');
    if (user) {
      this.setData({ user });
    }
    // 尝试从持久化存储中加载帮手手机号，确保退出登录后再次登录时能恢复数据
    let phone = wx.getStorageSync('helperPhone') || '';
    let masked = phone ? phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '';
    this.setData({
      helperPhone: phone,
      maskedPhone: masked
    });
  },
  onLogin() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: res => {
        // 更新全局状态
        app.globalData.userInfo = res.userInfo;
        // 保存到本地存储
        wx.setStorageSync('userInfo', res.userInfo);
        
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });

        // 更新首页数据
        const pages = getCurrentPages();
        const indexPage = pages.find(page => page.route === 'pages/index/index');
        if (indexPage) {
          indexPage.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }

        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
      },
      fail: err => {
        console.error('登录失败', err);
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  },
  logout() {
    app.globalData.userInfo = null;  // 清除全局登录信息
    wx.removeStorageSync('userInfo');  // 移除本地缓存的用户信息

    this.setData({
      message: '已退出登录'
    });

    wx.showToast({
      title: '已退出登录',
      icon: 'success'
    });

    // 延迟后使用 wx.reLaunch 跳转主页，使首页刷新并显示未登录状态
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/index/index'
      });
    }, 1500);
  },
  onInputHelper(e) {
    this.setData({
      helperPhone: e.detail.value
    });
  },
  saveHelperPhone() {
    const phone = this.data.helperPhone;
    if (!phone || phone.length !== 11) {
      this.setData({
        message: '请输入有效手机号'
      });
      return;
    }
    const maskedPhone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    // 保存帮手手机号到全局以及持久化存储（如果用户已登录，则写入，否则仅更新全局数据）
    app.globalData.helperPhone = phone;
    if (app.globalData.userInfo) {
      wx.setStorageSync('helperPhone', phone);
    }
    this.setData({
      maskedPhone: maskedPhone,
      message: '帮手手机号已保存'
    });
  },
  sendTestSMS() {
    const phone = this.data.helperPhone;
    if (!phone) {
      wx.showToast({
        title: '请先设置帮手手机号码',
        icon: 'none'
      });
      return;
    }
    // 调用云函数发送短信
    wx.cloud.callFunction({
      name: 'sendHelperSMS',
      data: {
        phone: phone,
        message: '这是测试短信，您的短信发送功能正常。'
      },
      success: res => {
        console.log('短信发送成功', res);
        wx.showToast({
          title: '测试短信已发送',
          icon: 'success'
        });
      },
      fail: err => {
        console.error('短信发送失败', err);
        wx.showToast({
          title: '短信发送失败',
          icon: 'none'
        });
      }
    });
  },
  navigateToSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  }
}); 