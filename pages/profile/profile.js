const app = getApp()

Page({
  data: {
    userInfo: null,
    helperPhone: '',
    maskedHelperPhone: '',
    showPhoneInput: false,
    newHelperPhone: '',
    userId: ''
  },

  onLoad() {
    console.log('Profile page onLoad');
    // 从本地存储获取用户数据
    const userInfo = wx.getStorageSync('userInfo');
    const userData = wx.getStorageSync('userData');
    
    console.log('Storage userInfo:', userInfo);
    console.log('Storage userData:', userData);
    
    // 设置用户信息
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      });
    }
    
    // 设置用户数据
    if (userData && userData.userId) {  // 确保userId存在
      this.setData({
        userId: userData.userId,
        helperPhone: userData.helperPhone || '',
        maskedHelperPhone: this.maskPhoneNumber(userData.helperPhone)
      });
    }

    // 检查全局数据
    console.log('Global data:', app.globalData);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    }
    
    // 如果全局数据中有userId，确保页面数据同步
    if (app.globalData.userId) {
      this.setData({
        userId: app.globalData.userId
      });
    }
  },

  onShow() {
    console.log('Profile page onShow');
    // 每次显示页面时刷新数据
    if (app.globalData.userId) {
      this.loadUserData();
    } else {
      console.log('用户未登录，跳过数据加载');
    }
  },

  // 从云端获取最新的用户数据
  loadUserData() {
    if (!app.globalData.userId) {
      console.log('用户未登录，跳过加载数据');
      return;
    }

    wx.cloud.callFunction({
      name: 'api',
      data: {
        action: 'getUserProfile',
        userId: app.globalData.userId
      },
      success: res => {
        console.log('获取用户资料成功：', res);
        if (res.result.code === 200) {
          const data = res.result.data;
          const helperPhone = data.helperPhone || '';
          
          this.setData({
            helperPhone: helperPhone,
            maskedHelperPhone: this.maskPhoneNumber(helperPhone),
            showPhoneInput: !helperPhone // 如果没有手机号，显示输入框
          });

          // 更新本地存储
          const userData = wx.getStorageSync('userData') || {};
          userData.helperPhone = helperPhone;
          wx.setStorageSync('userData', userData);
        }
      },
      fail: err => {
        console.error('获取用户资料失败：', err);
        wx.showToast({
          title: '获取资料失败',
          icon: 'none'
        });
      }
    });
  },

  // 显示手机号输入框
  showPhoneInput() {
    this.setData({
      showPhoneInput: true,
      newHelperPhone: this.data.helperPhone
    });
  },

  // 隐藏手机号输入框
  hidePhoneInput() {
    this.setData({
      showPhoneInput: false,
      newHelperPhone: ''
    });
  },

  // 更新手机号
  updateHelperPhone() {
    const phone = this.data.newHelperPhone;
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }

    // 获取全局的 userId
    const userId = app.globalData.userId;
    if (!userId) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }

    wx.cloud.callFunction({
      name: 'api',
      data: {
        action: 'updateHelperPhone',
        userId: userId,
        helperPhone: phone
      },
      success: res => {
        console.log('更新手机号结果：', res);
        if (res.result.code === 200) {
          wx.showToast({
            title: '更新成功',
            icon: 'success'
          });
          
          // 更新页面数据
          this.setData({
            helperPhone: phone,
            maskedHelperPhone: this.maskPhoneNumber(phone),
            showPhoneInput: false
          });

          // 更新全局数据
          app.globalData.helperPhone = phone;

          // 更新本地存储
          const userData = wx.getStorageSync('userData') || {};
          userData.helperPhone = phone;
          wx.setStorageSync('userData', userData);
        } else {
          wx.showToast({
            title: res.result.message || '更新失败',
            icon: 'none'
          });
        }
      },
      fail: err => {
        console.error('更新手机号失败：', err);
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        });
      }
    });
  },

  // 手机号输入处理
  onPhoneInput(e) {
    this.setData({
      newHelperPhone: e.detail.value
    });
  },

  // 手机号码脱敏处理
  maskPhoneNumber(phone) {
    if (!phone) return '未设置';
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  },

  // 获取用户信息
  onGetUserInfo() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        console.log('获取用户信息成功：', res);
        const userInfo = res.userInfo;
        app.globalData.userInfo = userInfo;
        
        this.setData({
          userInfo: userInfo
        });
        
        // 保存用户信息到本地存储
        wx.setStorageSync('userInfo', userInfo);
        
        // 获取用户openid并生成userId
        wx.cloud.callFunction({
          name: 'api',
          data: {
            action: 'login'
          },
          success: res => {
            console.log('登录结果：', res);
            if (res.result.code === 200) {
              const userId = res.result.data.userId;
              app.globalData.userId = userId;
              wx.setStorageSync('userId', userId);

              // 更新全局数据
              app.globalData.gameTime = res.result.data.gameTime;
              app.globalData.sportRecords = res.result.data.sportRecords;
              app.globalData.gameRecords = res.result.data.gameRecords;
              app.globalData.dailyLimit = res.result.data.dailyLimit;
              app.globalData.weeklyLimit = res.result.data.weeklyLimit;
              app.globalData.restInterval = res.result.data.restInterval;
              app.globalData.restDuration = res.result.data.restDuration;
              app.globalData.helperPhone = res.result.data.helperPhone;
              
              // 保存到本地存储
              wx.setStorageSync('userData', {
                userId: userId,
                gameTime: res.result.data.gameTime,
                sportRecords: res.result.data.sportRecords,
                gameRecords: res.result.data.gameRecords,
                dailyLimit: res.result.data.dailyLimit,
                weeklyLimit: res.result.data.weeklyLimit,
                restInterval: res.result.data.restInterval,
                restDuration: res.result.data.restDuration,
                helperPhone: res.result.data.helperPhone
              });
              
              // 显示登录成功提示
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1500,
                success: () => {
                  // 延迟跳转，让用户看到成功提示
                  setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/index/index'
                    });
                  }, 1500);
                }
              });
            } else {
              wx.showToast({
                title: res.result.message || '登录失败',
                icon: 'none'
              });
            }
          },
          fail: err => {
            console.error('登录失败：', err);
            wx.showToast({
              title: '登录失败',
              icon: 'none'
            });
          }
        });
      },
      fail: (err) => {
        console.error('获取用户信息失败：', err);
        wx.showToast({
          title: '请授权用户信息',
          icon: 'none'
        });
      }
    });
  },

  // 发送测试短信
  sendTestSMS() {
    if (!this.data.helperPhone) {
      wx.showToast({
        title: '请先设置手机号',
        icon: 'none'
      });
      return;
    }

    wx.cloud.callFunction({
      name: 'api',
      data: {
        action: 'sendTestSMS',
        helperPhone: this.data.helperPhone
      },
      success: res => {
        if (res.result.code === 200) {
          wx.showToast({
            title: '发送成功',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: res.result.message || '发送失败',
            icon: 'none'
          });
        }
      },
      fail: err => {
        console.error('发送测试短信失败：', err);
        wx.showToast({
          title: '发送失败',
          icon: 'none'
        });
      }
    });
  },

  // 跳转到设置页面
  navigateToSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  }
});