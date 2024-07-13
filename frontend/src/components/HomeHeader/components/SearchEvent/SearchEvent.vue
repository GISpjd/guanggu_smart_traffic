<template>
    <li class="search_event">
        <el-dropdown split-button type="primary" @click="handleButtonClick">
            查询事件
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-if="isSearch" @click="queryEvent">搜索查询</el-dropdown-item>
                    <el-dropdown-item v-else @click="cancelSearch">取消搜索</el-dropdown-item>
                    <el-dropdown-item v-if="isBoxSelect" @click="boxSelectQuery">框选查询</el-dropdown-item>
                    <el-dropdown-item v-else @click="cancelBoxSelect">取消框选</el-dropdown-item>
                    <el-dropdown-item @click="showCharts">统计图</el-dropdown-item>
                    <el-dropdown-item v-if="isHot" @click="showHot">热力图</el-dropdown-item>
                    <el-dropdown-item v-else @click="cancelHot">取消显示</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

    </li>

    <Teleport to="body">
        <div class="searchInput" v-if="inputShow">
            <el-input @keyup.enter="doSearch" v-model.trim.lazy="address" placeholder="请输入查询地点">
                <template #append>
                    <img @click="doSearch" class="searchIcon" src="@/assets/icon/search.svg" alt="">
                </template>
            </el-input>
        </div>
    </Teleport>

    <div id="popup" @click.self="hiddenPopup">
        <div class="top">
            <div>事件详细信息</div>
            <button @click="hiddenPopup">X</button>
        </div>
        <table class="event-info" v-if="eventTitle">
            <tr>
                <th>{{ eventTitle[1] }}</th>
                <td>{{ eventContent[1] }}</td>
            </tr>
            <tr>
                <th>{{ eventTitle[3] }}</th>
                <td>{{ eventContent[3] }}</td>
            </tr>
            <tr>
                <th>{{ eventTitle[4] }}</th>
                <td>{{ eventContent[4] }}</td>
            </tr>
            <tr>
                <th>{{ eventTitle[7] }}</th>
                <td>{{ eventLevel(eventContent[7]) }}</td>
            </tr>
        </table>
    </div>

    <QueryTable @changeShow="data => popupIsShow = data" />

    <DataCharts v-if="isChartsShow" v-model="isChartsShow" />
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useGlobalMap } from '@/plugins/globalmap'
import { queryByDraw, isBoxSelect } from './Hooks/useSearchByDraw'
import { highlight_source } from './Hooks/useHighlight'
import { popupShow, eventTitle, eventContent } from './Hooks/usePopup'
import { useSearchByInput, isSearch } from './Hooks/useSearchByInput'

import QueryTable from './components/QueryTable.vue'
import DataCharts from './components/DataCharts.vue'

import { createDraw } from '@/Hooks/useDraw'
import { Query } from '@/Hooks/useQuery'

let inputShow = ref(false)
let isHot = ref(true)
let address = ref('')
let map = ref(null)
let queryLayer = ref(null)
let popupClick = ref()
let myDraw = ref(null)

// 控制DataCharts组件显示与否
let isChartsShow = ref(false)

//控制popup显示
let popupIsShow = ref()
//一旦实现了框选查询，就取消popup的显示
watch(popupIsShow, () => {
    console.log('popupIsShow', popupIsShow.value);
    if (popupIsShow.value) {
        let popup = document.getElementById('popup')
        popup.style.display = 'none'
    }
}
)

const position = ref([])
let heatVector
let heatSource = new ol.source.Vector({})
let hot_source = new ol.source.Vector({})
let hot_layer = new ol.layer.Vector({
    source: hot_source
})

