# 动乐帮手（MVP版）

## 项目概述
本微信小程序旨在通过鼓励用户运动来兑换游戏时间，帮助用户培养健康的生活习惯。核心功能包括用户注册/登录、提交运动记录、验证码验证以及自动兑换游戏时间。所有后端逻辑均采用微信小程序云开发实现，无需额外部署独立服务器。

## 快速开始

1. 克隆项目到本地
2. 使用微信开发者工具打开项目
3. 在项目根目录下的`project.config.json`中配置您的AppID
4. 开启云开发环境并完成相关配置
5. 编译运行项目

## 项目文档

详细的项目信息请参考以下文档：

- [需求文档](docs/requirements.md)：详细的项目需求说明
- [现有功能文档](docs/existing-functionality.md)：当前项目功能和实现状态
- [流程图文档](docs/flowcharts.md)：项目架构和工作流程图（使用Mermaid格式）
- [项目计划文档](docs/project-plan.md)：项目时间线、任务和里程碑

## 文档规范

1. 所有流程图和图表必须使用Mermaid格式创建
2. 项目计划中的任务和里程碑使用复选框格式（例如：[ ] 任务1）
3. 代码风格和开发规范定义在.cursorrules文件中：
   - 代码格式和风格约定
   - 变量、函数和文件的命名约定
   - 项目特定规则和最佳实践
   - AI助手提示以保持代码生成一致性
   - 定期更新以保持与项目发展的一致性

## 技术栈

- 前端：微信小程序原生开发
- 后端：微信云开发
  - 云函数：实现业务逻辑
  - 云数据库：数据存储
- 开发工具：微信开发者工具

## 开发计划

- 总开发周期：4-6周
- 当前阶段：功能完善和性能优化
- 后续规划：
  - 完善数据统计和分析功能
  - 优化用户界面和交互体验
  - 增加社交分享等激励机制

## 项目状态

目前项目处于MVP开发阶段，已完成基础框架搭建和大部分核心功能实现，包括用户系统、运动记录和游戏时间管理等主要功能模块。详细的功能实现状态请参考[现有功能文档](docs/existing-functionality.md)。