<!-- docs/.vitepress/theme/ACViewerControl/ForcesControl.vue -->
<script setup>
import { ref, inject, watchEffect } from 'vue';

// --- 1. 注入 (无变化) ---
const viewerState = inject('viewerState');

// --- 2. UI 状态 (无变化) ---
const controls = ref({
    lift: false,
    drag: false,
    thrust: false,
    gravity: false,
});
const magnitudes = ref({
    lift: 1.5,
    drag: 0.5,
    thrust: 1.0,
    gravity: 1.0
});

// --- 3. 核心逻辑：使用 watchEffect 实现响应式 ---

// 响应式地更新升力
watchEffect(() => {
    const helper = viewerState.value?.forceLift;
    if (helper) {
        helper.visible = controls.value.lift;
        if (helper.visible) {
            helper.setLength(10 * magnitudes.value.lift, 0.2 * 10 * magnitudes.value.lift, 0.1 * 10 * magnitudes.value.lift);
            // [最终修正] 移除 quaternion.copy, 因为方向由父对象(windAxes)自动处理
        }
    }
});

// 响应式地更新阻力
watchEffect(() => {
    const helper = viewerState.value?.forceDrag;
    if (helper) {
        helper.visible = controls.value.drag;
        if (helper.visible) {
            helper.setLength(10 * magnitudes.value.drag, 0.2 * 10 * magnitudes.value.drag, 0.1 * 10 * magnitudes.value.drag);
            // [最终修正] 移除 quaternion.copy, 因为方向由父对象(windAxes)自动处理
        }
    }
});

// 响应式地更新推力
watchEffect(() => {
    const helper = viewerState.value?.forceThrust;
    if (helper) {
        helper.visible = controls.value.thrust;
        if (helper.visible) {
            helper.setLength(10 * magnitudes.value.thrust, 0.2 * 10 * magnitudes.value.thrust, 0.1 * 10 * magnitudes.value.thrust);
            // [最终修正] 移除 quaternion.copy, 因为方向由父对象(bodyAxes)自动处理
        }
    }
});

// 响应式地更新重力
watchEffect(() => {
    const helper = viewerState.value?.forceGravity;
    if (helper) {
        helper.visible = controls.value.gravity;
        if (helper.visible) {
            helper.setLength(10 * magnitudes.value.gravity, 0.2 * 10 * magnitudes.value.gravity, 0.1 * 10 * magnitudes.value.gravity);
            // 重力不受飞机姿态影响，所以本来就没有旋转代码，保持不变
        }
    }
});
</script>

<!-- template 和 style 保持不变 -->
<template>
    <div class="control-group forces-control">
        <div class="checkbox-group">
            <label title="Lift - Perpendicular to airflow">
                <input type="checkbox" v-model="controls.lift" /> 升力 (L)
            </label>
            <label title="Drag - Parallel to airflow">
                <input type="checkbox" v-model="controls.drag" /> 阻力 (D)
            </label>
            <label title="Thrust - Aligned with the aircraft body">
                <input type="checkbox" v-model="controls.thrust" /> 推力 (T)
            </label>
            <label title="Gravity - Always points down">
                <input type="checkbox" v-model="controls.gravity" /> 重力 (G)
            </label>
        </div>
        <div class="slider-group">
            <div class="slider-control" v-if="controls.lift"><label>Lift Magnitude</label><div class="slider-wrapper"><span>0</span><input type="range" v-model.number="magnitudes.lift" min="0" max="3" step="0.1" /><span>3</span></div></div>
            <div class="slider-control" v-if="controls.drag"><label>Drag Magnitude</label><div class="slider-wrapper"><span>0</span><input type="range" v-model.number="magnitudes.drag" min="0" max="3" step="0.1" /><span>3</span></div></div>
            <div class="slider-control" v-if="controls.thrust"><label>Thrust Magnitude</label><div class="slider-wrapper"><span>0</span><input type="range" v-model.number="magnitudes.thrust" min="0" max="3" step="0.1" /><span>3</span></div></div>
            <div class="slider-control" v-if="controls.gravity"><label>Gravity Magnitude</label><div class="slider-wrapper"><span>0</span><input type="range" v-model.number="magnitudes.gravity" min="0" max="3" step="0.1" /><span>3</span></div></div>
        </div>
    </div>
</template>
<style scoped>
.forces-control { border-top: 1px solid var(--vp-c-divider); padding-top: 12px; margin-top: 12px; }
.checkbox-group { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; margin-bottom: 16px; }
.checkbox-group label { display: flex; align-items: center; gap: 8px; font-size: 0.9em; cursor: pointer; }
.slider-group { display: flex; flex-direction: column; gap: 12px; }
.slider-control { display: flex; flex-direction: column; }
.slider-control label { margin-bottom: 4px; font-size: 0.85em; color: var(--vp-c-text-2); }
.slider-wrapper { display: flex; align-items: center; gap: 8px; }
.slider-wrapper span { font-size: 0.8em; color: var(--vp-c-text-3); }
input[type="range"] { width: 100%; flex-grow: 1; -webkit-appearance: none; appearance: none; height: 5px; background: var(--vp-c-bg-soft); border-radius: 5px; outline: none; }
input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 16px; height: 16px; background: var(--vp-c-brand-1); border-radius: 50%; cursor: pointer; transition: background 0.2s ease; }
input[type="range"]::-moz-range-thumb { width: 16px; height: 16px; background: var(--vp-c-brand-1); border-radius: 50%; cursor: pointer; transition: background 0.2s ease; }
input[type="range"]:hover::-webkit-slider-thumb { background: var(--vp-c-brand-2); }
input[type="range"]:hover::-moz-range-thumb { background: var(--vp-c-brand-2); }
</style>