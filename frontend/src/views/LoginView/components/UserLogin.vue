<template>
    <div>
        <el-form :model="form" :rules="rules" ref="formRef">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item> </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="useLoginHttp(formRef, form, router)">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

</script>

<style scoped></style>