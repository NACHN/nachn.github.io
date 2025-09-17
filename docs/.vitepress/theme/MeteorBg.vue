<!-- docs/.vitepress/theme/MeteorsBg.vue (Updated Version) -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvasRef = ref(null);
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let meteors = [];
let animationFrameId = null;

// --- 可配置的参数 ---
const METEOR_CONFIG = {
  BATCH_SIZE: 1,
  BATCH_INTERVAL: 200,
  TARGETING_INTERVAL: 60000, // 【新增】追踪流星的生成间隔 (60秒)
  MAX_SPEED: 3,
  TRAIL_LENGTH: 50, // 尾迹的长度 (由多少个历史点组成)
  TARGET_ACCEL: 0.05,
};

const random = (min, max) => Math.random() * (max - min) + min;

const createMeteor = (isTargetingMouse = false) => {
  const angle = random(0, Math.PI * 2);
  const speed = random(METEOR_CONFIG.MAX_SPEED * 0.5, METEOR_CONFIG.MAX_SPEED);

  const startPos = { x: 0, y: 0 };
  const side = Math.floor(random(0, 4));
  if (side === 0) { startPos.x = random(0, window.innerWidth); startPos.y = -50; }
  else if (side === 1) { startPos.x = window.innerWidth + 50; startPos.y = random(0, window.innerHeight); }
  else if (side === 2) { startPos.x = random(0, window.innerWidth); startPos.y = window.innerHeight + 50; }
  else { startPos.x = -50; startPos.y = random(0, window.innerHeight); }

  meteors.push({
    x: startPos.x,
    y: startPos.y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: random(1, 5),
    color: isTargetingMouse?`#719b00`:`hsl(${random(180, 240)}, 100%, 75%)`,
    isTargetingMouse,
    trail: [], // 新增：用于存储尾迹点的数组
  });
};

// 函数一：创建一批普通的、不追踪的流星
const createNormalMeteorBatch = () => {
  for (let i = 0; i < METEOR_CONFIG.BATCH_SIZE; i++) {
    createMeteor(false); // 明确传入 false，表示不追踪
  }
};

// 函数二：创建单个追踪鼠标的流星
const createTargetingMeteor = () => {
  createMeteor(true); // 明确传入 true，表示追踪
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
    meteor.trail.forEach((pos, index) => {
      const opacity = index / METEOR_CONFIG.TRAIL_LENGTH; // 透明度从 0 到 1
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, meteor.radius * (index / METEOR_CONFIG.TRAIL_LENGTH), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.1})`; // 使用半透明白色或流星颜色
      ctx.fill();
    });

    // 4. 绘制流星头部
    ctx.beginPath();
    ctx.arc(meteor.x, meteor.y, meteor.radius, 0, Math.PI * 2);
    ctx.fillStyle = meteor.color;
    ctx.shadowColor = meteor.color;
    ctx.shadowBlur = 15;
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

onMounted(() => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext('2d');
  resizeHandler(canvas);

  // 【修改】首次生成
  createNormalMeteorBatch(); // 调用新的普通流星生成函数
  createTargetingMeteor();   // 【新增】页面加载时立即生成一个追踪的，提供即时反馈

  // 【修改】设置两个独立的定时器
  const normalIntervalId = setInterval(createNormalMeteorBatch, METEOR_CONFIG.BATCH_INTERVAL);
  const targetingIntervalId = setInterval(createTargetingMeteor, METEOR_CONFIG.TARGETING_INTERVAL);

  animate(ctx, canvas);

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', () => resizeHandler(canvas));

  onUnmounted(() => {
    // 【修改】清理两个定时器
    clearInterval(normalIntervalId);
    clearInterval(targetingIntervalId);

    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', () => resizeHandler(canvas));
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
  z-index: -1;
  /* 【核心修改】移除背景色，让 canvas 完全透明 */
  background-color: transparent;
  /* 确保它在 IconsBg 上方，但仍在页面内容下方 */
  /* 你可能需要调整 z-index 来控制 IconsBg 和 MeteorBg 的层叠顺序 */
  pointer-events: none;
  /* 让鼠标事件可以穿透 canvas */
}
</style>