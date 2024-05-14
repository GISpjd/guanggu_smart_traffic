<template>
    <el-dialog v-model="eventFormShow" title="添加交通事件" @close="handleClose">
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
                <el-button type="primary" @click="submitForm()">继续</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useGlobalMap } from '@/plugins/globalmap'
import { Point } from '@/utils/es6AddPoint'


let eventFormShow = ref(false)
let map = ref(null)
let isAdd = defineModel()



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
    // console.log(map.value);
    isAdd.value = true
    if (isAdd.value) {
        console.log(isAdd.value);
        addPoint()
    }
})

let docLayer, position, service, attr, status
let draw = []
const addPoint = () => {
    docLayer = map.value.getLayers().item(1)
    console.log(docLayer);
    var source = new ol.source.Vector({})
    var layer = new ol.layer.Vector({
        source
    })
    map.value.addLayer(layer)

    draw = new ol.interaction.Draw({
        source: source,
        type: 'Point'
    })
    map.value.addInteraction(draw)
    draw.on('drawend', (e) => {
        // 关闭这个dialog
        eventFormShow.value = true
        position = e.feature.getGeometry().getCoordinates()
        // console.log(position)
        draw.setActive(false)
        map.value.removeInteraction(draw)
        service = {
            name: 'guanggu',
            layerId: 2
        }
    })

}

const submitForm = () => {
    attr = [
        { type: 'string', key: '事件编号', value: form.eventId },
        { type: 'string', key: '事件类型', value: form.eventType },
        { type: 'smallint', key: '事件等级', value: form.eventLevel },
        { type: 'string', key: '发生时间', value: form.eventTime },
        { type: 'string', key: '发生地点', value: form.eventLocation },
        { type: 'string', key: '车牌号', value: form.plateNumber },
        { type: 'string', key: '驾驶员', value: form.eventDriver },
        { type: 'smallint', key: '处理状态', value: form.eventStatus },
        { type: 'int', key: 'mpLayer', value: 0 }
    ]
    Point.add({
        position,
        service,
        attr,
        docLayer,
        form
    })
    eventFormShow.value = false
    docLayer.refresh()
}

// 关闭dialog之后的逻辑
const handleClose = () => {
    eventFormShow.value = false
    // 通知父组件将isAdd的值设置为false，避免之后的二次点击生效
    isAdd.value = false
}

</script>
<style scoped lang="scss"></style>