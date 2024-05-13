<template>
    <li>
        <el-dropdown>
            <el-button type="primary">
                事件管理<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="isAdd = !isAdd">事件添加</el-dropdown-item>
                    <el-dropdown-item @click="isAudit = !isAudit">事件审核</el-dropdown-item>
                    <el-dropdown-item @click="isUpdate = !isUpdate">事件更新</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </li>
    <AddTrafficEvent v-model="isAdd" />
    <UpdateTrafficEvent v-if="isUpdate" :visible="isUpdate" />
</template>

<script setup>
import axios from 'axios';
import { ArrowDown } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue';

import AddTrafficEvent from './components/AddTrafficEvent.vue';
import UpdateTrafficEvent from './components/UpdateTrafficEvent.vue';

let isAdd = ref(false);
let isAudit = ref(false);
let isUpdate = ref(false);





</script>

<style scoped></style>