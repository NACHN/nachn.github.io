<!-- docs/.vitepress/theme/ACViewerControl/AirflowControl.vue -->
<script setup>
import { ref, inject, watch } from 'vue';
import * as THREE from 'three';

// --- 1. 注入共享状态 ---
const viewerState = inject('viewerState');
const flightParams = inject('flightParams'); 

// --- 2. UI 状态 ---
const alpha = ref(0); // 攻角 (Angle of Attack) in degrees
const beta = ref(0);  // 侧滑角 (Sideslip Angle) in degrees

// --- 3. 核心更新函数 ---
const updateAirflowRotation = () => {
  // 从共享状态中获取需要的对象
  const windFrame = viewerState.value.windAxes;
  // [修正] 不再需要直接操作 airflowLines 了
  const bodyFrame = viewerState.value.bodyAxes;

  // 确保所有需要的对象都已存在
  if (!windFrame || !bodyFrame) {
    return;
  }

  // 1. 获取机体系的姿态，这是我们所有相对旋转的基准
  // 注意：这里不能直接修改 bodyFrame.quaternion，所以克隆一份
  const bodyQuaternion = bodyFrame.quaternion.clone();
    
  // 2. 创建从机体系到气流系的相对旋转 (Delta Rotation)
  const alphaRad = THREE.MathUtils.degToRad(alpha.value);
  const betaRad = THREE.MathUtils.degToRad(beta.value);
  
  // 攻角 α 是绕机体 Yb 轴 (右) 的旋转
  // 我们的 Yb 轴向量是 (0, 0, 1)
  const quatAlpha = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), alphaRad);
  
  // 侧滑角 β 是绕机体 Zb 轴 (下) 的旋转
  // 我们的 Zb 轴向量是 (0, -1, 0)
  // 绕 (0, -1, 0) 旋转 betaRad 等于绕 (0, 1, 0) 旋转 -betaRad
  const quatBeta = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -betaRad);
    
  // 组合旋转，顺序：先侧滑(Yaw)，再攻角(Pitch)
  // Q_final = Q_pitch * Q_yaw
  const deltaQuaternion = new THREE.Quaternion().multiplyQuaternions(quatAlpha, quatBeta);
    
  // 3. 计算气流系的最终姿态
  // 最终姿态 = 机体姿态 * 相对旋转
  const finalQuaternion = bodyQuaternion.multiply(deltaQuaternion);

  // 4. 应用最终姿态
  // [修正] 我们只旋转父对象 windFrame。
  // 作为其子对象的 airflowLines, forceLift, forceDrag 会自动继承这个旋转。
  windFrame.setRotationFromQuaternion(finalQuaternion);
};

// --- 4. Watchers (无变化，逻辑正确) ---

// 监听滑块的值变化时，调用更新函数
watch([alpha, beta], ([newAlpha, newBeta]) => {
  if (flightParams.value) {
    flightParams.value.alpha = newAlpha;
    flightParams.value.beta = newBeta;
  }
  // The original logic to update the 3D model is still needed
  updateAirflowRotation();
}, { immediate: true }); // Use immediate to set initial values

// 当依赖的坐标系 (bodyAxes 或 windAxes) 出现或姿态变化时，也应该触发一次更新
// 这样可以确保在显示气流系时，它能立即获得正确的初始姿态
watch(() => [
    viewerState.value.bodyAxes?.quaternion,
    viewerState.value.windAxes?.visible
], updateAirflowRotation, { deep: true });

</script>

<template>
  <div class="control-group airflow-control">
    <div class="slider-control">
      <label>攻角 (α): {{ alpha.toFixed(1) }}°</label>
      <input type="range" v-model.number="alpha" min="-15" max="20" step="0.5" />
    </div>
    <div class="slider-control">
      <label>侧滑角 (β): {{ beta.toFixed(1) }}°</label>
      <input type="range" v-model.number="beta" min="-20" max="20" step="0.5" />
    </div>
  </div>
</template>

<style scoped>
/* 你的样式已经很完美，无需修改 */
.airflow-control {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 12px;
  margin-top: 12px;
}
.slider-control {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.slider-control label {
  font-size: 0.9em;
}
.slider-control input[type="range"] {
  width: 100%;
}
</style>