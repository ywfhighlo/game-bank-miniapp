const quotes = [
  { en: "When something is important enough, you do it even if the odds are not in your favor.", zh: "当一件事足够重要时，即使胜算不大，你也要去做。" },
  { en: "Persistence is very important. You should not give up unless you are forced to give up.", zh: "坚持非常重要。除非被迫，否则绝不放弃。" },
  { en: "Some people don't like change, but you need to embrace change if the alternative is disaster.", zh: "有些人不喜欢变化，但如果不改变，就可能走向灾难。" },
  { en: "I could either watch it happen or be a part of it.", zh: "我可以选择旁观，也可以选择参与其中。" },
  { en: "The first step is to establish that something is possible; then probability will occur.", zh: "第一步是确定某事可能实现，然后成功的概率就会出现。" },
  { en: "Failure is an option here. If things are not failing, you are not innovating enough.", zh: "失败是一种选择。如果事情没有失败，说明你创新得不够。" },
  { en: "If something is truly important to you, you will find a way to make it work.", zh: "如果某事对你来说真正重要，你会找到实现它的方法。" },
  { en: "People should pursue what they're passionate about.", zh: "人们应该追求他们热爱的事物。" },
  { en: "I don't spend my time pontificating about high-concept things; I spend my time solving engineering and manufacturing problems.", zh: "我不会花时间去高谈阔论那些抽象的概念；我会专注于解决工程和制造问题。" },
  { en: "I think that's the single best piece of advice: constantly think about how you could be doing things better and questioning yourself.", zh: "我认为最好的建议就是：不断思考如何做得更好，并且质疑自己。" },
  { en: "The path to the CEO's office should not be through the CFO's office, and it should not be through the marketing department. It needs to be through engineering and design.", zh: "通往CEO办公室的道路不应该经过CFO办公室，也不该经过市场部门，而应经过工程和设计部门。" },
  { en: "Some people complain that they don't have time. I have the same number of hours per day. It's about priorities.", zh: "有些人抱怨没有时间，但我每天都有相同的小时数，关键在于如何设定优先级。" },
  { en: "Brand is just a perception, and perception will match reality over time.", zh: "品牌只是一个认知，随着时间推移，认知会与现实相符。" },
  { en: "I would like to die on Mars... just not on impact.", zh: "我希望能在火星上终老……只是不要以撞击的方式。" },
  { en: "When Henry Ford made cheap, reliable cars, people said, 'Nah, what's wrong with a horse?' That was a huge bet he made, and it worked.", zh: "当亨利·福特发明出廉价且可靠的汽车时，人们说：'马有什么问题？'这是一场巨大的赌博，但证明是成功的。" },
  { en: "I say something, and then it usually happens. Maybe not on schedule, but it usually happens.", zh: "我说了什么，通常很快就会实现。或许不会按预定时间，但大多数情况下会实现。" },
  { en: "The first rule is not to lose. The second rule is not to forget the first rule.", zh: "第一条规则是不输，第二条规则是不要忘记第一条规则。" },
  { en: "Patience is a virtue, and I'm learning patience. It's a tough lesson.", zh: "耐心是一种美德，而我正在学习耐心，这是一堂艰难的课。" },
  { en: "It's OK to have your eggs in one basket as long as you control what happens to that basket.", zh: "把所有鸡蛋放在一个篮子里没关系，前提是你能掌控那个篮子的命运。" },
  { en: "Starting and growing a business is as much about the innovation, drive and determination of the people behind it as the product they sell.", zh: "创业和发展业务不仅关乎产品，更重要的是背后团队的创新、动力与决心。" },
  { en: "Innovation comes from questioning the status quo.", zh: "创新源自于质疑现状。" },
  { en: "Any product that needs a manual is broken.", zh: "需要说明书的产品说明着它的不足。" },
  { en: "When something is difficult, we try harder.", zh: "当事情变得困难时，我们会更加努力。" },
  { en: "Risk is inherent in every opportunity.", zh: "每个机会都蕴含着风险。" },
  { en: "I embrace failure as the road to success.", zh: "我把失败视为通往成功的必经之路。" },
  { en: "Great ideas come from everyday challenges.", zh: "伟大的创意源自在日常挑战中激发。" },
  { en: "Always challenge conventional wisdom.", zh: "永远挑战传统智慧。" },
  { en: "Ambition drives us forward.", zh: "雄心壮志推动我们不断前进。" },
  { en: "We must constantly innovate.", zh: "我们必须持续不断地创新。" },
  { en: "Dream big, work hard.", zh: "敢于梦想，同时努力工作。" },
  { en: "The future belongs to those who work for it.", zh: "未来属于那些为之奋斗的人。" },
  { en: "Never stop learning.", zh: "永远不停学习。" },
  { en: "Curiosity fuels discovery.", zh: "好奇心激发发现。" },
  { en: "Every setback is a setup for a comeback.", zh: "每一次挫折都是为了更强的回归。" },
  { en: "Change is the only constant.", zh: "唯一不变的就是变化。" },
  { en: "Action is the antidote to despair.", zh: "行动是对抗绝望的解药。" },
  { en: "Inspiration is everywhere – open your eyes.", zh: "灵感无处不在——只需睁开双眼。" },
  { en: "The best way to predict the future is to create it.", zh: "预测未来的最好方法就是去创造未来。" },
  { en: "Work hard, play hard.", zh: "努力工作，尽情娱乐。" },
  { en: "Stay curious and keep pushing boundaries.", zh: "保持好奇心，不断突破极限。" },
  { en: "Every problem is an opportunity in disguise.", zh: "每个问题都暗藏着机遇。" },
  { en: "Think long term, not short term.", zh: "目光放长远，而非只顾眼前。" },
  { en: "Disruption is the birth of innovation.", zh: "颠覆是创新的催化剂。" },
  { en: "Success is built on failure.", zh: "成功是建立在失败之上的。" },
  { en: "The only limit is our imagination.", zh: "唯一的限制是我们的想象力。" },
  { en: "In a fast-paced world, speed matters.", zh: "在快节奏的世界中，速度至关重要。" },
  { en: "Every decision shapes our future.", zh: "每个决定都在塑造我们的未来。" },
  { en: "Never settle for mediocrity.", zh: "绝不满足于平庸。" },
  { en: "Challenge yourself every day.", zh: "每天挑战自己。" },
  { en: "Aiming high is the first step to success.", zh: "志存高远是成功的第一步。" },
  { en: "Hard work beats talent when talent doesn't work hard.", zh: "当天赋不努力时，勤奋会超越天赋。" },
  { en: "Success is not luck, it's hard work and persistence.", zh: "成功不是运气，而是努力和坚持的结果。" },
  { en: "Stay focused and determined.", zh: "保持专注和决心。" },
  { en: "Innovation distinguishes between a leader and a follower.", zh: "创新区分领导者与追随者。" },
  { en: "Every idea matters.", zh: "每个想法都很重要。" },
  { en: "Build the future with each new day.", zh: "用每一天构筑未来。" },
  { en: "Great things take time.", zh: "伟大的成就需要时间。" },
  { en: "Embrace the challenges ahead.", zh: "拥抱前方的挑战。" },
  { en: "Risk without innovation is reckless.", zh: "没有创新的风险是鲁莽的。" },
  { en: "Every invention starts with a spark.", zh: "每项发明都始于一个火花。" },
  { en: "Dreams become reality through hard work.", zh: "梦想通过努力终将成真。" },
  { en: "Innovate, iterate, and improve.", zh: "不断创新、迭代和改进。" },
  { en: "The journey is as important as the destination.", zh: "旅程与目的地同样重要。" },
  { en: "Our vision shapes the world.", zh: "我们的愿景塑造世界。" },
  { en: "Be relentless in the pursuit of excellence.", zh: "在追求卓越的道路上永不懈怠。" },
  { en: "Grand ideas require bold execution.", zh: "宏伟的理念需要大胆的执行。" },
  { en: "Every setback is a lesson.", zh: "每一次挫折都是一次学习。" },
  { en: "Don't be afraid to disrupt.", zh: "不要害怕打破常规。" },
  { en: "Believe in the impossible.", zh: "相信不可能。" },
  { en: "Innovation is the heartbeat of progress.", zh: "创新是进步的脉搏。" },
  { en: "Create, invent, and inspire.", zh: "创造、发明并激励他人。" },
  { en: "Every obstacle leads to opportunity.", zh: "每个障碍都蕴含着机遇。" },
  { en: "Push the boundaries of what's possible.", zh: "不断突破可能性的界限。" },
  { en: "Stay grounded while reaching for the stars.", zh: "脚踏实地，同时仰望星空。" },
  { en: "Your mindset is your most valuable asset.", zh: "你的心态是你最宝贵的财富。" },
  { en: "Overcome fear to achieve greatness.", zh: "战胜恐惧，方能成就伟业。" },
  { en: "Your work defines your legacy.", zh: "你的努力决定你的传承。" },
  { en: "Never compromise on your dreams.", zh: "永远不要对梦想妥协。" },
  { en: "Strive for continuous improvement.", zh: "不断追求持续改进。" },
  { en: "Innovation comes with a price, but the reward is priceless.", zh: "创新是有代价的，但回报是无价的。" },
  { en: "Don't wait for opportunity — create it.", zh: "不要等待机会——创造机会。" },
  { en: "Define success on your own terms.", zh: "用自己的标准定义成功。" },
  { en: "The best way to overcome challenges is to face them head on.", zh: "克服挑战的最好方法就是迎难而上。" },
  { en: "Be a catalyst for change.", zh: "成为变革的催化剂。" },
  { en: "Success is a discipline.", zh: "成功是一种修炼。" },
  { en: "Leap, and the net will appear.", zh: "敢于一跃，安全网自然会出现。" },
  { en: "Innovation is born from risk.", zh: "创新诞生于风险。" },
  { en: "Break the rules to make history.", zh: "打破规则，创造历史。" },
  { en: "Forge your own path.", zh: "开创属于自己的道路。" },
  { en: "Determination fuels achievement.", zh: "决心是成就的燃料。" },
  { en: "Courage is contagious.", zh: "勇气是会传染的。" },
  { en: "Transform ideas into reality.", zh: "把想法转变为现实。" },
  { en: "Great vision starts with a great idea.", zh: "伟大的愿景始于伟大的创意。" },
  { en: "The future is created by what you do today.", zh: "未来由你今天的行动创造。" },
  { en: "Innovation is a journey, not a destination.", zh: "创新是一段旅程，而非一个目的地。" },
  { en: "Every generation has the power to change the world.", zh: "每一代人都有改变世界的力量。" },
  { en: "To innovate is to evolve.", zh: "创新即是进化。" },
  { en: "Strive, never settle.", zh: "努力追求，永不止步。" },
  { en: "Challenge limits and redefine possibility.", zh: "挑战极限，重新定义可能。" },
  { en: "In the realm of innovation, the only limit is our imagination.", zh: "在创新的领域里，唯一的限制是我们的想象力。" }
];

