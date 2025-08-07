// 普通脚本 - 会阻塞DOM解析
console.log(
  `[${
    Date.now() - performance.timing.navigationStart
  }ms] 📜 普通脚本执行 (script.js)`
);
