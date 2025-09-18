<!-- docs/.vitepress/theme/MeteorsBg.vue (Updated Version) -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvasRef = ref(null);
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let meteors = [];
let animationFrameId = null;

const currentBatchInterval = ref(200);
const isWindowFocused = ref(true);

// --- 可配置的参数 ---
const METEOR_CONFIG = {
  BATCH_SIZE: 1,
  BATCH_INTERVAL: 200,
  TARGETING_INTERVAL: 60000, // 我们的“时钟”每分钟滴答一次
  MAX_SPEED: 3,
  TRAIL_LENGTH: 50,
  TARGET_ACCEL: 0.05,
  // 【新增】不同等级计时球的样式配置
  MINUTE_STYLE: { color: '#bbff00', radius: [2, 2] },    // 1分钟球：荧光绿，小
  FIVE_MIN_STYLE: { color: '#00ffdd', radius: [3, 3] },    // 5分钟球：青色，中
  HOUR_STYLE: { color: '#ffa958', radius: [5, 5] },    // 1小时球：金色，大
  HALF_HOUR_STYLE: { color: '#00a2ff', radius: [5, 5] },
};

let minuteCounter = 0;

// 【新增】根据追踪球数量调整普通流星的生成频率
const updateMeteorFrequency = () => {
  // 计算当前屏幕上有多少个正在追踪鼠标的球
  const targetingMeteorsCount = meteors.filter(m => m.isTargetingMouse).length;

  if (targetingMeteorsCount >= 10) { // 如果有10个或更多追踪球
    currentBatchInterval.value = 1000; // 生成频率大大降低 (1秒1个)
  } else if (targetingMeteorsCount >= 5) { // 5-9个追踪球
    currentBatchInterval.value = 500; // 频率降低 (半秒1个)
  } else { // 追踪球很少
    currentBatchInterval.value = 200; // 保持高频生成，让背景更丰富
  }
};

const random = (min, max) => Math.random() * (max - min) + min;

const createMeteor = (options = {}) => {
  // 解构参数，并提供默认值
  const { isTargetingMouse = false, type = 'normal' } = options;

  const angle = random(0, Math.PI * 2);
  const speed = random(METEOR_CONFIG.MAX_SPEED * 0.5, METEOR_CONFIG.MAX_SPEED);

  const startPos = { x: 0, y: 0 };
  // ... (生成初始位置的代码保持不变)
  const side = Math.floor(random(0, 4));
  if (side === 0) { startPos.x = random(0, window.innerWidth); startPos.y = -50; }
  else if (side === 1) { startPos.x = window.innerWidth + 50; startPos.y = random(0, window.innerHeight); }
  else if (side === 2) { startPos.x = random(0, window.innerWidth); startPos.y = window.innerHeight + 50; }
  else { startPos.x = -50; startPos.y = random(0, window.innerHeight); }

  let style = { color: `hsl(${random(180, 240)}, 100%, 75%)`, radius: [1, 2] };

  let opacity = 0.6;

  if (isTargetingMouse) {
    if (type === 'minute') style = METEOR_CONFIG.MINUTE_STYLE;
    else if (type === 'fiveMinute') style = METEOR_CONFIG.FIVE_MIN_STYLE;
    else if (type === 'halfhour') style = METEOR_CONFIG.HALF_HOUR_STYLE;
    else if (type === 'hour') style = METEOR_CONFIG.HOUR_STYLE;
  }
  else {
    opacity = 0.4
  }

  meteors.push({
    x: startPos.x,
    y: startPos.y,
    speed: speed,
    opacity: opacity,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: random(style.radius[0], style.radius[1]),
    color: style.color,
    isTargetingMouse,
    type, // 【新增】记录类型，用于之后的“释放”操作
    trail: [],
  });
};

const releaseMeteors = (typeToRelease) => {
  meteors.forEach(m => {
    // 找到所有正在追踪鼠标，且类型匹配的球
    if (m.isTargetingMouse && m.type === typeToRelease) {
      m.isTargetingMouse = false; // 停止追踪
      m.type = 'released'; // 改变类型，防止被再次释放

      /*/ 赋予一个随机的“推力”，让它优雅地飞出屏幕
      const angle = random(0, Math.PI * 2);
      const speed = METEOR_CONFIG.MAX_SPEED * 0.8;
      m.vx = Math.cos(angle) * speed;
      m.vy = Math.sin(angle) * speed;*/
      m.vx = 3 * m.vx;
      m.vy = 3 * m.vy;
    }
  });
};

