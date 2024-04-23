<template>
    <div class="toggle_source">
        <img src="../assets/images//yingxiangtu.png" alt="" @click="toggleYingxiang" />
        <img src="../assets/images/shiliangtu.png" alt="" @click="toggleShiliang" />
    </div>
</template>

<script setup>
import { useGlobalMap } from '@/plugins/globalmap';
import { vecLayerGroup, imgLayerGroup } from '../map_libs/tianditu'
import { eventLayer, policeLayer, roadStateLayer } from '../map_libs/guanggu'

import { onMounted, ref } from 'vue';

let map = ref(null)
onMounted(() => {
    map.value = useGlobalMap()
    console.log(map.value);
})

function toggleYingxiang() {
    map.value.getLayers().clear()
    map.value.addLayer(imgLayerGroup)
    map.value.addLayer(eventLayer)
    map.value.addLayer(policeLayer)
    map.value.addLayer(roadStateLayer)
    map.value.addLayer(guangguLayer)
}

function toggleShiliang() {
    map.value.getLayers().clear()
    map.value.addLayer(vecLayerGroup)
    map.value.addLayer(eventLayer)
    map.value.addLayer(policeLayer)
    map.value.addLayer(roadStateLayer)
    map.value.addLayer(guangguLayer)
}

</script>

<style>
.toggle_source {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 5px;
    bottom: 155px;
    width: 150px;
    height: 80px;
    z-index: 10;
}

.toggle_source img {
    width: 70px;
    height: 70px;
    border: 1px solid #ccc;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 0 5px 2px #666;
}
</style>