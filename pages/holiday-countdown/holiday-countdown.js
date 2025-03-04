Page({
  data: {
    countdown: '',
    holidayType: '',
    holidayDates: {
      winterStart: '2024-01-15',
      winterEnd: '2024-02-15',
      summerStart: '2024-07-01',
      summerEnd: '2024-08-31'
    }
  },

  onLoad() {
    // 从本地存储获取保存的假期时间
    const savedDates = wx.getStorageSync('holidayDates');
    if (savedDates) {
      this.setData({
        holidayDates: savedDates
      });
    }
    
    this.updateCountdown();
    // 每秒更新一次倒计时
    this.countdownTimer = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  },

  onUnload() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  },

  updateCountdown() {
    const now = new Date();
    const year = now.getFullYear();
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
      const nextYearWinter = new Date(year + 1 + '-01-15');
      targetDate = nextYearWinter;
      holidayType = '寒假';
    }
    
    const timeDiff = targetDate - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    this.setData({
      countdown: `${days}天 ${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`,
      holidayType: holidayType
    });
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
  }
}); 