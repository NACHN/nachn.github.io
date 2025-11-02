<script setup>
import { ref, computed } from 'vue';
import STLines from './STLines.vue';
import * as htmlToImage from 'html-to-image';

// --- Refs ---
const previewAreaRef = ref(null);
const fileInputRef = ref(null); // 新增：用于引用文件上传输入框

// 站牌的核心响应式数据
const stationData = ref({
    name: '乌鲁木齐站南广场',
    py_name: 'Wu Lu Mu Qi Zhan Nan Guang Chang',
    lines: [],
});

// 站牌的尺寸控制
const boardWidth = ref(1000);
const lineHeight = ref(450);
const headerHeight = ref(128);

/**
 * 添加一条新的默认线路数据
 */
const addLine = () => {
    stationData.value.lines.push({
        show: true,
        name: '5035',
        routec: '#196B24',
        fare: '全程2.5元，分段计价',
        hours: '首班: 07:30\n末班: 23:30',
        direction: '白鸟湖湿地',
        next_station: '锦绣四街',
        phone: '8751256',
        company: '乌鲁木齐公交集团',
        stc: '#FFFF00',
        stations: '乌鲁木齐站南广场\n锦绣四街\n乌鲁木齐站北广场\n荣盛五街\n高铁南广场\n博香苑北\n宝能城\n万达广场\n中泰化学\n阿里山街口\n天鹅湖路口\n天柱山街口\n慈湖路口\n软件园\n西流湖北路口\n融合北路口\n流花湖路口\n动车运用所\n大众汽车\n六支队\n66中分校\n通达街南二巷\n五支队\n望谷路南\n望谷路\n佳缘小区\n艾丁湖路口\n安置小区\n王家沟大桥\n王家沟油库\n泽天化工\n福地塑业\n鲁阳公司\n王家沟街道办\n世界城',
        stations_py: `- ئۈرۈمچى بېكىتى جەنۇبىي مەيدان
- جىنشيو تۆرت كوچىسى
- ئۈرۈمچى بېكىتى شىمالىي مەيدان
- روڭشېڭ بەش كوچىسى
- يۇقىرى تېزلىك پويىز جەنۇبىي مەيدان
- بوخانگ يۈەن شىمالى
- باونېڭ شەھىرى
- ۋاندا مەيدانى
- جۇڭتاي خېمىيە
- ئالىشان كوچىسى ئېغىزى
- قوڭ قۇش كۆلى يول ئېغىزى
- تېنجۇشان كوچىسى ئېغىزى
- سىخۇ يول ئېغىزى
- يۇمشاق دېتال باغچىسى
- شىليۇخو كۆلى شىمالىي يول ئېغىزى
- رۇڭخې شىمالىي يول ئېغىزى
- لىۇخۇاخو يول ئېغىزى
- پويىز ئىشلىتىش بازىسى
- داتسون ئاپتوموبىل
- ئالتىنچى ئەترەت
- 66-ئوتتۇرا مەكتەپ تارماق مەكتىپى
- تونگدا كوچىسى جەنۇبىي ئىككىنچى كۆچە
- بەشىنچى ئەترەت
- ۋاڭگو يولى جەنۇبى
- ۋاڭگو يولى
- جايەن مەھەللىسى
- ئایدىڭكۆل يول ئېغىزى
- يەرلەشتۈرۈش مەھەللىسى
- ۋاڭجياگو كۆۋرىكى
- ۋاڭجياگو ماي قېيماقخانىسى
- زېتيەن خېمىيە
- فۇدي پلاستىك مەھسۇلاتلىرى
- لۇياڭ شىركىتى
- ۋاڭجياگو كوچا باشقارمىسى
- دۇنيا شەھىرى`,
    });
};

/**
 * 根据索引删除一条线路
 * @param {number} index - 要删除线路的索引
 */
const removeLine = (index) => {
    stationData.value.lines.splice(index, 1);
};

/**
 * 将指定索引的线路向上移动一位
 * @param {number} index - 要上移线路的当前索引
 */
