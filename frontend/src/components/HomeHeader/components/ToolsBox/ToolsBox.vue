<template>
    <li>
        <el-dropdown split-button type="primary">
            工具箱
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>清除绘制</el-dropdown-item>
                    <el-dropdown-item @click="measureLength">测量距离</el-dropdown-item>
                    <el-dropdown-item @click="measureArea">测量面积</el-dropdown-item>
                    <el-dropdown-item @click="measureLengthByGis">测地学测距离</el-dropdown-item>
                    <el-dropdown-item @click="measureAreaByGis">测地学测面积</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </li>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTools } from "./Hooks/useTools";
import { useGlobalMap } from "@/plugins/globalmap";


let map = ref(null);

onMounted(() => {
    map.value = useGlobalMap();
})

function measureLength() {
    useTools(map.value, 'line', false)
}

function measureArea() {
    useTools(map.value, 'polygon', false)
}

function measureLengthByGis() {
    useTools(map.value, 'line', true)
}

function measureAreaByGis() {
    useTools(map.value, 'polygon', true)
}
</script>

<style scoped>
.tooltip {
    position: relative !important;
    background: rgba(0, 0, 0, 0.5) !important;
    border-radius: 4px !important;
    color: white !important;
    padding: 4px 8px !important;
    opacity: 0.7 !important;
    white-space: nowrap !important;
}

.tooltip-measure {
    opacity: 1;
    font-weight: bold;
}

.tooltip-static {
    background-color: #ffcc33 !important;
    color: black !important;
    border: 1px solid white;
}


.tooltip-measure::before,
.tooltip-static::before {
    border-top: 6px solid rgba(0, 0, 0, 0.5);
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    content: "";
    position: absolute;
    bottom: -6px;
    margin-left: -7px;
    left: 50%;
    /* opacity: 1; */
}

.tooltip-static::before {
    border-top-color: #ffcc33;
}
</style>