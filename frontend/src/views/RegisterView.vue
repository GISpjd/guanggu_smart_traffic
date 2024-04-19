<template>
    <div class="container">
        <el-form :model="form" :rules="rules" ref="formRef" status-icon>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="form.confirmPassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="userRegisterHttp(formRef, form, router)">注册</el-button>
                <el-button type="warning" @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { userRules } from '@/Hooks/userRules';
import { postOrdinaryUserHttp } from '../request/userHttp'

const router = useRouter()
const { usernameRule, passwordRule } = userRules()

const form = reactive({
    username: '',
    password: '',
    confirmPassword: ''
})
const formRef = ref(null)

const rules = reactive({
    username: usernameRule,
    password: passwordRule,
    confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value !== form.password) {
                    callback(new Error('两次输入密码不一致'))
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ]
})

// 实现注册业务
const userRegisterHttp = (formRef, form, router) => {
    formRef.validate((valid) => {
        if (valid) {
            postOrdinaryUserHttp(form.username, form.password).then((response) => {
                const { code } = response.data
                if (code === 0) {
                    ElMessage({
                        message: '注册成功.',
                        type: 'success'
                    })
                    userRegisterdata.value = { username: form.username, passworad: form.password }
                    router.push(`/login?name=${form.username}`)
                }
                if (code === 1) {
                    ElMessage.error('用户名已存在')
                }
            })
        }
    })
}

const resetForm = (formRef) => {
    if (!formRef) return
    formRef.resetFields()
}

</script>

<style scoped>
.container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: url('../assets/images/bgi.jpg');
    font-family: Arial, Helvetica, sans-serif;
}

.el-form {
    width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* .el-form-item {
    margin-bottom: 20px;
} */


.el-button {
    width: 45%;
}
</style>