const moveLineUp = (index) => {
    // 如果已经是第一项，则无法上移
    if (index === 0) return;

    const lines = stationData.value.lines;
    // 使用数组解构赋值来交换元素位置
    [lines[index - 1], lines[index]] = [lines[index], lines[index - 1]];
};

/**
 * 将指定索引的线路向下移动一位
 * @param {number} index - 要下移线路的当前索引
 */
const moveLineDown = (index) => {
    const lines = stationData.value.lines;
    // 如果已经是最后一项，则无法下移
    if (index >= lines.length - 1) return;

    // 交换元素位置
    [lines[index], lines[index + 1]] = [lines[index + 1], lines[index]];
};

/**
 * 计算属性：将原始数据中的站点字符串处理成数组，供子组件使用
 */
const processedLines = computed(() => {
    return stationData.value.lines.map(line => ({
        ...line,
        stations: line.stations.split('\n').filter(s => s.trim() !== ''),
        stations_py: line.stations_py.split('\n').filter(s => s.trim() !== ''),
    }));
});

/**
 * 占位函数，原用于生成预览，可根据需要扩展
 */
const generate = () => {
    console.log('当前站牌数据:', stationData.value);
};


// --- 导出功能区 ---

/**
 * 工具函数：创建一个链接并模拟点击来触发文件下载
 * @param {string} href - 文件的 Data URL
 * @param {string} filename - 下载时建议的文件名
 */
