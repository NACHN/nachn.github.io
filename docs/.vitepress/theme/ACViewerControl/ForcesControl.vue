<!-- docs/.vitepress/theme/ACViewerControl/ForcesControl.vue -->
<script setup>
import { ref, inject, watchEffect, computed } from 'vue';

// --- 1. 注入 ---
// viewerState for Three.js objects
const viewerState = inject('viewerState');
// flightParams for simulation data like angle of attack
const flightParams = inject('flightParams', ref({ alpha: 0, beta: 0 })); // Provide a default
const VISUAL_SCALE = 10.0;
const AERO_FORCE_SCALAR = 3.0;
// --- 2. UI 状态 ---
const controls = ref({
    lift: false,
    drag: false,
    thrust: false,
    gravity: false,
});

// Magnitudes for manually controlled forces
const manualMagnitudes = ref({
    thrust: 1.0,
    gravity: 1.0 // This 'G' will be our scaling factor
});

// Adjustments for calculated forces (values from the new sliders)
const adjustments = ref({
    lift: 0,
    drag: 0
});

// --- 3. 核心计算逻辑 (using computed properties) ---

// Get Angle of Attack in degrees from the shared state
const alphaDeg = computed(() => flightParams.value.alpha || 0);

// Use Gravity's magnitude as the base scaling factor 'G'
const G = computed(() => manualMagnitudes.value.gravity);

// Calculate Lift Coefficient (Cʟ) based on the linear formula
const liftCoefficient = computed(() => {
    // Cʟ = 0.1 + 0.1 * α_deg
    return 0.1 + 0.1 * alphaDeg.value;
});

// Calculate Drag Coefficient (Cᴅ) based on the drag polar formula
const dragCoefficient = computed(() => {
    // Cᴅ = Cᴅ₀ + k * Cʟ²  (using your provided coefficients)
    const Cʟ = liftCoefficient.value;
    return 0.0171 - 0.017 * Cʟ + 0.75 * Cʟ * Cʟ;
});

// [修改] 升力和阻力现在使用 AERO_FORCE_SCALAR (qS) 而不是 G
const totalLift = computed(() => {
    const baseLift = AERO_FORCE_SCALAR * liftCoefficient.value;
    return Math.max(0, baseLift + adjustments.value.lift);
});

const totalDrag = computed(() => {
    const baseDrag = AERO_FORCE_SCALAR * dragCoefficient.value;
    return Math.max(0, baseDrag + adjustments.value.drag);
});

// --- 4. watchEffect to apply changes to the 3D scene ---

watchEffect(() => {
    const helper = viewerState.value?.forceLift;
    if (helper) {
        helper.visible = controls.value.lift;
        if (helper.visible) {
            // [修改] 应用视觉缩放
            const len = totalLift.value * VISUAL_SCALE;
            helper.setLength(len, 0.2 * len, 0.1 * len);
        }
    }
});

watchEffect(() => {
    const helper = viewerState.value?.forceDrag;
    if (helper) {
        helper.visible = controls.value.drag;
        if (helper.visible) {
            // [修改] 应用视觉缩放
            const len = totalDrag.value * VISUAL_SCALE;
            helper.setLength(len, 0.2 * len, 0.1 * len);
        }
    }
});

watchEffect(() => {
    const helper = viewerState.value?.forceThrust;
    if (helper) {
        helper.visible = controls.value.thrust;
        if (helper.visible) {
            // [修改] 应用视觉缩放，保持一致性
            const len = manualMagnitudes.value.thrust * VISUAL_SCALE;
            helper.setLength(len, 0.2 * len, 0.1 * len);
        }
    }
});

watchEffect(() => {
    const helper = viewerState.value?.forceGravity;
    if (helper) {
        helper.visible = controls.value.gravity;
        if (helper.visible) {
            // [修改] 应用视觉缩放，保持一致性
            const len = manualMagnitudes.value.gravity * VISUAL_SCALE/5;
            helper.setLength(len, 0.2 * len, 0.1 * len);
        }
    }
});
</script>

