<template>
    <Teleport to="body">
        <div class="directory-tree-card" v-if="isUnusalUser">
            <div class="card-header">图层目录</div>
            <details class="content">
                <summary class="card-title_">地图文档</summary>
                <details>
                    <summary class="card-title__">光谷智慧交通</summary>
                    <details>
                        <summary class="card-title___">地图1</summary>
                        <div class="card-layer-tree" v-for="item in children" :key="item.id">
                            <input type="checkbox" :id="item.id" @click="switchLayer($event, map)" checked>
                            <span v-if="item.name === '居民区'"><img src="../../assets/images/Area.png" alt="" /></span>
                            <span v-else-if="item.name === '武汉光谷道路'"><img src="../../assets/images/Line.png"
                                    alt="" /></span>
                            <span v-else-if="item.name === '事件'"><img src="../../assets/images/Point.png"
                                    alt="" /></span>
                            <span v-else-if="item.name === '摄像头'"><img src="../../assets/images/monitor.png"
                                    alt="" /></span>
                            <span v-else-if="item.name === '警务室'"><img src="../../assets/images/location.png"
                                    alt="" /></span>
                            <label :for="item.id">{{ item.name }}</label>
                        </div>
                    </details>
                </details>
            </details>
        </div>
    </Teleport>

</template>

<script setup>
import { userModules } from '@/stores/userModulesStore';
import { useDirectory } from './Hooks/useDirectory'
import { useGlobalMap } from '@/plugins/globalmap';
import { onMounted, ref } from 'vue';

const { userLoginData } = userModules()
const { children, switchLayer } = useDirectory()
// 判断是否是普通用户
let isUnusalUser = ref(false)
let map = ref(null)

onMounted(() => {
    if (userLoginData.value.user_role) {
        isUnusalUser.value = true
    }
    map.value = useGlobalMap()
    window.onload = function () {
        // 展开所有目录
        const details = document.querySelectorAll('details')
        details.forEach((targetDetail) => {
            targetDetail.open = true
        })
        // const summarys = document.querySelectorAll('summary')
        // console.log(summarys); //NodeList
        // summarys.forEach((targetSummary) => {
        //     const triangle = document.createElement('span')
        //     triangle.innerHTML = '&#9660;'
        //     triangle.style.marginRight = '5px'
        //     targetSummary.insertBefore(triangle, targetSummary.firstChild)
        //     targetSummary.addEventListener('click', () => {
        //         if (targetSummary.parentNode.className === 'card-layer-tree') {
        //             return
        //         }
        //         triangle.innerHTML = targetSummary.parentNode.open ? '&#9660;' : '&#9654;'
        //     })
        // })
    }
})
</script>

<style lang="scss" scoped>
.directory-tree-card {
    position: fixed;
    width: 200px;
    top: 100px;
    right: 10px;
    background-color: #f5f5f5;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-family: Arial, sans-serif;
    font-size: 16px;
    // margin: 10px;

    .card-header {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        background: skyblue;
        font-size: 20px;
        color: #fff;
        margin-bottom: 10px;
        border-radius: 10px 10px 0 0;
    }

    .content {
        padding: 10px;

        summary {
            // list-style: none;
            cursor: pointer;
            margin-bottom: 10px;
        }

        .card-title__ {
            margin-left: 10px;
        }

        .card-title___ {
            margin-left: 20px;
        }

        .card-layer-tree {
            margin-left: 20px;
            margin-bottom: 5px;
            color: #514d4d;
            font-size: 14px;
        }

    }
}

img {
    width: 15px;
}
</style>