const triggerDownload = (href, filename) => {
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// --- PNG 导出 ---

/**
 * 导出整个站牌预览区为 PNG 图像
 */
const exportAllPNG = async () => {
    if (!previewAreaRef.value) return;
    try {
        const dataUrl = await htmlToImage.toPng(previewAreaRef.value, { pixelRatio: 1.5 });
        triggerDownload(dataUrl, `${stationData.value.name}-全览.png`);
        alert('整站PNG导出成功！');
    } catch (error) {
        console.error('导出整站PNG失败:', error);
        alert(`导出失败: ${error.message}`);
    }
};

/**
 * 将每个线路块分别导出为独立的 PNG 图像
 */
const exportModularPNG = async () => {
    if (!previewAreaRef.value) return;
    const lineElements = previewAreaRef.value.querySelectorAll('.line-block');
    if (lineElements.length === 0) {
        alert('没有可导出的线路！');
        return;
    }

    try {
        for (const [index, element] of lineElements.entries()) {
            const lineName = processedLines.value[index].name;
            const dataUrl = await htmlToImage.toPng(element, { pixelRatio: 1.5 });
            triggerDownload(dataUrl, `${stationData.value.name}-${lineName}路.png`);
        }
        alert('所有线路已分别导出为PNG！');
    } catch (error) {
        console.error('导出模块化PNG失败:', error);
        alert(`导出失败: ${error.message}`);
    }
};


// --- SVG 导出 ---

/**
 * 导出整个站牌预览区为 SVG 矢量图
 */
const exportAllSVG = async () => {
    if (!previewAreaRef.value) return;
    try {
        const dataUrl = await htmlToImage.toSvg(previewAreaRef.value);
        triggerDownload(dataUrl, `${stationData.value.name}-全览.svg`);
        alert('整站SVG导出成功！');
    } catch (error) {
        console.error('导出整站SVG失败:', error);
        alert(`导出失败: ${error.message}`);
    }
};

/**
 * 将每个线路块分别导出为独立的 SVG 矢量图
 */
const exportModularSVG = async () => {
    if (!previewAreaRef.value) return;
    const lineElements = previewAreaRef.value.querySelectorAll('.line-block');
    if (lineElements.length === 0) {
        alert('没有可导出的线路！');
        return;
    }

    try {
        for (const [index, element] of lineElements.entries()) {
            const lineName = processedLines.value[index].name;
            const dataUrl = await htmlToImage.toSvg(element);
            triggerDownload(dataUrl, `${stationData.value.name}-${lineName}路.svg`);
        }
        alert('所有线路已分别导出为SVG！');
    } catch (error) {
        console.error('导出模块化SVG失败:', error);
        alert(`导出失败: ${error.message}`);
    }
};

const showline = (index) => {
    stationData.value.lines[index].show = !stationData.value.lines[index].show;
};

/**
 * 保存 (序列化): 将当前站牌数据保存为 JSON 文件
 */
const saveConfiguration = () => {
    try {
        // 1. 将 stationData 对象转换为格式化的 JSON 字符串
        //    (null, 2) 是为了让 JSON 文件有缩进，更易读
        const jsonString = JSON.stringify(stationData.value, null, 2);

        // 2. 创建一个 Blob 对象，这是文件的前身
        const blob = new Blob([jsonString], { type: 'application/json' });

        // 3. 使用已有的 triggerDownload 函数来下载文件
        const filename = `${stationData.value.name || 'station-config'}.json`;
        triggerDownload(URL.createObjectURL(blob), filename);

    } catch (error) {
        console.error('保存配置失败:', error);
        alert('保存配置失败！');
    }
};

/**
 * 加载 (反序列化) - 步骤1: 触发隐藏的文件选择框
 */
const loadConfiguration = () => {
    // 模拟点击隐藏的 <input type="file">
    fileInputRef.value.click();
};

/**
 * 加载 (反序列化) - 步骤2: 处理用户选择的文件
 * @param {Event} event - 文件输入框的 change 事件
 */
const handleFileLoad = (event) => {
    const file = event.target.files[0];
    if (!file) {
        return; // 用户取消了选择
    }

    // 使用 FileReader API 来读取文件内容
    const reader = new FileReader();

    // 定义文件读取成功后的回调
    reader.onload = (e) => {
        try {
            const text = e.target.result;
            // 1. 将读取到的 JSON 字符串解析成 JavaScript 对象
            const loadedData = JSON.parse(text);

            // 2. 用加载的数据覆盖现有的 stationData
            //    Vue 会自动更新整个界面，这就是响应性的魔力！
            stationData.value = loadedData;

            alert('配置加载成功！');
        } catch (error) {
            console.error('加载或解析配置文件失败:', error);
            alert('加载失败！请确保你选择的是一个有效的JSON配置文件。');
        }
    };

    // 定义文件读取失败的回调
    reader.onerror = (e) => {
        console.error('读取文件失败:', e);
        alert('读取文件时发生错误。');
    };

    // 以文本形式开始读取文件
    reader.readAsText(file);

    // 清空 input 的值，这样即使用户连续选择同一个文件也能触发 change 事件
    event.target.value = null;
};
</script>

<template>
    <div class="ST-maker">
        <div class="form-container">
            <!-- ... 你的表单代码保持不变 ... -->
            <form @submit.prevent="generate">
                <div class="form-row">
                    <div class="form-group"><label for="from">站名:</label><input id="from" v-model="stationData.name"
                            type="text" /></div>
                    <div class="form-group"><label for="from">站名拼音:</label><input id="from"
                            v-model="stationData.py_name" type="text" /></div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>站牌宽度 (px):</label>
                        <input v-model.number="boardWidth" type="number" />
                    </div>
                    <div class="form-group">
                        <label>线路高度（推荐>350）:</label>
                        <input v-model.number="lineHeight" type="number" />
                    </div>
                    <div class="form-group">
                        <label>站牌头部高度 (px):</label>
                        <input v-model.number="headerHeight" type="number" />
                    </div>
                </div>
            </form>
            <button class="addline" @click="addLine">+</button><span
                style="margin-left: 4px;margin-right: 24px;">添加线路</span> 点击线路展开或收起，右侧按钮调整线路顺序
            <hr class="divider">
            <div class="button-group">
                <!-- 新增的保存和加载按钮 -->
                <button type="button" @click="saveConfiguration">保存配置</button>
                <button type="button" @click="loadConfiguration">加载配置</button>


                <!--button type="submit" @click="generate">生成预览</button-->
            </div>
            <!-- 动态线路表单 -->
            <div v-for="(line, index) in stationData.lines" :key="index" class="line-form">
                <h3 class="line-title" @click="showline(index)">线路 {{ index + 1 }}：{{ line.name }}
                    <!-- 绑定新的函数，并添加 disabled 状态 -->
                    <button type="button" @click.stop="moveLineUp(index)" class="move-line-btn" :disabled="index === 0">
                        上移
                    </button>
                    <button type="button" @click.stop="moveLineDown(index)" class="move-line-btn"
                        :disabled="index === stationData.lines.length - 1">
                        下移
                    </button>
                    <!-- 注意：删除按钮的 @click 事件也需要 .stop 修饰符 -->
                    <button type="button" @click.stop="removeLine(index)" class="remove-line-btn">
                        删除
                    </button>
                </h3>
                <div v-if="line.show">
                    <div class="form-row">
                        <div class="form-group">
                            <label>线路主色 (routec):</label>
                            <div class="color-picker-wrapper">
                                <input v-model="line.routec" type="color" class="color-input" />
                                <span>{{ line.routec }}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>高亮颜色 (stc):</label>
                            <div class="color-picker-wrapper">
                                <input v-model="line.stc" type="color" class="color-input" />
                                <span>{{ line.stc }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group"><label>线路名称:</label><input v-model="line.name" type="text" /></div>
                        <div class="form-group"><label>开往:</label><input v-model="line.direction" type="text" /></div>

                    </div>
                    <div class="form-row">
                        <div class="form-group"><label>首末班时间:</label><textarea v-model="line.hours" type="text" /></div>
                        <div class="form-group"><label>票价:</label><textarea v-model="line.fare" type="text" /></div>
                    </div>
                    <div class="form-row">
                        <div class="form-group"><label>下站:</label><input v-model="line.next_station" type="text" />
                        </div>
                        <div class="form-group"><label>服务电话:</label><input v-model="line.phone" type="text" /></div>
                    </div>
                    <div class="form-row">
                        <div class="form-group"><label>运营企业:</label><input v-model="line.company" type="text" /></div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>详细站点列表 (每行一个):</label>
                            <textarea v-model="line.stations" rows="8"></textarea>
                        </div>
                        <div class="form-group">
                            <label>站点列表翻译 (与左侧一一对应):</label>
                            <textarea v-model="line.stations_py" rows="8"></textarea>
                        </div>
                    </div>
                </div>

            </div>


            <!-- 4. 更新按钮组 -->

            <div class="button-group export-group">
                <button type="button" @click="exportAllPNG">导出整站PNG</button>
                <button type="button" @click="exportAllSVG">导出整站SVG</button>
                <button type="button" @click="exportModularPNG">导出模块化PNG</button>
                <button type="button" @click="exportModularSVG">导出模块化SVG</button>
            </div>
            <input type="file" ref="fileInputRef" @change="handleFileLoad" accept=".json" style="display: none;" />
        </div>



        <!-- 5. 在预览区根元素上添加 ref -->
        <div class="preview-area" :style="{ width: boardWidth + 'px' }" ref="previewAreaRef">
            <div class="station-header" :style="{ width: boardWidth + 'px', height: headerHeight + 'px' }">
                <div style="display: flex; flex-direction: row; align-items: center; ">
                    <img src="/icons/GJ.svg" alt="公交图标" :style="{ height: Math.min(headerHeight - 40, 250) + 'px' }"
                        style=" position: relative;left:20px; color: white;" />
                    <div style="display: flex; flex-direction: column; align-items: flex-start;margin-left: 30px;">
                        <span style="font-size:40px; line-height: 40px;">公交站</span>
                        <span style="font-size:20px;">BUS STATION</span>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; margin-right: 20px;">
                    <span class="station-name-cn">{{ stationData.name }}</span>
                    <span class="station-name-py">{{ stationData.py_name }}</span>
                </div>
            </div>
            <STLines :lines="processedLines" :current-station-name="stationData.name"
                :current-station-py-name="stationData.py_name" :board-width="boardWidth" :line-height="lineHeight" />
        </div>
    </div>
</template>

<style scoped>
/* ... 你的大部分样式保持不变 ... */
.ST-maker {
    margin: 0 auto;
    padding: 15px;
    font-family: 'Source Han Sans SC', 'Microsoft YaHei', sans-serif;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    /* 顶部对齐 */
}

.form-container {
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;
    /* 与预览区增加间距 */
    width: 40%;
    max-width: 600px;
    /* 给表单一个最大宽度 */
    flex-shrink: 0;
    /* 防止表单被压缩 */
}

.form-row {
    display: flex;
    gap: 15px;
    margin-bottom: 10px;
}

.form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 0.9em;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 0.9em;
}

.form-group textarea {
    resize: vertical;
    font-family: inherit;
}

.move-line-btn:disabled,
.remove-line-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.move-line-btn:disabled:hover,
.remove-line-btn:disabled:hover {
    background-color: #cccccc;
    cursor: not-allowed;
}

.addline {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background: none;
    color: var(--vp-c-text-1);
    border: 1px solid var(--vp-c-brand-3);
    transition: all ease 0.3s;
}

.addline:hover {
    background-color: var(--vp-c-brand-2);
    color: black;
}

.button-group {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 10px;
}

/* 新增：专门为导出按钮组的样式 */
.export-group button {
    flex: 1;
    /* 让导出按钮平分空间 */
}

.button-group button {
    flex: 1;
    padding: 10px 15px;
    /* 调整内边距 */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    /* 调整字体大小 */
    color: white;
    transition: all ease 0.3s;
}

.button-group button {
    background: none;
    color: var(--vp-c-text-1);
    border: 1px solid var(--vp-c-brand-3);
}

.button-group button:hover {
    background-color: var(--vp-c-brand-2);
    color: black;
}

.button-group button[type="submit"] {
    background-color: #42b883;
}

.button-group button[type="submit"]:hover {
    background-color: #36a270;
}

.divider {
    border: 0;
    height: 1px;
    background-color: #ddd;
    margin: 20px 0;
}

.line-form {
    border: 1px solid #e0e0e0;
    padding: 10px;
    border-radius: 8px;
    margin-top: 20px;
}

.line-title {
    margin-top: 0;
    margin-bottom: 15px;
    color: #42b883;
    border-bottom: 2px solid #42b883;
    padding-bottom: 5px;
}

.line-title:hover {
    cursor: pointer;
    background-color: #36a270;
    color: white;
}

.move-line-btn {
    padding: 0px 12px;
    border: none;
    border-radius: 4px;
    background-color: var(--vp-c-brand-1);
    color: white;
    cursor: pointer;
    font-size: 0.9em;
    float: right;
}

.move-line-btn:hover {
    background-color: #2b7dc0ff;
}

.remove-line-btn {
    padding: 0px 12px;
    border: none;
    border-radius: 4px;
    background-color: #e74c3c;
    color: white;
    cursor: pointer;
    font-size: 0.9em;
    float: right;
}

.remove-line-btn:hover {
    background-color: #c0392b;
}

.preview-area {
    overflow-x: scroll;
}

.station-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    background-color: #C00000;
    color: white;
    font-family: 'Source Han Sans SC', 'Microsoft YaHei', sans-serif;
}

.station-name-cn {
    line-height: normal;
    font-size: 4em;
    font-weight: bold;
}

.station-name-py {
    font-size: 1.5em;
    letter-spacing: 1.5px;
}

.color-picker-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    padding: 4px 10px;
}

.color-input {
    padding: 0;
    border: none;
    width: 30px;
    height: 30px;
    cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
}

input[type="color"]::-webkit-color-swatch {
    border: none;
    border-radius: 4px;
}

.color-picker-wrapper span {
    font-family: monospace;
    font-size: 0.9em;
}
</style>