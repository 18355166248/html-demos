/**
 * 现代页面性能监控工具
 * 使用 PerformanceNavigationTiming API 替代已废弃的 performance.timing
 */

class PerformanceMonitor {
  constructor() {
    this.startTime = performance.now();
    this.metrics = {};
    this.callbacks = [];
  }

  /**
   * 获取 PerformanceNavigationTiming 数据
   */
  getNavigationTiming() {
    const navigation = performance.getEntriesByType("navigation")[0];
    if (!navigation) {
      console.warn("无法获取 PerformanceNavigationTiming 数据");
      return null;
    }
    return navigation;
  }

  /**
   * 分析基础性能指标
   */
  analyzeBasicMetrics() {
    const navigation = this.getNavigationTiming();
    if (!navigation) return null;

    return {
      // 网络相关指标
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcpConnect: navigation.connectEnd - navigation.connectStart,
      sslHandshake:
        navigation.secureConnectionStart > 0
          ? navigation.connectEnd - navigation.secureConnectionStart
          : 0,
      ttfb: navigation.responseStart - navigation.requestStart,
      download: navigation.responseEnd - navigation.responseStart,

      // DOM相关指标
      domParse:
        navigation.domContentLoadedEventEnd -
        navigation.domContentLoadedEventStart,
      domReady: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      loadComplete: navigation.loadEventEnd - navigation.fetchStart,

      // 总时间
      totalTime: navigation.loadEventEnd - navigation.fetchStart,

      // 资源加载
      resourceLoad: navigation.loadEventEnd - navigation.loadEventStart,
    };
  }

  /**
   * 分析详细性能指标
   */
  analyzeDetailedMetrics() {
    const navigation = this.getNavigationTiming();
    if (!navigation) return null;

    const metrics = {
      // 网络阶段
      network: {
        dnsLookup: {
          start: navigation.domainLookupStart,
          end: navigation.domainLookupEnd,
          duration: navigation.domainLookupEnd - navigation.domainLookupStart,
        },
        tcpConnect: {
          start: navigation.connectStart,
          end: navigation.connectEnd,
          duration: navigation.connectEnd - navigation.connectStart,
        },
        sslHandshake: {
          start: navigation.secureConnectionStart,
          end: navigation.connectEnd,
          duration:
            navigation.secureConnectionStart > 0
              ? navigation.connectEnd - navigation.secureConnectionStart
              : 0,
        },
        request: {
          start: navigation.requestStart,
          end: navigation.responseEnd,
          duration: navigation.responseEnd - navigation.requestStart,
        },
      },

      // DOM阶段
      dom: {
        parse: {
          start: navigation.domLoading,
          end: navigation.domInteractive,
          duration: navigation.domInteractive - navigation.domLoading,
        },
        contentLoaded: {
          start: navigation.domContentLoadedEventStart,
          end: navigation.domContentLoadedEventEnd,
          duration:
            navigation.domContentLoadedEventEnd -
            navigation.domContentLoadedEventStart,
        },
        complete: {
          start: navigation.domComplete,
          end: navigation.loadEventStart,
          duration: navigation.loadEventStart - navigation.domComplete,
        },
      },

      // 加载阶段
      load: {
        start: navigation.loadEventStart,
        end: navigation.loadEventEnd,
        duration: navigation.loadEventEnd - navigation.loadEventStart,
      },
    };

    return metrics;
  }

  /**
   * 性能评估
   */
  evaluatePerformance(metrics) {
    const evaluation = {
      ttfb: this.evaluateTTFB(metrics.ttfb),
      domReady: this.evaluateDOMReady(metrics.domReady),
      totalLoad: this.evaluateTotalLoad(metrics.totalTime),
      dnsLookup: this.evaluateDNSLookup(metrics.dnsLookup),
      tcpConnect: this.evaluateTCPConnect(metrics.tcpConnect),
    };

    return evaluation;
  }

  /**
   * 评估TTFB (Time To First Byte)
   */
  evaluateTTFB(ttfb) {
    if (ttfb < 200) return { level: "excellent", message: "优秀 (< 200ms)" };
    if (ttfb < 600) return { level: "good", message: "良好 (200-600ms)" };
    if (ttfb < 1000) return { level: "fair", message: "一般 (600-1000ms)" };
    return { level: "poor", message: "较差 (> 1000ms)" };
  }

