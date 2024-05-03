<template>
</template>

<script setup>
import { useGlobalMap } from '../plugins/globalmap'
import { guangguLayer } from '../map_libs/guanggu'
import { onMounted } from 'vue';



onMounted(() => {
    const map = useGlobalMap()
    // console.log(map);
    map.addLayer(guangguLayer)
})
</script>

<style></style>