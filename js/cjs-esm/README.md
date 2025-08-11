# CommonJS vs ES6 模块系统对比

这个目录包含了 CommonJS 和 ES6 模块系统的详细对比和示例代码。

## 📁 文件结构

```
cjs-esm/
├── commonjs-example.js          # CommonJS 导出示例
├── commonjs-import-example.js   # CommonJS 导入示例
├── es6-module-example.js        # ES6 模块导出示例
├── es6-import-example.js        # ES6 模块导入示例
├── comparison.html              # 交互式对比演示页面
└── README.md                   # 本文件
```

## 🔍 核心区别

### 1. 加载机制

| 特性         | CommonJS   | ES6 模块   |
| ------------ | ---------- | ---------- |
| **加载方式** | 同步加载   | 异步加载   |
| **确定时机** | 运行时确定 | 编译时确定 |
| **缓存机制** | 有缓存     | 有缓存     |
| **循环依赖** | 支持       | 有限支持   |

### 2. 语法对比

#### 导出语法

**CommonJS:**

```javascript
// 单个导出
module.exports = value;

// 多个导出
module.exports = {
  func1,
  func2,
  class1,
};

// 动态导出
if (condition) {
  module.exports.debug = true;
}
```

**ES6 模块:**

```javascript
// 命名导出
export const value = 42;
export function func() {}

// 默认导出
export default class {}

// 重新导出
export { name } from "./module.js";
```

#### 导入语法

**CommonJS:**

```javascript
// 导入整个模块
const module = require("./module.js");

// 解构导入
const { func1, func2 } = require("./module.js");
```

**ES6 模块:**

```javascript
// 命名导入
import { func, value } from "./module.js";

// 默认导入
import defaultExport from "./module.js";

// 命名空间导入
import * as module from "./module.js";

// 重命名导入
import { func as myFunc } from "./module.js";
```

## 🚀 主要特性对比

### CommonJS 特性

✅ **优点:**

- Node.js 原生支持
- 同步加载，简单直接
- 支持循环依赖
- 运行时动态性
- 向后兼容性好

❌ **缺点:**

- 不支持静态分析
- 无法进行树摇优化
- 浏览器不支持
- 模块路径必须是字符串

### ES6 模块特性

✅ **优点:**

- 静态分析支持
- 树摇优化
- 浏览器原生支持
- 更好的错误处理
- 异步动态导入
- 更严格的模块规范

❌ **缺点:**

- 循环依赖处理复杂
- 需要现代环境支持
- 动态导入相对复杂

## 📊 使用场景

### CommonJS 适用场景

1. **Node.js 后端开发**

   - 服务器端应用
   - 命令行工具
   - 构建脚本

2. **传统项目**

   - 旧项目维护
   - 需要向后兼容
   - 简单的模块化需求

3. **动态需求**
   - 需要运行时确定模块
   - 条件加载模块
   - 插件系统

### ES6 模块适用场景

1. **现代前端开发**

   - React/Vue/Angular 项目
   - 现代浏览器应用
   - 单页应用 (SPA)

2. **构建工具项目**

   - Webpack/Vite 项目
   - 需要树摇优化
   - 代码分割需求

3. **库开发**
   - 现代 JavaScript 库
   - 需要静态分析
   - 支持多种环境

## 🔧 实际示例

### 数学工具模块

**CommonJS 版本:**

```javascript
// math-utils.js
const PI = 3.14159;

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = {
  PI,
  add,
  multiply,
};
```

**ES6 模块版本:**

```javascript
// math-utils.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
```

### 使用示例

**CommonJS 使用:**

```javascript
const math = require("./math-utils.js");
console.log(math.PI);
console.log(math.add(2, 3));
```

**ES6 模块使用:**

```javascript
import { PI, add } from "./math-utils.js";
console.log(PI);
console.log(add(2, 3));
```

## 🌐 浏览器支持

### ES6 模块浏览器支持

| 浏览器  | 版本支持 |
| ------- | -------- |
| Chrome  | 61+      |
| Firefox | 60+      |
| Safari  | 10.1+    |
| Edge    | 16+      |

### 使用方式

```html
<!-- ES6 模块在浏览器中的使用 -->
<script type="module">
  import { func } from "./module.js";
  console.log(func());
</script>
```

## 🔄 迁移策略

### 从 CommonJS 迁移到 ES6 模块

1. **逐步迁移**

   ```javascript
   // 混合使用
   const oldModule = require("./old-module.js");
   import { newFunc } from "./new-module.js";
   ```

2. **使用构建工具**

   - Webpack 支持两种格式
   - Babel 可以转换
   - Rollup 支持转换

3. **更新 package.json**
   ```json
   {
     "type": "module", // 启用 ES6 模块
     "main": "index.js"
   }
   ```

## 🛠️ 工具支持

### 构建工具

- **Webpack**: 支持两种格式
- **Rollup**: 主要支持 ES6 模块
- **Vite**: 基于 ES6 模块
- **Parcel**: 自动检测格式

### 转换工具

- **Babel**: 可以转换 ES6 模块为 CommonJS
- **esbuild**: 快速转换
- **SWC**: Rust 实现的快速转换

## 📝 最佳实践

### CommonJS 最佳实践

1. **统一导出格式**

   ```javascript
   // 推荐
   module.exports = {
     func1,
     func2,
   };

   // 避免
   module.exports.func1 = func1;
   module.exports.func2 = func2;
   ```

2. **使用解构导入**
   ```javascript
   const { func1, func2 } = require("./module.js");
   ```

### ES6 模块最佳实践

1. **优先使用命名导出**

   ```javascript
   // 推荐
   export function func() {}
   export const value = 42;

   // 避免过度使用默认导出
   ```

2. **使用有意义的导入名称**

   ```javascript
   // 推荐
   import { createUser } from "./user.js";

   // 避免
   import { createUser as user } from "./user.js";
   ```

3. **合理使用重新导出**
   ```javascript
   // 创建统一的 API
   export { User } from "./user.js";
   export { Product } from "./product.js";
   ```

## 🎯 总结

- **CommonJS**: 适合 Node.js 环境和传统项目
- **ES6 模块**: 适合现代前端开发和需要优化的项目
- **选择标准**: 根据项目需求、团队技能和环境支持来决定
- **迁移策略**: 可以逐步迁移，构建工具支持混合使用

两种模块系统各有优势，理解它们的区别有助于在合适的场景中选择合适的技术。
