<template>
  <div class="mlp-auto-demo">
    <div class="main-layout">
      <!-- 左侧：MLP 参数（自动学习时可观看变化） -->
      <div class="panel panel-left">
        <div class="panel-title">🧠 MLP 参数</div>

        <div class="slider-group neuron1">
          <label>神经元1 权重 w₁ <span class="val">{{ w1.toFixed(2) }}</span></label>
          <input type="range" v-model.number="w1" min="-5" max="5" step="0.01" :disabled="isTraining">
        </div>
        <div class="slider-group neuron1">
          <label>神经元1 偏置 b₁ <span class="val">{{ b1.toFixed(2) }}</span></label>
          <input type="range" v-model.number="b1" min="-15" max="15" step="0.01" :disabled="isTraining">
        </div>

        <div class="slider-group neuron2">
          <label>神经元2 权重 w₂ <span class="val">{{ w2.toFixed(2) }}</span></label>
          <input type="range" v-model.number="w2" min="-5" max="5" step="0.01" :disabled="isTraining">
        </div>
        <div class="slider-group neuron2">
          <label>神经元2 偏置 b₂ <span class="val">{{ b2.toFixed(2) }}</span></label>
          <input type="range" v-model.number="b2" min="-15" max="15" step="0.01" :disabled="isTraining">
        </div>

        <div class="btn-row">
          <button class="btn primary" @click="toggleTraining">
            {{ isTraining ? '停止学习' : '自动学习' }}
          </button>
        </div>
        <div class="btn-row">
          <button class="btn" @click="randomizeParams" :disabled="isTraining">随机参数</button>
          <button class="btn" @click="resetParams" :disabled="isTraining">↺ 重置</button>
        </div>

        
      </div>

      <!-- 中间：画布 -->
      <div class="canvas-wrapper">
        <div class="loss-display" :class="{ 'low-loss': totalLoss < 0.1 }">
          📉 采样点MSE损失：<span>{{ totalLoss.toFixed(4) }}</span>
          <span v-if="totalLoss < 0.001" style="margin-left:4px;">几乎一致</span>
          <span v-else-if="totalLoss < 0.1" style="margin-left:4px;">拟合良好</span>
          <span v-else-if="totalLoss < 1" style="margin-left:4px;">尚有偏差</span>
          <span v-else style="margin-left:4px;">⚠️ 偏差较大</span>
        </div>
        <canvas ref="canvas" width="360" height="260"></canvas>
        
      </div>

      <!-- 右侧：目标函数（采样点来源） -->
      <div class="panel panel-right">
        <div class="panel-title">🎯 目标函数（采样点）</div>

        <div class="slider-group">
          <label>起步价 <span class="val">{{ baseFare.toFixed(0) }}元</span></label>
          <input type="range" v-model.number="baseFare" min="5" max="20" step="0.5" :disabled="isTraining">
        </div>
        <div class="slider-group">
          <label>转折点 <span class="val">{{ breakpoint.toFixed(1) }}km</span></label>
          <input type="range" v-model.number="breakpoint" min="0.5" max="6" step="0.1" :disabled="isTraining">
        </div>
        <div class="slider-group">
          <label>里程费率 <span class="val">{{ ratePerKm.toFixed(2) }}元/km</span></label>
          <input type="range" v-model.number="ratePerKm" min="0.5" max="5" step="0.05" :disabled="isTraining">
        </div>
        <div class="slider-group">
          <label>采样点数量 <span class="val">{{ numSamples }}个</span></label>
          <input type="range" v-model.number="numSamples" min="4" max="20" step="1" :disabled="isTraining">
        </div>
      </div>
    </div>

    <!-- 底部说明 -->
    <div class="explanation">
      <span>
        <span class="legend-dot target"></span> 目标计价：
        <span class="formula">≤{{ breakpoint.toFixed(1) }}km: {{ baseFare.toFixed(0) }}元</span>
        <span style="margin:0 3px;">|</span>
        <span class="formula">&gt;{{ breakpoint.toFixed(1) }}km: {{ baseFare.toFixed(0) }}+{{ ratePerKm.toFixed(2) }}(x−{{ breakpoint.toFixed(1) }})</span>
      </span>
      <span style="margin-left:auto;">
        <span class="legend-dot sample"></span> 采样点({{ numSamples }}个)
        <span class="legend-dot n1" style="margin-left:8px;"></span> ReLU₁
        <span class="legend-dot n2"></span> ReLU₂
        <span class="legend-dot out"></span> MLP输出
      </span>
      <span style="width:100%;font-size:.85em;color:var(--vp-c-text-2);">
        采样点均匀分布在0~10km，MLP通过两个ReLU神经元之和来逼近这些点。
        调整目标函数后点击<strong>"自动学习"</strong>观察梯度下降如何学习参数。
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const w1 = ref(0.0);
const b1 = ref(10.0);
const w2 = ref(2.0);
const b2 = ref(-6.0);

