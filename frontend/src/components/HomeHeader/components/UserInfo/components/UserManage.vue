<template>
    <el-dialog v-model="tableShow">
        <el-button type="primary" @click="handleAdd">添加</el-button>
        <el-input class="user-search" v-model="searchUsername" placeholder="请输入要查询的用户名"
            @keyup.enter="handleSearch(searchUsername)"></el-input>
        <div class="demo-pagination-block" v-if="isAdd">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="user_name" label="用户名"></el-table-column>
                <el-table-column prop="user_password" label="用户密码"></el-table-column>
                <el-table-column prop="user_role" label="用户角色" :formatter="formatUserRole"></el-table-column>
                <el-table-column prop="user_islogin" label="用户登录状态" :formatter="formatLoginStatus"></el-table-column>
                <el-table-column prop="user_isdelete" label="用户是否被删除"></el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button type="danger" @click="handleDelete(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :page-count="Math.ceil(total / pageSize)">
            </el-pagination>
        </div>
        <div class="user-edit" v-else>
            <el-form :model="form" :rules="rules" ref="formRef" v-if="form">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitAddForm">添加交管用户</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script setup>
import { userRules } from '@/Hooks/userRules'
import { useUserManageHttp } from './Hooks/useUserManageHttp.js'

const tableShow = ref(true)
const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref()
const isAdd = ref(true)
const searchUsername = ref('')
const form = ref({
    username: '',
    password: ''
})
const formRef = ref(null)
const { usernameRule, passwordRule } = useRules()
// 修改校验
const rules = reactive({
    username: usernameRule,
    password: passwordRule
})

// 获取所有用户分页数据
const fetchData = async () => {
    const res = await getAllUserHttp(currentPage.value, pageSize.value)
    if (res.data.code === 0) {
        tableData.value = res.data.result.data
        total.value = res.data.result.total
    }
}
const formatLoginStatus = (row) => {
    return row.user_islogin === 1 ? '在线' : '不在线'
}
const formatUserRole = (row) => {
    if (row.user_role === 2) {
        return '管理员'
    } else {
        return row.user_role === 0 ? '普通用户' : '交管用户'
    }
}

// 分页器size
const handleSizeChange = (val) => {
    pageSize.value = val
    fetchData()
}

// 分页器page
const handleCurrentChange = (val) => {
    currentPage.value = val
    fetchData()
}

// 添加按钮
const handleAdd = () => {
    isAdd.value = !isAdd
}

//添加交管用户
const submitAddForm = async () => {
    await useUserManageHttp(form, formRef)
    isAdd.value = !isAdd
}

// 查询用户
const handleSearch = async (searchUsername) => {
    if (!searchUsername.value) {
        const res = await getAllUserHttp(currentPage.value, pageSize.value, searchUsername)
        if (res.data.code === 0) {
            tableData.value = res.data.result.data
            total.value = res.data.result.total
        }
    } else {
        alert('输入的内容不能为空')
    }
}

// 删除用户
const handleDelete = async (row) => {
    const res = await deleteUserHttp(row.id)
    if (res.data.code === 0) {
        ElMessage.success('删除成功')
        fetchData()
    } else {
        ElMessage.error('删除失败')
    }
}

// 加载用户数据
onMounted(() => {
    fetchData()
})
</script>

<style lang="less" scoped>
.el-dialog {
    max-width: 800px;

    .el-button {
        margin-right: 20px;
    }

    .el-input {
        width: 300px;
    }

    .el-table {
        width: 100%;
        margin-top: 20px;

        .el-table-column {
            text-align: center;
        }

        .el-table-column--selection {
            width: 55px;
        }

        .el-table__empty-block {
            height: 200px;
            line-height: 200px;
            text-align: center;
        }
    }

    .el-pagination {
        margin-top: 20px;
        text-align: right;
    }

    .user-edit {
        margin-top: 20px;

        .el-form-item {
            margin-bottom: 20px;

            .el-input {
                width: 300px;
            }
        }
    }
}
</style>