<template>
    <li class="video_watch">
        <el-button v-if="isShow" type="info" plain @click="showVideo">视频监控</el-button>
        <el-button v-else type="success" plain @click="hideVideo">取消查看</el-button>
    </li>
    <div class="popup_video" ref="popupVideo">
        <div class="close" @click="closeVideo">×</div>
        <video autoplay controls muted poster src="@/assets/videos/video.mp4"></video>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const popupVideo = ref(null)
const isShow = ref(true)

const showVideo = () => {
    isShow.value = false
    popupVideo.value.style.display = 'block'
}

const hideVideo = () => {
    isShow.value = true
    popupVideo.value.style.display = 'none'
}

const closeVideo = () => {
    isShow.value = true
    popupVideo.value.style.display = 'none'
}
</script>

<style scoped>
.video_watch {
    position: relative;
}


.popup_video {
    display: none;
    position: absolute;
    top: 150px;
    left: 40%;
    width: 400px;
    height: 400px;
}

.close {
    width: 20px;
    height: 20px;
    background-color: red;
    position: absolute;
    top: 10px;
    left: 380px;
    z-index: 10;
    text-align: center;
    color: #fff;
}

.close:hover {
    cursor: pointer;
}

.popup_video video {
    width: 100%;
    height: 100%;
}
</style>