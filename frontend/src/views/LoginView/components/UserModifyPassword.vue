<template>
    <div class="container">
        <el-form :model="userLoginData" :rules="rules" ref="formRef">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userLoginData.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="userLoginData.user_password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="userLoginData.user_password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="userModifyPassword(userLoginData, formRef, router)">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { userModules } from '@/stores/userModulesStore'

const { rules, formRef, userLoginData, userModifyPassword } = userModules()
</script>

<style scoped></style>