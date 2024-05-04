<template>
    <li class="show_info"><el-button @click="handleClick(map)" type="success" plain>实时路况</el-button></li>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useGlobalMap } from '@/plugins/globalmap';
import { useRealTimeTraffic } from './Hooks/useRealTimeTraffic';

let map = ref(null);
let flag = ref(false);
onMounted(async () => {
    map.value = await useGlobalMap();
})

const handleClick = (map) => {
    flag.value = !flag.value;
    // console.log(flag.value);
    useRealTimeTraffic(map, flag.value);
}
</script>

<style></style>