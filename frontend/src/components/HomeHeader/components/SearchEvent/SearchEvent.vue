<template>
    <li class="search_event">
        <el-dropdown split-button type="primary" @click="handleButtonClick">
            查询事件
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-if="isSearch" @click="queryEvent">搜索查询</el-dropdown-item>
                    <el-dropdown-item v-else @click="cancelSearch">取消搜索</el-dropdown-item>
                    <el-dropdown-item v-if="isBox" @click="boxSelectQuery">框选查询</el-dropdown-item>
                    <el-dropdown-item v-else @click="cancelSearch">取消框选</el-dropdown-item>
                    <el-dropdown-item @click="showCharts">统计图</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

    </li>

    <div class="searchInput" v-if="inputShow"></div>
</template>

<script setup>
import { ref } from 'vue'
let isSearch = ref(true)
console.log(isSearch.value);
function queryEvent() {
    isSearch = !isSearch
    console.log(isSearch.value);
}
</script>

<style></style>