const animate = (ctx, canvas) => {
  // 1. 【核心修改】完全清空画布，让画布变成透明
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  meteors.forEach(meteor => {
    // 更新位置
    if (meteor.isTargetingMouse) {
      const dx = mouse.x - meteor.x;
      const dy = mouse.y - meteor.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 1) {
        meteor.vx += (dx / dist) * METEOR_CONFIG.TARGET_ACCEL;
        meteor.vy += (dy / dist) * METEOR_CONFIG.TARGET_ACCEL;
      }
    }

    const speed = Math.sqrt(meteor.vx * meteor.vx + meteor.vy * meteor.vy);
    if (speed > METEOR_CONFIG.MAX_SPEED) {
      meteor.vx = (meteor.vx / speed) * METEOR_CONFIG.MAX_SPEED;
      meteor.vy = (meteor.vy / speed) * METEOR_CONFIG.MAX_SPEED;
    }

    meteor.x += meteor.vx;
    meteor.y += meteor.vy;

    // 2. 【核心修改】记录当前位置到尾迹数组
    meteor.trail.push({ x: meteor.x, y: meteor.y });
    if (meteor.trail.length > METEOR_CONFIG.TRAIL_LENGTH) {
      meteor.trail.shift(); // 保持尾迹数组的长度
    }

    // 3. 【核心修改】绘制尾迹
    ctx.shadowBlur = 0; // 尾迹不需要阴影

    // 先设置好尾迹的基础颜色
    ctx.fillStyle = meteor.color;

    meteor.trail.forEach((pos, index) => {
      const opacity = index / METEOR_CONFIG.TRAIL_LENGTH * meteor.speed;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, meteor.radius * (index / METEOR_CONFIG.TRAIL_LENGTH), 0, Math.PI * 2);

      // 使用 globalAlpha 来控制每一段尾迹的透明度
      // 注意：这个值会影响之后所有的 fill() 和 stroke() 操作
      ctx.globalAlpha = opacity * 0.1; // 可以适当调高一点，让颜色更明显

      ctx.fill();
    });

    // 【！！！非常重要！！！】
    // 绘制完尾迹后，必须将 globalAlpha 重置为 1
    // 否则流星头部也会变得半透明
    ctx.globalAlpha = meteor.opacity;

    // 4. 绘制流星头部
    ctx.beginPath();
    ctx.arc(meteor.x, meteor.y, meteor.radius, 0, Math.PI * 2);
    ctx.fillStyle = meteor.color;
    ctx.shadowColor = meteor.color;
    ctx.shadowBlur = 2 * meteor.radius;
    ctx.fill();
    ctx.closePath();
  });

  meteors = meteors.filter(m =>
    m.x > -100 && m.x < canvas.width + 100 &&
    m.y > -100 && m.y < canvas.height + 100
  );

  animationFrameId = requestAnimationFrame(() => animate(ctx, canvas));
};

const handleMouseMove = (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};

const resizeHandler = (canvas, ctx) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

createMeteor({ isTargetingMouse: true, type: 'minute' });

onMounted(() => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext('2d');
  resizeHandler(canvas);

  // 【核心修改】创建一个自调用的、可变间隔的定时器
  let normalIntervalTimeoutId = null;
  const runNormalMeteorGenerator = () => {
    // 清除上一个定时器ID，以防万一
    clearTimeout(normalIntervalTimeoutId);

    createMeteor({}); // 创建一个普通流星

    // 读取最新的间隔时间，并设置下一次调用
    normalIntervalTimeoutId = setTimeout(runNormalMeteorGenerator, currentBatchInterval.value);
  };

  // 【修改】只有在窗口聚焦时才启动普通流星生成器
  if (isWindowFocused.value) {
    runNormalMeteorGenerator();
  }

  // 计时器逻辑保持不变，只是增加了 updateMeteorFrequency() 的调用
  const clockIntervalId = setInterval(() => {
    minuteCounter++;

    if (minuteCounter > 0 && minuteCounter % 60 === 0) {
      releaseMeteors('halfHour');
      releaseMeteors('fiveMinute');
      createMeteor({ isTargetingMouse: true, type: 'hour' });
    } else if (minuteCounter > 0 && minuteCounter % 30 === 0) {
      releaseMeteors('fiveMinute');
      createMeteor({ isTargetingMouse: true, type: 'halfhour' });
    } else if (minuteCounter > 0 && minuteCounter % 5 === 0) {
      releaseMeteors('minute');
      createMeteor({ isTargetingMouse: true, type: 'fiveMinute' });
    } else {
      createMeteor({ isTargetingMouse: true, type: 'minute' });
    }

    updateMeteorFrequency(); // 更新频率
  }, METEOR_CONFIG.TARGETING_INTERVAL);

  animate(ctx, canvas);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', () => resizeHandler(canvas));

  const handleFocus = () => {
    isWindowFocused.value = true;
    console.log("Window focused, resuming meteor generation.");
    // 重新启动普通流星生成循环
    runNormalMeteorGenerator();
  };

  const handleBlur = () => {
    isWindowFocused.value = false;
    console.log("Window blurred, pausing meteor generation.");
    // 清除定时器，停止生成普通流星
    clearTimeout(normalIntervalTimeoutId);
  };

  window.addEventListener('focus', handleFocus);
  window.addEventListener('blur', handleBlur);

  onUnmounted(() => {
    // 【核心修改】确保清理 setTimeout
    clearTimeout(normalIntervalTimeoutId);
    clearInterval(clockIntervalId);

    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', () => resizeHandler(canvas));

    window.removeEventListener('focus', handleFocus);
    window.removeEventListener('blur', handleBlur);
  });
});
</script>

<template>
  <canvas ref="canvasRef" class="meteor-bg"></canvas>
</template>

<style scoped>
.meteor-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -5;
  /* 【核心修改】移除背景色，让 canvas 完全透明 */
  background-color: transparent;
  /* 确保它在 IconsBg 上方，但仍在页面内容下方 */
  /* 你可能需要调整 z-index 来控制 IconsBg 和 MeteorBg 的层叠顺序 */
  pointer-events: none;
  /* 让鼠标事件可以穿透 canvas */
}
</style>