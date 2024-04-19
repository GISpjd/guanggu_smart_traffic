<template>
    <li class="my_event">
        <el-button plain @click="dialogTableVisible = true">
            我的事件
        </el-button>
    </li>
    <el-dialog v-model="dialogTableVisible" title="我的事件" width="800">
        <el-table :data="getUserEventData" style="width: 100%">
            <el-table-column prop="event_driver" label="用户名"></el-table-column>
            <el-table-column prop="road_section_id" label="时间地址"></el-table-column>
            <el-table-column prop="event_date" label="发生时间"></el-table-column>
            <el-table-column prop="event_describe" label="事件描述"></el-table-column>
            <el-table-column prop="event_date" label="发生时间"></el-table-column>
            <el-table-column prop="event_car_number" label="用户车牌号"></el-table-column>
            <el-table-column label="审核状态">
                <template #default="{ row }">
                    <template v-if="row.event_handle_status === 0">未审核 </template>
                    <template v-else-if="row.event_handle_status === 1"> 已忽略 </template>
                    <template v-else-if="row.event_handle_status === 2"> 已审核 </template>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
const dialogTableVisible = ref(false)
const gridData = [
    {
        date: '2016-05-02',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
        date: '2016-05-04',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
        date: '2016-05-01',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
        date: '2016-05-03',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
]
</script>

<style></style>