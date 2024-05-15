<template>
    <el-dialog v-model="tableShow" width="1200px" title="交通事件审核表" @close="handleClose">
        <el-input v-model="searchEvent" placeholder="请输入事件上报用户id" @keyup.enter="handleSearch(searchEvent)"></el-input>

        <div class="table-pagination-container">
            <el-table :data="tableData">
                <el-table-column prop="event_driver" label="事件司机名"></el-table-column>
                <el-table-column prop="event_type" label="事件类型"></el-table-column>
                <el-table-column prop="event_date" label="事件时间"></el-table-column>
                <el-table-column prop="road_section_id" lable="事件路段"></el-table-column>
                <el-table-column prop="event_car_number" label="车牌号"></el-table-column>
                <el-table-column props="event_describe" label="事件描述"></el-table-column>
                <el-table-column>
                    <template #default="{ row }">
                        <template v-if="row.event_handle_status === 0">
                            <el-button type="success" @click="handlePass(row)">通过</el-button>
                            <el-button type="warning" @click="handleIgnore(row)">忽略</el-button>
                        </template>
                        <template v-else-if="row.event_handle_status === 1">
                            已忽略
                        </template>
                        <template v-else-if="row.event_handle_status === 2">
                            已审核
                        </template>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-model:page-size="pageSize" v-model:current-page="currentPage" :page-sizes="[5, 10, 20, 30]"
                :total="total" @update:page-size="handleSizeChange" @update:current-page="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper" background :page-count="Math.ceil(total / pageSize)">
            </el-pagination>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useEventStore } from '@/stores/eventManage/eventAuditStore';

let isAudit = defineModel()
const { searchEvent, tableShow, tableData, currentPage, pageSize, total, fetchEventData, handleSizeChange, handleCurrentChange, handlePass, handleIgnore, handleSearch } = useEventStore()

onMounted(() => {
    console.log(tableShow);
    fetchEventData()
})

const handleClose = () => {
    tableShow.value = false
    isAudit.value = false
}

</script>
<style scoped lang="scss"></style>