const baseFare = ref(10);
const breakpoint = ref(3.0);
const ratePerKm = ref(2.0);
const numSamples = ref(10);

const canvas = ref(null);
const samplePoints = ref([]);
const totalLoss = ref(0);
const isTraining = ref(false);
let animationId = null;
let trainingSteps = 0;
const MAX_STEPS = 4000, STEPS_PER_FRAME = 35, LR = 0.006, EARLY_STOP = 0.00008;

const relu = (x) => Math.max(0, x);

function generatePoints() {
  const n = numSamples.value, bp = breakpoint.value, bf = baseFare.value, r = ratePerKm.value;
  const pts = [];
  if (n <= 1) {
    pts.push({ x: 0, y: bf }, { x: 5, y: 5 <= bp ? bf : bf + r * (5 - bp) }, { x: 10, y: bf + r * (10 - bp) });
  } else {
    for (let i = 0; i < n; i++) {
      const x = (10 * i) / (n - 1);
      pts.push({ x, y: x <= bp ? bf : bf + r * (x - bp) });
    }
  }
  return pts;
}

function computeLoss() {
  const pts = samplePoints.value;
  let sumSq = 0;
  for (const p of pts) {
    const pred = relu(w1.value * p.x + b1.value) + relu(w2.value * p.x + b2.value);
    sumSq += (pred - p.y) ** 2;
  }
  return sumSq / pts.length;
}

function draw() {
  const c = canvas.value;
  if (!c) return;
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);
  const ml = 48, mr = 28, mt = 18, mb = 28;
  const pw = W - ml - mr, ph = H - mt - mb;
  const toX = (x) => ml + (x / 10) * pw;
  const toY = (y) => mt + ph - (y / 30) * ph;

  // 网格
  ctx.strokeStyle = 'rgba(180,180,190,0.15)';
  ctx.lineWidth = 0.5;
  for (let gy = 0; gy <= 30; gy += 5) { ctx.beginPath(); ctx.moveTo(ml, toY(gy)); ctx.lineTo(ml + pw, toY(gy)); ctx.stroke(); }
  for (let gx = 0; gx <= 10; gx += 1) { ctx.beginPath(); ctx.moveTo(toX(gx), mt); ctx.lineTo(toX(gx), mt + ph); ctx.stroke(); }

  // 坐标轴
  ctx.setLineDash([]); ctx.strokeStyle = '#888'; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(ml, toY(0)); ctx.lineTo(ml + pw, toY(0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ml, toY(0)); ctx.lineTo(ml, toY(30)); ctx.stroke();
  ctx.fillStyle = '#666'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
  for (let gx = 0; gx <= 10; gx += 2) ctx.fillText(gx + 'km', toX(gx), toY(0) + 16);
  ctx.textAlign = 'right';
  for (let gy = 0; gy <= 30; gy += 10) ctx.fillText(gy + '元', ml - 6, toY(gy) + 4);

  const bp = breakpoint.value, bf = baseFare.value, r = ratePerKm.value;
  // 目标曲线
  ctx.beginPath(); ctx.moveTo(toX(0), toY(bf)); ctx.lineTo(toX(Math.min(bp, 10)), toY(bf));
  if (bp < 10) for (let x = bp; x <= 10; x += 0.05) ctx.lineTo(toX(x), toY(bf + r * (x - bp)));
  ctx.setLineDash([6, 4]); ctx.strokeStyle = 'rgba(160,160,175,0.55)'; ctx.lineWidth = 1.8; ctx.stroke(); ctx.setLineDash([]);

  // 转折点
  ctx.beginPath(); ctx.arc(toX(bp), toY(bf), 5, 0, Math.PI * 2); ctx.fillStyle = 'rgba(230,57,70,0.25)'; ctx.fill();
  ctx.beginPath(); ctx.arc(toX(bp), toY(bf), 3.5, 0, Math.PI * 2); ctx.fillStyle = '#e63946'; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();

  // 神经元直线与ReLU
  const drawReLU = (w, b, color, dashColor) => {
    const y0 = w * 0 + b, y10 = w * 10 + b;
    ctx.beginPath(); ctx.moveTo(toX(0), toY(Math.max(-5, Math.min(35, y0)))); ctx.lineTo(toX(10), toY(Math.max(-5, Math.min(35, y10))));
    ctx.setLineDash([4, 5]); ctx.strokeStyle = dashColor; ctx.lineWidth = 1.2; ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); let first = true;
    for (let x = 0; x <= 10; x += 0.08) {
      const y = relu(w * x + b), cy = toY(Math.min(35, y));
      if (first) { ctx.moveTo(toX(x), cy); first = false; } else ctx.lineTo(toX(x), cy);
    }
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
  };
  drawReLU(w1.value, b1.value, '#4cc9f0', 'rgba(76,201,240,0.4)');
  drawReLU(w2.value, b2.value, '#f72585', 'rgba(247,37,133,0.4)');

  // MLP输出
  ctx.beginPath(); let first = true;
  for (let x = 0; x <= 10; x += 0.05) {
    const y = relu(w1.value * x + b1.value) + relu(w2.value * x + b2.value);
    const cy = toY(Math.min(35, y));
    if (first) { ctx.moveTo(toX(x), cy); first = false; } else ctx.lineTo(toX(x), cy);
  }
  ctx.strokeStyle = '#51cf66'; ctx.lineWidth = 2.8; ctx.shadowColor = 'rgba(81,207,102,0.45)'; ctx.shadowBlur = 5; ctx.stroke();
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;

  // 采样点与残差
  for (const p of samplePoints.value) {
    const sx = toX(p.x), sy = toY(p.y);
    const predY = relu(w1.value * p.x + b1.value) + relu(w2.value * p.x + b2.value);
    const py = toY(Math.min(35, predY));
    if (Math.abs(predY - p.y) > 0.03) {
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, py);
      ctx.strokeStyle = 'rgba(230,57,70,0.5)'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fillStyle = 'rgba(67,97,238,0.22)'; ctx.fill();
    ctx.beginPath(); ctx.arc(sx, sy, 4, 0, Math.PI * 2); ctx.fillStyle = '#4361ee'; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.6; ctx.stroke();
    if (Math.abs(predY - p.y) > 0.05 && predY <= 30) {
      ctx.beginPath(); ctx.arc(sx, py, 2.5, 0, Math.PI * 2); ctx.fillStyle = 'rgba(81,207,102,0.7)'; ctx.fill();
    }
  }

  totalLoss.value = computeLoss();
}

