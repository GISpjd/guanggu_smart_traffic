<template>
    <div class="container">
        <UserLogin v-if="NoLogin" />
        <UserModifyPassword v-else />
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue'
import UserLogin from './components/UserLogin.vue';
import UserModifyPassword from './components/UserModifyPassword.vue'

const NoLogin = ref(true)
const route = useRoute()

onMounted(() => {
    const { username } = route.query
    if (username) {
        NoLogin.value = !NoLogin
    }
})
</script>

<style scoped></style>