  /**
   * 评估DOM就绪时间
   */
  evaluateDOMReady(domReady) {
    if (domReady < 1000) return { level: "excellent", message: "优秀 (< 1s)" };
    if (domReady < 3000) return { level: "good", message: "良好 (1-3s)" };
    if (domReady < 5000) return { level: "fair", message: "一般 (3-5s)" };
    return { level: "poor", message: "较差 (> 5s)" };
  }

  /**
   * 评估总加载时间
   */
  evaluateTotalLoad(totalLoad) {
    if (totalLoad < 2000) return { level: "excellent", message: "优秀 (< 2s)" };
    if (totalLoad < 5000) return { level: "good", message: "良好 (2-5s)" };
    if (totalLoad < 10000) return { level: "fair", message: "一般 (5-10s)" };
    return { level: "poor", message: "较差 (> 10s)" };
  }

  /**
   * 评估DNS查询时间
   */
  evaluateDNSLookup(dnsLookup) {
    if (dnsLookup < 50) return { level: "excellent", message: "优秀 (< 50ms)" };
    if (dnsLookup < 100) return { level: "good", message: "良好 (50-100ms)" };
    if (dnsLookup < 200) return { level: "fair", message: "一般 (100-200ms)" };
    return { level: "poor", message: "较差 (> 200ms)" };
  }

  /**
   * 评估TCP连接时间
   */
  evaluateTCPConnect(tcpConnect) {
    if (tcpConnect < 100)
      return { level: "excellent", message: "优秀 (< 100ms)" };
    if (tcpConnect < 300) return { level: "good", message: "良好 (100-300ms)" };
    if (tcpConnect < 500) return { level: "fair", message: "一般 (300-500ms)" };
    return { level: "poor", message: "较差 (> 500ms)" };
  }

  /**
   * 生成性能报告
   */
  generateReport() {
    const basicMetrics = this.analyzeBasicMetrics();
    if (!basicMetrics) {
      return { error: "无法获取性能数据" };
    }

    const evaluation = this.evaluatePerformance(basicMetrics);
    const detailedMetrics = this.analyzeDetailedMetrics();

    return {
      basicMetrics,
      detailedMetrics,
      evaluation,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };
  }

  /**
   * 格式化性能指标显示
   */
  formatMetrics(metrics) {
    const formatted = {};
    for (const [key, value] of Object.entries(metrics)) {
      if (typeof value === "number") {
        formatted[key] = `${Math.round(value)}ms`;
      } else {
        formatted[key] = value;
      }
    }
    return formatted;
  }

  /**
   * 监听性能事件
   */
  onPerformanceEvent(callback) {
    this.callbacks.push(callback);
  }

  /**
   * 触发性能事件
   */
  triggerPerformanceEvent(eventType, data) {
    this.callbacks.forEach((callback) => {
      try {
        callback(eventType, data);
      } catch (error) {
        console.error("性能事件回调执行错误:", error);
      }
    });
  }

  /**
   * 获取资源加载性能
   */
  getResourceTiming() {
    const resources = performance.getEntriesByType("resource");
    return resources.map((resource) => ({
      name: resource.name,
      type: resource.initiatorType,
      duration: resource.duration,
      size: resource.transferSize,
      startTime: resource.startTime,
      fetchStart: resource.fetchStart,
      domainLookupStart: resource.domainLookupStart,
      domainLookupEnd: resource.domainLookupEnd,
      connectStart: resource.connectStart,
      connectEnd: resource.connectEnd,
      requestStart: resource.requestStart,
      responseStart: resource.responseStart,
      responseEnd: resource.responseEnd,
    }));
  }

  /**
   * 分析资源加载性能
   */
  analyzeResourcePerformance() {
    const resources = this.getResourceTiming();
    const analysis = {
      total: resources.length,
      byType: {},
      slowest: null,
      largest: null,
    };

    let slowestTime = 0;
    let largestSize = 0;

    resources.forEach((resource) => {
      // 按类型分组
      if (!analysis.byType[resource.type]) {
        analysis.byType[resource.type] = [];
      }
      analysis.byType[resource.type].push(resource);

      // 找出最慢的资源
      if (resource.duration > slowestTime) {
        slowestTime = resource.duration;
        analysis.slowest = resource;
      }

      // 找出最大的资源
      if (resource.size > largestSize) {
        largestSize = resource.size;
        analysis.largest = resource;
      }
    });

    return analysis;
  }
}

// 导出性能监控器
if (typeof module !== "undefined" && module.exports) {
  module.exports = PerformanceMonitor;
} else {
  window.PerformanceMonitor = PerformanceMonitor;
}
