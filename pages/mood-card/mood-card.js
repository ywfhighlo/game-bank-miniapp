import { MOODS } from './moods';

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
const HISTORICAL_EVENTS = [
  { month: 1, day: 1, event: "1912年，中华民国成立" },
  { month: 1, day: 2, event: "1979年，中美正式建立外交关系" },
  { month: 1, day: 3, event: "1956年，周恩来提出科学进军规划，知识分子政策" },
  { month: 1, day: 4, event: "1958年，苏联发射世界第一颗人造地球卫星" },
  { month: 1, day: 5, event: "1964年，周恩来总理首次提出和平共处五项原则" },
  { month: 1, day: 6, event: "1838年，世界第一台电报机诞生" },
  { month: 1, day: 7, event: "1927年，宁汉合流，国民革命军誓师北伐" },
  { month: 1, day: 8, event: "1935年，遵义会议召开，确立毛泽东领导地位" },
  { month: 1, day: 9, event: "1788年，康熙《四库全书》编纂完成" },
  { month: 1, day: 10, event: "1975年，联合国大会通过《关于各国经济权利和义务宪章》" },
  { month: 1, day: 11, event: "1943年，中英《新约》签订，废除英国在华治外法权" },
  { month: 1, day: 12, event: "1954年，周恩来提出和平共处五项原则" },
  { month: 1, day: 13, event: "1935年，红军胜利完成遵义会议" },
  { month: 1, day: 14, event: "1967年，世界首次人类心脏移植手术成功" },
  { month: 1, day: 15, event: "1975年，中国成功发射第一颗返回式遥感卫星" },
  { month: 1, day: 16, event: "1957年，周恩来发表《关于知识分子问题的报告》" },
  { month: 1, day: 17, event: "1992年，邓小平南巡讲话，推动改革开放" },
  { month: 1, day: 18, event: "1915年，日本向袁世凯提出二十一条" },
  { month: 1, day: 19, event: "1955年，中国第一座现代化钢铁联合企业——武汉钢铁公司建成" },
  { month: 1, day: 20, event: "1841年，林则徐被革职，道光帝任命琦善为钦差大臣" },
  { month: 1, day: 21, event: "1924年，列宁逝世" },
  { month: 1, day: 22, event: "1905年，俄国爆发血腥星期日事件" },
  { month: 1, day: 23, event: "1368年，朱元璋建立明朝" },
  { month: 1, day: 24, event: "1984年，苹果公司推出第一代Macintosh电脑" },
  { month: 1, day: 25, event: "1947年，中国人民解放军改用统一番号" },
  { month: 1, day: 26, event: "1841年，香港岛被英国占领" },
  { month: 1, day: 27, event: "1973年，巴黎和平协定签署，越南战争结束" },
  { month: 1, day: 28, event: "1932年，一二八事变爆发" },
  { month: 1, day: 29, event: "1979年，邓小平访问美国" },
  { month: 1, day: 30, event: "1933年，希特勒就任德国总理" },
  { month: 1, day: 31, event: "1949年，平津战役胜利结束" },

  // 二月
  { month: 2, day: 1, event: "1949年，中共中央发布《关于解放军战士复员的决定》" },
  { month: 2, day: 2, event: "1901年，清政府与列强签订《辛丑条约》" },
  { month: 2, day: 3, event: "1931年，中华苏维埃第一次全国代表大会在江西瑞金召开" },
  { month: 2, day: 4, event: "1945年，雅尔塔会议召开" },
  { month: 2, day: 5, event: "1917年，墨西哥颁布新宪法" },
  { month: 2, day: 6, event: "1952年，英国伊丽莎白二世女王登基" },
  { month: 2, day: 7, event: "1950年，美英承认越南、老挝、柬埔寨独立" },
  { month: 2, day: 8, event: "1904年，日俄战争爆发" },
  { month: 2, day: 9, event: "1976年，周恩来逝世" },
  { month: 2, day: 10, event: '1906年，英国"无畏"号战列舰下水' },
  { month: 2, day: 11, event: "1990年，纳尔逊·曼德拉获释" },
  { month: 2, day: 12, event: "1912年，清帝溥仪宣布退位，结束中国两千多年的帝制" },
  { month: 2, day: 13, event: "1950年，苏联与中国签订《中苏友好同盟互助条约》" },
  { month: 2, day: 14, event: "1956年，苏联共产党第二十次代表大会召开" },
  { month: 2, day: 15, event: "1965年，加拿大正式启用枫叶旗为国旗" },
  { month: 2, day: 16, event: "1972年，毛泽东会见尼克松" },
  { month: 2, day: 17, event: "1600年，布鲁诺因坚持日心说被处以火刑" },
  { month: 2, day: 18, event: "1930年，冥王星被发现" },
  { month: 2, day: 19, event: "1986年，苏联和平号空间站发射升空" },
  { month: 2, day: 20, event: "1947年，蒋介石下令进攻延安" },
  { month: 2, day: 21, event: "1972年，尼克松访华" },
  { month: 2, day: 22, event: "1946年，中国人民解放军改称" },
  { month: 2, day: 23, event: "1893年，德国人鲁道夫·狄塞尔获得柴油机专利" },
  { month: 2, day: 24, event: "1525年，西班牙征服者科尔特斯处死阿兹特克最后一位皇帝" },
  { month: 2, day: 25, event: "1956年，赫鲁晓夫在苏共二十大作秘密报告" },
  { month: 2, day: 26, event: "1935年，雷达专利申请获准" },
  { month: 2, day: 27, event: "1933年，德国国会大厦被纵火" },
  { month: 2, day: 28, event: "1953年，沃森和克里克发现DNA双螺旋结构" },
  { month: 2, day: 29, event: "1952年，第一届冬季奥运会在挪威奥斯陆举行" },

  // 三月
  { month: 3, day: 1, event: "1932年，日本扶植伪满洲国成立" },
  { month: 3, day: 2, event: "1969年，中苏珍宝岛武装冲突" },
  { month: 3, day: 3, event: "1924年，土耳其取消哈里发制度" },
  { month: 3, day: 4, event: "1933年，罗斯福就任美国总统" },
  { month: 3, day: 5, event: "1953年，斯大林逝世" },
  { month: 3, day: 6, event: "1899年，拜耳公司注册阿司匹林商标" },
  { month: 3, day: 7, event: "1965年，美军开始轰炸越南" },
  { month: 3, day: 8, event: "1910年，法国克莱蒙-奥弗尔城市议会通过决议，确定国际妇女节" },
  { month: 12, day: 29, event: "1911年，孙中山当选为中华民国临时大总统" },
  { month: 12, day: 30, event: "1922年，苏联正式成立" },
  { month: 12, day: 31, event: "1943年，重庆谈判，国共两党达成合作协议" },
  { month: 3, day: 9, event: "1959年，芭比娃娃诞生" },
  { month: 3, day: 10, event: "1959年，西藏发生叛乱，达赖喇嘛出逃" },
  { month: 3, day: 11, event: "2011年，日本发生9.0级大地震" },
  { month: 3, day: 12, event: "1925年，孙中山逝世" },
  { month: 3, day: 13, event: "1881年，沙皇亚历山大二世遇刺身亡" },
  { month: 3, day: 14, event: "1883年，马克思逝世" },
  { month: 3, day: 15, event: "1917年，俄国沙皇尼古拉二世退位" },
  { month: 3, day: 16, event: "1966年，美国宇宙飞船首次与目标飞行器对接成功" },
  { month: 3, day: 17, event: "1959年，达赖喇嘛逃往印度" },
  { month: 3, day: 18, event: "1871年，巴黎公社成立" },
  { month: 3, day: 19, event: "2003年，美国开始轰炸伊拉克" },
  { month: 3, day: 20, event: "1852年，《汤姆叔叔的小屋》出版" },
  { month: 3, day: 21, event: "1960年，南非沙佩维尔惨案发生" },
  { month: 3, day: 22, event: "1765年，英国颁布印花税法案" },
  { month: 3, day: 23, event: "1839年，清政府任命林则徐为钦差大臣" },
  { month: 3, day: 24, event: "1882年，德国科学家科赫发现结核杆菌" },
  { month: 3, day: 25, event: "1957年，欧洲经济共同体成立" },
  { month: 3, day: 26, event: "1959年，西藏民主改革" },
  { month: 3, day: 27, event: "1968年，加加林在飞行事故中遇难" },
  { month: 3, day: 28, event: "1979年，美国三里岛核电站事故" },
  { month: 3, day: 29, event: "1973年，美军最后一批作战部队撤离越南" },
  { month: 3, day: 30, event: "1867年，美国从俄国购买阿拉斯加" },
  { month: 3, day: 31, event: "1889年，埃菲尔铁塔落成" },

  // 四月
  { month: 4, day: 1, event: "1949年，中国人民解放军占领南京" },
  { month: 4, day: 2, event: "1982年，阿根廷入侵福克兰群岛" },
  { month: 4, day: 3, event: "1948年，美国国会通过马歇尔计划" },
  { month: 4, day: 4, event: "1968年，马丁·路德·金遇刺身亡" },
  { month: 4, day: 5, event: "1975年，蒋介石在台湾逝世" },
  { month: 4, day: 6, event: "1896年，首届现代奥运会在雅典开幕" },
  { month: 4, day: 7, event: "1948年，世界卫生组织成立" },
  { month: 4, day: 8, event: "1513年，庞塞·德莱昂发现佛罗里达" },
  { month: 4, day: 9, event: "1940年，德国入侵丹麦和挪威" },
  { month: 4, day: 10, event: "1912年，泰坦尼克号从南安普敦启航" },
  { month: 4, day: 11, event: "1979年，乌干达独裁者阿明被推翻" },
  { month: 4, day: 12, event: "1961年，加加林成为首位进入太空的人" },
  { month: 4, day: 13, event: "1742年，亨德尔的《弥赛亚》首演" },
  { month: 4, day: 14, event: "1912年，泰坦尼克号撞冰山沉没" },
  { month: 4, day: 15, event: "1912年，泰坦尼克号沉没，1500多人遇难" },
  { month: 4, day: 16, event: "1917年，列宁从瑞士回到俄国" },
  { month: 4, day: 17, event: "1895年，《马关条约》签订" },
  { month: 4, day: 18, event: "1906年，旧金山大地震" },
  { month: 4, day: 19, event: "1775年，美国独立战争爆发" },
  { month: 4, day: 20, event: "1902年，居里夫人首次分离出纯镭" },
  { month: 4, day: 21, event: "753 BC，罗马城建立" },
  { month: 4, day: 22, event: "1970年，首个世界地球日" },
  { month: 4, day: 23, event: "1616年，莎士比亚逝世" },
  { month: 4, day: 24, event: "1970年，中国成功发射第一颗人造地球卫星" },
  { month: 4, day: 25, event: "1945年，美苏军队在德国托尔高会师" },
  { month: 4, day: 26, event: "1986年，切尔诺贝利核电站事故" },
  { month: 4, day: 27, event: "1521年，麦哲伦在菲律宾被土著杀害" },
  { month: 4, day: 28, event: "1945年，墨索里尼被处决" },
  { month: 4, day: 29, event: "1975年，美军撤离西贡，越南战争结束" },
  { month: 4, day: 30, event: "1945年，希特勒自杀" },

  // 五月
  { month: 5, day: 1, event: "1886年，美国芝加哥工人大罢工，争取实行8小时工作制" },
  { month: 5, day: 2, event: "1945年，苏联红军攻占柏林" },
  { month: 5, day: 3, event: "1947年，日本和平宪法生效" },
  { month: 5, day: 4, event: "1919年，中国爆发五四运动" },
  { month: 5, day: 5, event: "1818年，马克思诞生" },
  { month: 5, day: 6, event: "1937年，兴登堡飞艇在美国新泽西州坠毁" },
  { month: 5, day: 7, event: "1945年，德国无条件投降" },
  { month: 5, day: 8, event: "1945年，欧洲战争胜利日" },
  { month: 5, day: 9, event: "1960年，美国批准使用避孕药" },
  { month: 5, day: 10, event: "1869年，美国第一条横贯大陆铁路竣工" },
  { month: 5, day: 11, event: "1981年，鲍勃·马利逝世" },
  { month: 5, day: 12, event: "2008年，汶川大地震" },
  { month: 5, day: 13, event: "1950年，首届一级方程式世界锦标赛举行" },
  { month: 5, day: 14, event: "1948年，以色列建国" },
  { month: 5, day: 15, event: "1618年，开普勒发现行星运动第三定律" },
  { month: 5, day: 16, event: "1966年，文化大革命开始" },
  { month: 5, day: 17, event: "1954年，美国最高法院裁决种族隔离违宪" },
  { month: 5, day: 18, event: "1804年，拿破仑加冕为法兰西帝国皇帝" },
  { month: 5, day: 19, event: "1536年，英国安妮·博林王后被处决" },
  { month: 5, day: 20, event: "1927年，林德伯格完成首次单人跨大西洋飞行" },
  { month: 5, day: 21, event: "1904年，国际足联在巴黎成立" },
  { month: 5, day: 22, event: "1960年，智利发生9.5级地震，为有记录以来最强地震" },
  { month: 5, day: 23, event: "1949年，德意志联邦共和国成立" },
  { month: 5, day: 24, event: "1844年，莫尔斯发出第一份电报" },
  { month: 5, day: 25, event: "1963年，非洲统一组织成立" },
  { month: 5, day: 26, event: "1896年，尼古拉二世加冕为俄国沙皇" },
  { month: 5, day: 27, event: "1937年，金门大桥对公众开放" },
  { month: 5, day: 28, event: "1961年，英国伦敦大赦国际成立" },
  { month: 5, day: 29, event: "1953年，新西兰人希拉里首次成功登上珠穆朗玛峰" },
  { month: 5, day: 30, event: "1431年，圣女贞德被烧死" },
  { month: 5, day: 31, event: "1859年，伦敦大本钟首次敲响" },

  // 六月
  { month: 6, day: 1, event: "1926年，玛丽莲·梦露出生" },
  { month: 6, day: 2, event: "1953年，英国女王伊丽莎白二世加冕" },
  { month: 6, day: 3, event: "1989年，中国首次发现早期智人化石" },
  { month: 6, day: 4, event: "1989年，波兰举行首次自由选举" },
  { month: 6, day: 5, event: "1967年，第三次中东战争爆发" },
  { month: 6, day: 6, event: "1944年，诺曼底登陆" },
  { month: 6, day: 7, event: "1099年，第一次十字军东征攻占耶路撒冷" },
  { month: 6, day: 8, event: "1949年，乔治·奥威尔的《1984》出版" },
  { month: 6, day: 9, event: "1898年，清政府与英国签订《展拓香港界址专条》" },
  { month: 6, day: 10, event: "1935年，美国匿名戒酒会成立" },
  { month: 6, day: 11, event: "1895年，甲午战争后清政府与日本签订《马关条约》" },
  { month: 6, day: 12, event: "1987年，里根总统在柏林墙前发表演说" },
  { month: 6, day: 13, event: "1971年，《五角大楼文件》开始发表" },
  { month: 6, day: 14, event: "1777年，美国国会通过星条旗为国旗" },
  { month: 6, day: 15, event: "1215年，英国大宪章签署" },
  { month: 6, day: 16, event: "1963年，苏联首位女宇航员进入太空" },
  { month: 6, day: 17, event: "1972年，水门事件爆发" },
  { month: 6, day: 18, event: "1815年，滑铁卢战役，拿破仑战败" },
  { month: 6, day: 19, event: "1953年，罗森堡夫妇因间谍罪被处决" },
  { month: 6, day: 20, event: "1789年，法国第三等级代表发表《网球场誓言》" },
  { month: 6, day: 21, event: "1945年，冲绳战役结束" },
  { month: 6, day: 22, event: "1941年，德国入侵苏联" },
  { month: 6, day: 23, event: "1868年，克里斯托弗·拉塞姆获得打字机专利" },
  { month: 6, day: 24, event: "1812年，拿破仑率军入侵俄国" },
  { month: 6, day: 25, event: "1950年，朝鲜战争爆发" },
  { month: 6, day: 26, event: "1945年，联合国宪章在旧金山签署" },
  { month: 6, day: 27, event: "1950年，杜鲁门下令美军介入朝鲜战争" },
  { month: 6, day: 28, event: "1914年，萨拉热窝事件爆发，第一次世界大战导火线" },
  { month: 6, day: 29, event: "1613年，伦敦环球剧院被烧毁" },
  { month: 6, day: 30, event: "1997年，香港回归前夜" },

  // 七月
  { month: 7, day: 1, event: "1997年，香港回归中国" },
  { month: 7, day: 2, event: "1976年，越南南北统一" },
  { month: 7, day: 3, event: "1988年，美军击落伊朗客机" },
  { month: 7, day: 4, event: "1776年，美国独立宣言发表" },
  { month: 7, day: 5, event: "1946年，比基尼泳装首次亮相" },
  { month: 7, day: 6, event: "1885年，巴斯德成功完成首次狂犬病疫苗接种" },
  { month: 7, day: 7, event: "1937年，卢沟桥事变" },
  { month: 7, day: 8, event: "1853年，佩里率舰队抵达日本" },
  { month: 7, day: 9, event: "1816年，阿根廷独立" },
  { month: 7, day: 10, event: "1962年，通信卫星时代开始" },
  { month: 7, day: 11, event: "1804年，汉密尔顿与伯尔决斗身亡" },
  { month: 7, day: 12, event: "1962年，滚石乐队首次演出" },
  { month: 7, day: 13, event: "1930年，首届世界杯足球赛在乌拉圭开幕" },
  { month: 7, day: 14, event: "1789年，巴士底狱被攻占" },
  { month: 7, day: 15, event: "1799年，发现罗塞塔石碑" },
  { month: 7, day: 16, event: "1945年，美国成功试爆第一颗原子弹" },
  { month: 7, day: 17, event: "1955年，迪士尼乐园开园" },
  { month: 7, day: 18, event: "1925年，希特勒出版《我的奋斗》" },
  { month: 7, day: 19, event: "1870年，普法战争爆发" },
  { month: 7, day: 20, event: "1969年，阿波罗11号登月" },
  { month: 7, day: 21, event: "1904年，跨西伯利亚铁路全线通车" },
  { month: 7, day: 22, event: "1933年，维尔德·琼斯飞越芝加哥" },
  { month: 7, day: 23, event: "1952年，埃及革命爆发" },
  { month: 7, day: 24, event: "1911年，马丘比丘被发现" },
  { month: 7, day: 25, event: "1943年，墨索里尼被解除独裁者职务" },
  { month: 7, day: 26, event: "1956年，埃及将苏伊士运河收归国有" },
  { month: 7, day: 27, event: "1953年，朝鲜战争停战协定签署" },
  { month: 7, day: 28, event: "1914年，第一次世界大战爆发" },
  { month: 7, day: 29, event: "1981年，查尔斯王子与戴安娜王妃结婚" },
  { month: 7, day: 30, event: "1971年，阿波罗15号登月" },
  { month: 7, day: 31, event: "1954年，K2峰首次被人类登顶" },

  // 八月
  { month: 8, day: 1, event: "1927年，中国人民解放军成立" },
  { month: 8, day: 2, event: "1934年，希特勒成为德国元首" },
  { month: 8, day: 3, event: "1492年，哥伦布首次航行启程" },
  { month: 8, day: 4, event: "1914年，英国对德宣战" },
  { month: 8, day: 5, event: "1962年，玛丽莲·梦露逝世" },
  { month: 8, day: 6, event: "1945年，广岛原子弹爆炸" },
  { month: 8, day: 7, event: "1942年，瓜达尔卡纳尔战役开始" },
  { month: 8, day: 8, event: "1974年，尼克松宣布辞职" },
  { month: 8, day: 9, event: "1945年，长崎原子弹爆炸" },
  { month: 8, day: 10, event: "1792年，法国大革命爆发" },
  { month: 8, day: 11, event: "1979年，摩尔多瓦独立" },
  { month: 8, day: 12, event: "1981年，IBM推出第一台个人电脑" },
  { month: 8, day: 13, event: "1961年，柏林墙开始修建" },
  { month: 8, day: 14, event: "1945年，日本宣布无条件投降" },
  { month: 8, day: 15, event: "1947年，印度独立" },
  { month: 8, day: 16, event: "1960年，塞浦路斯独立" },
  { month: 8, day: 17, event: "1945年，印度尼西亚独立" },
  { month: 8, day: 18, event: "1227年，成吉思汗逝世" },
  { month: 8, day: 19, event: "1991年，苏联发生政变" },
  { month: 8, day: 20, event: "1940年，托洛茨基在墨西哥被刺杀" },
  { month: 8, day: 21, event: "1959年，夏威夷成为美国第50个州" },
  { month: 8, day: 22, event: "1864年，日内瓦公约签署" },
  { month: 8, day: 23, event: "1939年，德苏签订互不侵犯条约" },
  { month: 8, day: 24, event: "79年，维苏威火山喷发摧毁庞贝古城" },
  { month: 8, day: 25, event: "1944年，巴黎解放" },
  { month: 8, day: 26, event: "1789年，法国人权宣言发表" },
  { month: 8, day: 27, event: "1883年，喀拉喀托火山爆发" },
  { month: 8, day: 28, event: "1963年，马丁·路德·金发表《我有一个梦想》演讲" },
  { month: 8, day: 29, event: "1949年，苏联试爆第一颗原子弹" },
  { month: 8, day: 30, event: "1963年，美苏建立热线联系" },
  { month: 8, day: 31, event: "1997年，戴安娜王妃在巴黎车祸中遇难" },

  // 九月
  { month: 9, day: 1, event: "1939年，德国入侵波兰，第二次世界大战爆发" },
  { month: 9, day: 2, event: "1945年，日本在密苏里号战舰上签署投降书" },
  { month: 9, day: 3, event: "1783年，美国独立战争结束" },
  { month: 9, day: 4, event: "1870年，法兰西第三共和国成立" },
  { month: 9, day: 5, event: "1972年，慕尼黑奥运会恐怖袭击事件" },
  { month: 9, day: 6, event: "1901年，美国总统麦金莱遇刺" },
  { month: 9, day: 7, event: "1822年，巴西独立" },
  { month: 9, day: 8, event: "1943年，意大利投降" },
  { month: 9, day: 9, event: "1976年，毛泽东逝世" },
  { month: 9, day: 10, event: "1919年，《圣日耳曼条约》签订" },
  { month: 9, day: 11, event: "2001年，911恐怖袭击事件" },
  { month: 9, day: 12, event: "1953年，赫鲁晓夫当选苏共第一书记" },
  { month: 9, day: 13, event: "1971年，林彪坠机事件" },
  { month: 9, day: 14, event: "1812年，拿破仑攻占莫斯科" },
  { month: 9, day: 15, event: "1916年，坦克首次在战场上使用" },
  { month: 9, day: 16, event: "1810年，墨西哥独立" },
  { month: 9, day: 17, event: "1939年，苏联入侵波兰" },
  { month: 9, day: 18, event: "1931年，九一八事变" },
  { month: 9, day: 19, event: "1893年，新西兰女性获得选举权" },
  { month: 9, day: 20, event: "1870年，意大利统一完成" },
  { month: 9, day: 21, event: "1937年，《霍比特人》出版" },
  { month: 9, day: 22, event: "1862年，林肯发表《解放黑奴宣言》" },
  { month: 9, day: 23, event: "1846年，海王星被发现" },
  { month: 9, day: 24, event: "1957年，小石城事件" },
  { month: 9, day: 25, event: "1513年，巴尔博亚发现太平洋" },
  { month: 9, day: 26, event: "1960年，第一次美苏电视辩论" },
  { month: 9, day: 27, event: "1940年，德意日三国同盟成立" },
  { month: 9, day: 28, event: "1864年，第一国际成立" },
  { month: 9, day: 29, event: "1923年，英国托管巴勒斯坦" },
  { month: 9, day: 30, event: "1949年，中华人民共和国成立大典举行前夕" },

  // 十月
  { month: 10, day: 1, event: "1949年，中华人民共和国成立" },
  { month: 10, day: 2, event: "1950年，《查理布朗》漫画首次发表" },
  { month: 10, day: 3, event: "1990年，德国统一" },
  { month: 10, day: 4, event: "1957年，苏联发射第一颗人造卫星" },
  { month: 10, day: 5, event: "1908年，保加利亚宣布独立" },
  { month: 10, day: 6, event: "1973年，第四次中东战争爆发" },
  { month: 10, day: 7, event: "1949年，德意志民主共和国成立" },
  { month: 10, day: 8, event: "1871年，芝加哥大火" },
  { month: 10, day: 9, event: "1962年，乌干达独立" },
  { month: 10, day: 10, event: "1911年，武昌起义爆发" },
  { month: 10, day: 11, event: "1962年，梵蒂冈第二次大公会议开幕" },
  { month: 10, day: 12, event: "1492年，哥伦布到达美洲" },
  { month: 10, day: 13, event: "1884年，格林尼治天文台被设定为世界时间的零度经线" },
  { month: 10, day: 14, event: "1964年，赫鲁晓夫下台" },
  { month: 10, day: 15, event: "1917年，玛塔·哈丽被处决" },
  { month: 10, day: 16, event: "1934年，红军开始长征" },
  { month: 10, day: 17, event: "1931年，芝加哥黑帮首领卡彭被判入狱" },
  { month: 10, day: 18, event: "1922年，英国广播公司（BBC）成立" },
  { month: 10, day: 19, event: "1781年，英军在约克镇投降" },
  { month: 10, day: 20, event: "1935年，红军长征胜利到达陕北" },
  { month: 10, day: 21, event: "1805年，特拉法尔加海战" },
  { month: 10, day: 22, event: "1962年，古巴导弹危机爆发" },
  { month: 10, day: 23, event: "1956年，匈牙利起义爆发" },
  { month: 10, day: 24, event: "1945年，联合国成立" },
  { month: 10, day: 25, event: "1971年，中华人民共和国加入联合国" },
  { month: 10, day: 26, event: "1863年，国际红十字会成立" },
  { month: 10, day: 27, event: "1904年，纽约地铁开通" },
  { month: 10, day: 28, event: "1886年，自由女神像落成" },
  { month: 10, day: 29, event: "1929年，美国股市崩盘" },
  { month: 10, day: 30, event: "1938年，奥森·威尔斯广播《世界大战》引发恐慌" },
  { month: 10, day: 31, event: "1517年，马丁·路德发表《九十五条论纲》" },

  // 十一月
  { month: 11, day: 1, event: "1755年，里斯本大地震" },
  { month: 11, day: 2, event: "1917年，贝尔福宣言发表" },
  { month: 11, day: 3, event: "1957年，苏联发射第二颗人造卫星" },
  { month: 11, day: 4, event: "1922年，图坦卡蒙陵墓被发现" },
  { month: 11, day: 5, event: "1605年，火药阴谋事件" },
  { month: 11, day: 6, event: "1860年，林肯当选美国总统" },
  { month: 11, day: 7, event: "1917年，十月革命爆发" },
  { month: 11, day: 8, event: "1519年，科尔特斯进入阿兹特克帝国首都" },
  { month: 11, day: 9, event: "1989年，柏林墙倒塌" },
  { month: 11, day: 10, event: "1969年，芝麻街首播" },
  { month: 11, day: 11, event: "1918年，第一次世界大战结束" },
  { month: 11, day: 12, event: "1927年，列宁格勒地铁开通" },
  { month: 11, day: 13, event: "1985年，内华达火山爆发" },
  { month: 11, day: 14, event: "1889年，记者妮莉·布莱环游世界80天" },
  { month: 11, day: 15, event: "1971年，英特尔发布第一个商用微处理器" },
  { month: 11, day: 16, event: "1945年，联合国教科文组织成立" },
  { month: 11, day: 17, event: "1869年，苏伊士运河通航" },
  { month: 11, day: 18, event: "1928年，米老鼠首次亮相" },
  { month: 11, day: 19, event: "1863年，林肯发表葛底斯堡演说" },
  { month: 11, day: 20, event: "1945年，纽伦堡审判开始" },
  { month: 11, day: 21, event: "1877年，爱迪生发明留声机" },
  { month: 11, day: 22, event: "1963年，肯尼迪总统遇刺" },
  { month: 11, day: 23, event: "1963年，英国广播公司推出《神秘博士》" },
  { month: 11, day: 24, event: "1859年，达尔文发表《物种起源》" },
  { month: 11, day: 25, event: "1952年，英国首相丘吉尔宣布英国拥有原子弹" },
  { month: 11, day: 26, event: "1922年，考古学家霍华德·卡特打开图坦卡蒙陵墓" },
  { month: 11, day: 27, event: "1895年，诺贝尔签署遗嘱设立诺贝尔奖" },
  { month: 11, day: 28, event: "1520年，麦哲伦发现太平洋" },
  { month: 11, day: 29, event: "1947年，联合国通过巴勒斯坦分治决议" },
  { month: 11, day: 30, event: "1872年，第一场国际足球比赛举行" },

  // 十二月
  { month: 12, day: 1, event: "1955年，罗莎·帕克斯拒绝让座" },
  { month: 12, day: 2, event: "1804年，拿破仑加冕为法兰西帝国皇帝" },
  { month: 12, day: 3, event: "1967年，第一次人类心脏移植手术" },
  { month: 12, day: 4, event: "1674年，法国建立东印度公司" },
  { month: 12, day: 5, event: "1492年，哥伦布发现海地岛" },
  { month: 12, day: 6, event: "1917年，芬兰宣布独立" },
  { month: 12, day: 7, event: "1941年，日本偷袭珍珠港" },
  { month: 12, day: 8, event: "1987年，美苏签署《中导条约》" },
  { month: 12, day: 9, event: "1961年，坦噶尼喀独立" },
  { month: 12, day: 10, event: "1901年，首届诺贝尔奖颁奖" },
  { month: 12, day: 11, event: "1936年，英国国王爱德华八世退位" },
  { month: 12, day: 12, event: "1911年，德里成为英属印度首都" },
  { month: 12, day: 13, event: "1937年，南京大屠杀" },
  { month: 12, day: 14, event: "1911年，挪威探险家阿蒙森到达南极点" },
  { month: 12, day: 15, event: "1965年，美国双子座计划完成" },
  { month: 12, day: 16, event: "1773年，波士顿倾茶事件" },
  { month: 12, day: 17, event: "1903年，莱特兄弟首次成功载人飞行" },
  { month: 12, day: 18, event: "1865年，美国宣布废除奴隶制" },
  { month: 12, day: 19, event: "1984年，英国同意将香港归还中国" },
  { month: 12, day: 20, event: "1999年，澳门回归中国" },
  { month: 12, day: 21, event: "1988年，洛克比空难" },
  { month: 12, day: 22, event: "1989年，罗马尼亚革命" },
  { month: 12, day: 23, event: "1947年，晶体管发明" },
  { month: 12, day: 24, event: "1814年，《根特条约》签署" },
  { month: 12, day: 25, event: "336年，罗马教会首次庆祝圣诞节" },
  { month: 12, day: 26, event: "2004年，印度洋海啸" },
  { month: 12, day: 27, event: "1932年，无线电城音乐厅开幕" },
  { month: 12, day: 28, event: "1895年，卢米埃尔兄弟举办首次公开电影放映" },
  { month: 12, day: 29, event: "1911年，孙中山当选为中华民国临时大总统" },
  { month: 12, day: 30, event: "1922年，苏联正式成立" },
  { month: 12, day: 31, event: "1943年，重庆谈判，国共两党达成合作协议" }
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

// 根据当前日期获取历史事件的函数
function getHistoricalEvent(month, day) {
  const event = HISTORICAL_EVENTS.find(e => e.month === month && e.day === day);
  return event ? event.event : "今天也是历史上的重要一天";
}

// 添加美食数据
const foods = [
  { type: '中国菜', items: [
    '红烧肉',
    '东坡肘子',
    '麻婆豆腐',
    '水煮鱼',
    '宫保鸡丁',
    '北京烤鸭',
    '小笼包',
    '叉烧包',
    '蟹黄豆腐',
    '佛跳墙',
    '糖醋排骨',
    '清蒸鲈鱼',
    '回锅肉',
    '东坡肉',
    '扬州炒饭'
  ]},
  { type: '日韩料理', items: [
    '寿司',
    '生鱼片',
    '天妇罗',
    '拉面',
    '韩式烤肉',
    '石锅拌饭',
    '寿喜烧',
    '炸猪排',
    '泡菜汤',
    '冷面',
    '章鱼烧',
    '乌冬面',
    '味增汤',
    '烤鳗鱼',
    '大阪烧'
  ]},
  { type: '西式美食', items: [
    '意大利面',
    '披萨',
    '牛排',
    '汉堡',
    '三明治',
    '沙拉',
    '法式蜗牛',
    '奶油蘑菇汤',
    '烤羊排',
    '西班牙海鲜饭',
    '法式鹅肝',
    '希腊沙拉',
    '德国猪肘',
    '英式炸鱼薯条',
    '俄罗斯红菜汤'
  ]},
  { type: '特色小吃', items: [
    '肠粉',
    '煎饼果子',
    '生煎包',
    '锅贴',
    '臭豆腐',
    '烤冷面',
    '羊肉串',
    '麻辣烫',
    '炸鸡',
    '肉夹馍',
    '烤面筋',
    '担担面',
    '酱香饼',
    '葱油饼',
    '手抓饼'
  ]}
];

Page({
  data: {
    currentDate: '',
    currentWeekday: '',
    currentMood: null,
    showFullscreen: false,
    animation: {},
    showActions: false,
    touchStartX: 0,
    touchStartY: 0,
    isSliding: false,
    slideDirection: '',
    slideClass: ''
  },

  onLoad() {
    this.updateDateTime();
    this.updateMood();
  },

  updateDateTime() {
    const now = new Date();
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    
    this.setData({
      currentDate: '开心',
      currentWeekday: '开心！加油，继续保持'
    });

    // 获取当天的历史事件
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const event = this.getHistoricalEvent(month, day);
    
    this.setData({
      historicalEvent: event
    });
  },

  updateDailyContent() {
    // 获取随机名言
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // 获取随机活动
    const randomActivityType = activities[Math.floor(Math.random() * activities.length)];
    const randomActivity = randomActivityType.items[Math.floor(Math.random() * randomActivityType.items.length)];

    // 获取随机美食
    const randomFoodType = foods[Math.floor(Math.random() * foods.length)];
    const randomFood = randomFoodType.items[Math.floor(Math.random() * randomFoodType.items.length)];

    this.setData({
      currentQuote: {
        content: randomQuote.zh,
        content_en: randomQuote.en
      },
      recommendActivity: randomActivity,
      recommendFood: randomFood
    });
  },

  getHistoricalEvent(month, day) {
    const event = HISTORICAL_EVENTS.find(e => e.month === month && e.day === day);
    return event ? event.event : "今天也是历史上的重要一天";
  },

  onShareAppMessage: function() {
    return {
      title: this.data.currentQuote.zh + ' —— ' + this.data.currentQuote.en,
      path: '/pages/daily-inspiration/daily-inspiration'
    };
  },

  onShareTimeline: function() {
    return {
      title: this.data.currentQuote.zh + ' —— ' + this.data.currentQuote.en
    };
  },

  // 更新心情卡片内容
  updateMood() {
    const randomIndex = Math.floor(Math.random() * MOODS.length);
    const mood = MOODS[randomIndex];
    const quote = mood.quotes[Math.floor(Math.random() * mood.quotes.length)];
    const poem = mood.poems[Math.floor(Math.random() * mood.poems.length)];
    
    this.setData({
      currentMood: {
        type: mood.text,
        color: mood.color,
        quote: quote,
        poem: poem
      },
      slideClass: '',  // 重置滑动类
      containerClass: `mood-${mood.type}`  // 添加心情类名
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
    
    // 水平滑动大于垂直滑动，且滑动距离超过50
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      this.setData({
        showActions: deltaX < 0  // 向左滑动显示操作按钮
      });
    }
    
    // 垂直滑动大于水平滑动，且滑动距离超过50
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
      this.setData({ isSliding: true });
      
      if (deltaY < 0) {  // 向上滑动
        this.startSlideAnimation('up');
      } else {  // 向下滑动
        this.startSlideAnimation('down');
      }
    }
  },

  // 触摸结束事件
  touchEnd() {
    this.setData({
      touchStartX: 0,
      touchStartY: 0
    });
  },

  // 开始滑动动画
  startSlideAnimation(direction) {
    const slideClass = direction === 'up' ? 'slide-up-animation' : 'slide-down-animation';
    
    this.setData({
      slideDirection: direction,
      slideClass: slideClass
    });

    // 等待动画结束后更新内容
    setTimeout(() => {
      this.updateMood();

      // 重置卡片位置
      this.setData({
        slideClass: 'slide-reset'
      });

      // 动画完成后重置状态
      setTimeout(() => {
        this.setData({
          isSliding: false,
          slideClass: ''
        });
      }, 500);  // 增加到500ms
    }, 400);  // 增加到400ms
  },

  // 长按保存图片
  async onLongPress() {
    try {
      const canvas = await this.createShareCanvas();
      const tempFilePath = await this.canvasToTempFilePath(canvas);
      await this.saveImageToPhotosAlbum(tempFilePath);
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
    } catch (error) {
      wx.showToast({
        title: '保存失败',
        icon: 'none'
      });
    }
  },

  // 分享给朋友
  onShareAppMessage() {
    return {
      title: `${this.data.currentMood.type} - ${this.data.currentMood.quote}`,
      path: '/pages/mood-card/mood-card'
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: `${this.data.currentMood.type} - ${this.data.currentMood.quote}`
    };
  }
});