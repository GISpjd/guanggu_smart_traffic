<template>
    <el-dialog v-model="isAdd" title="添加交通事件">
        <el-form :model="form" ref="formRef">
            <el-form-item label="事件编号" prop="eventId">
                <el-input v-model="form.eventId"></el-input>
            </el-form-item>
            <el-form-item label="驾驶员" prop="eventDriver">
                <el-input v-model="form.eventDriver"></el-input>
            </el-form-item>
            <el-form-item label="事件类型" prop="eventType">
                <el-select v-model="form.eventType" placeholder="请选择事件类型">
                    <el-option label="碰撞" value="碰撞" />
                    <el-option label="刮擦" value="刮擦" />
                    <el-option label="失火" value="失火" />
                    <el-option label="其他" value="其他" />
                </el-select>
            </el-form-item>
            <el-form-item label="事件等级" prop="eventLevel">
                <el-select v-model="form.eventLevel" placeholder="请选择事件等级">
                    <el-option label="轻微事故" value="4" />
                    <el-option label="一般事故" value="3" />
                    <el-option label="重大事故" value="2" />
                    <el-option label="特大事故" value="1" />
                </el-select>
            </el-form-item>
            <el-form-item label="发生时间" prop="eventTime">
                <el-date-picker v-model="form.eventTime" type="datetime" placeholder="请选择发生时间"
                    format="YYYY/MM/DD HH:mm"></el-date-picker>
            </el-form-item>
            <el-form-item label="发生地点" prop="eventLocation">
                <el-input v-model="form.eventLocation"></el-input>
            </el-form-item>
            <el-form-item label="车牌号" prop="plateNumber">
                <el-input v-model="form.plateNumber"></el-input>
            </el-form-item>
            <el-form-item label="处理状态" prop="eventStatus">
                <el-select v-model="form.eventStatus" placeholder="请选择处理状态">
                    <el-option label="未处理" value="0" />
                    <el-option label="处理中" value="1" />
                    <el-option label="已处理" value="2" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formRef')">继续</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useGlobalMap } from '@/plugins/globalmap'
import { createDraw } from '@/utils/createDraw'
import { Point } from '@/utils/es6AddPoint'

let isAdd = defineModel()
let map = ref(null)

const form = reactive({
    eventId: 'SJ2023',
    eventDriver: '',
    eventType: '',
    eventLevel: null,
    eventTime: '',
    eventLocation: '',
    plateNumber: '',
    eventStatus: null
})

onMounted(() => {
    map.value = useGlobalMap()
})

let docLayer, position, service, attr, status
let draw = []
const addPoint = () => {
    docLayer = map.value.getLayer().item(1)
    console.log(docLayer);
}

</script>
<style scoped lang="scss"></style>