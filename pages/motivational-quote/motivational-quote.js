const quotes = [
  { content: "今天的努力是为了明天更好的自己", category: "励志" },
  { content: "运动让生活更精彩", category: "运动" },
  { content: "坚持就是胜利", category: "学习" },
  { content: "每一个梦想都值得追求", category: "梦想" },
  { content: "成功不是偶然，而是积累", category: "励志" },
  // ... 可以继续添加更多金句
];

Page({
  data: {
    currentDate: '',
    currentWeekday: '',
    currentQuote: {},
    showFullscreen: false,
    animation: {},
    quoteIndex: 0
  },

  onLoad() {
    // 初始化日期和星期
    this.updateDateTime();
    // 每天更新一次金句
    this.updateQuote();
  },

  updateDateTime() {
    const now = new Date();
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    
    this.setData({
      currentDate: now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' }),
      currentWeekday: weekdays[now.getDay()]
    });
  },

  updateQuote() {
    // 根据日期生成随机但固定的索引
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % quotes.length;
    
    this.setData({
      currentQuote: quotes[index],
      quoteIndex: index
    });
  },

  // 左右滑动切换金句
  onSwipeLeft() {
    const nextIndex = (this.data.quoteIndex + 1) % quotes.length;
    this.animateQuote('left', nextIndex);
  },

  onSwipeRight() {
    const nextIndex = (this.data.quoteIndex - 1 + quotes.length) % quotes.length;
    this.animateQuote('right', nextIndex);
  },

  animateQuote(direction, nextIndex) {
    const animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease'
    });

    // 向左或向右滑出
    animation.translateX(direction === 'left' ? '-100%' : '100%').opacity(0).step();
    this.setData({
      animation: animation.export()
    });

    setTimeout(() => {
      // 重置位置并更新内容
      animation.translateX(0).opacity(1).step({ duration: 0 });
      this.setData({
        currentQuote: quotes[nextIndex],
        quoteIndex: nextIndex,
        animation: animation.export()
      });
    }, 300);
  },

  // 点击放大查看
  toggleFullscreen() {
    this.setData({
      showFullscreen: !this.data.showFullscreen
    });
  },

  // 长按保存图片
  async onLongPress() {
    try {
      // 获取canvas上下文
      const query = wx.createSelectorQuery();
      query.select('#quoteCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          
          // 绘制卡片背景
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // 绘制日期和金句
          ctx.fillStyle = '#333333';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText(this.data.currentDate, 20, 40);
          
          // 绘制金句内容
          ctx.font = '20px sans-serif';
          ctx.fillText(this.data.currentQuote.content, 20, 80);
          
          // 将canvas转换为图片
          wx.canvasToTempFilePath({
            canvas: canvas,
            success: (res) => {
              // 保存图片到相册
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: () => {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success'
                  });
                },
                fail: () => {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'error'
                  });
                }
              });
            }
          });
        });
    } catch (error) {
      wx.showToast({
        title: '保存失败',
        icon: 'error'
      });
    }
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: this.data.currentQuote.content,
      path: '/pages/motivational-quote/motivational-quote'
    };
  },

  onShareTimeline() {
    return {
      title: this.data.currentQuote.content
    };
  }
}); 