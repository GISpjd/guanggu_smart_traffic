<template>
    <el-dialog v-model="props.visible" title="修改事件处理状态" width="1200px" class="put-container">
        <el-table :data="eventData" style="width: 100%">
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
        <!-- <el-pagination small background :page-size="10" v-model:current-page="currentPage" @current-change="changeData"
            layout="prev, pager, next" :total="eventData.length" class="mt-4" /> -->
    </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getAllEventHttp } from '@/request/eventHttp';



const eventData = ref([]);
const currentPage = ref(1);
const eventStatus = ref(0);

const props = defineProps({
    visible: Boolean
});

console.log(props.visible);
</script>

<style scoped></style>