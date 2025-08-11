// CommonJS 导入示例
// 文件名: commonjs-import-example.js

// 1. 导入整个模块
const mathModule = require("./commonjs-example.js");
console.log("导入的模块:", mathModule);

// 2. 使用导入的函数和变量
console.log("PI 值:", mathModule.PI);
console.log("问候语:", mathModule.greet("张三"));
console.log("数学运算:", mathModule.math.add(5, 3));

// 3. 创建计算器实例
const calc = new mathModule.Calculator();
calc.add(10).subtract(3);
console.log("计算结果:", calc.getResult());

// 4. 使用其他函数
console.log("平方:", mathModule.square(4));
console.log("立方:", mathModule.cube(3));

// 5. 解构赋值（需要先导入整个模块）
const { PI, greet, math, Calculator } = require("./commonjs-example.js");
console.log("解构后的 PI:", PI);
console.log("解构后的问候:", greet("李四"));

// 6. 导入单个文件
const fs = require("fs");
const path = require("path");

// 7. 条件导入
let config;
if (process.env.NODE_ENV === "production") {
  config = require("./config.prod.js");
} else {
  config = require("./config.dev.js");
}

// 8. 动态导入（Node.js 12+）
async function loadModule() {
  try {
    const module = await import("./es6-module-example.js");
    console.log("动态导入的 ES6 模块:", module);
  } catch (error) {
    console.error("动态导入失败:", error);
  }
}

// 9. 循环依赖示例
const moduleA = require("./module-a.js");
const moduleB = require("./module-b.js");

// 10. 缓存机制演示
console.log("模块缓存:", require.cache);

// 11. 清除缓存
delete require.cache[require.resolve("./commonjs-example.js")];

// 12. 错误处理
try {
  const nonExistentModule = require("./non-existent.js");
} catch (error) {
  console.error("模块不存在:", error.message);
}
