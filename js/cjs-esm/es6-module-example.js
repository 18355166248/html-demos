// ES6 模块示例
// 文件名: es6-module-example.js

// 1. 命名导出
export const PI = 3.14159;

// 2. 导出函数
export function greet(name) {
  return `Hello, ${name}!`;
}

// 3. 导出类
export class Calculator {
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

// 4. 导出对象
export const math = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

// 5. 导出箭头函数
export const square = (x) => x * x;
export const cube = (x) => x * x * x;

// 6. 默认导出（只能有一个）
const defaultCalculator = new Calculator();
export default defaultCalculator;

// 7. 重新导出
export { PI as MathPI } from "./math-constants.js";

// 8. 聚合导出
export * from "./math-utils.js";

// 9. 动态导入支持
export async function loadModule(moduleName) {
  const module = await import(moduleName);
  return module;
}

// 10. 条件导出（在 ES6 中需要使用动态导入）
export const isDevelopment = process.env.NODE_ENV === "development";
