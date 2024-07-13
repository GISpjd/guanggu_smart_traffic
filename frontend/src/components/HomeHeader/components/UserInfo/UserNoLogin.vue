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
    router.push({ path: '/login' })
}

const hangdleRegister = () => {
    router.push({ path: '/register' })
}

</script>

<style scoped>
.login_btn {
    display: flex;
    width: 160px;
}

.sign_in {
    width: 50%;
    background-color: #ffc107;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
}

.sign_up {
    width: 50%;
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
}
</style>