<script setup>
import { useData } from 'vitepress';
import Ticket from './Ticket.vue';
const { frontmatter } = useData();
const props = defineProps({
    items: Array, // [关键] 允许直接传入 items 数组
});

const displayItems = frontmatter.value.items;
</script>

<template>
    <div class="index">
        <div class="header">
            <h1>旅行记录</h1>
            <p>谨以此纪念被取消的纸质票。</p>
        </div>
        <div class="ticket-grid">
            <Ticket v-for="item in displayItems" 
            :check="item.check"
            :from="item.from"
            :to="item.to"
            :code="item.code"
            :from_py="item.from_py"
            :to_py="item.to_py"
            :time="item.time"
            :seat="item.seat"
            :price="item.price"
            :type="item.type"
            :lv="item.lv"
            :pass="item.pass" />
        </div>
    </div>
</template>

<style scoped>

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
  grid-template-columns: repeat(auto-fit, minmax(428px, 1fr));
  gap: 20px;
}

</style>