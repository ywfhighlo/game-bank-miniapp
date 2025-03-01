// 登录页面的 JS
Page({
  data: {},
  
  // 微信授权登录函数
  login() {
    console.log("===== 开始登录流程 =====");
    
    // 获取用户信息
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (profileRes) => {
        console.log("1. 获取用户信息成功：", profileRes.userInfo);
        const userInfo = profileRes.userInfo;
        
        // 处理登录逻辑
        this.handleLogin(userInfo);
      },
      fail: (err) => {
        console.error("1. 获取用户信息失败：", err);
        wx.showToast({
          title: '需要您的授权才能继续使用',
          icon: 'none'
        });
      }
    });
  },
  
  // 处理登录逻辑
  handleLogin(userInfo) {
    wx.login({
      success: res => {
        console.log("2. 获取登录code成功：", res.code);
        if (res.code) {
          // 调用云函数登录
          wx.cloud.callFunction({
            name: 'api',
            data: {
              action: 'wxLogin',
              code: res.code,
              userInfo: userInfo
            },
            success: res => {
              console.log('3. 调用登录云函数成功：', res.result);
              if (res.result.code === 200) {
                const userData = res.result.data;
                
                // 更新全局数据
                const app = getApp();
                app.globalData.userInfo = userInfo;
                app.globalData.userId = userData.userId;
                app.globalData.sportTime = userData.sportTime || 0;
                app.globalData.gameTime = userData.gameTime || 0;
                app.globalData.sportRecords = userData.sportRecords || [];
                app.globalData.gameRecords = userData.gameRecords || [];
                app.globalData.helperPhone = userData.helperPhone || '';
                app.globalData.dailyLimit = userData.dailyLimit || 7200;
                app.globalData.weeklyLimit = userData.weeklyLimit || 36000;
                app.globalData.restInterval = userData.restInterval || 1800;
                app.globalData.restDuration = userData.restDuration || 300;

                // 保存到本地存储
                wx.setStorageSync('userInfo', userInfo);
                wx.setStorageSync('userId', userData.userId);
                wx.setStorageSync('userData', {
                  userId: userData.userId,
                  sportTime: userData.sportTime || 0,
                  gameTime: userData.gameTime || 0,
                  sportRecords: userData.sportRecords || [],
                  gameRecords: userData.gameRecords || [],
                  helperPhone: userData.helperPhone || '',
                  dailyLimit: userData.dailyLimit || 7200,
                  weeklyLimit: userData.weeklyLimit || 36000,
                  restInterval: userData.restInterval || 1800,
                  restDuration: userData.restDuration || 300
                });

                // 显示成功提示
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 1500
                });

                // 延迟跳转，让用户看到成功提示
                setTimeout(() => {
                  // 跳转到首页
                  wx.switchTab({
                    url: '/pages/index/index'
                  });
                }, 1500);
              } else {
                console.error('4. 登录失败：', res.result.message);
                wx.showToast({
                  title: res.result.message || '登录失败',
                  icon: 'none'
                });
              }
            },
            fail: err => {
              console.error('4. 调用登录云函数失败：', err);
              wx.showToast({
                title: '登录失败',
                icon: 'none'
              });
            }
          });
        } else {
          console.error('2. 获取登录code失败');
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      },
      fail: err => {
        console.error('2. 微信登录失败：', err);
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  }
});