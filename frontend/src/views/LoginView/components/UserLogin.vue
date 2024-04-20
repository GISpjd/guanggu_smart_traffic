<template>
    <div class="container">
        <el-form :model="form" :rules="rules" ref="formRef" status-icon label-width="auto">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item> </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="userLoginHttp(formRef, form, router)">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { userModules } from '@/stores/userModulesStore'

const router = useRouter()
const { form, formRef, rules, userLoginData, userLoginHttp } = userModules()



onMounted(() => {
    const route = useRoute()
    if (route.query) {
        form.username = route.query.name
    }
})

</script>

<style scoped>
.container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: url('@/assets/images/bgi.jpg');
    font-family: Arial, Helvetica, sans-serif;
}

.el-form {
    width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.el-form-item {
    margin-bottom: 20px;
}

.el-button {
    width: 100%;
}

.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
</style>