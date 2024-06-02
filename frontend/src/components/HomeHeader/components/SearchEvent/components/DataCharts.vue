<template>
    <div class="chartsContainer">
        <div class="header">
            <el-button @click="changeButton">{{ isTypeButton ? '事件类型图表' : '路段事故图表' }}</el-button>
            <div class="chart-name">{{ isTypeButton ? '路段事故图表' : '事件类型图表' }}</div>
            <div class="close" @click="closeCharts">x</div>
        </div>

        <div class="charts" ref="typeCharts" v-if="isTypeChart">
            <div id="chart-left" ref="typeLeft"></div>
            <div id="chart-right" ref="typeRight"></div>
        </div>
        <div class="charts" ref="roadCharts" v-else>
            <div id="chart-left" ref="roadLeft"></div>
            <div id="chart-right" ref="roadRight"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { Query } from '@/Hooks/useQuery';
import * as echarts from 'echarts'

// 控制组件的显示和隐藏，双向数据流
let isChartShow = defineModel()
// 控制button内容的切换和图表内容的切换
let isTypeButton = ref(true)
// 控制显示不同的图表内容
let isTypeChart = ref(true)
// 便于操作dom
let typeCharts = ref(null)
let roadCharts = ref(null)
let typeLeft = ref(null)
let typeRight = ref(null)
let roadLeft = ref(null)
let roadRight = ref(null)

// 控制button内容的切换和图表内容的切换逻辑
const changeButton = () => {
    isTypeButton.value = !isTypeButton.value
    isTypeChart.value = !isTypeChart.value
}

const closeCharts = () => {
    // 关闭图表组件
    isChartShow.value = false
}

// 监听isTypeChart的变化，控制图表组件的显示和隐藏
watch(
    () => isTypeChart.value,
    () => {
        queryEventData()
    },
    { immediate: true }
)

function queryEventData() {
    let service = {
        name: 'guanggu',
        layerId: 2
    }

    let data
    Query.queryByLayer({
        service,
        callback: querySuccess
    })

    // 获取事件类型相关数据
    function querySuccess(res) {
        data = res.map(item => item.values_.values_)
        let type = ['碰撞', '刮擦', '失火', '其他']
        let value = []
        type.forEach(item => {
            value.push(data.filter(i => i.事件类型 === item).length)
        })
        let typeArr = []
        typeArr = type.map((item, index) => {
            return {
                name: item,
                value: value[index]
            }
        })
        // console.log(typeArr);
        let roads = new Set()
        data.forEach(item => {
            if (item.发生地点.length < 7) {
                roads.add(item.发生地点)
            }
        })
        // console.log(roads);

        let values = []
        roads.forEach(road => {
            values.push(data.filter(item => item.发生地点 == road).length)
        })

        let roadArr = []
        roadArr = Array.from(roads).map((item, index) => {
            return {
                name: item,
                value: values[index]
            }
        })
        console.log(roadArr);

        nextTick(() => {
            if (isTypeChart.value) {
                let typeLeftChart = echarts.init(typeLeft.value)
                let typeRightChart = echarts.init(typeRight.value)

                typeLeftChart.setOption({
                    title: {
                        text: '路段事故类型分布',
                        subtext: 'Distribution of accident types in road segments',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     left: 'left'
                    // },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: '50%',
                            data: typeArr,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                })

                typeRightChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: typeArr.map(item => item.name),
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'Direct',
                            type: 'bar',
                            barWidth: '60%',
                            data: typeArr.map(item => item.value)
                        }
                    ]
                })
            } else {
                let roadLeftChart = echarts.init(roadLeft.value)
                let roadRightChart = echarts.init(roadRight.value)
                roadLeftChart.setOption({
                    title: {
                        text: '事故路段分布',
                        subtext: 'Distribution of accident sections',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     left: 'left'
                    // },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: '50%',
                            data: roadArr,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                })

                roadRightChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: roadArr.map(item => item.name),
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'Direct',
                            type: 'bar',
                            barWidth: '60%',
                            data: roadArr.map(item => item.value)
                        }
                    ]
                })
            }
        })

    }
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
            width: 46%;
            height: 100%;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            background-color: #fafafa;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
        }
    }
}
</style>
