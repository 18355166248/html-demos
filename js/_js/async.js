// 异步脚本 - 不阻塞DOM解析，下载完成后立即执行
console.log(
  `[${
    Date.now() - performance.timing.navigationStart
  }ms] ⚡ 异步脚本执行 (async.js)`
);
