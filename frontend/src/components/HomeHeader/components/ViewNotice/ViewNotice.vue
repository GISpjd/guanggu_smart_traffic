<template>
    <li class="view-notice">
        <img src="@/assets/icon/new-notice.svg" alt="">
        <el-button plain @click="handleViewNotice">
            查看公告
        </el-button>
    </li>

    <el-dialog title="最新公告" v-model="whetherShowNotice" modal="false">
        <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="notice_title" label="公告标题" />
            <el-table-column prop="notice_content" label="公告内容" />
            <el-table-column label="操作">
                <el-button class="viewntc" type="primary" round size="small" @click="handleViewMore">
                    查看更多公告
                </el-button>
            </el-table-column>>
        </el-table>
    </el-dialog>

    <el-dialog title="公告详情" v-model="whetherShowNoticeMore">
        <el-table :data="tableData2" style="width: 100%" v-model="whetherShowNoticeMore">
            <el-table-column prop="notice_title" label="公告标题" />
            <el-table-column prop="publish_time" label="发布时间" />
            <el-table-column prop="handle" label="操作" width="100">
                <template v-slot="hhh">
                    <el-button type="primary" round size="small" @click="handleViewDetail(hhh.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="_total" />
    </el-dialog>

    <el-dialog title="详情细节" v-model="whetherShowNoticeDetial">
        <el-table :data="tableData3" style="width: 100%">
            <el-table-column prop="notice_title" label="公告标题" />
            <el-table-column prop="notice_content" label="公告内容" />
        </el-table>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { getNoticeList, getNoticeById } from '@/request/noticeHttp'


let whetherShowNotice = ref(false)
let whetherShowNoticeMore = ref(false)
let whetherShowNoticeDetial = ref(false)
let tableData1 = ref([])
let tableData2 = ref([])
let tableData3 = ref([])
let currentPage = ref(1)
let pageSize = ref(10)
let _total = ref(0)


// 只让看一条公告
const handleViewNotice = async () => {
    whetherShowNotice.value = true
    let res = await getNoticeList(currentPage.value, pageSize.value)
    // console.log(res);
    let id = res.data[0].id
    let res2 = await getNoticeById(id)
    // console.log(res2);
    tableData1.value = res2.data
}

// 查看更多公告
const handleViewMore = async () => {
    whetherShowNotice.value = false
    whetherShowNoticeMore.value = true
    let res = await getNoticeList(currentPage.value, pageSize.value)
    console.log(res);
    let { data, total } = res
    tableData2.value = data
    _total.value = total[0].total
}

// 查看对应公告详情细节
const handleViewDetail = async (id) => {
    whetherShowNoticeMore.value = false
    whetherShowNoticeDetial.value = true
    let res = await getNoticeById(id)
    console.log(res);
    let { data } = res
    tableData3.value = data
}

const handleSizeChange = (size) => {
    pageSize.value = size
    handleViewMore()
}

const handleCurrentChange = (page) => {
    currentPage.value = page
    handleViewMore()
}
</script>

<style scoped>
.view-notice {
    position: relative;
}

.view-notice img {
    position: absolute;
    left: 40%;
    top: -16px
}
</style>