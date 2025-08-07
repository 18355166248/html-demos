// 延迟脚本 - 不阻塞DOM解析，在DOMContentLoaded之前执行
console.log(
  `[${
    Date.now() - performance.timing.navigationStart
  }ms] ⏳ 延迟脚本执行 (defer.js)`
);
