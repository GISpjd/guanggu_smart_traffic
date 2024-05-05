<template>
    <el-card v-if="showDialog">
        <h3>框选查询结果</h3>
        <a href="#" class="close" @click="showDialog = false">x</a>
        <el-table v-if="allData" :data="currentData" border style="width: 100%">
            <el-table-column prop="事件编号" label="事件编号" width="160" />
            <el-table-column prop="事件等级" label="事件等级" width="90" />
            <el-table-column prop="发生时间" label="发生时间" width="140" />
            <el-table-column prop="发生地点" label="发生地点" />
            <el-table-column prop="驾驶员" label="驾驶员" width="90" />
            <el-table-column prop="车牌号" label="车牌号" width="120" />
            <el-table-column prop="处理状态" label="处理状态">
                <template #default="scope">
                    <el-tag v-if="scope.row.处理状态 == 0" type="danger">未处理</el-tag>
                    <el-tag v-else-if="scope.row.处理状态 == 1" type="warning">处理中</el-tag>
                    <el-tag v-else type="success">已处理</el-tag>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination small background layout="prev, pager, next" :default-page-size="5" :total="allData.length"
            class="mt-4" v-model:current-page="currentPage" @update:current-page="changePage" />
    </el-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import { showDialog, queryResult } from '../Hooks/useSearchByDraw';

let currentPage = ref(1);
let allData = ref([]);
let currentData = ref([]);

watch(
    () => queryResult.value,
    () => {
        if (queryResult.value) {
            allData.value = queryResult.value;
            currentData.value = allData.value.slice(0, 5)
        }
    }
)

const changePage = () => {
    currentData.value = allData.value.slice(
        (currentPage.value - 1) * 5,
        (currentPage.value - 1) * 5 + 5
    )
}

const emit = defineEmits(['changeShow'])
watch(
    () => showDialog.value,
    () => {
        if (showDialog.value) {
            currentPage.value = 1;
            emit('changeShow', showDialog.value)
        }
    }
)
</script>

<style lang="scss" scoped>
.el-card {
    position: absolute;
    top: 150px;
    width: 1000px;
    max-height: 400px;
    text-align: center;

    h3 {
        margin-bottom: 10px;
    }

    .close {
        text-decoration: none;
        position: absolute;
        right: 10px;
        top: 5px;
    }
}
</style>