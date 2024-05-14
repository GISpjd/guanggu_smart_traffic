<template>
    <el-table :data="noticeData" stripe style="width: 100%">
        <el-table-column prop="notice_title" label="公告标题" width="180" />
        <el-table-column prop="publish_time" label="发布时间" width="180" />
        <el-table-column prop="handle" label="操作">
            <template v-slot="{ row }">
                <el-button type="primary" round size="small" @click="handleViewNotice(row.id)">查看公告</el-button>
                <el-button type="danger" round size="small" @click="handleDeleteNotice(row.id)">删除公告</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination :page-sizes="[5, 10, 20, 50]" v-model:page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" v-model:current-page="currentPage" :total="total"
        @update:page-size="handlePageSizeChange" @update:current-page="handleCurrentPageChange">
    </el-pagination>
    <el-dialog title="公告详情" v-model="detailNoticeDialogVisible">
        <div class="detail-container">
            <h3 class="detail-title">公告标题:{{ title }}</h3>
            <p class="detail-content">公告内容:{{ content }}</p>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, onUpdated } from 'vue'
import { getNoticeList, getNoticeById, deleteNotice } from '@/request/noticeHttp';

const noticeData = ref([])
let pageSize = ref(10)
let total = ref(0)
let currentPage = ref(1)
let title = ref()
let content = ref()
const detailNoticeDialogVisible = ref(false)

onMounted(() => {
    fetchData()
})
onUpdated(() => {
    fetchData()
})

// 获取所有公告
const fetchData = async () => {
    const res = await getNoticeList(currentPage.value, pageSize.value)
    if (res.code === 0) {
        // console.log(res);
        noticeData.value = res.data
        total.value = res.total[0].total
    }
}

// 查看详细公告
const handleViewNotice = async (id) => {
    detailNoticeDialogVisible.value = true
    const res = await getNoticeById(id)
    if (res.code === 0) {
        // console.log(res);
        let [object] = res.data
        title.value = object["notice_title"]
        content.value = object["notice_content"]
    }
}

// 删除公告操作
const handleDeleteNotice = async (id) => {
    await deleteNotice(id).then(() => alert('删除成功')).catch(() => alert('删除失败'))
    await fetchData()
    // 确保了在数据更新到响应式变量后，DOM 得到更新，从而用户能看到最新的信息
    // 后来用了onUpdated函数发现也能完成热更新dom操作，但我依然保留这个
    await nextTick()
}

const handlePageSizeChange = (size) => {
    pageSize.value = size
    fetchData()
}

const handleCurrentPageChange = (page) => {
    currentPage.value = page
    fetchData()
}


</script>
<style scoped lang="scss">
.detail-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background: #fff; // 白色背景
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 轻微的阴影效果
    margin: 20px;

    .detail-title {
        font-size: 24px;
        color: #376797; // 深蓝色，增加正式感
        margin-bottom: 10px;
    }

    .detail-content {
        font-size: 16px;
        color: #333; // 深灰色，提高可读性
        line-height: 1.5;
        text-align: justify; // 两端对齐文本
    }
}
</style>