import { anhuiData } from "./data/anhui.js";
const data = anhuiData;

// 中国地图数据
// import { chinaData } from "./data/china-parse.js";
// const data = chinaData.features[0];

const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

// 初始化canvas尺寸
function initCanvasSize() {
  const canvasContainer = document.querySelector(".canvas-container");
  const containerWidth = canvasContainer.clientWidth - 40; // 减去内边距
  const containerHeight = canvasContainer.clientHeight - 40;

  // 宽度超过600px时，自适应容器高度
  let size;
  if (window.innerWidth >= 600) {
    size = Math.min(containerWidth, containerHeight);
  } else {
    // 小屏幕保持方形
    size = Math.min(containerWidth, window.innerHeight * 0.5);
  }

  canvas.width = size;
  canvas.height = size;
}

// 绘制地图函数
function drawMap() {
  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 计算边界以便缩放地图
  const bounds = calculateBounds(data.geometry.coordinates[0][0]);
  const scale = Math.min(
    (canvas.width - 40) / (bounds.maxX - bounds.minX),
    (canvas.height - 40) / (bounds.maxY - bounds.minY)
  );

  // 偏移量，使地图居中
  const offsetX =
    (canvas.width - (bounds.maxX - bounds.minX) * scale) / 2 -
    bounds.minX * scale;
  const offsetY =
    (canvas.height - (bounds.maxY - bounds.minY) * scale) / 2 -
    bounds.minY * scale;

  // 绘制地图主体
  ctx.save();

  // 绘制内阴影效果
  drawInnerShadow(data.geometry.coordinates[0][0], scale, offsetX, offsetY);

  // 绘制边界线
  // drawBorder(data.geometry.coordinates[0][0], scale, offsetX, offsetY);

  // 将 canvas 恢复到最近的保存save状态
  ctx.restore();
}

// 计算边界函数
function calculateBounds(coordinates) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const point of coordinates) {
    minX = Math.min(minX, point[0]);
    maxX = Math.max(maxX, point[0]);
    minY = Math.min(minY, point[1]);
    maxY = Math.max(maxY, point[1]);
  }

  return { minX, minY, maxX, maxY };
}