// 添加推荐活动数组
const activities = [
  { type: '运动', items: [
    '晨跑',
    '健身打卡',
    '跳绳',
    '瑜伽',
    '游泳',
    '打球',
    '骑行',
    '散步',
    '爬楼梯',
    '跳操'
  ]},
  { type: '学习', items: [
    '读书',
    '背单词',
    '练字',
    '做题',
    '看教学视频',
    '记笔记',
    '复习',
    '做实验',
    '写作',
    '思考'
  ]},
  { type: '健康', items: [
    '早睡',
    '喝水',
    '吃水果',
    '冥想',
    '户外活动',
    '规律作息',
    '营养早餐',
    '保持微笑',
    '远眺放松',
    '正确坐姿'
  ]}
];

// 添加历史上的大事件数组（按月日排序）
const historicalEvents = [
  { month: 1, day: 1, event: "1912年，孙中山就任中华民国临时大总统，宣告中华民国成立" },
  { month: 1, day: 15, event: "1975年，中国成功发射第一颗返回式遥感卫星" },
  { month: 2, day: 12, event: "1912年，清帝溥仪宣布退位，结束中国两千多年的帝制" },
  { month: 3, day: 8, event: "1910年，法国克莱蒙-奥弗尔城市议会通过决议，确定国际妇女节" },
  { month: 4, day: 5, event: "1975年，微软公司在美国成立" },
  { month: 4, day: 24, event: "1970年，中国成功发射第一颗人造地球卫星" },
  { month: 5, day: 1, event: "1886年，美国芝加哥工人大罢工，争取实行8小时工作制" },
  { month: 5, day: 4, event: "1919年，中国爆发五四运动" },
  { month: 6, day: 1, event: "1601年，清朝康熙皇帝颁布《康熙字典》" },
  { month: 7, day: 1, event: "1997年，香港回归中国" },
  { month: 7, day: 7, event: "1937年，卢沟桥事变爆发" },
  { month: 8, day: 8, event: "2008年，北京奥运会开幕" },
  { month: 9, day: 18, event: "1931年，日本发动九一八事变" },
  { month: 10, day: 1, event: "1949年，中华人民共和国成立" },
  { month: 11, day: 11, event: "1911年，清朝宣统皇帝溥仪退位" },
  { month: 12, day: 13, event: "1937年，南京大屠杀" }
];

