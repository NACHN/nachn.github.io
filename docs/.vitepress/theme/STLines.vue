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
 * 修改后的计算属性：
 * 它接收已经处理好的、包含站点数组的 lines prop，
 * 然后为其添加 'status' 字段。
 */
const processedLines = computed(() => {
    // 遍历从父组件传来的每个 line 对象
    return props.lines.map(line => {

        // 在 line.stations 数组中找到当前站点的索引
        // line.stations 现在已经是 ['乌鲁木齐站南广场', '锦绣四街', ...]
        const currentStationIndex = line.stations.findIndex(
            stationName => stationName === props.currentStationName
        );

        // 基于索引，为每个站点创建一个包含状态的新对象数组
        const stationsWithStatus = line.stations.map((stationName, index) => {
            let status = 'future'; // 默认为未到达的站点
            if (currentStationIndex !== -1) { // 仅在找到当前站点时才进行判断
                if (index < currentStationIndex) {
                    status = 'passed'; // 索引 < 当前站索引 -> 已过站点
                } else if (index === currentStationIndex) {
                    status = 'current'; // 索引 === 当前站索引 -> 当前站点
                }
            }

            return {
                name: stationName,
                py: line.stations_py[index] || '', // 从 stations_py 数组中获取对应的拼音
                status: status // 'passed', 'current', or 'future'
            };
        });

        // 返回新的 line 对象，用我们处理过的 stationsWithStatus 数组替换旧的
        return {
            ...line, // 复制 line 的所有原始属性
            stations: stationsWithStatus, // 覆盖 stations 属性
        };
    });
});

/**
 * MODIFICATION 1: 字体大小自适应
 * 创建一个计算属性，根据 boardWidth 生成一系列动态的字体大小。
 * 这样做的好处是，所有的响应式计算都集中在一个地方，方便管理。
 */
const dynamicStyles = computed(() => {
    // 定义一个基础尺寸，让所有字体大小都和它关联，实现等比缩放
    const baseSize = props.lineHeight / 40; // 例如，1000px 宽度时，baseSize 是 10

    return {
        // 线路名称（大数字）的样式
        lineName: {
            fontSize: `120px`, // 1000px 时为 150px (约 8em)
            letterSpacing: `-8px` // 间距也自适应
        },
        // 左侧信息项的样式
        infoItem: {
            fontSize: `20px` // 1000px 时为 25px
        },
        // 票价等较小文字的样式
        smallInfo: {
            fontSize: `20px` // 1000px 时为 20px
        },
        // 中间竖排公司名的样式
        companyName: {
            fontSize: `${baseSize * 3}px`, // 1000px 时为 40px
            letterSpacing: `${baseSize * 0.8}px`
        },
        // 右侧站点列表的样式
        stationGrid: {
            fontSize: `${baseSize * 1.5}px` // 1000px 时为 22px
        },
        base: {
            fontSize: `${baseSize * 1.2}px` // 1000px 时为 20px
        },
        baseSize
    };
});

/**
 * MODIFICATION 3: 站点排列顺序
 * 创建一个方法，为每个线路动态计算 grid 样式。
 * 因为每个线路的站点数量不同，所以需要的行数也不同。
 */
const getGridStyle = (line) => {
    // 注意：这里的 line.stations 已经是我们处理过的对象数组了
    const stationCount = line.stations.length;
    const columnCount = computed(() => {
        if (stationCount <= 10) return 1;
        else if (stationCount <= 20) return 2;
        else if (stationCount <= 40) return 3;
        else if (stationCount <= 56) return 4;
        else return 5;
    }).value;
    const rowCount = Math.ceil(stationCount / columnCount);

    return {
        gridTemplateRows: `repeat(${rowCount}, auto)`,
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gridAutoFlow: 'column',
    };
};

/**
 * 根据字符串长度（其中一个汉字计为两个长度）来确定缩放比例。
 * * @param {string} linename - 输入的字符串（如线路名称）。
 * @returns {number} 缩放比例。
 */
const linenamesc = (linename) => {
    // 1. 匹配所有双字节字符（非ASCII字符，通常包括汉字）
    // [^\x00-\xff] 匹配不在 ASCII 0-255 范围内的所有字符
    const chineseChars = linename.match(/[^\x00-\xff]/g) || [];

    // 2. 计算实际长度：
    //    - 基础长度：linename.length (所有字符都计为 1)
    //    - 额外长度：chineseChars.length (每个汉字额外加 1，使其总长度为 2)
    const effectiveLength = linename.length + chineseChars.length;

    // 3. 根据有效长度进行判断
    if (effectiveLength <= 4) {
        return 1.0;
    } else if (effectiveLength <= 6) {
        return 0.8;
    } else if (effectiveLength <= 8) {
        return 0.6;
    } else {
        return 0.5;
    }
};
</script>

