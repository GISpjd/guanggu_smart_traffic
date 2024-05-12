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
                    <el-dropdown-item @click="manageDialogVisible = true">公告管理</el-dropdown-item>
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
    <el-dialog title="公告管理" v-model="manageDialogVisible">
        <ManagementNotice />
    </el-dialog>
</template>

<script setup>
import { ref, provide, reactive, onMounted } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { createDraw } from '@/Hooks/useDraw';
import { useGlobalMap } from '@/plugins/globalmap';

import CommonNotice from './components/CommonNotice.vue'
import BuildNotice from './components/BuildNotice.vue';
import ManagementNotice from './components/ManagementNotice.vue';

let commonDialogVisible = ref(false)
let buildDialogVisible = ref(false)
let manageDialogVisible = ref(false)
let map = ref()
provide('commonDialogVisible', commonDialogVisible)

onMounted(() => {
    map.value = useGlobalMap()
})

const drawBuild = () => {
    map.value.addLayer()
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