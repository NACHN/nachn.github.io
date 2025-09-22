<!-- docs/.vitepress/theme/ACViewerControl/EulerAnglesControl.vue -->
<script setup>
import { ref, inject, watch } from 'vue';
import * as THREE from 'three';

const aircraft = inject('aircraft');
const phi = ref(0);   // Roll, 滚转 (°)
const theta = ref(0); // Pitch, 俯仰 (°)
const psi = ref(0);   // Yaw, 偏航 (°)

// [最终解释] 定义固定的“基准轴”，它们是欧拉角定义的参考系。
// 在我们的场景中，它们与飞机模型的初始局部坐标系（也即地面系）一致。
const axisRoll = new THREE.Vector3(1, 0, 0);  // 对应初始 Xb 轴
const axisPitch = new THREE.Vector3(0, 0, 1);  // 对应初始 Yb 轴
const axisYaw = new THREE.Vector3(0, -1, 0); // 对应初始 Zb 轴

watch([phi, theta, psi], () => {
    if (aircraft.value) {
        const phiRad = THREE.MathUtils.degToRad(phi.value);
        const thetaRad = THREE.MathUtils.degToRad(theta.value);
        const psiRad = THREE.MathUtils.degToRad(psi.value);

        // [最终解释] 每次滑块变动，我们都在计算一个全新的“绝对姿态”。
        // 这个计算过程必须从一个“无旋转”的初始状态开始，即 new THREE.Quaternion()。

        // 1. 计算每一次“外旋”对应的旋转量
        const quatRoll = new THREE.Quaternion().setFromAxisAngle(axisRoll, phiRad);
        const quatPitch = new THREE.Quaternion().setFromAxisAngle(axisPitch, thetaRad);
        const quatYaw = new THREE.Quaternion().setFromAxisAngle(axisYaw, psiRad);

        // 2. 构造最终姿态
        // 根据数学定理，Yaw->Pitch->Roll 的“内旋”等价于 Roll->Pitch->Yaw 的“外旋”。
        // 我们通过组合外旋来达到内旋的最终效果。
        // (四元数乘法中，右边的先应用，所以这里的顺序是 Q_yaw * (Q_pitch * Q_roll))
        const finalQuaternion = new THREE.Quaternion();
        finalQuaternion.multiply(quatYaw);
        finalQuaternion.multiply(quatPitch);
        finalQuaternion.multiply(quatRoll);

        // 3. 将计算出的唯一、确定的最终姿态应用到飞机上。
        aircraft.value.setRotationFromQuaternion(finalQuaternion);
    }
});

watch(aircraft, (newAircraft) => {
    if (newAircraft) {
        if (phi.value !== 0 || theta.value !== 0 || psi.value !== 0) {
            phi.value = 0; theta.value = 0; psi.value = 0;
        }
    }
}, { immediate: true });
</script>

<!-- Template and Style Remain the same -->
<template>
    <div class="control-group euler-angles-control">
        <div class="slider-control">
            <label>滚转 (Φ Roll): {{ phi.toFixed(0) }}°</label>
            <div class="slider-wrapper">
                <span>-180</span><input type="range" v-model.number="phi" min="-180" max="180"
                    step="1" /><span>180</span>
            </div>
        </div>
        <div class="slider-control">
            <label>俯仰 (θ Pitch): {{ theta.toFixed(0) }}°</label>
            <div class="slider-wrapper">
                <span>-90</span><input type="range" v-model.number="theta" min="-90" max="90" step="1" /><span>90</span>
            </div>
        </div>
        <div class="slider-control">
            <label>偏航 (ψ Yaw): {{ psi.toFixed(0) }}°</label>
            <div class="slider-wrapper">
                <span>-180</span><input type="range" v-model.number="psi" min="-180" max="180"
                    step="1" /><span>180</span>
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
    margin-top: 12px
}

.slider-control {
    display: flex;
    flex-direction: column
}

.slider-control label {
    margin-bottom: 4px;
    font-size: .9em;
    font-weight: 500;
    color: var(--vp-c-text-1)
}

.slider-wrapper {
    display: flex;
    align-items: center;
    gap: 10px
}

.slider-wrapper span {
    font-size: .8em;
    color: var(--vp-c-text-3);
    width: 30px;
    text-align: center
}

input[type=range] {
    width: 100%;
    flex-grow: 1;
    -webkit-appearance: none;
    appearance: none;
    height: 5px;
    background: var(--vp-c-bg-soft);
    border-radius: 5px;
    outline: none;
    transition: opacity .2s ease
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: var(--vp-c-brand-1);
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid var(--vp-c-bg-soft);
    transition: background .2s ease
}

input[type=range]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: var(--vp-c-brand-1);
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid var(--vp-c-bg-soft);
    transition: background .2s ease
}

input[type=range]:hover {
    opacity: .9
}

input[type=range]:hover::-webkit-slider-thumb {
    background: var(--vp-c-brand-2)
}

input[type=range]:hover::-moz-range-thumb {
    background: var(--vp-c-brand-2)
}
</style>