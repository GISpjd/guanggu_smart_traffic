<template>
    <li class="add_event">
        <img src="../assets/icon/add.svg" alt="" />
        <!-- <a href="#" @click="hansleAddEvent()">我要上报</a> -->
        <!-- <span @click="hansleAddEvent()">我要上报</span> -->
        <el-button plain @click="dialogFormVisible = true">
            我要上报
        </el-button>
        <el-dialog v-model="dialogFormVisible" title="上报事件" width="600">
            <el-form :model="form">
                <el-form-item label="事件类型:" :label-width="formLabelWidth">
                    <el-select v-model="form.event_type" placeholder="请选择事件类型">
                        <el-option v-for="i in typeOptions" :key="i.event_type" :label="i.label"
                            :value="i.event_type" />
                    </el-select>
                </el-form-item>

                <el-form-item label="事件描述:" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入事件描述" />
                </el-form-item>

                <el-form-item label="事件路段:" :label-width="formLabelWidth">
                    <el-select v-model="form.road_section_id" placeholder="请选择事发路段">
                        <el-option v-for="i in roadOptions" :key="i.road_section_id" :label="i.label"
                            :value="i.road_section_id" />
                    </el-select>
                </el-form-item>

                <el-form-item label="驾驶人姓名:" :label-width="formLabelWidth">
                    <el-input v-model="form.event_driver" autocomplete="off" placeholder="请输入驾驶人姓名" />
                </el-form-item>

                <el-form-item label="相关车辆车牌号:" :label-width="formLabelWidth">
                    <el-input v-model="form.event_car_number" autocomplete="off" placeholder="请输入相应车牌号" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </li>
</template>

<script setup>
import { ref, reactive } from 'vue';
let dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    event_type: '',
    event_describe: '',
    road_section_id: '',
    event_driver: '',
    event_car_number: ''
})

const typeOptions = [
    {
        event_type: '碰撞',
        label: '碰撞'
    },
    {
        event_type: '刮擦',
        label: '刮擦'
    },
    {
        event_type: '失火',
        label: '失火'
    },
    {
        event_type: '翻车',
        label: '翻车'
    },
    {
        event_type: '碾压',
        label: '碾压'
    },
    {
        event_type: '其他',
        label: '其他'
    }
]

const roadOptions = [
    {
        road_section_id: 'DL01',
        label: '民族大道'
    },
    {
        road_section_id: 'DL02',
        label: '关山大道'
    },
    {
        road_section_id: 'DL03',
        label: '光谷大道'
    },
    {
        road_section_id: 'DL04',
        label: '雄楚大道'
    },
    {
        road_section_id: 'DL05',
        label: '光谷广场环路'
    },
    {
        road_section_id: 'DL06',
        label: '珞雄路'
    },
    {
        road_section_id: 'DL07',
        label: '虎泉街'
    },
    {
        road_section_id: 'DL08',
        label: '珞喻路'
    },
    {
        road_section_id: 'DL09',
        label: '南湖大道'
    },
    {
        road_section_id: 'DL10',
        label: '南三环'
    },
    {
        road_section_id: 'DL11',
        label: '珞狮路'
    }
]

</script>

<style>
.add_event {
    display: flex;
    margin-top: 14px;
}

/* .add_event img {
    margin-right: 10px;
    text-align: center;
} */

.add_event span {
    font-size: 16px;
    color: #333;
}

.add_event span:hover {
    cursor: pointer;
}
</style>