// 添加农历转换函数
const lunar = {
  tg: '甲乙丙丁戊己庚辛壬癸',
  dz: '子丑寅卯辰巳午未申酉戌亥',
  number: '一二三四五六七八九十',
  month: '正二三四五六七八九十冬腊',
  week: '日一二三四五六',
  
  // 简单的农历转换（这里使用简化版本，实际项目中建议使用完整的农历转换库）
  convertDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // 这里使用简单的偏移计算，实际项目中应该使用专业的农历转换算法
    const lunarDay = ((day + 15) % 30) || 30;
    const lunarMonth = ((month + 2) % 12) || 12;
    
    // 获取天干地支年
    const yearGan = this.tg[(year - 4) % 10];
    const yearZhi = this.dz[(year - 4) % 12];
    
    return {
      yearGanZhi: yearGan + yearZhi + '年',
      month: this.month[lunarMonth - 1] + '月',
      day: this.formatDay(lunarDay)
    };
  },
  
  formatDay(day) {
    if (day === 10) return '初十';
    if (day === 20) return '二十';
    if (day === 30) return '三十';
    
    const tens = Math.floor(day / 10);
    const ones = day % 10;
    
    if (tens === 0) return '初' + this.number[ones - 1];
    if (tens === 1) return '十' + (ones ? this.number[ones - 1] : '');
    if (tens === 2) return '廿' + (ones ? this.number[ones - 1] : '');
    return '三十' + (ones ? this.number[ones - 1] : '');
  }
};

