# DOMContentLoaded vs window.onload 演示

这个目录包含了演示 `DOMContentLoaded` 和 `window.onload` 事件差异的 HTML 文件。

## 📁 文件说明

### 1. `windowOnload.html` - 基础演示

- **功能**: 展示基本的 DOMContentLoaded 和 window.onload 事件触发时机
- **特点**:
  - 包含 4 张随机图片
  - 实时显示事件触发时间
  - 包含 async 和 defer 脚本演示
- **使用方法**: 直接在浏览器中打开，观察控制台输出

### 2. `image-loading-demo.html` - 交互式演示

- **功能**: 专门演示图片加载不影响 DOMContentLoaded 的场景
- **特点**:
  - 交互式按钮控制图片加载
  - 实时事件日志显示
  - 进度条显示加载状态
  - 8 张随机图片模拟网络延迟
- **使用方法**:
  1. 打开页面
  2. 点击"开始加载图片"按钮
  3. 观察事件日志中的触发顺序

## 🎯 核心概念

### DOMContentLoaded 事件

- **触发时机**: HTML 文档被完全加载和解析时
- **特点**: 不等待图片、样式表、子框架等外部资源
- **用途**: 适合在 DOM 准备好后立即执行的代码

### window.onload 事件

- **触发时机**: 整个页面（包括所有依赖资源）都加载完成时
- **特点**: 等待所有图片、样式表、脚本等资源加载完成
- **用途**: 适合需要所有资源都准备好的场景

## 📊 预期的事件触发顺序

1. **DOMContentLoaded** - HTML 解析完成
2. **图片开始加载** - 各种图片资源开始下载
3. **图片加载完成** - 各张图片陆续加载完成
4. **window.onload** - 所有资源加载完成

## 🔧 技术要点

### 脚本加载方式

- **普通脚本**: 会阻塞 DOM 解析
- **async 脚本**: 不阻塞 DOM 解析，下载完成后立即执行
- **defer 脚本**: 不阻塞 DOM 解析，在 DOMContentLoaded 之前执行

### 图片加载

- 使用 `picsum.photos` 服务提供随机图片
- 模拟网络延迟加载
- 包含加载成功和失败的处理

## 🚀 快速开始

1. 打开 `windowOnload.html` 查看基础演示
2. 打开 `image-loading-demo.html` 进行交互式测试
3. 打开浏览器开发者工具的控制台查看详细日志
4. 观察页面上的事件日志显示

## 📝 学习要点

- 理解 DOMContentLoaded 和 window.onload 的区别
- 了解图片加载不影响 DOM 解析的原理
- 掌握不同脚本加载方式的特性
- 学会在实际项目中合理使用这些事件
