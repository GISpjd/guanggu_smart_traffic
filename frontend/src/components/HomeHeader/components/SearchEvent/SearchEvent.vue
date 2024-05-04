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

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useGlobalMap } from '@/plugins/globalmap'
import { queryByDraw, isBoxSelect } from './Hooks/useSearchByDraw'
import { highlight_source } from './Hooks/useHighlight'
import { popupShow, eventTitle, eventContent } from './Hooks/usePopup'
import { useSearchByInput, isSearch } from './Hooks/useSearchByInput'


let inputShow = ref(false)
let address = ref('')
let map = ref(null)
let queryLayer = ref(null)
let popupClick = ref()

let showPopup = ref(false)

onMounted(() => {
    map.value = useGlobalMap()

})

const queryEvent = () => {
    isSearch.value = !isSearch
    inputShow.value = true
}

const cancelSearch = () => {
    isSearch.value = true
    inputShow.value = false
}
const cancelBoxSelect = () => {
    isBoxSelect.value = true
}

const doSearch = () => {
    highlight_source.clear()
    if (address.value.trim()) {
        const { highlight_layer } = useSearchByInput(map.value, address.value)
        address.value = ''
        queryLayer.value = highlight_layer
        popupClick.value = popupShow(map.value)
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

let myDraw = ref(null)
const boxSelectQuery = () => {
    const { highlight_layer, draw } = queryByDraw(map.value)
    popupClick.value = popupShow(map.value)
    queryLayer.value = highlight_layer
    myDraw.value = draw

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