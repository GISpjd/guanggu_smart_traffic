<template>
    <li>
        <el-dropdown>
            <el-button type="primary">
                发布公告<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="commonDialogVisible = true">普通公告</el-dropdown-item>
                    <el-dropdown-item @click="drawBuild">施工公告</el-dropdown-item>
                    <el-dropdown-item>公告管理</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </li>
    <el-dialog title="普通公告" v-model="commonDialogVisible">
        <!-- 这里的v-model只是我除了用provide/inject来传输commonDialogVisible的值所另外准备的方式-->
        <CommonNotice v-model="commonDialogVisible" />
    </el-dialog>
    <el-dialog title="施工公告" v-model="buildDialogVisible">
        <BuildNotice />
    </el-dialog>
</template>

<script setup>
import { ref, provide, reactive, onMounted } from 'vue'
import { createDraw } from '@/Hooks/useDraw';

import CommonNotice from './components/CommonNotice.vue'
import BuildNotice from './components/BuildNotice.vue';

let commonDialogVisible = ref(false)
let buildDialogVisible = ref(true)
provide('commonDialogVisible', commonDialogVisible)

onMounted

const drawBuild = () => {

}

</script>
<style scoped lang="scss">
.el-dialog {
    width: 400px;
    height: 600px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
}
</style>