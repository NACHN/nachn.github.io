<script setup>
import { ref, onMounted } from 'vue';
import Ticket from './Ticket.vue';
// 移除：import { useData } from 'vitepress'; // 不再需要 frontmatter
// 移除：const { frontmatter } = useData(); // 不再需要 frontmatter
// 移除：const props = defineProps({ items: Array, }); // 不再需要 props，数据由组件内部加载

// 使用 ref 来存储从 JSON 文件加载的数据
const displayItems = ref([]);
const loading = ref(true);

onMounted(async () => {
    try {
        // 使用 fetch 加载 public 目录下的 JSON 文件
        // VitePress/Vite 会确保路径 /train-data.json 指向 public 目录中的文件
        const response = await fetch('/train-data.json');

        // 检查请求是否成功
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        displayItems.value = await response.json();
    } catch (error) {
        console.error('Failed to load train data:', error);
        // 可以设置一个空数组或错误信息
        displayItems.value = [];
    } finally {
        loading.value = false;
    }
});

const selectedCard = ref(null);

onMounted(async () => {
    try {
        const response = await fetch('/train-data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        displayItems.value = await response.json();
    } catch (error) {
        console.error('Failed to load train data:', error);
        displayItems.value = [];
    } finally {
        loading.value = false;
    }
});


// 新增：打开模态框并设置选中的票据
const openModal = (item) => {
    selectedCard.value = item;
};

// 新增：关闭模态框
const closeModal = () => {
    selectedCard.value = null;
};

</script>

<template>
    <div class="index">
        <div class="header">
            <h1>旅行记录</h1>
            <p>谨以此纪念被取消的纸质票。</p>
        </div>

        <div v-if="loading" style="text-align: center; color: var(--vp-c-text-2);">
            正在加载数据...
        </div>

        <div v-else class="ticket-grid">
            <Ticket @click="openModal(item)" v-for="item in displayItems" :key="item.code + item.time"
                :check="item.check" :from="item.from" :to="item.to" :code="item.code" :from_py="item.from_py"
                :to_py="item.to_py" :time="item.time" :seat="item.seat" :price="item.price" :type="item.type"
                :lv="item.lv" :pass="item.pass" :bg="item.bg" />
        </div>

        <div v-if="!loading && displayItems.length === 0" style="text-align: center; color: var(--vp-c-text-2);">
            未找到旅行记录。
        </div>

        <!-- 新增：模态框 (Modal) -->
        <Transition name="fade">
            <div v-if="selectedCard" class="modal-overlay" @click="closeModal">
                <div class="modal-content" @click.stop>
                    <Ticket :is-large="true" :check="selectedCard.check" :from="selectedCard.from" :to="selectedCard.to"
                        :code="selectedCard.code" :from_py="selectedCard.from_py" :to_py="selectedCard.to_py"
                        :time="selectedCard.time" :seat="selectedCard.seat" :price="selectedCard.price"
                        :type="selectedCard.type" :lv="selectedCard.lv" :pass="selectedCard.pass"
                        :bg="selectedCard.bg" />
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
/* 样式保持不变 */
.header {
    text-align: center;
    margin-bottom: 48px;
}

.header h1 {
    font-size: 2.5rem;
    font-weight: 700;
}

.header p {
    font-size: 1.1rem;
    color: var(--vp-c-text-2);
    margin-top: 8px;
}

.ticket-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0px;
}

.ticket:hover {
    transform: translateX(-100px);
}

:deep(.arrow) {
    top:15px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .ticket:hover {
        transform: none;
    }
}

.modal-content {
    transform: scale(2.5);
    /* 修改：将 transition 属性移到这里，让内容也产生动画 */
    transition: all 0.3s ease;
}

/* 
  新增：为 Transition 组件定义动画效果
  我们为遮罩层定义了 opacity 的过渡，为内容区域定义了 opacity 和 transform 的过渡。
*/

/* 进入动画的起始状态 */
.fade-enter-from {
    opacity: 0;
}

.fade-enter-from .modal-content {
    opacity: 0;
    transform: scale(1.4) translateX(-500px);
    /* 从比最终状态稍小的尺寸开始 */
}

/* 进入动画的结束状态 */
.fade-enter-to {
    opacity: 1;
}

.fade-enter-to .modal-content {
    opacity: 1;
    transform: scale(2.5);
    /* 恢复到最终尺寸 */
}

/* 定义进入动画的过程 */
.fade-enter-active {
    transition: opacity 0.3s ease;
}

/* 离开动画的起始状态 */
.fade-leave-from {
    opacity: 1;
}

.fade-leave-from .modal-content {
    opacity: 1;
    transform: scale(2.5);
}

/* 离开动画的结束状态 */
.fade-leave-to {
    opacity: 0;
}

.fade-leave-to .modal-content {
    opacity: 0;
    transform: scale(1.4) translateX(-500px);
}

/* 定义离开动画的过程 */
.fade-leave-active {
    transition: opacity 0.3s ease;
}
</style>