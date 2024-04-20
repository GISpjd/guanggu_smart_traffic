<template>
    <nav class="navbar">
        <div class="navbar_left">
            <img src="../../assets/icon/logo.svg" alt="" />
            <a href="#" class="title" @click="handleRoam()">光谷智慧交通</a>
        </div>
        <div class="navbar_center">
            <ul class="items">
                <AddEvent />
                <RealTimeTraffic />
                <SearchEvent />
                <MyEvent />

            </ul>
        </div>
        <div class="navbar_right">
            <UserIsLogin v-if="isLogin" @out="handleOutLogin" />
            <UserNoLogin v-else />
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { putUserHttp } from '@/request/userHttp'
import { userModules } from '@/stores/userModulesStore'

import AddEvent from '../AddEvent.vue';
import RealTimeTraffic from './components/RealTimeTraffic/RealTimeTraffic.vue';
import SearchEvent from './components/SearchEvent/SearchEvent.vue';
import MyEvent from './components/MyEvent/MyEvent.vue';
import UserNoLogin from './components/UserInfo/UserNoLogin.vue';
import UserIsLogin from './components/UserInfo/UserIsLogin.vue';

const isLogin = ref(false)
const { userLoginData } = userModules()


const handleOutLogin = (userId) => {
    const userLoginData = []
    localStorage.setItem('userLoginData', JSON.stringify(userLoginData))
    putUserHttp({ id: userId, user_islogin: 0 })
    isLogin.value = false
}
</script>

<style>
.navbar {
    position: absolute;
    top: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.7) 70%, rgba(255, 255, 255, 1) 100%);
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    padding: 0 10px;
}

.navbar_left {
    width: 180px;
    min-width: 180px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.navbar_left img {
    width: 30px;
    height: 30px;
    margin-right: 8px;
}

.title {
    font-family: Arial, sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    text-decoration: none;
    text-shadow: 1px 1px 1px #ccc;
    transition: all 0.3s ease;
}

.title:hover {
    color: #666;
    text-shadow: 2px 2px 2px #ccc;
}


.items {
    display: flex;
    align-items: flex-end;
    gap: 10px;
}
</style>