// CommonJS 模块示例
// 文件名: commonjs-example.js

// 1. 导出单个值
const PI = 3.14159;
module.exports = PI;

// 2. 导出多个值（使用对象）
const math = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

// 3. 导出函数
function greet(name) {
  return `Hello, ${name}!`;
}

// 4. 导出类
class Calculator {
  constructor() {
    this.result = 0;
  }

  add(value) {
    this.result += value;
    return this;
  }

  subtract(value) {
    this.result -= value;
    return this;
  }

  getResult() {
    return this.result;
  }
}

// 5. 导出多个内容
module.exports = {
  PI,
  math,
  greet,
  Calculator,
  // 也可以直接导出函数
  square: (x) => x * x,
  cube: (x) => x * x * x,
};

// 6. 动态导出（根据条件）
if (process.env.NODE_ENV === "development") {
  module.exports.debug = true;
}

// 7. 循环依赖处理
let dependency = null;
module.exports.setDependency = (dep) => {
  dependency = dep;
};
module.exports.getDependency = () => dependency;
