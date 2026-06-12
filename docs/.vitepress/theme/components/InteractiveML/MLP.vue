<template>
  <!-- 保持原模板结构完全不变 -->
  <div class="demo-container">
    <!-- 参数控制区 -->
    <div class="controls">
      <div class="controls-l">
        <!-- 神经元1参数 -->
        <div class="slider-group">
          <label>神经元1权重 w₁: {{ w1.toFixed(2) }}</label>
          <input type="range" v-model.number="w1" min="-5" max="5" step="0.01">
        </div>
        <div class="slider-group">
          <label>神经元1偏置 b₁: {{ b1.toFixed(2) }}</label>
          <input type="range" v-model.number="b1" min="-15" max="15" step="0.01">
        </div>
        
        <!-- 神经元2参数 -->
        <div class="slider-group">
          <label>神经元2权重 w₂: {{ w2.toFixed(2) }}</label>
          <input type="range" v-model.number="w2" min="-5" max="5" step="0.01">
        </div>
        <div class="slider-group">
          <label>神经元2偏置 b₂: {{ b2.toFixed(2) }}</label>
          <input type="range" v-model.number="b2" min="-15" max="15" step="0.01">
        </div>
        
        <!-- 分界点控制 -->
        <div class="slider-group">
          <label>计价转折点: {{ breakpoint.toFixed(1) }}km（目标函数）</label>
          <input type="range" v-model.number="breakpoint" min="1" max="5" step="0.1">
        </div>
      </div>
      <canvas ref="canvas" width="400" height="200" class="canvas"></canvas>
    </div>

    <!-- 关键说明 -->
    <div class="explanation">
      <p>目标计价: 
        <code>≤{{ breakpoint }}km: 10元</code> | 
        <code>&gt;{{ breakpoint }}km: 10+2(x-{{ breakpoint }})</code>
      </p>
      <p>当前输出: 
        <span class="relu1">ReLU(w₁x+b₁)</span> + 
        <span class="relu2">ReLU(w₂x+b₂)</span> = 
        <span class="output">{{ totalOutput.toFixed(1) }}元</span>
        (x=5km)
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// 初始参数（逼近出租车计价：3km内10元，超3km后+2元/km）
const w1 = ref(0.0);    // 神经元1权重
const b1 = ref(10.0);   // 神经元1偏置（基础费用）
const w2 = ref(2.0);    // 神经元2权重（里程费率）
const b2 = ref(-6.0);   // 神经元2偏置（转折控制）
const breakpoint = ref(3.0); // 计价转折点（km）

// 画布引用
const canvas = ref(null);
const ctx = ref(null);

// 计算5km处的总输出用于显示
const totalOutput = ref(0);

// ReLU激活函数
const relu = (x) => Math.max(0, x);

