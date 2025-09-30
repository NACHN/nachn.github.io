<script setup>
import {computed} from 'vue'

const props = defineProps({ // <--- 把 defineProps 移到下面来，保持风格统一
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
const machine = 'E001001'
const ads = computed(() => props.ad || '车票已逝，记忆永存');

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
            <div class="time">{{ time }}</div>
            <div class="seat">{{ seat }}</div>
            <div class="price">{{ price }}</div>
            <div class="type">{{ type }}</div>
            <div class="lv">{{ lv }}</div>
            <span style="position:absolute; top:40px;">限乘当日当次车</span>
        </div>
        <div class="pass">
            {{pass}}
        </div>
        <div class="ads">
            <span>{{ ads }}</span>
        </div>
    </div>

</template>

<style scoped>
/* 1. 定义常规体 (Normal/Regular) */
@font-face {
    font-family: 'Source Han Serif SC';
    src: url('/fonts/SourceHanSerifSC-Regular_0.otf') format('opentype');
    /* format可以是 'otf' 或 'opentype' */
    font-weight: 400;
    /* 或者 'normal' */
    font-style: normal;
}

/* 2. 定义半粗体 (SemiBold) */
@font-face {
    font-family: 'Source Han Serif SC';
    src: url('/fonts/SourceHanSerifSC-SemiBold_0.otf') format('opentype');
    font-weight: 600;
    /* SemiBold 通常是 600 */
    font-style: normal;
}

/* 3. 定义粗体 (Bold) */
@font-face {
    font-family: 'Source Han Serif SC';
    src: url('/fonts/SourceHanSerifSC-Bold_0.otf') format('opentype');
    font-weight: 700;
    /* 或者 'bold' */
    font-style: normal;
}

.ticket {
    width: 428px;
    height: 270px;
    background-image: url('/ticket.png');
    background-size: cover;
    border-radius: 20px;
    margin: 20px;
    color: black;
}

.header {
    position: relative;
    top: 10px;
}

.machine {
    position: relative;
    left: 20px;
    color: #b95a5aff;
}

.check {
    position: relative;
    left: 240px;
    font-family: 'Source Han Serif SC', serif;
}

.sta {
    position: relative;
    top: 20px;
}

.from_box {
    font-size: 24px;
    position: absolute;
    left: 40px;
    min-width: 96px;
    text-align: justify;
}

.from_box::after {
    content: "";
    display: inline-block;
    width: 100%;
}

.to_box {
    font-size: 24px;
    position: absolute;
    left: 280px;
    min-width: 96px;
    text-align: justify;
}

.to_box::after {
    content: "";
    display: inline-block;
    width: 100%;
}

.sta-py {
    position: relative;
    top: 44px;
    font-family: "FangSong", "仿宋", "STFangsong", serif;
}

.from-py {
    position: absolute;
    left: 40px;
    width: 96px;
    text-align: center;
}

.to-py {
    position: absolute;
    left: 280px;
    width: 96px;
    text-align: center;
}

.code {
    position: absolute;
    left: 160px;
    font-size: 24px;
    font-family: 'Source Han Serif SC', serif;
    width: 100px;
    text-align: center;
    padding-bottom: 4px;
    border-bottom: solid 2px #000;
}

.info {
    position: relative;
    top: 72px;
    left: 32px;
}

.seat {
    position: absolute;
    right: 80px;
    top: 0;
    width: 100px;
    text-align: left;
}

.price {
    position: absolute;
    top: 20px;
}

.type {
    position: absolute;
    top: 20px;
    text-align: center;
    width: 360px;
}

.lv {
    position: absolute;
    top: 20px;
    text-align: center;
    right: 80px;
    width: 100px;
}

.pass{
    position:relative;
    bottom:-120px;
    left:20px;
}
.ads{
    position:relative;
    bottom:-120px;
    left:20px;
    font-family: 'Source Han Serif SC', serif;
    font-size: 12px;
    text-align: center;
    border: dashed 2px #000;
    width:300px;
    height:40px;
}
</style>