<script setup>
import { computed, watch, ref, onMounted } from 'vue';
import './ticket.css';

// 1. 定义 Props
const props = defineProps({
    check: String,
    from: String,
    to: String,
    code: String,
    from_py: String,
    to_py: String,
    time: String,
    seat: String,
    price: String,
    type: String,
    lv: String,
    pass: String,
    ad: String,
});

// 2. 局部变量/计算属性
const machine = 'E001001';

const ads = computed(() => props.ad || '车票已逝，记忆永存');
// 时间解析
const yy = computed(() => props.time.substring(0, 4));
const mm = computed(() => props.time.substring(4, 6));
const dd = computed(() => props.time.substring(6, 8));
const h = computed(() => props.time.substring(8, 10) + ':');
const m = computed(() => props.time.substring(10, 12));

const car = computed(() => props.seat.substring(0, 2));
const st = computed(() => props.seat.substring(2, 5));

// 3. 二维码状态
const qrcodeCanvas = ref(null); // 绑定到 <canvas> 元素的引用
let QRCode = null; // 存储动态导入的 qrcode 库

// 4. 二维码生成函数
const generateQRCode = async () => {
    if (!QRCode || !qrcodeCanvas.value) {
        return;
    }

    // 准备二维码的内容字符串
    const qrContent = `车次:${props.code}|从:${props.from}|到:${props.to}|时间:${props.time}`;

    try {
        // 使用 qrcode 库的 toCanvas 方法
        await QRCode.toCanvas(qrcodeCanvas.value, qrContent, {
            width: 80,
            errorCorrectionLevel: 'H',
            color: {
                dark: '#000000',
                light: '#ffffff00' // 设置为白色或透明
            }
        });
    } catch (err) {
        console.error('二维码生成失败:', err);
    }
};

// 5. 生命周期钩子和监听器
onMounted(async () => {
    // 动态导入，确保在客户端执行
    try {
        const module = await import('qrcode');
        QRCode = module.default;
        generateQRCode();
    } catch (e) {
        console.error('二维码库加载失败，请确保已安装：npm install qrcode');
    }
});

// 监听 props 变化时重新生成二维码
watch(props, () => {
    generateQRCode();
}, { deep: true });

</script>

<template>
    <div class="ticket">
        <div class="header">
            <span class="machine">{{ machine }}</span>
            <span class="check">{{ check }}</span>
        </div>
        <div class="sta">
            <div class="from_box">
                {{ from }}<span
                    style="position: relative;font-size: 14px; font-family: 'Source Han Serif SC', serif;">站</span>
            </div>
            <div class="code">
                {{ code }}
            </div>
            <div style="position:absolute;left: 240px; top:15px;transform:scaleX(3) scaleY(1.1);">⇀</div>
            <div class="to_box">
                {{ to }}<span
                    style="position: relative;font-size: 14px; font-family: 'Source Han Serif SC', serif;">站</span>
            </div>
        </div>
        <div class="sta-py">
            <div class="from-py">
                {{ from_py }}
            </div>
            <div class="to-py">
                {{ to_py }}
            </div>
        </div>
        <div class="info">
            <span class="time-yy">{{ yy }}</span>
            <span class="time-mm">{{ mm }}</span>
            <span class="time-dd">{{ dd }}</span>
            <span class="time-h">{{ h }}</span>
            <span class="time-m">{{ m }}</span>
            <span class="ymdk"
                style="line-height: 20px;">&emsp;&emsp;&emsp;&emsp;年&emsp;&emsp;月&emsp;&emsp;日&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;开&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;车&emsp;&emsp;&emsp;号<br>￥&emsp;&emsp;&emsp;&emsp;&emsp;元</span>

            <div class="car">{{ car }}</div>
            <div class="seat">{{ st }}</div>
            <div class="price">{{ price }}</div>

            <div class="type">{{ type }}</div>
            <div class="lv">{{ lv }}</div>
            <span style="position:absolute; top:40px; left:0;font-family: 'Source Han Serif SC', serif;">限乘当日当次车</span>

        </div>
        <div class="pass">
            {{ pass }}
        </div>
        <div class="ads">
            <span>{{ ads }}</span>
        </div>

        <div id="qrcode-container" ref="qrcodeContainer"></div>
        <div class="qrcode-wrapper">
            <canvas ref="qrcodeCanvas" id="qrcode-canvas"></canvas>
        </div>

        <span
            style="position: relative;bottom: -50px;left:20px;font-family: 'Source Han Serif SC', serif;">12345301145145E001001
            JM</span>
    </div>

</template>
