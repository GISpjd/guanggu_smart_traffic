<template>
    <div class="login_btn">
        <button class="sign_in" @click="handleLogin">登录</button>
        <button class="sign_up" @click="hangdleRegister">注册</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const handleLogin = () => {
    router.push({ path: 'login' })
}

const hangdleRegister = () => {
    router.push({ path: 'register' })
}
</script>

<style></style>