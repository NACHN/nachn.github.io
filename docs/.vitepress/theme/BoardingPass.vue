<!-- docs/.vitepress/theme/BoardingPass.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 将所有信息都定义为响应式数据，方便未来扩展
const passInfo = ref({
    passengerName: 'DAIYUNTAO 戴畇滔',
    cargo: 'PROJECTS 项目',
    flightNumber: 'PPP-001', // Perception-Prediction-Precaution
    destination: 'Ph.D. in Control Systems',
    origin: '中国民航大学 CAUC / M.S.',
    gate: 'R-01', // Research Gate 1
    seat: 'DEV', // Developer
    boardingTime: 'NOW',
    date: new Date().toLocaleDateString('en-CA'), // e.g., 2023-10-30
    qrCodeLink: 'https://github.com/NACHN/nachn.github.io/raw/main/docs/public/YuntaoDai_CV.pdf', // 扫码下载简历的链接
});

const props = defineProps({
    // 定义一个名为 scale 的 prop，类型是 Number，默认值是 1
    scale: {
        type: Number,
        default: 1.0
    }
});

// --- 新增的代码 ---
const cardContainer = ref(null); // 用于获取登机牌容器的 DOM 引用
const card = ref(null); // 用于获取登机牌本身的 DOM 引用

const handleMouseMove = (event) => {
    if (!cardContainer.value || !card.value) return;

    // 1. 获取容器的尺寸和位置
    const rect = cardContainer.value.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // 2. 计算鼠标在容器内的相对位置 (0 to 1)
    const mouseX = (event.clientX - rect.left) / width;
    const mouseY = (event.clientY - rect.top) / height;

    // 3. 定义旋转的最大角度
    const maxRotate = 15; // 最大倾斜 15 度

    // 4. 计算 Y 轴的旋转角度 (左右倾斜)
    // 鼠标在中间时 (mouseX = 0.5)，旋转为 0
    // 鼠标在最左侧时 (mouseX = 0)，旋转为 -15 度
    // 鼠标在最右侧时 (mouseX = 1)，旋转为 15 度
    const rotateY = (mouseX - 0.5) * 2 * maxRotate;

    // 5. 计算 X 轴的旋转角度 (上下倾斜)
    // 鼠标在最上方时 (mouseY = 0)，旋转为 15 度
    // 鼠标在最下方时 (mouseY = 1)，旋转为 -15 度
    const rotateX = -(mouseY - 0.5) * 2 * maxRotate;

    // 6. 应用 transform 样式
    card.value.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
};

