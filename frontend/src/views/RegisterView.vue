<template>
    <div class="container">
        <el-form :model="form" :rules="rules" ref="formRef" status-icon label-width="auto">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="form.confirmPassword"></el-input>
            </el-form-item>
            <el-form-item class="button">
                <el-button type="primary" @click="userRegisterHttp(formRef, form, router)">注册</el-button>
                <el-button type="warning" @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { userModules } from '@/stores/userModulesStore'

const router = useRouter()
const { form, formRef, rules, userRegisterdata, userRegisterHttp } = userModules()

//重置操作
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
    width: 48%;
}
</style>