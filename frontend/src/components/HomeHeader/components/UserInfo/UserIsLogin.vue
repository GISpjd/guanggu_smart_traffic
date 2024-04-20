<template>
    <div class="user_info">
        <span class="user_name">{{ userLoginData.user_name }}</span>
        <br />
        <div class="dropdown">
            <img src="../../../../assets/icon/arrowDown.svg" alt="" />
            <div class="dropdown-content">
                <span @click="handelOutUsername(userId)">退出登录</span><br />
                <span @click="handlePutPassword(userName)">修改密码</span><br />
                <span v-if="isAdmin" @click="handleManageuser">管理用户</span>
            </div>
        </div>
        <UserManage v-if="isManager" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userModules } from '@/stores/userModulesStore'

import UserManage from './components/UserManage.vue'

const router = useRouter()
// 获取登录者的信息
const { userLoginData } = userModules()

const userName = ref('')
const userId = ref(null)
const userRole = ref(null)
const isAdmin = ref(false)
const emit = defineEmits(['out'])
const isManager = ref(false)

onMounted(() => {
    const { user_name, user_role, id } = userLoginData.value
    userName.value = user_name
    userId.value = id
    userRole.value = user_role
    if (user_role === 2) {
        isAdmin.value = true
    }
})

// 退出登录
const handelOutUsername = (userId) => {
    emit('out', userId)
    location.reload()
}

//修改密码
const handlePutPassword = (name) => {
    router.push({
        path: 'login',
        query: { username: name }
    })
}

const handleManageuser = () => {
    isManager.value = !isManager
}
</script>

<style scoped>
.user_info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
}

.user_name {
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown img {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    cursor: pointer;
}

.dropdown-content {
    display: none;
    text-align: center;
    position: absolute;
    z-index: 1;
    background: rgba(255, 255, 255, 0.3);
    min-width: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 10px;
    padding-top: 20px;
    right: 0px;
}

.dropdown-content span {
    display: block;
    cursor: pointer;
    margin-bottom: 5px;
}

.dropdown:hover .dropdown-content {
    display: block;
    cursor: pointer;
}

.user_info:hover .dropdown-content {
    transition: transform 0.7s ease-in-out;
    display: block;
    cursor: pointer;
}

.user_info:hover img {
    transform: rotate(90deg);
    transition: transform 0.7s ease-in-out;
}
</style>