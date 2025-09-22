<!-- docs/.vitepress/theme/AircraftViewer.vue -->
<script setup>
import { ref, onMounted, onUnmounted, provide, shallowRef } from 'vue';
import { markRaw } from 'vue';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// --- Refs and Injections (无变化) ---
const container = ref(null);
const scene = shallowRef(null);
const aircraft = shallowRef(null);
const viewerState = shallowRef({});
const flightParams = ref({
  alpha: 0, // Angle of Attack in degrees
  beta: 0   // Sideslip Angle in degrees
});
provide('scene', scene);
provide('aircraft', aircraft);
provide('viewerState', viewerState);
provide('flightParams', flightParams);
let renderer;
let animationFrameId = null;

// --- Helper Creation Functions (无变化) ---

const createLabeledAxes = (size, { xVec, yVec, zVec }, { xLabel, yLabel, zLabel }, { xColor, yColor, zColor }) => {
    const axes = new THREE.Object3D();
    const origin = new THREE.Vector3(0, 0, 0);
    const length = size;
    const headLength = 0.15 * size;
    const headWidth = 0.08 * size;

    axes.add(markRaw(new THREE.ArrowHelper(xVec, origin, length, xColor, headLength, headWidth)));
    axes.add(markRaw(new THREE.ArrowHelper(yVec, origin, length, yColor, headLength, headWidth)));
    axes.add(markRaw(new THREE.ArrowHelper(zVec, origin, length, zColor, headLength, headWidth)));

    const createLabel = (text, color, position) => {
        const sprite = new SpriteText(text, 0.2 * size, color);
        sprite.position.copy(position);
        return markRaw(sprite);
    };

    axes.add(createLabel(xLabel, `#${xColor.toString(16).padStart(6, '0')}`, xVec.clone().multiplyScalar(length * 1.1)));
    axes.add(createLabel(yLabel, `#${yColor.toString(16).padStart(6, '0')}`, yVec.clone().multiplyScalar(length * 1.1)));
    axes.add(createLabel(zLabel, `#${zColor.toString(16).padStart(6, '0')}`, zVec.clone().multiplyScalar(length * 1.1)));

    return markRaw(axes);
};

const createAllHelpers = () => {
    const helpers = {};

    // --- 创建坐标系 ---
    // 定义机体系基准: Xb(前), Yb(右), Zb(下)
    const bodyBasis = { xVec: new THREE.Vector3(1, 0, 0), yVec: new THREE.Vector3(0, 0, 1), zVec: new THREE.Vector3(0, -1, 0) };
    helpers.bodyAxes = createLabeledAxes(5, bodyBasis, { xLabel: 'Xb', yLabel: 'Yb', zLabel: 'Zb' }, { xColor: 0xff0000, yColor: 0x00ff00, zColor: 0x0000ff });
    helpers.windAxes = createLabeledAxes(5, bodyBasis, { xLabel: 'Xw', yLabel: 'Yw', zLabel: 'Zw' }, { xColor: 0xffa500, yColor: 0xffa500, zColor: 0xffa500 });
    
    const groundBasis = { xVec: new THREE.Vector3(1, 0, 0), yVec: new THREE.Vector3(0, 0, 1), zVec: new THREE.Vector3(0, -1, 0) };
    helpers.groundAxes = createLabeledAxes(6, groundBasis, { xLabel: 'N', yLabel: 'E', zLabel: 'D' }, { xColor: 0xcccccc, yColor: 0xcccccc, zColor: 0xcccccc });

    // --- 创建力矢量 ---
    // [最终修正] 力的方向是相对于其参考系的。
    // 升力 (Lift): 垂直于来流速度向上，即与气流系Zw轴(向下)相反。 Zw是(0,-1,0), 相反就是 (0,1,0)
    helpers.forceLift = markRaw(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1.5, 0x00ff00));
    // 阻力 (Drag): 与来流速度方向相反，即与气流系Xw轴(向前)相反。 Xw是(1,0,0), 相反就是 (-1,0,0)
    helpers.forceDrag = markRaw(new THREE.ArrowHelper(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 0, 0), 0.5, 0xff0000));
    // 推力 (Thrust): 沿机身向前，即与机体系Xb轴(向前)同向。 Xb是(1,0,0)
    helpers.forceThrust = markRaw(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 1.0, 0xffff00));
    // 重力 (Gravity): 始终指向地心，即世界坐标系Y轴负方向。
    helpers.forceGravity = markRaw(new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 0, 0), 1.0, 0x808080));

    // --- 创建其他辅助对象 (无变化) ---
    const compassGroup = new THREE.Object3D();
    const northArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 1.5, 0xffffff, 0.3, 0.2);
    const northLabel = new SpriteText("N", 0.4, "#ffffff");
    northLabel.position.set(1.8, 0, 0);
    compassGroup.add(markRaw(northArrow), markRaw(northLabel));
    compassGroup.position.set(-3, -2, -3);
    helpers.compass = markRaw(compassGroup);

    const linesGroup = new THREE.Object3D();
    const material = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
    for (let i = -5; i <= 5; i += 1) {
        const points = [new THREE.Vector3(-20, i * 0.5, 0), new THREE.Vector3(20, i * 0.5, 0)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        linesGroup.add(markRaw(new THREE.Line(geometry, material)));
    }
    helpers.airflowLines = markRaw(linesGroup);

    // 默认全部隐藏
    Object.values(helpers).forEach(helper => {
        if (helper) helper.visible = false;
    });

    return helpers;
};


