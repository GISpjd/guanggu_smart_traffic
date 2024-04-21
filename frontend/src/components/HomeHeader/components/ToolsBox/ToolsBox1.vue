<template>
    <li>
        <select ref="measuretype" class="form-select form-select-sm" @change="handleSelectChange"
            :v-model="measuretype">
            <option value="select" selected>Select Measure option</option>
            <option value="length">Length (LineString)</option>
            <option value="area">Area (Polygon)</option>
            <option value="clear">Clear Measurement</option>
        </select>
    </li>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Style from 'ol/style/Style.js';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import CircleStyle from 'ol/style/Circle.js';
import * as olSphere from 'ol/sphere';
import Draw from 'ol/interaction/Draw.js';
import { Polygon, LineString } from 'ol/geom';
import { Overlay } from 'ol';
import Observable from 'ol/Observable.js';

import { useGlobalMap } from '@/plugins/globalmap';

const measuretype = ref('select')

var draw, output
var sketch, helpTooltipElement, helpTooltip, measureTooltipElement, measureTooltip;
var continuePolygonMsg = 'Click to continue drawing the polygon';
var continueLineMsg = 'Click to continue drawing the line';

let map = ref(null)


// 设置draw结束之后线面的样式
var source = new VectorSource();
var vectorLayer = new VectorLayer({
    source: source,
    style: new Style({
        fill: new Fill({
            color: 'rgba(255,255,255,0.2)'
        }),
        stroke: new Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({
                color: '#ffcc33'
            })
        })
    })
});


onMounted(async () => {
    map.value = await useGlobalMap()
    console.log(map.value);
    map.value.addLayer(vectorLayer);

})


const handleSelectChange = (event) => {
    measuretype.value = event.target.value
    map.value.removeInteraction(draw)
    addInteraction()
}

const measureLength = (line) => {
    let length = olSphere.getLength(line, {
        projection: 'EPSG:4326'
    });

    if (length > 1000) {
        output = (length / 1000).toFixed(2) + 'km'
    } else {
        output = length.toFixed(2) + 'm'
    }
}

const measureArea = (polygon) => {
    let area = olSphere.getArea(polygon, {
        projection: 'EPSG:4326'
    });

    if (area > 1000000) {
        output = (area / 1000000).toFixed(2) + 'km²'
    } else {
        output = area.toFixed(2) + 'm²'
    }
}

const addInteraction = () => {
    if (measuretype.value === 'select' || measuretype.value === 'clear') {
        if (draw) {
            map.value.removeInteraction(draw)
        }
        if (vectorLayer) {
            vectorLayer.getSource().clear()
        }
        if (helpTooltip) {
            map.value.removeOverlay(helpTooltip)
        }

        //清除所有测量结果的标记
        if (measureTooltipElement) {
            var elem = document.getElementsByClassName("tooltip tooltip-static");
            for (var i = elem.length - 1; i >= 0; i--) {

                elem[i].remove();
            }
        }
    } else if (measuretype.value === 'length' || measuretype.value === 'area') {
        let type = measuretype.value === 'length' ? 'LineString' : 'Polygon'
        draw = new Draw({
            source: source,
            type: type,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255,255,255,0.5)'
                }),
                stroke: new Stroke({
                    color: 'rgba(0,0,0,0.5)',
                    width: 2,
                    lineDash: [10, 10]
                }),
            })
        })

        map.value.addInteraction(draw);
        createMeasureTooltip()
        createHelpTooltip()

        let pointerMoveHandler = (e) => {
            if (e.dragging) {
                return;
            }
            let helpMsg = 'click to start drawing'
            if (sketch) {
                let geom = (sketch.getGeometry());
                if (geom instanceof Polygon) {
                    helpMsg = continuePolygonMsg
                } else if (geom instanceof LineString) {
                    helpMsg = continueLineMsg
                }
            }

            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(e.coordinate);
            helpTooltipElement.classList.remove('hidden')
        }

        map.value.on('pointermove', pointerMoveHandler)
        map.value.getViewport().addEventListener('mouseout', function () {
            helpTooltipElement.classList.add('hidden');
        });

        var listener;
        draw.on('drawstart', function (evt) {
            // 临时变量，捕获当前正在绘制的要素
            sketch = evt.feature;
            console.log(evt.target);
            // console.log(sketch.getGeometry() instanceof ol.geom.LineString);

            /** @type {module:ol/coordinate~Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;

            // 监听几何对象是否发生变化，重新计算并显示长度或面积
            listener = sketch.getGeometry().on('change', function (evt) {
                let geom = evt.target;
                // console.log(geom);
                if (geom instanceof Polygon) {

                    output = measureArea(geom);
                    // 获取内部点的坐标
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();

                } else if (geom instanceof LineString) {

                    output = measureLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            });
        });

        draw.on('drawend', function () {
            measureTooltipElement.className = 'tooltip tooltip-static';
            // measureTooltip.setOffset([0, -7]);
            // 清空临时几何变量
            sketch = null;
            // 清除现在的，创造新的
            measureTooltipElement = null;
            createMeasureTooltip();
            //移除之前注册的几何变化监听器
            Observable.unByKey(listener);
        });
    }
}



function createHelpTooltip() {
    if (helpTooltipElement) {
        //删除helpTooltipElement节点
        helpTooltipElement.parentNode.removeChild(helpTooltipElement)
    }
    helpTooltipElement = document.createElement('div')
    helpTooltipElement.className = 'tooltip hidden'
    helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    })
    map.value.addOverlay(helpTooltip)
}

function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';

    measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.value.addOverlay(measureTooltip);
}
</script>

<style scoped>
.form-select {
    display: block;
    width: 100%;
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    -moz-padding-start: calc(0.75rem - 3px);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.form-select-sm {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.2rem;
}

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