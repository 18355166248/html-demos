// ES6 导入示例
// 文件名: es6-import-example.js

// 1. 导入命名导出
import {
  PI,
  greet,
  math,
  Calculator,
  square,
  cube,
} from "./es6-module-example.js";
console.log("导入的 PI:", PI);
console.log("导入的问候:", greet("王五"));
console.log("导入的数学运算:", math.add(10, 5));

// 2. 导入默认导出
import defaultCalculator from "./es6-module-example.js";
console.log("默认计算器:", defaultCalculator);

// 3. 导入所有命名导出（作为命名空间）
import * as MathModule from "./es6-module-example.js";
console.log("命名空间导入:", MathModule);

// 4. 重命名导入
import { PI as MathPI, greet as sayHello } from "./es6-module-example.js";
console.log("重命名的 PI:", MathPI);
console.log("重命名的问候:", sayHello("赵六"));

// 5. 混合导入（默认导出 + 命名导出）
import defaultCalc, { PI, greet } from "./es6-module-example.js";
console.log("混合导入:", { defaultCalc, PI, greet });

// 6. 动态导入（异步）
async function loadModules() {
  try {
    // 动态导入单个模块
    const mathModule = await import("./es6-module-example.js");
    console.log("动态导入的模块:", mathModule);

    // 动态导入多个模块
    const [module1, module2] = await Promise.all([
      import("./es6-module-example.js"),
      import("./another-module.js"),
    ]);

    // 条件导入
    const moduleName =
      process.env.NODE_ENV === "production"
        ? "./prod-module.js"
        : "./dev-module.js";
    const conditionalModule = await import(moduleName);
  } catch (error) {
    console.error("动态导入失败:", error);
  }
}

// 7. 重新导出
export { PI, greet } from "./es6-module-example.js";
export { default as Calculator } from "./es6-module-example.js";

// 8. 聚合重新导出
export * from "./es6-module-example.js";

// 9. 导入 JSON 模块
import packageJson from "./package.json" assert { type: "json" };
console.log("包信息:", packageJson);

// 10. 导入 CSS 模块（在支持的环境中）
// import styles from './styles.css' assert { type: 'css' };

// 11. 导入 WebAssembly 模块
// const wasmModule = await import('./module.wasm');

// 12. 错误处理
try {
  const nonExistentModule = await import("./non-existent.js");
} catch (error) {
  console.error("模块导入失败:", error.message);
}

// 13. 模块热重载（在开发环境中）
if (import.meta.hot) {
  import.meta.hot.accept("./es6-module-example.js", (newModule) => {
    console.log("模块已热重载:", newModule);
  });
}

// 14. 使用导入的类
const calculator = new Calculator();
calculator.add(20).subtract(5);
console.log("ES6 计算器结果:", calculator.getResult());

// 15. 使用导入的函数
console.log("平方函数:", square(6));
console.log("立方函数:", cube(3));