// --- 初始化 Three.js 场景 ---
const initScene = () => {
    // ... scene, camera, renderer, lights, controls setup (无变化) ...
    if (!container.value) return;
    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(0x111111);
    const gridHelper = new THREE.GridHelper(100, 100, 0x444444, 0x222222);
    gridHelper.position.y = -2;
    newScene.add(gridHelper);
    const camera = new THREE.PerspectiveCamera(50, container.value.clientWidth / container.value.clientHeight, 0.1, 1000);
    camera.position.set(10, 5, 10);
    camera.lookAt(0, 0, 0);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.value.appendChild(renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    newScene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 7.5);
    newScene.add(directionalLight);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const loader = new GLTFLoader();
    loader.load('/models/B747.glb', (gltf) => {
        const loadedAircraft = gltf.scene;
        loadedAircraft.scale.set(0.2, 0.2, 0.2);
        loadedAircraft.position.set(0, 0, 0);
        newScene.add(loadedAircraft);
        
        aircraft.value = markRaw(loadedAircraft);
        const allHelpers = createAllHelpers();
        
        // [最终修正] 建立正确的父子关系
        // 1. 将推力矢量作为机体系的子对象
        allHelpers.bodyAxes.add(allHelpers.forceThrust);

        // 2. 将升力和阻力矢量作为气流系的子对象
        allHelpers.windAxes.add(allHelpers.forceLift, allHelpers.forceDrag);
        
        // 3. 将气流线作为气流系的子对象
        allHelpers.windAxes.add(allHelpers.airflowLines);

        // 4. 将坐标系添加到飞机上
        loadedAircraft.add(allHelpers.bodyAxes, allHelpers.windAxes);
        
        // 5. 将与飞机无关的辅助对象添加到场景中
        newScene.add(allHelpers.groundAxes, allHelpers.compass, allHelpers.forceGravity);
        
        viewerState.value = { ...allHelpers,aircraft: loadedAircraft };
        console.log('Aircraft model and helpers loaded successfully!');
    }, undefined, (error) => {
        console.error('An error happened while loading the model:', error);
    });

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(newScene, camera);
    };
    animate();

    const onWindowResize = () => {
        if (!container.value) return;
        camera.aspect = container.value.clientWidth / container.value.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    };
    window.addEventListener('resize', onWindowResize);
    onUnmounted(() => {
        window.removeEventListener('resize', onWindowResize);
    });

    scene.value = newScene;
};

// --- 生命周期钩子 (无变化) ---
onMounted(initScene);
onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
    if (renderer) {
        renderer.dispose();
        const domElement = renderer.domElement;
        if (domElement && domElement.parentNode) {
            domElement.parentNode.removeChild(domElement);
        }
    }
    if (scene.value) {
        scene.value.traverse(object => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
    }
});
</script>

<!-- template 和 style 保持不变 -->
<template>
  <div class="viewer-wrapper">
    <div ref="container" class="viewer-container"></div>
    <div class="controls-panel">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.viewer-wrapper { border: 1px solid var(--vp-c-divider); border-radius: 8px; display: flex; }
.controls-panel { padding: 12px; background-color: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); font-size: 0.9em; width: 30%;}
.controls-panel label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.viewer-container { width: 70%; min-height: 40vh; background-color: #111111; position: relative; }
</style>