// 绘制多边形填充
function drawPolygon(coordinates, scale, offsetX, offsetY, fillColor) {
  ctx.beginPath();

  for (let i = 0; i < coordinates.length; i++) {
    const x = coordinates[i][0] * scale + offsetX;
    const y = coordinates[i][1] * scale + offsetY;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
}

// 绘制边界线
function drawBorder(coordinates, scale, offsetX, offsetY) {
  ctx.beginPath();

  for (let i = 0; i < coordinates.length; i++) {
    const x = coordinates[i][0] * scale + offsetX;
    const y = coordinates[i][1] * scale + offsetY;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath();
  ctx.strokeStyle = "#0277bd";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// 绘制内阴影效果
function drawInnerShadow(coordinates, scale, offsetX, offsetY) {
  const shadowStyle = document.getElementById("shadow-style").value;
  const shadowBlur = parseInt(document.getElementById("shadow-blur").value);
  const shadowColor = document.getElementById("shadow-color").value;

  switch (shadowStyle) {
    case "glow":
      drawInnerGlow(
        coordinates,
        scale,
        offsetX,
        offsetY,
        shadowBlur,
        shadowColor
      );
      break;
    case "multiple":
      drawMultipleShadow(
        coordinates,
        scale,
        offsetX,
        offsetY,
        shadowBlur,
        shadowColor
      );
      break;
    case "gradient":
      drawGradientShadow(
        coordinates,
        scale,
        offsetX,
        offsetY,
        shadowBlur,
        shadowColor,
        shadowColor
      );
      break;
    case "classic":
    default:
      drawClassicInnerShadow(
        coordinates,
        scale,
        offsetX,
        offsetY,
        shadowBlur,
        shadowColor
      );
      break;
  }
}

function drawClassicInnerShadow(
  coordinates,
  scale,
  offsetX,
  offsetY,
  shadowBlur,
  shadowColor
) {
  ctx.save();

  // 获取经典内阴影的自定义配置
  const fillColor = document.getElementById("classic-fill-color").value;
  const fillOpacity =
    document.getElementById("classic-fill-opacity").value / 100;

  const path2D = new Path2D();
  // 首先绘制主要路径
  for (let i = 0; i < coordinates.length; i++) {
    const x = coordinates[i][0] * scale + offsetX;
    const y = coordinates[i][1] * scale + offsetY;

    if (i === 0) {
      path2D.moveTo(x, y);
    } else {
      path2D.lineTo(x, y);
    }
  }
  path2D.closePath();

  // 内阴影设置
  ctx.save();
  // source-out 在不与现有画布内容重叠的地方绘制新图形,绘制会导致画布上面之前的图形都变成透明的
  ctx.globalCompositeOperation = "source-out";
  ctx.shadowBlur = shadowBlur;
  ctx.shadowColor = "#000";
  ctx.fillStyle = shadowColor;
  ctx.fill(path2D);
  ctx.restore();

  ctx.save();
  // destination-over 在现有的画布内容后面绘制新的图形,绘制不会导致画布上面之前的图形都变为透明
  ctx.globalCompositeOperation = "destination-over";
  const rgbaFill = hexToRgba(fillColor, fillOpacity);
  ctx.fillStyle = rgbaFill;
  ctx.fill(path2D);
  ctx.restore();
}

// 内发光效果
function drawInnerGlow(
  coordinates,
  scale,
  offsetX,
  offsetY,
  shadowBlur,
  shadowColor
) {
  ctx.save();

  // 绘制主要路径
  ctx.beginPath();
  for (let i = 0; i < coordinates.length; i++) {
    const x = coordinates[i][0] * scale + offsetX;
    const y = coordinates[i][1] * scale + offsetY;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();

  // 创建剪切区域
  ctx.clip();

  // 内发光设置
  ctx.shadowBlur = shadowBlur * 2;
  ctx.shadowColor = shadowColor;

  // 绘制小一些的路径创建内发光效果
  ctx.beginPath();
  const shrinkFactor = 0.97;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  for (let i = 0; i < coordinates.length; i++) {
    const x = coordinates[i][0] * scale + offsetX;
    const y = coordinates[i][1] * scale + offsetY;

    // 向中心收缩
    const shrunkX = centerX + (x - centerX) * shrinkFactor;
    const shrunkY = centerY + (y - centerY) * shrinkFactor;

    if (i === 0) {
      ctx.moveTo(shrunkX, shrunkY);
    } else {
      ctx.lineTo(shrunkX, shrunkY);
    }
  }

  ctx.closePath();
  ctx.strokeStyle = shadowColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.restore();
}

// 多层阴影效果
function drawMultipleShadow(
  coordinates,
  scale,
  offsetX,
  offsetY,
  shadowBlur,
  shadowColor
) {
  // 绘制第一层
  ctx.save();

  ctx.beginPath();
  for (let i = 0; i < coordinates.length; i++) {
    const x = coordinates[i][0] * scale + offsetX;
    const y = coordinates[i][1] * scale + offsetY;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.clip();

  // 第一层阴影
  ctx.shadowBlur = shadowBlur;
  ctx.shadowColor = shadowColor;

  ctx.beginPath();
  ctx.rect(0 - 100, 0 - 100, canvas.width + 200, canvas.height + 200);
  for (let i = coordinates.length - 1; i >= 0; i--) {
    const x = coordinates[i][0] * scale + offsetX;
    const y = coordinates[i][1] * scale + offsetY;

    if (i === coordinates.length - 1) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fill();
  ctx.restore();

  // 绘制第二层
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < coordinates.length; i++) {
    const x = coordinates[i][0] * scale + offsetX;
    const y = coordinates[i][1] * scale + offsetY;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.clip();

  // 第二层阴影
  ctx.shadowBlur = shadowBlur / 2;
  ctx.shadowColor = shadowColor;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.beginPath();
  const shrinkFactor = 0.98;
  for (let i = 0; i < coordinates.length; i++) {
    const x = coordinates[i][0] * scale + offsetX;
    const y = coordinates[i][1] * scale + offsetY;

    // 向中心收缩
    const shrunkX = centerX + (x - centerX) * shrinkFactor;
    const shrunkY = centerY + (y - centerY) * shrinkFactor;

    if (i === 0) {
      ctx.moveTo(shrunkX, shrunkY);
    } else {
      ctx.lineTo(shrunkX, shrunkY);
    }
  }
  ctx.closePath();
  ctx.strokeStyle = shadowColor;
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.restore();
}

// 渐变阴影效果
function drawGradientShadow(
  coordinates,
  scale,
  offsetX,
  offsetY,
  shadowBlur,
  shadowColor,
  shadowOpacity
) {
  ctx.save();

  // 绘制主要路径
  ctx.beginPath();
  for (let i = 0; i < coordinates.length; i++) {
    const x = coordinates[i][0] * scale + offsetX;
    const y = coordinates[i][1] * scale + offsetY;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();

  // 创建剪切区域
  ctx.clip();

  // 创建渐变
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // 计算渐变半径
  let maxDistance = 0;
  for (let i = 0; i < coordinates.length; i++) {
    const x = coordinates[i][0] * scale + offsetX;
    const y = coordinates[i][1] * scale + offsetY;
    const distance = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    );
    if (distance > maxDistance) maxDistance = distance;
  }

  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    maxDistance * 0.5,
    centerX,
    centerY,
    maxDistance
  );

  // 添加渐变颜色
  gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
  gradient.addColorStop(1, hexToRgba(shadowColor, shadowOpacity));

  // 绘制渐变阴影
  ctx.shadowBlur = shadowBlur;
  ctx.shadowColor = shadowColor;

  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.restore();
}

// 辅助函数：将十六进制颜色转换为rgba
function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// 处理窗口大小变化
function handleResize() {
  // 更新canvas大小
  initCanvasSize();

  // 重新绘制
  drawMap();
}

// 根据所选样式显示/隐藏相应设置面板
function updateSettingsVisibility() {
  const selectedStyle = document.getElementById("shadow-style").value;
  const classicSettings = document.getElementById("classic-settings");

  // 隐藏所有设置面板
  document.querySelectorAll(".shadow-settings").forEach((panel) => {
    panel.style.display = "none";
  });

  // 显示对应的设置面板
  if (selectedStyle === "classic") {
    classicSettings.style.display = "block";
  }

  // 重新绘制地图
  drawMap();
}

// 根据屏幕宽度调整布局
function adjustLayout() {
  const isMobile = window.innerWidth <= 768;
  const controls = document.querySelector(".controls");

  if (isMobile) {
    controls.style.flexDirection = "column";
  } else {
    controls.style.flexDirection = "row";
  }
}

// 初始化应用
function initApp() {
  // 设置初始布局
  adjustLayout();

  // 初始化Canvas尺寸
  initCanvasSize();

  // 为控件添加事件监听器
  document.getElementById("shadow-color").addEventListener("change", drawMap);
  document.getElementById("shadow-blur").addEventListener("input", function () {
    document.getElementById("blur-value").textContent = this.value;
    drawMap();
  });
  document
    .getElementById("shadow-style")
    .addEventListener("change", updateSettingsVisibility);
  document
    .getElementById("classic-fill-color")
    .addEventListener("change", drawMap);
  document
    .getElementById("classic-fill-opacity")
    .addEventListener("input", function () {
      document.getElementById("fill-opacity-value").textContent =
        this.value + "%";
      drawMap();
    });

  // 初始调用更新设置面板可见性
  updateSettingsVisibility();

  // 为了确保至少显示一些内容，先用简化数据绘制一次
  drawMap();

  // 响应窗口大小变化
  window.addEventListener("resize", function () {
    handleResize();
    adjustLayout();
  });
}

// 页面加载完成后初始化应用
document.addEventListener("DOMContentLoaded", initApp);
