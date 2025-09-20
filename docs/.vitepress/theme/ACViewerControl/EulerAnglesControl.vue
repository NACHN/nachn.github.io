<!-- docs/.vitepress/theme/ACViewerControl/EulerAnglesControl.vue -->
<script setup>
import { ref, inject, watch } from 'vue';
import * as THREE from 'three';

const aircraft = inject('aircraft');

const phi = ref(0);   // Roll, 滚转 (°)
const theta = ref(0); // Pitch, 俯仰 (°)
const psi = ref(0);   // Yaw, 偏航 (°)

watch([phi, theta, psi], () => {
  if (aircraft.value) {
    const phiRad = THREE.MathUtils.degToRad(phi.value);
    const thetaRad = THREE.MathUtils.degToRad(theta.value);
    const psiRad = THREE.MathUtils.degToRad(psi.value);

    // [注] 基向量定义必须与 AxesControl.vue 中完全一致
    const axisX_body = new THREE.Vector3(1, 0, 0);  // 滚转轴
    const axisY_body = new THREE.Vector3(0, 0, 1);  // 俯仰轴
    const axisZ_body = new THREE.Vector3(0, -1, 0); // 偏航轴

    const quatRoll = new THREE.Quaternion().setFromAxisAngle(axisX_body, phiRad);
    const quatPitch = new THREE.Quaternion().setFromAxisAngle(axisY_body, thetaRad);
    const quatYaw = new THREE.Quaternion().setFromAxisAngle(axisZ_body, psiRad);
    
    const finalQuaternion = new THREE.Quaternion();
    finalQuaternion.multiply(quatYaw);
    finalQuaternion.multiply(quatPitch);
    finalQuaternion.multiply(quatRoll);
    
    aircraft.value.setRotationFromQuaternion(finalQuaternion);
  }
});

watch(aircraft, (newAircraft) => {
  if (newAircraft) {
    phi.value = 0;
    theta.value = 0;
    psi.value = 0;
  }
}, { immediate: true });
</script>

<template>
  <div class="control-group euler-angles-control">
    <div class="slider-control">
      <label>滚转 (Φ Roll): {{ phi.toFixed(0) }}°</label>
      <div class="slider-wrapper">
        <span>-180</span>
        <input type="range" v-model.number="phi" min="-180" max="180" step="1" />
        <span>180</span>
      </div>
    </div>
    <div class="slider-control">
      <label>俯仰 (θ Pitch): {{ theta.toFixed(0) }}°</label>
      <div class="slider-wrapper">
        <span>-90</span>
        <input type="range" v-model.number="theta" min="-90" max="90" step="1" />
        <span>90</span>
      </div>
    </div>
    <div class="slider-control">
      <label>偏航 (ψ Yaw): {{ psi.toFixed(0) }}°</label>
      <div class="slider-wrapper">
        <span>-180</span>
        <input type="range" v-model.number="psi" min="-180" max="180" step="1" />
        <span>180</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.euler-angles-control {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 12px;
  margin-top: 12px;
}

.slider-control {
  display: flex;
  flex-direction: column;
}

.slider-control label {
  margin-bottom: 4px;
  font-size: 0.9em;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.slider-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider-wrapper span {
  font-size: 0.8em;
  color: var(--vp-c-text-3);
  width: 30px; /* 固定宽度以对齐 */
  text-align: center;
}

input[type="range"] {
  width: 100%;
  flex-grow: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 5px;
  background: var(--vp-c-bg-soft);
  border-radius: 5px;
  outline: none;
  transition: opacity 0.2s ease;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid var(--vp-c-bg-soft);
  transition: background 0.2s ease;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid var(--vp-c-bg-soft);
  transition: background 0.2s ease;
}

input[type="range"]:hover {
  opacity: 0.9;
}

input[type="range"]:hover::-webkit-slider-thumb {
  background: var(--vp-c-brand-2);
}
input[type="range"]:hover::-moz-range-thumb {
  background: var(--vp-c-brand-2);
}
</style>