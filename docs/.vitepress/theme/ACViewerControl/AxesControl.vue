<!-- docs/.vitepress/theme/ACViewerControl/AxesControl.vue -->
<script setup>
import { ref, inject, watch } from 'vue';

// --- 1. 定义 Props ---
const props = defineProps({
    systems: {
        type: Array,
        default: () => ['body', 'ground', 'wind']
    }
});

// --- 2. 注入共享状态 ---
const viewerState = inject('viewerState');

// --- 3. UI 状态 ---
const controls = ref({
    body: false,
    ground: false,
    wind: false,
    trajectory: false,
    transparent: false, // [新增] 用于控制半透明的独立状态
});

// --- 4. 存储原始材质 ---
const originalMaterials = new Map();

// --- 5. 核心逻辑：Watchers 直接修改 visible 属性 ---

// [修改] 监听机体系 checkbox，现在只负责坐标系的显示/隐藏
watch(() => controls.value.body, (isVisible) => {
    if (viewerState.value.bodyAxes) {
        viewerState.value.bodyAxes.visible = isVisible;
    }
});

// [新增] 创建一个专门的 watcher 来处理半透明效果
watch(() => controls.value.transparent, (isTransparent) => {
    const aircraft = viewerState.value?.aircraft;
    if (!aircraft) return;

    aircraft.traverse((child) => {
        if (child.isMesh && child.material) {
            if (isTransparent) {
                // 如果需要变为透明
                if (!originalMaterials.has(child.uuid)) {
                    // 备份原始材质
                    originalMaterials.set(child.uuid, child.material);
                }
                // 克隆材质并设置为半透明
                const clonedMaterial = child.material.clone();
                clonedMaterial.transparent = true;
                clonedMaterial.opacity = 0.3;
                child.material = clonedMaterial;
            } else {
                // 如果需要恢复不透明
                if (originalMaterials.has(child.uuid)) {
                    // 销毁克隆的材质
                    child.material.dispose(); 
                    // 恢复原始材质
                    child.material = originalMaterials.get(child.uuid);
                    // (可选) 从 Map 中移除，以允许未来再次克隆最新的材质
                    // originalMaterials.delete(child.uuid); 
                }
            }
        }
    });
});


// 监听地心系 checkbox (无变化)
watch(() => controls.value.ground, (isVisible) => {
    if (viewerState.value.groundAxes) {
        viewerState.value.groundAxes.visible = isVisible;
    }
    if (viewerState.value.compass) {
        viewerState.value.compass.visible = isVisible;
    }
});

// 监听气流系 checkbox (无变化)
watch(() => controls.value.wind, (isVisible) => {
    if (viewerState.value.windAxes) {
        viewerState.value.windAxes.visible = isVisible;
    }
    // 注意：airflowLines 已经是 windAxes 的子对象，
    // 其可见性会随父对象变化。但为了明确控制，保留这行代码是安全的。
    if (viewerState.value.airflowLines) {
        viewerState.value.airflowLines.visible = isVisible;
    }
});
</script>

<template>
    <div class="control-group axes-control">
        <label v-if="systems.includes('body')">
            <input type="checkbox" v-model="controls.body" /> 机体系 (Body)
        </label>
        <label v-if="systems.includes('ground')">
            <input type="checkbox" v-model="controls.ground" /> 东北地 (NED)
        </label>
        <label v-if="systems.includes('wind')">
            <input type="checkbox" v-model="controls.wind" /> 气流系 (Wind)
        </label>
        <label v-if="systems.includes('trajectory')">
            <input type="checkbox" v-model="controls.trajectory" disabled /> 航迹系 (Trajectory)
        </label>
        
        <!-- [新增] 独立的半透明控制复选框 -->
        <label class="transparent-control">
            <input type="checkbox" v-model="controls.transparent" /> 半透明机身 (X-Ray)
        </label>
    </div>
</template>

<style scoped>
.axes-control {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.axes-control label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9em;
    cursor: pointer;
}

/* [新增] 为新的复选框添加一点样式，使其与坐标系组有轻微区分 */
.transparent-control {
    border-top: 1px solid var(--vp-c-divider);
    padding-top: 8px;
    margin-top: 4px;
}
</style>