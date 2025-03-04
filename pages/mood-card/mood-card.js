const moodTypes = [
  { type: 'happy', text: '开心', icon: '😊' },
  { type: 'calm', text: '平静', icon: '😌' },
  { type: 'sad', text: '难过', icon: '😢' },
  { type: 'angry', text: '生气', icon: '😠' },
  { type: 'excited', text: '兴奋', icon: '🤩' }
];

const cardStyles = [
  {
    name: '暖色系',
    colors: ['#FFE5E5', '#FFD4D4', '#FFDAB9'],
    textColor: '#333333'
  },
  {
    name: '冷色系',
    colors: ['#E5F1FF', '#E5E5FF', '#E6E6FA'],
    textColor: '#333333'
  },
  {
    name: '中性色系',
    colors: ['#FFFFFF', '#F5F5F5', '#EEEEEE'],
    textColor: '#333333'
  }
];

const { moods } = require('./moods.js');

Page({
  data: {
    moods: moods,
    currentMoodIndex: 0,
    currentDate: '',
    selectedMood: moodTypes[0],
    moodTypes,
    cardStyles,
    selectedStyle: cardStyles[0],
    content: '',
    showFullscreen: false,
    isPreview: false
  },

  onLoad() {
    // 随机选择一个初始心情
    const randomIndex = Math.floor(Math.random() * moods.length);
    this.setData({
      currentMoodIndex: randomIndex
    });

    // 初始化日期
    const now = new Date();
    const currentDate = now.toLocaleDateString('zh-CN', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    this.setData({
      currentDate
    });
  },

  onSwiperChange(e) {
    const { current } = e.detail;
    this.setData({
      currentMoodIndex: current
    });
  },

  onShareTap() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onSaveTap() {
    const currentMood = this.data.moods[this.data.currentMoodIndex];
    const now = new Date();
    const record = {
      timestamp: now.getTime(),
      date: now.toLocaleDateString('zh-CN'),
      time: now.toLocaleTimeString('zh-CN'),
      mood: currentMood
    };

    // 获取已有记录
    const records = wx.getStorageSync('moodRecords') || [];
    records.unshift(record);  // 添加到开头

    // 最多保存50条记录
    if (records.length > 50) {
      records.pop();
    }

    // 保存记录
    wx.setStorageSync('moodRecords', records);

    wx.showToast({
      title: '已保存心情',
      icon: 'success'
    });
  },

  onShareAppMessage() {
    const currentMood = this.data.moods[this.data.currentMoodIndex];
    return {
      title: `我现在感觉${currentMood.text}`,
      path: '/pages/mood-card/mood-card'
    };
  },

  onShareTimeline() {
    const currentMood = this.data.moods[this.data.currentMoodIndex];
    return {
      title: `我现在感觉${currentMood.text}`
    };
  },

  // 选择心情
  onMoodSelect(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      selectedMood: this.data.moodTypes[index]
    });
  },

  // 选择卡片样式
  onStyleSelect(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      selectedStyle: this.data.cardStyles[index]
    });
  },

  // 更新内容
  onContentInput(e) {
    const content = e.detail.value;
    if (content.length <= 100) {
      this.setData({ content });
    }
  },

  // 预览卡片
  togglePreview() {
    this.setData({
      isPreview: !this.data.isPreview
    });
  },

  // 保存卡片
  async saveCard() {
    try {
      // 获取canvas上下文
      const query = wx.createSelectorQuery();
      query.select('#cardCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          
          // 绘制卡片背景
          ctx.fillStyle = this.data.selectedStyle.colors[0];
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // 绘制日期
          ctx.fillStyle = this.data.selectedStyle.textColor;
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText(this.data.currentDate, 20, 40);
          
          // 绘制心情图标
          ctx.font = '48px sans-serif';
          ctx.fillText(this.data.selectedMood.icon, 20, 100);
          
          // 绘制文字内容
          ctx.font = '20px sans-serif';
          ctx.fillText(this.data.content, 20, 160);
          
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
                  // 保存记录到本地存储
                  this.saveMoodRecord();
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

  // 保存心情记录
  saveMoodRecord() {
    const record = {
      date: this.data.currentDate,
      mood: this.data.selectedMood,
      content: this.data.content,
      style: this.data.selectedStyle,
      timestamp: new Date().getTime()
    };

    let records = wx.getStorageSync('moodRecords') || [];
    records.unshift(record);
    wx.setStorageSync('moodRecords', records);
  },

  // 查看历史记录
  viewHistory() {
    wx.navigateTo({
      url: '/pages/mood-history/mood-history'
    });
  }
}); 