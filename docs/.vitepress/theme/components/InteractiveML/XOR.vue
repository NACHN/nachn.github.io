<template>
  <!-- 保持原模板结构完全不变 -->
  <div class="demo-container">
    <!-- 参数控制区 -->
    <div class="controls">
      <div class="controls-l">
        <div class="slider-group">
          <label>w₁: {{ w1.toFixed(2) }}</label>
          <input type="range" v-model.number="w1" min="-2" max="2" step="0.01">
        </div>
        <div class="slider-group">
          <label>w₂: {{ w2.toFixed(2) }}</label>
          <input type="range" v-model.number="w2" min="-2" max="2" step="0.01">
        </div>
        <div class="slider-group">
          <label>b: {{ b.toFixed(2) }}</label>
          <input type="range" v-model.number="b" min="-2" max="2" step="0.01">
        </div>
      </div>
      <canvas ref="canvas" width="400" height="200" class="canvas"></canvas>
    </div>

    <!-- 关键说明 -->
    <div class="explanation">
      <p>决策边界: <code>w₁·x₁ + w₂·x₂ + b = 0</code> |
        <span :class="boundaryClass">{{ boundaryEquation }}</span>
      </p>
      <p class="xor-warning">
        ⚠️ XOR问题：线性分类器无法同时正确分类所有4个点！
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// 初始参数（对应XOR问题的线性分类器尝试）
const w1 = ref(1.0);
const w2 = ref(1.0);
const b = ref(-1.5);

// 画布引用
const canvas = ref(null);
const ctx = ref(null);

// 计算决策边界方程（用于显示）
const boundaryEquation = ref('');
const boundaryClass = ref('');

// 更新边界显示
const updateBoundaryDisplay = () => {
  const slope = w2.value !== 0 ? -w1.value / w2.value : Infinity;
  const intercept = -b.value / w2.value;

  if (isFinite(slope)) {
    boundaryEquation.value = `x₂ = ${slope.toFixed(2)}·x₁ ${intercept >= 0 ? '+' : ''}${intercept.toFixed(2)}`;
    boundaryClass.value = 'valid-boundary';
  } else {
    boundaryEquation.value = `x₁ = ${(-b.value / w1.value).toFixed(2)}`;
    boundaryClass.value = 'vertical-boundary';
  }
};

// 绘制函数
const draw = () => {
  const c = canvas.value;
  ctx.value = c.getContext('2d');

  // 清空画布
  ctx.value.clearRect(0, 0, c.width, c.height);

  // 绘制坐标系
  ctx.value.beginPath();
  ctx.value.moveTo(0, c.height / 2);
  ctx.value.lineTo(c.width, c.height / 2); // X轴
  ctx.value.moveTo(c.width / 2, 0);
  ctx.value.lineTo(c.width / 2, c.height);  // Y轴
  ctx.value.strokeStyle = '#ccc';
  ctx.value.stroke();

  // 绘制决策边界
  const x0 = 0;
  const y0 = -(w1.value * (x0 - c.width / 2) + b.value * 100) / w2.value + c.height / 2;
  const x1 = c.width;
  const y1 = -(w1.value * (x1 - c.width / 2) + b.value * 100) / w2.value + c.height / 2;

  ctx.value.beginPath();
  ctx.value.moveTo(x0, y0);
  ctx.value.lineTo(x1, y1);
  ctx.value.strokeStyle = '#e63946';
  ctx.value.lineWidth = 2;
  ctx.value.stroke();

  // 绘制XOR样本点 (标准化到画布坐标)
  // 坐标映射: [0,1] -> [100,300] (x), [0,1] -> [150,50] (y, 反向)
  const xorSamples = [
    { x: 100, y: 150, label: 0, trueLabel: 0 },  // (0,0) -> 0
    { x: 100, y: 50, label: 1, trueLabel: 1 },   // (0,1) -> 1
    { x: 300, y: 150, label: 1, trueLabel: 1 },  // (1,0) -> 1
    { x: 300, y: 50, label: 0, trueLabel: 0 }    // (1,1) -> 0
  ];
  
  xorSamples.forEach(sample => {
    // 计算预测值 (转换为模型坐标系)
    const xCoord = (sample.x - 200) / 100;  // 中心化并归一化
    const yCoord = (100 - sample.y) / 100;  // 中心化、归一化并反转Y轴
    const pred = w1.value * xCoord + w2.value * yCoord + b.value;
    
    // 根据预测结果和真实标签确定颜色
    const isCorrect = (pred >= 0 && sample.trueLabel === 1) || 
                      (pred < 0 && sample.trueLabel === 0);
    
    // 颜色逻辑: 正确分类为蓝色，错误分类为红色
    ctx.value.beginPath();
    ctx.value.arc(sample.x, sample.y, 12, 0, Math.PI * 2);
    ctx.value.fillStyle = isCorrect ? '#4361ee' : '#e63946';
    ctx.value.fill();
    
    // 绘制标签指示
    ctx.value.beginPath();
    ctx.value.arc(sample.x, sample.y, 8, 0, Math.PI * 2);
    ctx.value.fillStyle = sample.trueLabel === 1 ? '#4cc9f0' : '#f72585';
    ctx.value.fill();
    
    // 边框
    ctx.value.strokeStyle = 'black';
    ctx.value.lineWidth = 1.5;
    ctx.value.stroke();
  });
};

// 初始化 & 响应参数变化
onMounted(() => {
  updateBoundaryDisplay();
  draw();

  // 监听参数变化
  watch([w1, w2, b], () => {
    updateBoundaryDisplay();
    draw();
  });
});
</script>

<style scoped>
/* === 紧凑航空仪表盘风格 === */
/* 所有修改仅针对视觉呈现，功能逻辑零改动 */

/* 容器：移除装饰边距，强化功能边界 */
.demo-container {
  margin: 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 12px 0 8px;
}

/* 控制区：垂直堆叠+最小间距 */
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

.slider-group,
.toggle-group {
  background: none;
  padding: 0;
  box-shadow: none;
  border: none;
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

.valid-boundary {
  color: #0b8043;
  font-weight: 600;
}

.vertical-boundary {
  color: #d93025;
  font-weight: 600;
}

.xor-warning {
  color: #d32f2f;
  background: none;
  padding: 0;
  border-radius: 0;
  margin: 4px 0 0;
  font-weight: 500;
}
</style>