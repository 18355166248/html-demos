# 页面性能指标分析 - PerformanceNavigationTiming

## 概述

本项目演示了如何使用现代的 `PerformanceNavigationTiming` API 替代已废弃的 `performance.timing` 进行页面性能分析。

## 文件说明

### 1. firstScreen.html

- **功能**: 基础的页面性能监控演示
- **特点**:
  - 使用 `PerformanceNavigationTiming` API
  - 实时显示性能指标
  - 包含图片加载测试
  - 事件日志记录

### 2. performance-metrics.html

- **功能**: 详细的性能指标分析页面
- **特点**:
  - 完整的性能指标展示
  - 可视化时间线分析
  - 性能评估和建议
  - 资源加载分析
  - 可导出性能报告

### 3. performance-monitor.js

- **功能**: 性能监控工具类
- **特点**:
  - 封装了 `PerformanceNavigationTiming` API
  - 提供性能评估功能
  - 支持资源加载分析
  - 可扩展的事件系统

## PerformanceNavigationTiming API 详解

### 主要指标

#### 网络相关指标

- **DNS 查询时间**: `domainLookupEnd - domainLookupStart`
- **TCP 连接时间**: `connectEnd - connectStart`
- **SSL 握手时间**: `connectEnd - secureConnectionStart`
- **TTFB (首字节时间)**: `responseStart - requestStart`
- **下载时间**: `responseEnd - responseStart`

#### DOM 相关指标

- **DOM 解析时间**: `domContentLoadedEventEnd - domContentLoadedEventStart`
- **DOM 就绪时间**: `domContentLoadedEventEnd - fetchStart`
- **页面加载时间**: `loadEventEnd - loadEventStart`

#### 总体指标

- **总加载时间**: `loadEventEnd - fetchStart`

### 与旧 API 的对比

| 旧 API (performance.timing)      | 新 API (PerformanceNavigationTiming) |
| -------------------------------- | ------------------------------------ |
| `navigationStart`                | `fetchStart`                         |
| `domainLookupStart/End`          | `domainLookupStart/End`              |
| `connectStart/End`               | `connectStart/End`                   |
| `requestStart`                   | `requestStart`                       |
| `responseStart/End`              | `responseStart/End`                  |
| `domLoading`                     | `domLoading`                         |
| `domInteractive`                 | `domInteractive`                     |
| `domContentLoadedEventStart/End` | `domContentLoadedEventStart/End`     |
| `domComplete`                    | `domComplete`                        |
| `loadEventStart/End`             | `loadEventStart/End`                 |

### 新 API 的优势

1. **更高精度**: 支持微秒级时间戳
2. **更多指标**: 提供更丰富的性能数据
3. **更好兼容性**: 现代浏览器广泛支持
4. **标准合规**: 符合现代 Web 标准

## 使用方法

### 基础使用

```javascript
// 获取 PerformanceNavigationTiming 数据
const navigation = performance.getEntriesByType("navigation")[0];

// 计算关键指标
const ttfb = navigation.responseStart - navigation.requestStart;
const domReady = navigation.domContentLoadedEventEnd - navigation.fetchStart;
const totalLoad = navigation.loadEventEnd - navigation.fetchStart;
```

### 使用性能监控器

```javascript
// 创建监控器实例
const monitor = new PerformanceMonitor();

// 生成性能报告
const report = monitor.generateReport();

// 分析资源性能
const resourceAnalysis = monitor.analyzeResourcePerformance();
```

## 性能评估标准

### TTFB (首字节时间)

- **优秀**: < 200ms
- **良好**: 200-600ms
- **一般**: 600-1000ms
- **较差**: > 1000ms

### DOM 就绪时间

- **优秀**: < 1s
- **良好**: 1-3s
- **一般**: 3-5s
- **较差**: > 5s

### 总加载时间

- **优秀**: < 2s
- **良好**: 2-5s
- **一般**: 5-10s
- **较差**: > 10s

## 浏览器兼容性

| 浏览器  | 版本支持 |
| ------- | -------- |
| Chrome  | 57+      |
| Firefox | 58+      |
| Safari  | 11+      |
| Edge    | 79+      |

## 注意事项

1. **废弃警告**: `performance.timing` 已被废弃，不应在新项目中使用
2. **数据可用性**: 某些指标可能在某些情况下不可用
3. **精度差异**: 不同浏览器的时间精度可能不同
4. **隐私考虑**: 性能数据可能包含敏感信息

## 最佳实践

1. **错误处理**: 始终检查 API 是否可用
2. **数据验证**: 验证时间戳的有效性
3. **性能考虑**: 避免频繁查询性能数据
4. **用户隐私**: 注意性能数据的隐私影响

## 示例代码

```javascript
// 检查API支持
if (performance.getEntriesByType) {
  const navigation = performance.getEntriesByType("navigation")[0];
  if (navigation) {
    // 计算性能指标
    const metrics = {
      ttfb: navigation.responseStart - navigation.requestStart,
      domReady: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      totalLoad: navigation.loadEventEnd - navigation.fetchStart,
    };

    console.log("性能指标:", metrics);
  }
}
```

## 相关资源

- [MDN PerformanceNavigationTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming)
- [Web Performance Working Group](https://www.w3.org/webperf/)
- [Chrome DevTools Performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance)
