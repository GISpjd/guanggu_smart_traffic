<template>
    <div id="map">

    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { initMap } from './Hooks/useMap'
import { useRoam } from './Hooks/useRoam'
onMounted(async () => {
    await initMap()
    useRoam()
})
</script>

<style>
#map {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>