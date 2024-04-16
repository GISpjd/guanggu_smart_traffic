<template></template>

<script setup>
import { useGlobalMap } from '../plugins/globalmap'
import {
    zoomToExtent,
    zoomslider,
    mousePosition,
    scaleLine,
    fullScreen,
    overviewMap
} from '../plugins/mapcontrol'
import { onMounted } from 'vue';



onMounted(() => {
    const map = useGlobalMap()
    map.addControl(zoomToExtent)
    map.addControl(zoomslider)
    map.addControl(mousePosition)
    map.addControl(scaleLine)
    map.addControl(fullScreen)
    map.addControl(overviewMap)
})
</script>

<style>
/* 鹰眼控件的样式 */
.ol-custom-overviewmap {
    /* position: fixed; */
    right: 0;
    bottom: 0;
    top: auto;
    left: auto;
}

.ol-overviewmap-box {
    border: 1px solid #ff2d51 !important;
}

.custom-mouse-position {
    position: absolute;
    bottom: 10px;
    left: 150px;
}

.ol-zoom {
    position: absolute;
    top: 70px;
}

.ol-zoom-extent {
    position: absolute;
    top: 130px;
}

.ol-rotate {
    position: absolute;
    top: 70px;
}

.ol-zoomslider {
    position: absolute;
    top: 170px;
}

.ol-full-screen {
    position: absolute;
    top: 70px;
}
</style>
