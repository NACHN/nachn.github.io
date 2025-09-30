<script setup>
import { ref } from 'vue'
import Ticket from './Ticket.vue'

const ticketData = ref({
    check: '第 1 候车室',
    from: '北京西',
    to: '长沙',
    code: 'Z1',
    from_py: 'Beijingxi',
    to_py: 'Changsha',
    time: '202510011759',
    seat: '01066',
    price: '189.5',
    type: '网',
    lv: '硬座',
    pass: '1001011919****0810 李田所',
    ad: '壮丽76年·奋斗新时代\n热烈庆祝中华人民共和国成立76周年'
})

const generateTicket = () => {
    // 生成火车票的逻辑可以在这里添加
    console.log('生成火车票:', ticketData.value)
}

const resetForm = () => {
    ticketData.value = {
        check: '',
        from: '',
        to: '',
        code: '',
        from_py: '',
        to_py: '',
        time: '',
        seat: '',
        price: '',
        type: '',
        lv: '',
        pass: '',
        ad: ''
    }
}

const exportToPDF = async () => {
    try {
        // 获取车票元素
        const ticketElement = document.getElementById('ticket-preview')
        if (!ticketElement) {
            console.error('未找到车票预览元素')
            return
        }

        // 克隆车票元素以避免影响页面显示
        const clonedTicket = ticketElement.cloneNode(true)

        // 创建新的窗口用于打印
        const printWindow = window.open('', '_blank')

        // 写入打印窗口内容
        printWindow.document.write(`
      <!DOCTYPE html>
        <html>
  <head>
    <title>火车票</title>
    <link rel="stylesheet" href="/ticket.css">
    <style>
      @page {
        size: 428px 270px;
        margin: 0;
      }
      body {
        margin: 0;
        padding: 0;
        width: 428px;
        height: 270px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
      }
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
    </style>
  </head>
  <body>
    ${clonedTicket.outerHTML}
  </body>
  </html>
    `)

        // 等待内容加载完成
        printWindow.document.close()
        printWindow.focus()

        // 等待图片加载完成
        const images = printWindow.document.querySelectorAll('img')
        if (images.length > 0) {
            await Promise.all(
                Array.from(images).map(img => {
                    if (img.complete) return Promise.resolve()
                    return new Promise(resolve => {
                        img.onload = resolve
                        img.onerror = resolve
                    })
                })
            )
        }

        // 等待一小段时间确保背景图片加载完成
        await new Promise(resolve => setTimeout(resolve, 500))

        // 打印
        printWindow.print()
        printWindow.close()
    } catch (error) {
        console.error('导出PDF失败:', error)
    }
}

</script>

<template>
    <div class="ticket-maker">
        <div class="form-container">
            <form @submit.prevent="generateTicket">
                <!-- 第一行：出发站、到达站、车次 -->
                <div class="form-row">
                    <div class="form-group">
                        <label for="from">出发站:</label>
                        <input id="from" v-model="ticketData.from" type="text" />
                    </div>
                    <div class="form-group">
                        <label for="to">到达站:</label>
                        <input id="to" v-model="ticketData.to" type="text" />
                    </div>
                    <div class="form-group">
                        <label for="code">车次:</label>
                        <input id="code" v-model="ticketData.code" type="text" />
                    </div>
                </div>

                <!-- 第二行：出发站拼音、到达站拼音、时间 -->
                <div class="form-row">
                    <div class="form-group">
                        <label for="from_py">出发站拼音:</label>
                        <input id="from_py" v-model="ticketData.from_py" type="text" />
                    </div>
                    <div class="form-group">
                        <label for="to_py">到达站拼音:</label>
                        <input id="to_py" v-model="ticketData.to_py" type="text" />
                    </div>
                    <div class="form-group">
                        <label for="time">时间:</label>
                        <input id="time" v-model="ticketData.time" type="text" />
                    </div>
                </div>

                <!-- 第三行：座位、价格、类型 -->
                <div class="form-row">
                    <div class="form-group">
                        <label for="seat">座位:</label>
                        <input id="seat" v-model="ticketData.seat" type="text" />
                    </div>
                    <div class="form-group">
                        <label for="price">价格:</label>
                        <input id="price" v-model="ticketData.price" type="text" />
                    </div>
                    <div class="form-group">
                        <label for="type">售票类型:</label>
                        <input id="type" v-model="ticketData.type" type="text" />
                    </div>
                </div>

                <!-- 第四行：座位等级、乘客、检票口 -->
                <div class="form-row">
                    <div class="form-group">
                        <label for="lv">座位等级:</label>
                        <input id="lv" v-model="ticketData.lv" type="text" />
                    </div>
                    <div class="form-group">
                        <label for="pass">乘客:</label>
                        <input id="pass" v-model="ticketData.pass" type="text" />
                    </div>
                    <div class="form-group">
                        <label for="check">检票口:</label>
                        <input id="check" v-model="ticketData.check" type="text" />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="ad">广告内容:</label>
                        <textarea id="ad" v-model="ticketData.ad" type="text" />
                    </div>
                </div>

                <div class="button-group">
                    <button type="submit">生成火车票</button>
                    <button type="button" @click="resetForm">重置</button>
                    <!--button type="button" @click="exportToPDF">导出PDF</button-->
                </div>
            </form>
        </div>
        <div style="display: flex;">
        <div class="ticket-preview" id="ticket-preview" style="box-shadow: none;">
            <Ticket :check="ticketData.check" :from="ticketData.from" :to="ticketData.to" :code="ticketData.code"
                :from_py="ticketData.from_py" :to_py="ticketData.to_py" :time="ticketData.time" :seat="ticketData.seat"
                :price="ticketData.price" :type="ticketData.type" :lv="ticketData.lv" :pass="ticketData.pass"
                :ad="ticketData.ad" />
        </div>
        <div class="ticket-preview" id="ticket-preview" style="box-shadow: none;">
            <Ticket :check="ticketData.check" :from="ticketData.from" :to="ticketData.to" :code="ticketData.code"
                :from_py="ticketData.from_py" :to_py="ticketData.to_py" :time="ticketData.time" :seat="ticketData.seat"
                :price="ticketData.price" :type="ticketData.type" :lv="ticketData.lv" :pass="ticketData.pass"
                :ad="ticketData.ad" :bg="'old'" />
        </div>
        </div>
    </div>
</template>

<style scoped>
.ticket-maker {
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px;
}

.form-container {
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.form-row {
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
}

.form-group {
    flex: 1;
    margin-bottom: 6px;
}

/* 响应式设计：在小屏幕上堆叠显示 */
@media (max-width: 768px) {
    .form-row {
        flex-direction: column;
        gap: 0;
    }

    .form-group {
        margin-bottom: 8px;
    }
}

/* 在中等屏幕上每行显示两个字段 */
@media (min-width: 769px) and (max-width: 1024px) {
    .form-row {
        flex-wrap: wrap;
    }

    .form-group {
        flex: 0 0 calc(50% - 5px);
    }
}

.form-group label {
    display: block;
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 0.85em;
}

.form-group input {
    width: 100%;
    padding: 5px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 0.85em;
}

.form-group textarea {
    width: 100%;
    padding: 5px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 0.85em;
}

.button-group {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 8px;
    grid-column: 1 / -1;
}

.button-group button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
}

.button-group button[type="submit"] {
    background-color: #42b883;
    color: white;
}

.button-group button[type="button"] {
    background-color: #64748b;
    color: white;
}
</style>