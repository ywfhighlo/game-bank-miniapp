const app = getApp();

Page({
  data: {
    duration: '',            // 用户输入的运动时长（分钟）
    pendingRecord: null,     // 保存待验证记录（例如：{ duration: 10, recordId: 'xxx' }）
    verificationCode: '',    // 用户输入的验证码
    message: '',            // 用于页面下方显示提示信息
    showVerification: false,  // 是否显示验证码输入界面
    touchStartX: 0,
    touchStartY: 0,
    isSliding: false,
    slideClass: ''
  },
  // 页面加载时检查用户登录状态
  onLoad() {
    // 尝试从全局变量和本地缓存中读取 userId
    const userId = app.globalData.userId || wx.getStorageSync('userId');
    console.log("运动页面加载时获取的 userId:", userId);
    if (!userId) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      // 跳转到登录页面
      wx.navigateTo({
        url: '/pages/login/login'
      });
    }
  },
  onShow() {
    const app = getApp();
    const userId = app.globalData.userId || wx.getStorageSync('userId');
    console.log("运动页面 onShow 时获取的 userId:", userId);
  },
  // 记录输入时长，清空提示信息
  onInput(e) {
    this.setData({ 
      duration: e.detail.value,
      message: ''
    });
  },
  // 提交运动记录
  submitSportRecord() {
    const app = getApp();
    const userId = app.globalData.userId || wx.getStorageSync('userId');
    
    if (!userId) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      });
      // 延迟跳转到登录页面
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/login/login'
        });
      }, 1500);
      return;
    }

    const duration = parseInt(this.data.duration);
    if (!duration || duration <= 0) {
      wx.showToast({
        title: '请输入运动时长',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '提交中...',
      mask: true
    });

    const token = app.globalData.token || wx.getStorageSync('token');
    const record = {
      duration: this.data.duration,
      time: new Date().toLocaleString()
    };

    wx.cloud.callFunction({
      name: 'api',
      data: {
        action: 'createRecord',
        userId: userId,
        token: token,
        duration: record.duration
      },
      success: res => {
        wx.hideLoading();
        console.log('提交运动记录结果：', res);
        if (res.result.code === 200) {
          const { recordId, verificationCode } = res.result.data;
          console.log('获取到的记录ID:', recordId);
          console.log('获取到的验证码:', verificationCode);
          
          // 保存记录ID和验证码
          this.setData({
            pendingRecord: { 
              duration,
              recordId,
              verificationCode  // 在测试环境中，我们直接显示验证码
            },
            message: `记录提交成功，验证码：${verificationCode}`,
            showVerification: true  // 显示验证码输入界面
          });

          // 提示用户
          wx.showModal({
            title: '提交成功',
            content: '请输入验证码以完成运动记录验证',
            showCancel: false,
            success: () => {
              // 用户点击确定后，聚焦到验证码输入框
              this.setData({
                showVerification: true
              });
            }
          });
        } else {
          this.setData({ 
            message: res.result.message,
            showVerification: false
          });
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error('提交运动记录失败：', err);
        this.setData({ 
          message: '记录提交失败',
          showVerification: false
        });
      }
    });
  },
  // 记录验证码输入，同时清空提示消息
  onInputVerification(e) {
    this.setData({
      verificationCode: e.detail.value,
      message: ''
    });
  },
  // 确认验证码，验证成功则增加游戏时间，并更新提示信息显示
  confirmRecord() {
    const app = getApp();
    const userId = app.globalData.userId || wx.getStorageSync('userId');
    
    if (!this.data.pendingRecord || !this.data.pendingRecord.recordId) {
      this.setData({ message: '没有待验证的记录' });
      return;
    }

    if (!this.data.verificationCode) {
      this.setData({ message: '请输入验证码' });
      return;
    }

    wx.showLoading({
      title: '验证中...',
      mask: true
    });

    wx.cloud.callFunction({
      name: 'api',
      data: {
        action: 'verifyRecord',
        userId: userId,
        recordId: this.data.pendingRecord.recordId,
        code: this.data.verificationCode
      },
      success: res => {
        wx.hideLoading();
        console.log('验证结果：', res);
        
        if (res.result.code === 200) {
          // 验证成功
          const gameTime = res.result.data.gameTime;
          wx.showModal({
            title: '验证成功',
            content: `恭喜获得${gameTime}分钟游戏时间！`,
            showCancel: false,
            success: () => {
              // 清空表单
              this.setData({
                duration: '',
                pendingRecord: null,
                verificationCode: '',
                message: '',
                showVerification: false
              });
              
              // 返回首页
              wx.switchTab({
                url: '/pages/index/index'
              });
            }
          });
        } else {
          this.setData({
            message: res.result.message || '验证失败'
          });
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error('验证失败：', err);
        this.setData({
          message: '验证失败，请重试'
        });
      }
    });
  },
  // 触摸开始事件
  touchStart(e) {
    if (this.data.isSliding) return;
    
    this.setData({
      touchStartX: e.touches[0].clientX,
      touchStartY: e.touches[0].clientY
    });
  },

  // 触摸移动事件
  touchMove(e) {
    if (this.data.isSliding) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const deltaX = touchEndX - this.data.touchStartX;
    const deltaY = touchEndY - this.data.touchStartY;

    // 判断是水平滑动还是垂直滑动
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // 水平滑动
      if (Math.abs(deltaX) > 50) { // 滑动距离超过50才触发
        if (deltaX > 0) {
          // 右滑，返回主页
          this.setData({
            isSliding: true,
            slideClass: 'slide-right-animation'
          });
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/index/index'
            });
          }, 300);
        } else {
          // 左滑，返回上一页
          this.setData({
            isSliding: true,
            slideClass: 'slide-left-animation'
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 300);
        }
      }
    }
  },

  // 触摸结束事件
  touchEnd() {
    if (!this.data.isSliding) {
      this.setData({
        touchStartX: 0,
        touchStartY: 0
      });
    }
  },
}); 