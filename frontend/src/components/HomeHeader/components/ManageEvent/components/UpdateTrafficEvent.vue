<template>
    <el-dialog v-model="putShow" @close="handleClose" title="修改事件处理状态" width="1200px" class="put-container">
        <el-table :data="currentData" style="width: 100%">
            <el-table-column prop="事件编号" label="事件编号"></el-table-column>
            <el-table-column prop="事件类型" label="事件类型"></el-table-column>
            <el-table-column prop="事件等级" label="事件等级"></el-table-column>
            <el-table-column prop="发生时间" label="发生时间"></el-table-column>
            <el-table-column prop="车牌号" label="车牌号"></el-table-column>
            <el-table-column prop="驾驶员" label="驾驶员"></el-table-column>
            <el-table-column label="处理状态">
                <template #default="{ row }">
                    <template v-if="row.处理状态 === '0'"> 未处理 </template>
                    <template v-else-if="row.处理状态 === '1'"> 处理中 </template>
                    <template v-else-if="row.处理状态 === '2'"> 已处理 </template>
                </template>
            </el-table-column>
            <el-table-column label="修改状态">
                <template #default="{ row }">
                    <el-select v-model="eventStatus" @change="handlePutStatus(row, eventStatus, map)"
                        placeholder="修改状态">
                        <el-option label="未处理" value="0" />
                        <el-option label="处理中" value="1" />
                        <el-option label="已处理" value="2" />
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[5, 10, 20, 50]" v-model:page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" v-model:current-page="currentPage"
            :total="eventData.length" @update:page-size="handlePageSizeChange"
            @update:current-page="handleCurrentPageChange">
        </el-pagination>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, watchEffect, onUpdated, nextTick, watch } from 'vue'
import { useGlobalMap } from '@/plugins/globalmap';
import { useGetEvent } from '@/stores/eventPutStore';

let map = ref(null)
// 接收父组件传来的isUpdated,实现双向数据流
let isUpdated = defineModel()
let pageSize = ref(5)
let currentPage = ref(1)
let currentData = ref([])

const { eventData, putShow, eventStatus, handlePutStatus, getData } = useGetEvent()

onMounted(async () => {
    map.value = useGlobalMap()
    await getData()
})

//使用 watch 时，依赖项的声明可能会有延迟,watch 回调函数在初始化时可能没有及时检测到 eventData 的变化，导致 changeData 没有在数据加载完成后立即执行
// 导致每次显示第一页的时候没有数据被渲染出来渲染
// watch(eventData, (newVal) => {
//     if (newVal.length > 0) {
//         changeData()
//     }
// }, { immediate: true })

// watchEffect 确保在 eventData 加载完成后，changeData 会立即被调用。
// watchEffect 会在初次执行时立即运行一次回调函数。这确保了在组件挂载时，changeData 会被调用，从而初始化 currentData
watchEffect(() => {
    if (eventData.value.length > 0) {
        changeData()
    }
})

const handleClose = () => {
    putShow.value = false
    isUpdated.value = false
}

// 分页相关逻辑
// 当前页渲染的数据

function changeData() {
    console.dir(eventData.value);
    console.log(eventData.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value));
    currentData.value = eventData.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
    console.log(currentData.value);
}

// 有了watchEffect，那这两个监听函数就显得可有可无了
// const handleCurrentPageChange = (page) => {
//     currentPage.value = page
//     changeData()
// }

// const handlePageSizeChange = (size) => {
//     pageSize.value = size
//     changeData()
// }
</script>

<style scoped></style>