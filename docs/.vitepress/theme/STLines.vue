<script setup>
import { defineProps, computed } from 'vue'; // 引入 computed

const props = defineProps({
    lines: {
        type: Array,
        required: true,
        default: () => []
    },
    currentStationName: {
        type: String,
        required: true,
    },
    currentStationPyName: {
        type: String,
        required: true,
    },
    boardWidth: {
        type: Number,
        required: true,
    },
    lineHeight: {
        type: Number,
        required: true,
    }
});

/**
 * MODIFICATION 1: 字体大小自适应
 * 创建一个计算属性，根据 boardWidth 生成一系列动态的字体大小。
 * 这样做的好处是，所有的响应式计算都集中在一个地方，方便管理。
 */
const dynamicStyles = computed(() => {
    // 定义一个基础尺寸，让所有字体大小都和它关联，实现等比缩放
    const baseSize = props.lineHeight / 50; // 例如，1000px 宽度时，baseSize 是 10

    return {
        // 线路名称（大数字）的样式
        lineName: {
            fontSize: `${baseSize * 15}px`, // 1000px 时为 150px (约 8em)
            letterSpacing: `-${baseSize * 1.5}px` // 间距也自适应
        },
        // 左侧信息项的样式
        infoItem: {
            fontSize: `${baseSize * 2.5}px` // 1000px 时为 25px
        },
        // 票价等较小文字的样式
        smallInfo: {
            fontSize: `${baseSize * 2}px` // 1000px 时为 20px
        },
        // 中间竖排公司名的样式
        companyName: {
            fontSize: `${baseSize * 4}px`, // 1000px 时为 40px
            letterSpacing: `${baseSize * 0.8}px`
        },
        // 右侧站点列表的样式
        stationGrid: {
            fontSize: `${baseSize * 1.5}px` // 1000px 时为 22px
        },
        base: {
            fontSize: `${baseSize * 1.2}px` // 1000px 时为 20px
        }
    };
});

/**
 * MODIFICATION 3: 站点排列顺序
 * 创建一个方法，为每个线路动态计算 grid 样式。
 * 因为每个线路的站点数量不同，所以需要的行数也不同。
 */
const getGridStyle = (line) => {
    const stationCount = line.stations.length;
    const columnCount = computed(() => {
        if (stationCount <= 20) return 2;
        else if (stationCount <= 40) return 3;
        else return 4;
    }).value;
    // 计算需要多少行才能容纳所有站点
    const rowCount = Math.ceil(stationCount / columnCount);

    return {
        // 设置 grid 的行数
        gridTemplateRows: `repeat(${rowCount}, auto)`,
        // 关键：将填充方向从默认的 row (横向) 改为 column (纵向)
        gridAutoFlow: 'column',
    };
};

</script>

