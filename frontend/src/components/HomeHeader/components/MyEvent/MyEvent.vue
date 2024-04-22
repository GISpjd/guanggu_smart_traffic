<template>
    <li class="my_event">
        <el-button plain @click="whetherShowEventTable">
            我的事件
        </el-button>
    </li>
    <el-dialog v-model="eventTableVisible" title="我的事件" width="800">
        <el-table :data="UserEventData" style="width: 100%">
            <el-table-column prop="event_driver" label="用户名"></el-table-column>
            <el-table-column prop="road_section_id" label="时间地址"></el-table-column>
            <el-table-column prop="event_date" label="发生时间"></el-table-column>
            <el-table-column prop="event_describe" label="事件描述"></el-table-column>
            <el-table-column prop="event_date" label="发生时间"></el-table-column>
            <el-table-column prop="event_car_number" label="用户车牌号"></el-table-column>
            <el-table-column label="处理状态">
                <template #default="{ row }">
                    <template v-if="row.event_handle_status === 0">未处理 </template>
                    <template v-else-if="row.event_handle_status === 1"> 处理中 </template>
                    <template v-else-if="row.event_handle_status === 2"> 已处理 </template>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllEventHttp } from '@/request/eventHttp';
import { userModules } from '@/stores/userModulesStore'


const eventTableVisible = ref(false)
const UserEventData = ref([])
const whetherShowEventTable = () => {
    eventTableVisible.value = true
}

// 挂载前就要请求数据
const { userLoginData } = userModules()

const getUserEvent = async () => {
    // console.log(userLoginData.value);
    const userId = String(userLoginData.value.id)
    const res = await getAllEventHttp({ userId: userId })
    if (res.code === 0) {
        UserEventData.value = res.data
    }
}

onMounted(() => {
    getUserEvent()
})
</script>

<style></style>