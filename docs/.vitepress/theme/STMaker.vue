<script setup>
import { ref, computed } from 'vue' // 引入 computed
import STLines from './STLines.vue';
import * as htmlToImage from 'html-to-image';

const stationData = ref({
    name: '乌鲁木齐站南广场',
    py_name: 'Wu Lu Mu Qi Zhan Nan Guang Chang',
    lines: [],
})

// 新增1：为站牌尺寸添加 ref
const boardWidth = ref(1000); // 默认宽度 1000px
const lineHeight = ref(450);  // 默认高度 450px

// 新增：添加一条新线路的函数
const addLine = () => {
    stationData.value.lines.push({
        name: '5035',
        routec: '#196B24',
        fare: '全程2.5元，分段计价',
        hours: '首班: 07:30\n末班: 23:30',
        direction: '白鸟湖湿地',
        next_station: '锦绣四街',
        phone: '8751256',
        company: '乌鲁木齐公交集团',
        stc: '#FFFF00',
        stations: '乌鲁木齐站南广场\n锦绣四街\n乌鲁木齐站北广场\n荣盛五街\n高铁南广场\n博香苑北\n宝能城\n万达广场\n中泰化学\n阿里山街口\n天鹅湖路口\n天柱山街口\n慈湖路口\n软件园\n西流湖北路口\n融合北路口\n流花湖路口\n动车运用所\n大众汽车\n六支队\n66中分校\n通达街南二巷\n五支队\n望谷路南\n望谷路\n佳缘小区\n艾丁湖路口\n安置小区\n王家沟大桥\n王家沟油库\n泽天化工\n福地塑业\n鲁阳公司\n王家沟街道办\n世界城', // 使用 \n 分隔
        stations_py: 'Wulumuqi Station South Square\nZhizhushan\nNianzigou\nChangjianglu\nXihonglu\nHongshan', // 同样用 \n 分隔
        columns: 2, // 默认两列显示
    });
}

// 新增：根据索引删除一条线路
const removeLine = (index) => {
    stationData.value.lines.splice(index, 1);
}

// 新增：一个计算属性，它会处理换行符，将站点列表字符串转换为数组，然后传递给 STLines 组件
const processedLines = computed(() => {
    return stationData.value.lines.map(line => ({
        ...line,
        stations: line.stations.split('\n').filter(s => s.trim() !== ''), // 按换行符分割并移除空行
        stations_py: line.stations_py.split('\n').filter(s => s.trim() !== ''),
    }));
});


const generate = () => {
    // 生成站牌的逻辑可以在这里添加
    console.log('站点:', stationData.value)
    console.log('处理后的线路数据:', processedLines.value)
}

/*/ 4. 使用新逻辑重写导出函数
const exportToPNG = async (ticketType) => {
    const elementToCapture = ticketType === 'new' ? ticketPreviewNew.value : ticketPreviewOld.value;

    try {
        // 将 fontEmbedCSS 传入 html-to-image 选项（如果需要的话，可以添加其他选项）
        const dataUrl = await htmlToImage.toPng(elementToCapture, {
            pixelRatio: 1.5,
        });

        // 创建下载链接
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${ticketData.value.code}-${ticketData.value.from}-${ticketData.value.to}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 使用浏览器 alert 显示成功消息（或集成 toast 库以获得更好体验）
        alert('导出成功');
    } catch (error) {
        console.error('导出PNG失败:', error);
        alert(`导出失败: ${error.message || '未知错误'}`);
    }
};*/
</script>

<template>
    <div class="ST-maker">
        <div class="form-container">
            <!-- 主表单 -->
            <form @submit.prevent="generate">
                <div class="form-row">
                    <div class="form-group"><label for="from">站名:</label><input id="from" v-model="stationData.name"
                            type="text" /></div>
                    <div class="form-group"><label for="from">站名拼音:</label><input id="from" v-model="stationData.py_name" type="text" /></div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>站牌宽度 (px):</label>
                        <input v-model.number="boardWidth" type="number" />
                    </div>
                    <div class="form-group">
                        <label>单线路高度 (px):</label>
                        <input v-model.number="lineHeight" type="number" />
                    </div>
                </div>
            </form>

            <hr class="divider">

            <!-- 动态线路表单 -->
            <div v-for="(line, index) in stationData.lines" :key="index" class="line-form">
                <h3 class="line-title">线路 {{ index + 1 }}：{{ line.name }}</h3>
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
                    <div class="form-group"><label>下站:</label><input v-model="line.next_station" type="text" /></div>
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
                <button type="button" @click="removeLine(index)" class="remove-line-btn">删除该线路</button>
            </div>


            <div class="button-group">
                <button type="button" @click="addLine" style="background-color: #28a745;">添加线路</button>
                <button type="submit" @click="generate">生成站牌</button>
                <button type="button" @click="exportToPNG()" style="background-color: #3498db;">导出PNG</button>
            </div>
        </div>

        <!-- 站牌预览区 -->
        <div class="preview-area">
            <div class="station-header">
                <span class="station-name-cn">{{ stationData.name }}</span>
                <span class="station-name-py">{{ stationData.py_name }}</span>
            </div>

            <!-- 将处理后的线路数据传给 STLines 组件 -->
            <STLines 
                :lines="processedLines" 
                :current-station-name="stationData.name" 
                :current-station-py-name="stationData.py_name"
                :board-width="boardWidth"
                :line-height="lineHeight"
            />
        </div>
    </div>
</template>

<style scoped>
.ST-maker {

    margin: 0 auto;
    padding: 15px;
    font-family: 'Microsoft YaHei', 'Source Han Sans SC', sans-serif;
    display: flex;
    flex-direction: row;
}

.form-container {
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    width: 40%;
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

.button-group {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
}

.button-group button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    color: white;
    transition: background-color 0.3s;
}

.button-group button[type="submit"] {
    background-color: #42b883;
}

.button-group button[type="submit"]:hover {
    background-color: #36a270;
}

/* 新增样式 */
.divider {
    border: 0;
    height: 1px;
    background-color: #ddd;
    margin: 20px 0;
}

.line-form {
    border: 1px solid #e0e0e0;
    padding: 15px;
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

.remove-line-btn {
    padding: 6px 12px;
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


/* 预览区域样式 */
.preview-area {
    border: 1px solid #ccc;
    overflow-x: auto;
}

.station-header {
    height: 128px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background-color: #C00000;
    color: white;
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

/* 新增：颜色选择器包装样式 */
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
    /* 调整大小 */
    height: 30px;
    cursor: pointer;
}

/* 移除 input[type=color] 的默认边框和内边距 */
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