function trainFrame() {
  if (!isTraining.value) return;
  const pts = samplePoints.value, n = pts.length;
  if (n === 0) { isTraining.value = false; return; }
  for (let s = 0; s < STEPS_PER_FRAME; s++) {
    let gW1 = 0, gB1 = 0, gW2 = 0, gB2 = 0;
    for (const p of pts) {
      const x = p.x, z1 = w1.value * x + b1.value, z2 = w2.value * x + b2.value;
      const pred = relu(z1) + relu(z2), err = pred - p.y;
      gW1 += err * (z1 > 0 ? 1 : 0) * x; gB1 += err * (z1 > 0 ? 1 : 0);
      gW2 += err * (z2 > 0 ? 1 : 0) * x; gB2 += err * (z2 > 0 ? 1 : 0);
    }
    const f = 2 / n;
    w1.value = Math.max(-8, Math.min(8, w1.value - LR * f * gW1));
    b1.value = Math.max(-20, Math.min(20, b1.value - LR * f * gB1));
    w2.value = Math.max(-8, Math.min(8, w2.value - LR * f * gW2));
    b2.value = Math.max(-20, Math.min(20, b2.value - LR * f * gB2));
    trainingSteps++;
    if (computeLoss() < EARLY_STOP || trainingSteps >= MAX_STEPS) { isTraining.value = false; break; }
  }
  draw();
  if (isTraining.value) animationId = requestAnimationFrame(trainFrame);
  else { animationId = null; trainingSteps = 0; draw(); }
}

function toggleTraining() {
  if (isTraining.value) {
    isTraining.value = false; if (animationId) cancelAnimationFrame(animationId); animationId = null; trainingSteps = 0; draw();
  } else {
    if (samplePoints.value.length === 0) samplePoints.value = generatePoints();
    trainingSteps = 0; isTraining.value = true; draw();
    animationId = requestAnimationFrame(trainFrame);
  }
}

