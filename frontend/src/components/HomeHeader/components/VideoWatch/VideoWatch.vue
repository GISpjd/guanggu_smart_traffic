<template>
    <li class="video_watch">
        <el-button v-if="isShow" type="info" plain @click="showVideo">视频监控</el-button>
        <el-button v-else type="success" plain @click="hideVideo">取消查看</el-button>
    </li>
    <transition :duration="5000" enter-active-class="animate__animated animate__flip"
        leave-active-class="animate__animated animate__rollOut">
        <div v-if="!isShow" class="popup_video" ref="popupVideo">
            <div class="close" @click="closeVideo">×</div>
            <video autoplay controls muted poster src="@/assets/videos/video.mp4"></video>
        </div>
    </transition>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGlobalMap } from '@/plugins/globalmap';
import { videoSource, useClickShowVideo } from './Hooks/useClickShowVideo';

let map = ref(null)
// 存放video的dom
const popupVideo = ref(null)
const isShow = ref(true)
const handleMap = ref()

onMounted(() => {
    map.value = useGlobalMap()
})



const showVideo = () => {
    isShow.value = false
    // popupVideo.value.style.display = 'block'
    handleMap.value = useClickShowVideo(map.value)
}

const hideVideo = () => {
    videoSource.clear()
    isShow.value = true
    map.value.un('click', handleMap.value)
    // popupVideo.value.style.display = 'none'

}

const closeVideo = () => {
    isShow.value = true
    videoSource.clear()
    map.value.un('click', handleMap.value)

    // popupVideo.value.style.display = 'none'
}
</script>

<style lang="scss" scoped>
.popup_video {
    display: none;
    position: absolute;
    top: 150px;
    left: 40%;
    width: 200px;
    height: 200px;

    .close {
        width: 20px;
        height: 20px;
        background-color: red;
        position: absolute;
        top: 20px;
        right: 0px;
        z-index: 10;
        text-align: center;
        color: #fff;

        &:hover {
            cursor: pointer;
            color: blue;
        }
    }


    video {
        width: 100%;
        height: 100%;
    }
}
</style>