const handleMouseLeave = () => {
    if (card.value) {
        // 7. 鼠标离开时，恢复默认状态
        card.value.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
};

onMounted(() => {
    if (cardContainer.value) {
        // 组件挂载后，添加事件监听器
        cardContainer.value.addEventListener('mousemove', handleMouseMove);
        cardContainer.value.addEventListener('mouseleave', handleMouseLeave);
    }
});

onUnmounted(() => {
    if (cardContainer.value) {
        // 组件卸载前，移除事件监听器，防止内存泄漏
        cardContainer.value.removeEventListener('mousemove', handleMouseMove);
        cardContainer.value.removeEventListener('mouseleave', handleMouseLeave);
    }
});

</script>

<template>
    <div class="boarding-pass-container" ref="cardContainer" :style="{ '--sc': scale, '--msc': scale - 1 }">
        <div class="boarding-pass" ref="card">
            <div class="header">
                <div class="logo">
                    <img src="/web.svg" alt="Logo" class="logo-svg" />
                    <span>YUNTAO AIRLINES 云涛航空</span>
                </div>
                <div class="pass-type" style="display: flex;">
                    <a href="https://github.com/NACHN">
                        <img src="/icons/github.svg" style="filter:brightness(5.0)">
                    </a>&nbsp;&nbsp;BOARDING PASS</img>
                </div>
            </div>

            <div class="content">
                <div class="main-info">
                    <div class="flight-details">
                    <div class="info-item">
                        <span class="label">姓名 NAME</span>
                        <a href="#me"><span class="value name">{{ passInfo.passengerName }}</span></a>
                    </div>
                    <div class="info-item">
                        <span class="label">货物 CARGO</span>
                        <a href="#project"><span class="value name">{{ passInfo.cargo }}</span></a>
                    </div>
                    </div>
                    <div class="flight-details">
                        <div class="info-item">
                            <span class="label">研究航班 RESEARCH FLIGHT</span>
                            <a href="#research"><span class="value">{{ passInfo.flightNumber }}</span></a>
                        </div>
                        <div class="info-item">
                            <span class="label">日期 DATE</span>
                            <span class="value">{{ passInfo.date }}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">登机时间 BOARDING TIME</span>
                            <span class="value important">{{ passInfo.boardingTime }}</span>
                        </div>
                    </div>
                    <div class="route">
                        <div class="info-item">
                            <span class="label">始发地 FROM</span>
                            <a href="#education"><span class="value location">{{ passInfo.origin }}</span></a>
                        </div>
                        <div class="plane-icon">
                            <svg viewBox="0 0 50 50" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg"
                                overflow="inherit">
                                <path fill="currentColor"
                                    d="M48.049 36.31c.523.169.951-.142.951-.692v-3.494c0-.55-.387-1.23-.859-1.512l-18.282-10.895c-.472-.281-.859-.962-.859-1.511v-12.206c0-.55-.168-1.417-.374-1.928 0 0-1.091-2.708-3-3.01-.204-.036-.411-.062-.619-.062h-.01c-.241-.002-.479.028-.713.072l-.216.048-.328.102c-1.588.53-2.406 2.835-2.406 2.835-.184.519-.334 1.393-.334 1.943v12.206c0 .55-.387 1.23-.859 1.512l-18.282 10.894c-.472.282-.859.962-.859 1.512v3.494c0 .55.428.861.951.691l18.098-5.875c.523-.169.951.142.951.692v9.533c0 .55-.36 1.271-.8 1.601l-2.4 1.802c-.44.33-.8 1.051-.8 1.601v2.337c0 .55.433.876.961.724l6.075-1.745c.528-.152 1.394-.152 1.922 0l6.081 1.745c.528.152.961-.174.961-.724v-2.338c0-.55-.36-1.271-.8-1.601l-2.4-1.802c-.439-.33-.8-1.051-.8-1.601v-9.533c0-.55.428-.861.951-.691l18.098 5.876z" />
                            </svg>
                        </div>
                        <div class="info-item">
                            <span class="label">目的地 TO</span>
                            <span class="value location destination">{{ passInfo.destination }}</span>
                        </div>
                    </div>
                </div>

                <div class="side-info">
                    <div class="info-item small">
                        <span class="label">登机门 GATE</span>
                        <span class="value important">{{ passInfo.gate }}</span>
                    </div>
                    <div class="info-item small">
                        <span class="label">座位 SEAT</span>
                        <span class="value important">{{ passInfo.seat }}</span>
                    </div>
                    <!--div class="qr-code">
            <a :href="passInfo.qrCodeLink" target="_blank" title="Download CV">
              <img src="/qr-code.svg" alt="QR Code for CV" />
            </a>
          </div-->
                </div>
            </div>
            <div style="background-color: var(--vp-c-brand-1); height:10px"></div>
            <div class="barcode">
                <!-- 这是一个用 div 模拟的装饰性条形码 -->
                <div v-for="i in 40" :key="i"
                    :style="{ width: `${Math.random() * 4 + 1}px`, height: `32px`, padding: `px`, margin: `1px` }">
                </div>
            </div>
        </div>
    </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');

a {
    text-decoration: none;
    transition: all 0.5s ease;
}

a:hover {
    background-color:var(--vp-c-brand-3)
}

.boarding-pass-container {
    /* 用于 3D 悬停效果 */
    perspective: 1000px;
    width: 100%;
}

.boarding-pass {
    font-family: 'Roboto Mono', 'Consolas', 'Microsoft Yahei' monospace;
    width: 100%;
    max-width: 100%;
    /* 控制最大宽度 */
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transition: transform 0.4s ease, box-shadow 0.4s ease;

    transform-style: preserve-3d;
    /* 让子元素也参与 3D 变换 
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);*/
    transition: transform 0.2s ease-out, box-shadow 0.4s ease;

    /* 磨砂玻璃效果 */
    background: rgba(243, 246, 248, 0.1);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    /* For Safari */
    border: 1px solid rgba(227, 234, 236, 0.2);

    /* 初始悬浮动画 
    animation: float 6s ease-in-out infinite;*/
}

/* 悬停时的 3D 效果 
.boarding-pass-container:hover .boarding-pass {
    transform: rotateX(10deg) rotateY(0deg) scale(1.05);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    animation-play-state: paused;
    /* 悬停时暂停动画 /
}*/

.header {
    background-color: var(--vp-c-brand-1);
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
}

.logo {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 0.8em;
}

.logo-svg {
    height: 24px;
    margin-right: 8px;
    /*filter: invert(1);  如果你的 SVG 是黑色的，这会让它变白 */
}

.pass-type {
    font-size: 0.8em;
    letter-spacing: 1px;
}

.content {
    display: flex;
}

.main-info {
    flex-grow: 1;
    padding: 20px;
    border-right: 2px dashed rgba(255, 255, 255, 0.3);
    color: #eee;
}

.side-info {
    width: 120px;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: #eee;
}

.info-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
}

.label {
    font-size: 0.7em;
    color: #bbb;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
}

.value {
    font-size: 1.1em;
    font-weight: 700;
    color: var(--vp-c-text-1);
}

.name {
    font-size: 1.3em;
}

.important {
    color: var(--vp-c-brand-3);
}

/* 使用 VitePress 的主题色 */
.location {
    font-size: 1em;
}

.destination {
    white-space: normal;
    /* 允许目的地换行 */
    word-break: break-word;
}


.flight-details,
.route {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 16px;
}

.route {
    margin-top: 16px;
}

.plane-icon {
    width: 1.5em;
    transform: rotate(90deg);
    margin: 0 10px;
    color: var(--vp-c-text-1);
}

.info-item.small .value {
    font-size: 1.8em;
}

.qr-code img {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    background: white;
    /* 给二维码一个白色背景 */
    padding: 5px;
}

.barcode {
    background: #f4f8fa50;
    padding-left: 20px;
    padding-bottom: 10px;
    height: 50px;
    display: flex;
    /*justify-content: space-between;*/
    align-items: flex-end;
    backdrop-filter: blur(15px);
}

.barcode div {
    width: 2px;
    background: #000;
    display: inline-block;
}

/* 悬浮动画 */
@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0px);
    }
}
</style>