<template>
    <div class="control-group forces-control">
        <div class="checkbox-group">
            <label title="Lift - Perpendicular to airflow"><input type="checkbox" v-model="controls.lift" /> 升力 (L)</label>
            <label title="Drag - Parallel to airflow"><input type="checkbox" v-model="controls.drag" /> 阻力 (D)</label>
            <label title="Thrust - Aligned with the aircraft body"><input type="checkbox" v-model="controls.thrust" /> 推力 (T)</label>
            <label title="Gravity - Always points down"><input type="checkbox" v-model="controls.gravity" /> 重力 (G)</label>
        </div>
        
        <!-- Display calculated values for teaching -->
        <div class="info-group">
            <div v-if="controls.lift">升力系数 Cʟ: {{ liftCoefficient.toFixed(3) }}</div>
            <div v-if="controls.drag">阻力系数 Cᴅ: {{ dragCoefficient.toFixed(3) }}</div>
        </div>

        <div class="slider-group">
            <!-- Lift and Drag are now adjustments -->
            <div class="slider-control" v-if="controls.lift">
                <label>升力调节 (L_adj): {{ adjustments.lift.toFixed(2) }}</label>
                <div class="slider-wrapper"><span>-1</span><input type="range" v-model.number="adjustments.lift" min="-1" max="1" step="0.05" /><span>1</span></div>
                <div class="total-value">总升力: {{ totalLift.toFixed(2) }}</div>
            </div>
            <div class="slider-control" v-if="controls.drag">
                <label>阻力调节 (D_adj): {{ adjustments.drag.toFixed(2) }}</label>
                <div class="slider-wrapper"><span>-1</span><input type="range" v-model.number="adjustments.drag" min="-1" max="1" step="0.05" /><span>1</span></div>
                <div class="total-value">总阻力: {{ totalDrag.toFixed(2) }}</div>
            </div>

            <!-- Thrust and Gravity remain manually controlled -->
            <div class="slider-control" v-if="controls.thrust">
                <label>推力大小 (T): {{ manualMagnitudes.thrust.toFixed(2) }}</label>
                <div class="slider-wrapper"><span>0</span><input type="range" v-model.number="manualMagnitudes.thrust" min="0" max="3" step="0.1" /><span>3</span></div>
            </div>
            <div class="slider-control" v-if="controls.gravity">
                <label>重力大小 (G): {{ manualMagnitudes.gravity.toFixed(2) }}</label>
                <div class="slider-wrapper"><span>0</span><input type="range" v-model.number="manualMagnitudes.gravity" min="0" max="3" step="0.1" /><span>3</span></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* [New Styles Added] */
.info-group {
    display: flex;
    justify-content: space-around;
    font-size: 0.8em;
    color: var(--vp-c-text-2);
    background-color: var(--vp-c-bg-soft);
    padding: 6px;
    border-radius: 4px;
    margin-bottom: 12px;
}
.total-value {
    font-size: 0.8em;
    color: var(--vp-c-brand-1);
    font-weight: bold;
    text-align: right;
    margin-top: 4px;
}

/* [Existing Styles - slightly adapted] */
.forces-control { border-top: 1px solid var(--vp-c-divider); padding-top: 12px; margin-top: 12px; }
.checkbox-group { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; margin-bottom: 12px; }
.checkbox-group label { display: flex; align-items: center; gap: 8px; font-size: 0.9em; cursor: pointer; }
.slider-group { display: flex; flex-direction: column; gap: 16px; }
.slider-control { display: flex; flex-direction: column; }
.slider-control label { margin-bottom: 4px; font-size: 0.85em; color: var(--vp-c-text-2); }
.slider-wrapper { display: flex; align-items: center; gap: 8px; }
.slider-wrapper span { font-size: 0.8em; color: var(--vp-c-text-3); }
input[type="range"] { width: 100%; flex-grow: 1; margin: 0; }
</style>