Page({
  data: {
    currentDate: '',
    currentWeekday: '',
    currentQuote: {},
    showFullscreen: false,
    animation: {},
    quoteIndex: 0,
    cardStyle: 'traditional', // 新增：卡片样式
    recommendActivity: '', // 新增：推荐活动
    lunarDate: '', // 新增：农历日期
    historicalEvent: '', // 新增：历史上的大事件
    showActions: false,
    touchStartX: 0,
    touchStartY: 0
  },

  onLoad() {
    // 只在加载时更新一次日期和推荐活动
    this.updateDateTime();
    this.updateRecommendActivity();
    
    // 根据日期生成随机但固定的索引获取今日金句
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % quotes.length;
    const quote = quotes[index];
    
    this.setData({
      currentQuote: {
        content: quote.zh,
        content_en: quote.en,
        zh: quote.zh,
        en: quote.en
      },
      quoteIndex: index
    });
  },

  updateDateTime() {
    const now = new Date();
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const lunarInfo = lunar.convertDate(now);
    
    // 获取当天的历史事件
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const todayEvent = historicalEvents.find(event => event.month === month && event.day === day);
    
    this.setData({
      currentDate: now.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }),
      currentWeekday: weekdays[now.getDay()],
      lunarDate: `${lunarInfo.yearGanZhi} ${lunarInfo.month}${lunarInfo.day}`,
      historicalEvent: todayEvent ? todayEvent.event : '暂无历史上的今日大事记'
    });
  },

  updateQuote() {
    // 根据日期生成随机但固定的索引
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % quotes.length;
    const quote = quotes[index];
    
    this.setData({
      currentQuote: {
        content: quote.zh,
        content_en: quote.en,
        zh: quote.zh,
        en: quote.en
      },
      quoteIndex: index
    });
  },

  updateRecommendActivity() {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // 随机选择一个类型
    const typeIndex = seed % activities.length;
    const type = activities[typeIndex];
    
    // 基于日期随机选择一个活动
    const activityIndex = Math.floor((seed * 7) % type.items.length);
    const activity = type.items[activityIndex];
    
    this.setData({
      recommendActivity: activity
    });
  },

  // 添加触摸事件处理方法
  touchStart(e) {
    this.setData({
      touchStartX: e.touches[0].clientX,
      touchStartY: e.touches[0].clientY
    });
  },

  touchMove(e) {
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const deltaX = touchEndX - this.data.touchStartX;
    const deltaY = touchEndY - this.data.touchStartY;

    // 如果水平滑动距离大于垂直滑动距离，且滑动距离超过50，则显示/隐藏操作按钮
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      this.setData({
        showActions: deltaX < 0
      });
    }
  },

  touchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - this.data.touchStartX;
    const deltaY = touchEndY - this.data.touchStartY;

    // 如果垂直滑动距离大于水平滑动距离，且滑动距离超过100，则切换卡片
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 100) {
      if (deltaY < 0) {
        // 向上滑动，显示下一张
        const nextIndex = (this.data.quoteIndex + 1) % quotes.length;
        this.updateQuoteWithAnimation('up', nextIndex);
      } else {
        // 向下滑动，显示上一张
        const prevIndex = (this.data.quoteIndex - 1 + quotes.length) % quotes.length;
        this.updateQuoteWithAnimation('down', prevIndex);
      }
    }
  },

  // 添加带动画的卡片切换方法
  updateQuoteWithAnimation(direction, newIndex) {
    const quote = quotes[newIndex];
    const animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease'
    });

    // 设置动画
    if (direction === 'up') {
      animation.translateY('-100%').step();
    } else {
      animation.translateY('100%').step();
    }

    this.setData({
      animation: animation.export()
    });

    setTimeout(() => {
      // 重置位置并只更新金句内容
      animation.translateY(0).step({ duration: 0 });
      this.setData({
        currentQuote: {
          content: quote.zh,
          content_en: quote.en,
          zh: quote.zh,
          en: quote.en
        },
        quoteIndex: newIndex,
        animation: animation.export()
      });
    }, 300);
  },

  // 修改长按保存图片方法，支持新样式
  async onLongPress() {
    try {
      const query = wx.createSelectorQuery();
      query.select('#quoteCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          
          // 设置画布大小
          canvas.width = 300;
          canvas.height = 400;
          
          // 绘制卡片背景
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // 绘制紫色日期区域
          ctx.fillStyle = '#6B66FF';
          ctx.fillRect(0, 0, canvas.width, 100);
          
          // 绘制日期
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 36px sans-serif';
          const dateText = this.data.currentDate.split('/')[1];
          ctx.fillText(dateText, 20, 60);
          
          // 绘制农历和星期
          ctx.font = '16px sans-serif';
          ctx.fillText(this.data.lunarDate + ' · ' + this.data.currentWeekday, 20, 85);
          
          // 绘制宜字图标
          ctx.fillStyle = '#6B66FF';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText('宜', 20, 140);
          
          // 绘制推荐活动
          ctx.fillStyle = '#333333';
          ctx.font = '20px sans-serif';
          ctx.fillText(this.data.recommendActivity, 60, 140);
          
          // 绘制金句
          ctx.font = '18px sans-serif';
          this.drawWrappedText(ctx, this.data.currentQuote.zh, 20, 200, canvas.width - 40);
          ctx.font = '16px sans-serif';
          this.drawWrappedText(ctx, this.data.currentQuote.en, 20, 260, canvas.width - 40);
          
          // 保存图片
          wx.canvasToTempFilePath({
            canvas: canvas,
            success: (res) => {
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

  // 新增：文本自动换行方法
  drawWrappedText(ctx, text, x, y, maxWidth) {
    const characters = text.split('');
    let line = '';
    let lineHeight = 25;
    
    for (let i = 0; i < characters.length; i++) {
      const testLine = line + characters[i];
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, x, y);
        line = characters[i];
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
    return y + lineHeight;
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: this.data.currentQuote.zh + ' —— ' + this.data.currentQuote.en,
      path: '/pages/daily-inspiration/daily-inspiration'
    };
  },

  onShareTimeline() {
    return {
      title: this.data.currentQuote.zh + ' —— ' + this.data.currentQuote.en
    };
  }
});