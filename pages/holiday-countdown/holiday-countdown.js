const { holidays } = require('./holidays.js');

Page({
  data: {
    countdown: '',
    holidayType: '',
    holidayDates: {
      winterStart: '2024-01-15',
      winterEnd: '2024-02-15',
      summerStart: '2024-07-01',
      summerEnd: '2024-08-31'
    },
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    targetDate: '2024年春节',
    winterVacation: '2024-01-13',
    summerVacation: '2024-07-01',
    fireworks: [],
    animationTimer: null,
    progressPercent: 0,
    passedDays: 0,
    currentHolidayDate: '',
    winterDuration: 0,
    summerDuration: 0,
    sortedHolidays: [],
    currentHolidayIndex: 0
  },

  onLoad() {
    // 从本地存储获取保存的假期时间
    const savedDates = wx.getStorageSync('holidayDates');
    if (savedDates) {
      this.setData({
        holidayDates: savedDates
      });
    }
    
    // 计算假期时长
    this.calculateHolidayDurations();
    
    this.updateCountdown();
    // 每秒更新一次倒计时
    this.countdownTimer = setInterval(() => {
      this.updateCountdown();
    }, 1000);

    this.initCountdown();
    this.initCanvas();

    this.initHolidays();
    // 每天凌晨更新倒计时
    this.setUpdateTimer();
  },

  onShow() {
    this.startFireworksAnimation();
  },

  onHide() {
    this.stopFireworksAnimation();
  },

  onUnload() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
    this.stopFireworksAnimation();
  },

  calculateHolidayDurations() {
    const winterStart = new Date(this.data.holidayDates.winterStart);
    const winterEnd = new Date(this.data.holidayDates.winterEnd);
    const summerStart = new Date(this.data.holidayDates.summerStart);
    const summerEnd = new Date(this.data.holidayDates.summerEnd);

    const winterDuration = Math.ceil((winterEnd - winterStart) / (1000 * 60 * 60 * 24));
    const summerDuration = Math.ceil((summerEnd - summerStart) / (1000 * 60 * 60 * 24));

    this.setData({
      winterDuration,
      summerDuration
    });
  },

  updateCountdown() {
    const now = new Date();
    const year = now.getFullYear();
    const winterStart = new Date(this.data.holidayDates.winterStart);
    const summerStart = new Date(this.data.holidayDates.summerStart);
    
    let targetDate;
    let holidayType;
    let startDate;
    let endDate;
    
    if (now < winterStart) {
      targetDate = winterStart;
      holidayType = '寒假';
      startDate = now;
      endDate = winterStart;
    } else if (now < summerStart) {
      targetDate = summerStart;
      holidayType = '暑假';
      startDate = now;
      endDate = summerStart;
    } else {
      const nextYearWinter = new Date(year + 1 + '-01-15');
      targetDate = nextYearWinter;
      holidayType = '寒假';
      startDate = now;
      endDate = nextYearWinter;
    }
    
    const timeDiff = targetDate - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // 计算进度
    const totalDuration = endDate - startDate;
    const passedDuration = now - startDate;
    const progressPercent = Math.min(100, Math.max(0, (passedDuration / totalDuration) * 100));
    const passedDays = Math.floor(passedDuration / (1000 * 60 * 60 * 24));
    
    this.setData({
      days,
      hours,
      minutes,
      seconds,
      countdown: `${days}天 ${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`,
      holidayType,
      progressPercent,
      passedDays,
      currentHolidayDate: this.formatDate(targetDate),
      targetDate: holidayType
    });
  },

  formatDate(date) {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  },

  padZero(num) {
    return num < 10 ? '0' + num : num;
  },

  showDatePicker() {
    wx.showActionSheet({
      itemList: ['设置寒假时间', '设置暑假时间'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.setHolidayDate('winter');
        } else if (res.tapIndex === 1) {
          this.setHolidayDate('summer');
        }
      }
    });
  },

  setHolidayDate(type) {
    wx.showModal({
      title: `设置${type === 'winter' ? '寒' : '暑'}假时间`,
      content: '请输入开始日期（格式：YYYY-MM-DD）',
      editable: true,
      placeholderText: 'YYYY-MM-DD',
      success: (res) => {
        if (res.confirm) {
          const dateStr = res.content;
          if (this.isValidDate(dateStr)) {
            const newDates = { ...this.data.holidayDates };
            if (type === 'winter') {
              newDates.winterStart = dateStr;
            } else {
              newDates.summerStart = dateStr;
            }
            this.setData({
              holidayDates: newDates
            }, () => {
              this.updateCountdown();
              wx.setStorageSync('holidayDates', newDates);
              wx.showToast({
                title: '设置成功',
                icon: 'success'
              });
            });
          } else {
            wx.showToast({
              title: '日期格式错误',
              icon: 'error'
            });
          }
        }
      }
    });
  },

  isValidDate(dateStr) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date);
  },

  initCountdown() {
    const now = new Date();
    const winterStart = new Date(this.data.holidayDates.winterStart);
    const summerStart = new Date(this.data.holidayDates.summerStart);
    
    let targetDate;
    let holidayType;
    
    if (now < winterStart) {
      targetDate = winterStart;
      holidayType = '寒假';
    } else if (now < summerStart) {
      targetDate = summerStart;
      holidayType = '暑假';
    } else {
      const nextYearWinter = new Date(now.getFullYear() + 1 + '-01-15');
      targetDate = nextYearWinter;
      holidayType = '寒假';
    }
    
    const timeDiff = targetDate - now;
    this.data.days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    this.data.hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.data.minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    this.data.seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    this.setData({
      targetDate: holidayType === '寒假' ? '寒假' : '暑假',
      winterVacation: this.data.holidayDates.winterStart,
      summerVacation: this.data.holidayDates.summerStart
    });
  },

  initCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#fireworks').fields({ node: true, size: true }).exec((res) => {
      const canvas = res[0].node;
      const ctx = canvas.getContext('2d');
      
      // 设置画布大小
      const dpr = wx.getSystemInfoSync().pixelRatio;
      canvas.width = res[0].width * dpr;
      canvas.height = res[0].height * dpr;
      ctx.scale(dpr, dpr);
      
      this.canvas = canvas;
      this.ctx = ctx;
    });
  },

  startFireworksAnimation() {
    if (this.animationTimer) return;
    
    const animate = () => {
      this.updateFireworks();
      this.drawFireworks();
      this.animationTimer = wx.createAnimation({ duration: 16 }).step().export();
    };
    
    animate();
  },

  stopFireworksAnimation() {
    if (this.animationTimer) {
      this.animationTimer = null;
      this.animationTimer = null;
    }
  },

  createFirework() {
    const canvas = this.canvas;
    return {
      x: Math.random() * canvas.width,
      y: canvas.height,
      targetY: canvas.height * 0.3 + Math.random() * canvas.height * 0.4,
      size: 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      particles: [],
      phase: 'rising'
    };
  },

  updateFireworks() {
    if (!this.ctx) return;
    
    // 随机添加新烟花
    if (Math.random() < 0.03) {
      this.data.fireworks.push(this.createFirework());
    }

    // 更新现有烟花
    for (let i = this.data.fireworks.length - 1; i >= 0; i--) {
      const fw = this.data.fireworks[i];
      
      if (fw.phase === 'rising') {
        // 上升阶段
        fw.y -= 10;
        if (fw.y <= fw.targetY) {
          fw.phase = 'exploding';
          // 创建粒子
          for (let j = 0; j < 50; j++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 3;
            fw.particles.push({
              x: fw.x,
              y: fw.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              alpha: 1
            });
          }
        }
      } else if (fw.phase === 'exploding') {
        // 爆炸阶段
        let allFaded = true;
        for (let particle of fw.particles) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.1; // 重力
          particle.alpha -= 0.02;
          if (particle.alpha > 0) allFaded = false;
        }
        if (allFaded) {
          this.data.fireworks.splice(i, 1);
        }
      }
    }
  },

  drawFireworks() {
    if (!this.ctx) return;
    
    const ctx = this.ctx;
    const canvas = this.canvas;
    
    // 清空画布
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制烟花
    for (const fw of this.data.fireworks) {
      if (fw.phase === 'rising') {
        ctx.beginPath();
        ctx.arc(fw.x, fw.y, fw.size, 0, Math.PI * 2);
        ctx.fillStyle = fw.color;
        ctx.fill();
      } else if (fw.phase === 'exploding') {
        for (const particle of fw.particles) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
          ctx.fillStyle = `${fw.color.slice(0, -1)}, ${particle.alpha})`;
          ctx.fill();
        }
      }
    }
  },

  initHolidays() {
    const now = new Date();
    const sortedHolidays = holidays.map(holiday => {
      const holidayDate = new Date(holiday.date);
      const timeDiff = holidayDate.getTime() - now.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return {
        ...holiday,
        daysLeft
      };
    }).sort((a, b) => a.daysLeft - b.daysLeft);

    // 找到最近的未过期节日的索引
    const nextHolidayIndex = sortedHolidays.findIndex(h => h.daysLeft > 0);
    
    this.setData({
      sortedHolidays,
      currentHolidayIndex: nextHolidayIndex >= 0 ? nextHolidayIndex : 0
    });
  },

  setUpdateTimer() {
    // 计算到下一个凌晨的时间
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeToNextDay = tomorrow - now;

    // 设置定时器
    setTimeout(() => {
      this.initHolidays();
      this.setUpdateTimer(); // 递归设置下一天的定时器
    }, timeToNextDay);
  },

  onSwiperChange(e) {
    const { current } = e.detail;
    this.setData({
      currentHolidayIndex: current
    });
  },

  onShareTap() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onRemindTap() {
    const holiday = this.data.sortedHolidays[this.data.currentHolidayIndex];
    if (holiday.daysLeft <= 0) {
      wx.showToast({
        title: '该节日已经开始啦',
        icon: 'none'
      });
      return;
    }

    wx.showModal({
      title: '设置提醒',
      content: `是否在${holiday.name}前一天提醒你？`,
      success: (res) => {
        if (res.confirm) {
          // 这里可以调用订阅消息接口
          wx.requestSubscribeMessage({
            tmplIds: ['your-template-id'], // 替换为你的模板ID
            success: (res) => {
              wx.showToast({
                title: '提醒设置成功',
                icon: 'success'
              });
            },
            fail: (err) => {
              wx.showToast({
                title: '提醒设置失败',
                icon: 'none'
              });
            }
          });
        }
      }
    });
  },

  onShareAppMessage() {
    const holiday = this.data.sortedHolidays[this.data.currentHolidayIndex];
    return {
      title: `距离${holiday.name}还有${holiday.daysLeft}天`,
      path: '/pages/holiday-countdown/holiday-countdown'
    };
  },

  onShareTimeline() {
    const holiday = this.data.sortedHolidays[this.data.currentHolidayIndex];
    return {
      title: `距离${holiday.name}还有${holiday.daysLeft}天`
    };
  }
});