watch(isHot, () => {
    console.log('isHot', isHot.value);
    if (!isHot.value) {
        map.value.addLayer(hot_layer)
        let draw
        draw = createDraw({
            type: 'Square',
            source: hot_source,
        })
        map.value.addInteraction(draw)
        draw.on('drawend', function (evt) {
            hot_source.clear()
            draw.setActive(false)
            /* 1、拉框查询获取几何信息 */
            var geometry = evt.feature.getGeometry()
            var service = {
                name: 'guanggu',
                layerId: 2
            }
            /* 2、根据几何信息调用中地接口,实现要素查询 */
            Query.queryByGeom({
                geometry,
                service,
                callback: handleQuery
            })
            map.value.removeInteraction(draw)
        })
        const handleQuery = (data) => {
            hot_source.clear()
            data.forEach((item) => {
                position.value.push(item.getGeometry().flatCoordinates)
            })

            //创建一个Heatmap图层
            position.value.forEach((item) => {
                var point = new ol.Feature({
                    geometry: new ol.geom.Point(item)
                })
                heatSource.addFeature(point)
                heatVector = new ol.layer.Heatmap({
                    //矢量数据源
                    source: heatSource,
                    //热点半径
                    radius: 25,
                    //模糊尺寸
                    blur: 10
                })
            })
            map.value.addLayer(heatVector)
        }
    } else {
        position.value = []
        hot_source.clear()
        heatSource.clear()
        map.value.removeLayer(map.value.getLayers().item(2))
    }
})

onMounted(() => {
    map.value = useGlobalMap()
    console.log('map', map.value.getLayers().item(0))
})

const queryEvent = () => {
    isSearch.value = !isSearch
    inputShow.value = true
}

const cancelSearch = () => {
    isSearch.value = true
    inputShow.value = false
    let popup = document.getElementById('popup')
    popup.style.display = 'none'
    highlight_source.clear()
    map.value.removeLayer(queryLayer.value)
}
const cancelBoxSelect = () => {
    //显示框选查询
    isBoxSelect.value = true
    //关闭popup
    let popup = document.getElementById('popup')
    popup.style.display = 'none'
    map.value.un('click', popupClick.value)
    if (myDraw.value) {
        map.value.removeInteraction(myDraw.value)
    }
    map.value.removeLayer(queryLayer.value)
    highlight_source.clear()
}

// 控制事件详细信息popup的隐藏
const hiddenPopup = () => {
    let popup = document.getElementById('popup')
    popup.style.display = 'none'
}

const eventLevel = computed(() => {
    return (status) => {
        switch (status) {
            case '0':
                return '未处理'
            case '1':
                return '处理中'
            case '2':
                return '已处理'
        }
    }
})


// 输入地点查询
const doSearch = () => {
    highlight_source.clear()
    if (address.value.trim()) {
        const { highlight_layer } = useSearchByInput(map.value, address.value)
        // 清空输入的地址
        address.value = ''
        queryLayer.value = highlight_layer
        popupClick.value = popupShow(map.value)
        // 关闭输入查询框
        inputShow.value = false
    } else {
        ElMessage({
            showClose: true,
            message: '请输入合法地点',
            type: 'warning',
            duration: 1000
        })
    }
}


const boxSelectQuery = () => {
    const { highlight_layer, draw } = queryByDraw(map.value)
    popupClick.value = popupShow(map.value)
    queryLayer.value = highlight_layer
    myDraw.value = draw
}

// 点击下拉框中的统计图，显示DataCharts组件
const showCharts = () => {
    isChartsShow.value = true
}

//
const showHot = () => {
    isHot.value = false
}

const cancelHot = () => {
    isHot.value = true
}
</script>

<style lang="scss">
.searchInput {
    position: absolute;
    top: 80px;
    left: 40%;
    z-index: 9999;
    width: 20%;
    height: 40px;

    .el-input {
        width: 100%;
        height: 100%;
    }

    .searchIcon {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
}

#popup {
    font-family: Arial, Helvetica, sans-serif;
    display: none !important;
    z-index: -1;
    width: 300px;
    position: fixed;
    left: 20px;
    top: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    padding: 5px;
    font-size: 14px;
    color: #333;
    line-height: 1.5;
    overflow: hidden;
    transition: all 0.3s ease;

    &::before {
        display: block;
        content: '';
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        border: 10px solid transparent;
        border-top-color: #000;
    }

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 18px;

        button {
            background-color: transparent;
            border: none;
            cursor: pointer;
            font-size: 16px;
            color: #333;

            &:hover {
                color: #f00;
            }
        }
    }

    .event-info {
        width: 100%;

        th {
            min-width: 100px;
            text-align: left;
            padding-right: 10px;
            font-weight: bold;
            font-size: 16px;
            color: #333;
        }

        td {
            text-align: right;
            padding-left: 10px;
            font-size: 14px;
            color: #666;
            border-left: 1px solid #ccc;
        }

        tr:last-child td {
            border-bottom: none;
        }

        tr td:last-child {
            border-right: none;
        }
    }
}
</style>