<template>
    <div class="chartsContainer">
        <div class="header">
            <el-button @click="changeButton">{{ isTypeButton ? '事件类型图表' : '路段事故图表' }}</el-button>
            <div class="chart-name">{{ isTypeButton ? '路段事故图表' : '事件类型图表' }}</div>
            <div class="close" @click="closeCharts">x</div>
        </div>

        <div class="charts" ref="typeCharts" v-if="isTypeChart">
            <div id="chart-left"></div>
            <div id="chart-right"></div>
        </div>
        <div class="charts" ref="roadCharts" v-else>
            <div id="chart-left"></div>
            <div id="chart-right"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
// 控制组件的显示和隐藏，双向数据流
let isChartShow = defineModel()
// 控制button内容的切换和图表内容的切换
let isTypeButton = ref(true)
// 控制显示不同的图表内容
let isTypeChart = ref(true)
// 便于操作dom
let typeCharts = ref(null)
let roadCharts = ref(null)


// 控制button内容的切换和图表内容的切换逻辑
const changeButton = () => {
    isTypeButton.value = !isTypeButton.value
    isTypeChart.value = !isTypeChart.value
}

const closeCharts = () => {
    isChartShow.value = false
}
</script>


<style scoped lang="scss">
.chartsContainer {
    position: fixed;
    top: 20%;
    left: 10%;
    width: 60%;
    height: 60%;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 20px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        width: 100%;
        margin-bottom: 20px;

        .el-button {
            z-index: 1;
        }

        .chart-name {
            font-size: 16px;
            font-weight: bold;
            flex-grow: 1;
            text-align: center;
            color: #f56c6c;
        }

        .close {
            width: 20px;
            height: 20px;
            font-size: 20px;
            text-align: center;
            cursor: pointer;
            z-index: 1;
            border: 1px solid #ccc;
            border-radius: 5px;

            &:hover {
                background-color: #fff;
                color: red;
            }
        }
    }

    .charts {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: calc(100% - 60px); // 60px 包含了 header 的高度和间距

        #chart-left,
        #chart-right {
            width: 48%;
            height: 100%;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            background-color: #fafafa;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