<template>
    <div class="st-lines-container">
        <div v-for="(line, index) in processedLines" :key="index" class="line-block" :style="{
            backgroundColor: line.routec,
            width: boardWidth + 'px',
            height: lineHeight - 16 + 'px',
            borderTop: line.routec + ' solid 16px'
        }">

            <div class="left-column">
                <div class="info-item fare" :style="dynamicStyles.smallInfo">
                    <span class="label">票价:</span>
                    <span class="value">{{ line.fare }}</span>
                </div>
                <!-- 使用动态样式 -->
                <div class="line-name"
                    :style="[dynamicStyles.lineName, { transform: 'scale(' + linenamesc(line.name) + ')' }]">{{ line.name }}
                </div>

                <div style="height:10px;"></div>
                <div class="info-item" :style="dynamicStyles.infoItem">
                    <span :style="dynamicStyles.base" class="label vertical">首末班</span>
                    <span class="value hours">{{ line.hours }}</span>
                </div>
                <div style="height:10px;"></div>
                <div class="info-item" :style="dynamicStyles.infoItem">
                    <span class="label">开往:</span>
                    <span class="value direction" :style="{ color: line.stc }">{{ line.direction }}</span>
                </div>
                <div class="info-item" :style="dynamicStyles.infoItem">
                    <span class="label">下站:</span>
                    <span class="value next-station" :style="{ color: line.stc }">{{ line.next_station }}</span>
                </div>
                <div style="height:10px;"></div>
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
                    <div v-for="(station, sIndex) in line.stations" :key="sIndex" class="station-item" :class="{
                        'current-station': station.status === 'current',
                        'passed-station': station.status === 'passed'
                    }">
                        <span class="station-py">{{ line.stations_py[sIndex] || '' }}</span>
                        <!-- 左侧部分：序号和站名 -->
                        <span class="station-cn" :style="{}">{{ sIndex + 1 }}. {{ station.name }}</span>
                        <!-- 右侧部分：翻译 -->

                        <!-- 标记保持不变 :style="{lineHeight:dynamicStyles.baseSize}>
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
    overflow: hidden;
    /* 防止内容溢出 */

}

/* --- 左侧 --- */
.left-column {
    width: 300px;
    padding: 15px;
    display: flex;
    flex-direction: column;
}

.line-name {
    font-weight: bold;
    text-align: center;
    flex-grow: 1;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Source Han Sans SC', sans-serif;
    line-height: 60px;
    /* 移除静态字体大小和字间距 */
}

.info-item {
    display: flex;
    align-items: center;
    margin-bottom: 1px;
    line-height: 1.2;
    /* 调整行高避免重叠 */
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
    padding: 8px 4px;
    /* 调整内边距 */
    margin-right: 10px;
    text-align: center;
    /* 居中 */
}

.hours {
    white-space: pre-line;
}

.direction,
.next-station {
    padding: 0 5px;
    font-size: 1em;
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
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
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
    gap: 0 20px;
    /* 增加列间距 */
    font-weight: bold;
}

.station-item {
    line-height: normal;
    padding: 0px 0;
    border-bottom: 1px dashed #555;
    /* MODIFICATION 2: 启用 Flexbox 布局 */
    display: flex;
    /*justify-content: space-between;  关键：让子元素两端对齐 */
    align-items: baseline;
    /* 基线对齐，让文字底部对齐 */
    position: relative;
    /* 为 annotation 定位提供参考 */
    flex-direction: column;
}

/* 已过站点的样式 */
.passed-station {
    color: #bbb;
    /* 字体颜色变灰 */
}

.passed-station .station-py {
    color: #bbb;
    /* 拼音也变灰 */
}

/* 当前站点的样式 */
.current-station {
    background-color: #196B24;
    /* 高亮背景色 (可以替换为你喜欢的颜色) */
    color: white;
    /* 高亮时的文字颜色 */
    border-radius: 4px;
    /* 添加圆角 */
    font-weight: bold;
    /* 字体加粗 */
    /*transform: scale(1.05); /* 轻微放大，更突出 */
}

.current-station::after {
    content: '▼';
    position: absolute;
    right: 4px;
    bottom: 8px;
}

.current-station .station-py {
    color: white;
    /* 高亮时拼音的颜色 */
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
    margin-top: 1px;
    /* 与中文名保持一点距离 */
    line-height: 5px;
}

.annotation {
    color: #d9534f;
    font-size: 0.8em;
    align-self: center;
    /* 将标记放在中文和拼音中间，避免影响布局 */
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: inherit;
    /* 继承父元素背景色 */
    padding: 0 5px;
}
</style>