// 绘制函数
const draw = () => {
  const c = canvas.value;
  const ctx = c.getContext('2d');
  
  // 清空画布
  ctx.clearRect(0, 0, c.width, c.height);
  
  // 坐标系设置 (x: 0-10km, y: 0-30元)
  const xMin = 0, xMax = 10;
  const yMin = 0, yMax = 30;
  
  // 坐标转换函数
  const toCanvasX = (x) => 50 + (x / xMax) * 300;
  const toCanvasY = (y) => 150 - (y / yMax) * 120;
  
  // 1. 绘制目标出租车计价曲线（背景参考）
  ctx.beginPath();
  ctx.moveTo(toCanvasX(xMin), toCanvasY(10));
  // 3km内平价段
  ctx.lineTo(toCanvasX(breakpoint.value), toCanvasY(10));
  // 3km后线性增长段
  for (let x = breakpoint.value; x <= xMax; x += 0.1) {
    const price = 10 + 2 * (x - breakpoint.value);
    ctx.lineTo(toCanvasX(x), toCanvasY(price));
  }
  ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // 2. 绘制神经元1的原始直线（虚线）
  ctx.beginPath();
  const y1_start = w1.value * xMin + b1.value;
  const y1_end = w1.value * xMax + b1.value;
  ctx.moveTo(toCanvasX(xMin), toCanvasY(y1_start));
  ctx.lineTo(toCanvasX(xMax), toCanvasY(y1_end));
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = 'rgba(76, 201, 240, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  // 3. 绘制神经元1的ReLU激活曲线
  ctx.beginPath();
  for (let x = xMin; x <= xMax; x += 0.1) {
    const y = relu(w1.value * x + b1.value);
    if (x === xMin) ctx.moveTo(toCanvasX(x), toCanvasY(y));
    else ctx.lineTo(toCanvasX(x), toCanvasY(y));
  }
  ctx.setLineDash([]);
  ctx.strokeStyle = '#4cc9f0';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // 4. 绘制神经元2的原始直线（虚线）
  ctx.beginPath();
  const y2_start = w2.value * xMin + b2.value;
  const y2_end = w2.value * xMax + b2.value;
  ctx.moveTo(toCanvasX(xMin), toCanvasY(y2_start));
  ctx.lineTo(toCanvasX(xMax), toCanvasY(y2_end));
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = 'rgba(247, 37, 133, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  // 5. 绘制神经元2的ReLU激活曲线
  ctx.beginPath();
  for (let x = xMin; x <= xMax; x += 0.1) {
    const y = relu(w2.value * x + b2.value);
    if (x === xMin) ctx.moveTo(toCanvasX(x), toCanvasY(y));
    else ctx.lineTo(toCanvasX(x), toCanvasY(y));
  }
  ctx.setLineDash([]);
  ctx.strokeStyle = '#f72585';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // 6. 绘制最终输出曲线（实线）
  ctx.beginPath();
  for (let x = xMin; x <= xMax; x += 0.1) {
    const y = relu(w1.value * x + b1.value) + 
               relu(w2.value * x + b2.value);
    if (x === xMin) ctx.moveTo(toCanvasX(x), toCanvasY(y));
    else ctx.lineTo(toCanvasX(x), toCanvasY(y));
  }
  ctx.strokeStyle = '#51cf66';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  
  // 7. 绘制坐标轴
  ctx.setLineDash([]);
  ctx.beginPath();
  // X轴 (公里)
  ctx.moveTo(50, toCanvasY(0));
  ctx.lineTo(350, toCanvasY(0));
  // Y轴 (元)
  ctx.moveTo(50, toCanvasY(0));
  ctx.lineTo(50, toCanvasY(30));
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // 8. 标记转折点
  ctx.beginPath();
  ctx.arc(toCanvasX(breakpoint.value), toCanvasY(10), 2, 0, Math.PI * 2);
  ctx.fillStyle = '#e63946';
  ctx.fill();
  
  // 计算5km处的总输出
  const xEval = 5;
  totalOutput.value = relu(w1.value * xEval + b1.value) + 
                      relu(w2.value * xEval + b2.value);
};

// 初始化 & 响应参数变化
onMounted(() => {
  draw();
  
  // 监听参数变化
  watch([w1, b1, w2, b2, breakpoint], draw);
});
</script>

<style scoped>
/* === 紧凑航空仪表盘风格 === */
/* 所有修改仅针对视觉呈现，功能逻辑零改动 */

.demo-container {
  margin: 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 12px 0 8px;
}

.controls {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 12px;
}

.controls-l {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.slider-group label {
  display: flex;
  justify-content: space-between;
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.canvas {
  display: block;
  margin: 8px auto;
  background: #fafafa;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0;
}

.explanation {
  margin-top: 8px;
  padding: 0;
  font-size: 0.8em;
  line-height: 1.4;
}

.explanation p {
  margin: 4px 0;
}

/* 语义化颜色标识 */
.relu1 { color: #4cc9f0; font-weight: 600; }
.relu2 { color: #f72585; font-weight: 600; }
.output { color: #51cf66; font-weight: 700; }
</style>