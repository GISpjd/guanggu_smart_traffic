<template>
    <li>
        <el-dropdown>
            <el-button type="primary">
                事件管理<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>事件添加</el-dropdown-item>
                    <el-dropdown-item @click="showUpdateTrafficEventHandler">事件更新</el-dropdown-item>
                    <el-dropdown-item></el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </li>
    <UpdateTrafficEvent v-if="showUpdateTrafficEvent" :visible="showUpdateTrafficEvent" />
</template>

<script setup>
import axios from 'axios';
import { ArrowDown } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue';

import UpdateTrafficEvent from './components/UpdateTrafficEvent.vue';

let showUpdateTrafficEvent = ref(false);
const showUpdateTrafficEventHandler = () => {
    showUpdateTrafficEvent.value = true;
    console.log(showUpdateTrafficEvent.value);
}
onMounted(async () => {
    await axios.get('http://localhost:8080/geoserver/wfs', {
        params: {
            service: 'WFS',
            version: '2.0.0',
            request: 'GetFeature',
            typeName: 'gis:event',
        }
    }).then(response => {
        const xmlString = response.data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "application/xml");

        // 获取所有的事件元素
        const events = xmlDoc.getElementsByTagName("gis:event");
        const eventArray = [];

        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const eventObj = {
                name: event.getElementsByTagName("gml:name")[0].textContent,
                id: event.getElementsByTagName("gis:i_d")[0].textContent,
                level: event.getElementsByTagName("gis:level")[0].textContent,
                carNum: event.getElementsByTagName("gis:car_num")[0].textContent,
                driver: event.getElementsByTagName("gis:driver")[0].textContent,
                phone: event.getElementsByTagName("gis:phone")[0].textContent,
                eventNum: event.getElementsByTagName("gis:event_num")[0].textContent,
                area: event.getElementsByTagName("gis:area")[0].textContent,
                position: {
                    x: event.getElementsByTagName("gml:pos")[0].textContent.split(" ")[0],
                    y: event.getElementsByTagName("gml:pos")[0].textContent.split(" ")[1]
                }
            };
            eventArray.push(eventObj);
        }

        // 处理完的对象数组
        console.log(eventArray);
        return eventArray; // 可以选择返回这个数组，以便进一步处理或显示
    }).catch(error => {
        console.error('Error during the request or XML parsing:', error);
    });
});



</script>

<style scoped></style>