<template>
    <div class="st-lines-container">
        <div 
            v-for="(line, index) in lines" 
            :key="index" 
            class="line-block" 
            :style="{ 
                backgroundColor: line.routec, 
                width: boardWidth + 'px', 
                height: lineHeight + 'px' 
            }"
        >
            
            <div class="left-column">
                <div class="info-item fare" :style="dynamicStyles.smallInfo">
                    <span class="label">票价:</span>
                    <span class="value">{{ line.fare }}</span>
                </div>
                <!-- 使用动态样式 -->
                <div class="line-name" :style="dynamicStyles.lineName">{{ line.name }}</div>
                
                <div class="info-item" :style="dynamicStyles.infoItem">
                    <span :style="dynamicStyles.base" class="label vertical">首末班</span>
                    <span class="value hours">{{ line.hours }}</span>
                </div>
                <div class="info-item" :style="dynamicStyles.infoItem">
                    <span class="label">开往:</span>
                    <span class="value direction" :style="{ color: line.stc }">{{ line.direction }}</span>
                </div>
                <div class="info-item" :style="dynamicStyles.infoItem">
                    <span class="label">下站:</span>
                    <span class="value next-station" :style="{ color: line.stc }">{{ line.next_station }}</span>
                </div>
                <div class="info-item" :style="dynamicStyles.infoItem">
                    <span :style="dynamicStyles.base" class="label">服务热线</span>
                    <span class="value">{{ line.phone }}</span>
                </div>
            </div>

            <div class="vertical-divider" :style="[dynamicStyles.companyName, { color: line.routec }]">
                {{ line.company }}
            </div>

            <!-- 右侧站点列表 -->
            <div class="right-column" :style="{ backgroundColor: line.stc }">
                <!-- 应用动态计算的 grid 样式和字体样式 -->
                <div class="stations-grid" :style="[dynamicStyles.stationGrid, getGridStyle(line)]">
                    
                    <!-- MODIFICATION 2: 增加站名翻译 -->
                    <div v-for="(station, sIndex) in line.stations" :key="sIndex" class="station-item">
                        <span class="station-py">{{ line.stations_py[sIndex] || '' }}</span>
                        <!-- 左侧部分：序号和站名 -->
                        <span class="station-cn">{{ sIndex + 1 }}. {{ station }}</span>
                        <!-- 右侧部分：翻译 -->
                        
                        
                        <!-- 标记保持不变 >
                        <span class="annotation" v-if="sIndex === 0">起点站</span>
                        <span class="annotation" v-else-if="sIndex === line.stations.length - 1">终点站</span-->
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.st-lines-container {
    display: flex;
    flex-direction: column;
    font-family: 'Source Han Sans SC', sans-serif;
}

.line-block {
    display: flex;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden; /* 防止内容溢出 */
}

/* --- 左侧 --- */
.left-column {
    width: 300px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    border-right: 2px solid white;
}
.line-name {
    font-weight: bold;
    text-align: center;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Source Han Sans SC', sans-serif;
    /* 移除静态字体大小和字间距 */
}
.info-item {
    display: flex;
    align-items: center;
    margin-bottom: 1px;
    line-height: 1.2; /* 调整行高避免重叠 */
}
.info-item .label {
    margin-right: 8px;
    white-space: nowrap;
}
.info-item .value {
    font-weight: bold;
}
.info-item .label.vertical {
    writing-mode: vertical-rl;
    border: 1px solid white;
    padding: 8px 4px; /* 调整内边距 */
    margin-right: 10px;
    text-align: center; /* 居中 */
}
.hours {
    white-space: pre-line;
}
.direction, .next-station {
    padding: 0 5px;
}

/* --- 中间 --- */
.vertical-divider {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    padding: 10px;
    background-color: white;
    border-right: 2px solid white;
    /* 移除静态字体大小和字间距 */
}

/* --- 右侧 --- */
.right-column {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
.stations-grid {
    
    flex-grow: 1;
    color: black;
    padding: 0px;
    display: grid;
    /* 移除 grid-template-columns，因为它会被动态样式覆盖 */
    gap: 0 20px; /* 增加列间距 */
    font-weight: bold;
}
.station-item {
    line-height: normal;
    padding: 0px 0;
    border-bottom: 1px dashed #555;
    /* MODIFICATION 2: 启用 Flexbox 布局 */
    display: flex;
    /*justify-content: space-between;  关键：让子元素两端对齐 */
    align-items: baseline; /* 基线对齐，让文字底部对齐 */
    position: relative; /* 为 annotation 定位提供参考 */
    flex-direction: column;
}

/* MODIFICATION 2: 新增翻译文本的样式 */
.station-cn {
    /* 默认占据尽可能多的空间，将翻译推到右侧 */
    flex-grow: 1;

}
.station-py {
    /* 不伸缩，保持自身宽度 */
    direction: rtl;
    font-size: 0.6em;
    color: #333;
    margin-left: 1px; /* 与中文名保持一点距离 */
}

.annotation {
    color: #d9534f;
    font-size: 0.8em;
    align-self: center;
    /* 将标记放在中文和拼音中间，避免影响布局 */
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: inherit; /* 继承父元素背景色 */
    padding: 0 5px;
}
</style>