function stopAndDraw() {
  if (isTraining.value) { isTraining.value = false; if (animationId) cancelAnimationFrame(animationId); animationId = null; trainingSteps = 0; }
  draw();
}

function randomizeParams() {
  stopAndDraw();
  w1.value = Math.round((Math.random() - 0.5) * 6 * 100) / 100;
  b1.value = Math.round((Math.random() * 16 - 2) * 100) / 100;
  w2.value = Math.round(((Math.random() - 0.3) * 5) * 100) / 100;
  b2.value = Math.round((Math.random() * 16 - 12) * 100) / 100;
  samplePoints.value = generatePoints();
  nextTick(() => draw());
}

function resetParams() {
  stopAndDraw();
  w1.value = 0.0;
  b1.value = Math.round(baseFare.value * 100) / 100;
  w2.value = ratePerKm.value;
  b2.value = Math.round(-ratePerKm.value * breakpoint.value * 100) / 100;
  samplePoints.value = generatePoints();
  nextTick(() => draw());
}

watch([baseFare, breakpoint, ratePerKm, numSamples], () => {
  stopAndDraw();
  samplePoints.value = generatePoints();
  nextTick(() => draw());
});

watch([w1, b1, w2, b2], () => { if (!isTraining.value) nextTick(() => draw()); });

onMounted(() => {
  samplePoints.value = generatePoints();
  nextTick(() => draw());
});
onUnmounted(() => {
  if (isTraining.value) { cancelAnimationFrame(animationId); animationId = null; }
});
</script>

<style scoped>
.mlp-auto-demo {
  margin: 16px 0;
}
.main-layout {
  display: flex;
  gap: 2px;
  align-items: stretch;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.panel {

  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 180px;
  max-width: 160px;
  min-width: 120px;
}
.panel-title {
  font-size: 0.8em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2, #6c757d);
  padding-bottom: 6px;
  border-bottom: 2px solid var(--vp-c-divider, #dee2e6);
  margin: 0;
}
.slider-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.slider-group label {
  font-size: 0.78em;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.slider-group .val {
  font-weight: 700;
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  min-width: 42px;
  text-align: right;
  font-family: 'SF Mono', 'Cascadia Code', monospace;
}
.slider-group.neuron1 label { color: #3da5d9; }
.slider-group.neuron2 label { color: #d91a6b; }
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--vp-c-divider, #dee2e6);
  outline: none;
  cursor: pointer;
}
input[type="range"]:disabled { opacity: 0.45; cursor: not-allowed; }
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4361ee;
  border: 2px solid #fff;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
}
.slider-group.neuron1 input[type="range"]::-webkit-slider-thumb { background: #4cc9f0; }
.slider-group.neuron2 input[type="range"]::-webkit-slider-thumb { background: #f72585; }

.btn-row { display: flex; gap: 6px; }
.btn {
  flex: 1;
  padding: 7px 10px;
  font-size: 0.75em;
  font-weight: 600;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text-1);
  transition: all .15s;
  text-align: center;
}
.btn:hover:not(:disabled) { border-color: #4361ee; color: #4361ee; }
.btn:disabled { opacity: .45; cursor: not-allowed; }
.btn.primary { background: #4361ee; color: #fff; border-color: #4361ee; }
.btn.primary:hover:not(:disabled) { background: #3a56d4; }
.btn.danger { color: #e63946; border-color: #e63946; }

.loss-display {
  font-size: 0.78em;
  text-align: center;
  padding: 6px 8px;
  border-radius: 6px;
  background: #fff9e6;
  border: 1px solid #f0d98c;
  color: #8a6d14;
  font-weight: 600;
}
.loss-display.low-loss { background: #e8f8e8; border-color: #8cd98c; color: #2d7a2d; }

.canvas-wrapper {
  flex: 0 0 auto;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}
canvas { display: block; border-radius: 4px; background: #fffdf7; max-width: 100%; height: auto; }
@media (prefers-color-scheme: dark) { canvas { background: #1c1c2a; } }

.explanation {
  margin-top: 10px;
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 0.8em;
  line-height: 1.55;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.legend-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 3px; vertical-align: middle; }
.legend-dot.target { background: #adb5bd; }
.legend-dot.sample { background: #4361ee; }
.legend-dot.n1 { background: #4cc9f0; }
.legend-dot.n2 { background: #f72585; }
.legend-dot.out { background: #51cf66; }
.formula { font-family: 'SF Mono', monospace; background: var(--vp-c-bg-mute); padding: 2px 6px; border-radius: 4px; }
</style>