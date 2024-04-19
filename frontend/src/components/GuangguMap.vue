<template>
</template>

<script setup>
import { useGlobalMap } from '../plugins/globalmap'
import { eventLayer, policeLayer, roadStateLayer } from '../map_libs/guanggu'
import { onMounted } from 'vue';



onMounted(() => {
    const map = useGlobalMap()
    map.addLayer(eventLayer)
    map.addLayer(policeLayer)
    map.addLayer(roadStateLayer)
})
</script>

<style></style>