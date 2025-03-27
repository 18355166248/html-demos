import { anhuiData } from "./data/anhui.js";
const data = anhuiData;

// 中国地图数据
// import { chinaData } from "./data/china-parse.js";
// const data = chinaData.features[0];

const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth * 0.8;
canvas.height = document.documentElement.clientWidth * 0.8;

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
  console.log("🚀 ~ drawMap ~ scale:", scale);

  // 偏移量，使地图居中
  const offsetX =
    (canvas.width - (bounds.maxX - bounds.minX) * scale) / 2 -
    bounds.minX * scale;
  const offsetY =
    (canvas.height - (bounds.maxY - bounds.minY) * scale) / 2 -
    bounds.minY * scale;

  // 绘制地图主体
  ctx.save();

  // 地图填充
  // drawPolygon(
  //   data.geometry.coordinates[0][0],
  //   scale,
  //   offsetX,
  //   offsetY,
  //   "#e0f7fa"
  // );

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
  const shadowOpacity =
    parseInt(document.getElementById("shadow-opacity").value) / 100;

  const shadowColorWithOpacity = hexToRgba(shadowColor, shadowOpacity);

  switch (shadowStyle) {
    case "glow":
      drawInnerGlow(
        coordinates,
        scale,
        offsetX,
        offsetY,
        shadowBlur,
        shadowColorWithOpacity
      );
      break;
    case "multiple":
      drawMultipleShadow(
        coordinates,
        scale,
        offsetX,
        offsetY,
        shadowBlur,
        shadowColorWithOpacity
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
        shadowOpacity
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
        shadowColorWithOpacity
      );
      break;
  }
}

// 经典内阴影效果
function drawClassicInnerShadow(
  coordinates,
  scale,
  offsetX,
  offsetY,
  shadowBlur,
  shadowColor
) {
  ctx.save();

  // 首先绘制主要路径
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

  // 内阴影设置
  ctx.shadowBlur = shadowBlur;
  ctx.shadowColor = shadowColor;

  // 通过反向绘制一个略小的形状来创建内阴影效果
  ctx.beginPath();

  // 为了创建内阴影效果，我们需要在边缘之外绘制
  ctx.rect(0 - 100, 0 - 100, canvas.width + 200, canvas.height + 200);

  // 然后再次绘制地图路径，这次是反向的（顺时针和逆时针的不同）
  for (let i = coordinates.length - 1; i >= 0; i--) {
    const x = coordinates[i][0] * scale + offsetX;
    const y = coordinates[i][1] * scale + offsetY;

    if (i === coordinates.length - 1) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.fillStyle = shadowColor;
  ctx.fill();

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

// 为控件添加事件监听器
document.getElementById("shadow-color").addEventListener("change", drawMap);
document.getElementById("shadow-blur").addEventListener("input", function () {
  document.getElementById("blur-value").textContent = this.value;
  drawMap();
});
document
  .getElementById("shadow-opacity")
  .addEventListener("input", function () {
    document.getElementById("opacity-value").textContent = this.value + "%";
    drawMap();
  });
document.getElementById("shadow-style").addEventListener("change", drawMap);

// 为了确保至少显示一些内容，先用简化数据绘制一次
drawMap();
