import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { getArea, getLength } from 'ol/sphere.js';
import { Overlay } from "ol";
import { Polygon, LineString } from "ol/geom";
import Draw from "ol/interaction/Draw";
import { unByKey } from "ol/Observable";

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

var draw, output;

export function useTools(map, shape, geodesic) {
    map.addLayer(vectorLayer);
    map.getInteractions().clear()
    // 当前绘制的要素
    var sketch

    var helpTooltipElement
    var helpTooltip
    var measureTooltipElement
    var measureTooltip
    var continuePolygonMsg = '单击继续绘制多边形'
    var continueLineMsg = '单击继续绘制线条'

    var measureLength = function (line) {
        var length
        if (geodesic) {
            var sourceProj = map.getView().getProjection()
            console.log(sourceProj)
            length = getLength(line, { projection: sourceProj, radius: 6378137 })
        } else {
            length = Math.round(line.getLength() * 100) / 100
        }
        var output
        if (length > 100) {
            output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km'
        } else {
            output = Math.round(length * 100) / 100 + ' ' + 'm'
        }
        return output
    }
    var measureArea = (polygon) => {
        let area
        if (geodesic) {
            var sourceProj = map.getView().getProjection()
            area = getArea(polygon, {
                projection: sourceProj,
                radius: 6378137
            })
        } else {
            area = getArea(polygon)
        }
        if (area > 10000) {
            output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km²'
        } else {
            output = Math.round(area * 100) / 100 + ' ' + 'm²'
        }
        return output
    }

    function createHelpTooltip() {
        if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement)
        }
        helpTooltipElement = document.createElement('div')
        helpTooltipElement.className = 'tooltip hidden'
        helpTooltip = new Overlay({
            element: helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        })
        map.addOverlay(helpTooltip)
    }

    function createMeasureTooltip() {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement)
        }
        measureTooltipElement = document.createElement('div')
        measureTooltipElement.className = 'tooltip tooltip-measure'
        measureTooltip = new Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        })
        map.addOverlay(measureTooltip)
    }

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

    map.on('pointermove', pointerMoveHandler)
    // 鼠标移出地图视口时隐藏帮助提示框，解决鼠标移出地图后提示框仍然显示的问题
    map.getViewport().addEventListener('mouseout', function () {
        helpTooltipElement.classList.add('hidden')
    })

    let type = shape === 'line' ? 'LineString' : 'Polygon'
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

    map.addInteraction(draw);
    createMeasureTooltip()
    createHelpTooltip()

    var listener

    draw.on('drawstart', function (e) {
        sketch = e.feature
        var tooltipCoord = e.coordinate
        listener = sketch.getGeometry().on('change', function (e) {
            var geom = e.target
            // console.log(geom.getType());
            if (geom instanceof Polygon) {
                output = measureArea(geom)
                tooltipCoord = geom.getInteriorPoint().getCoordinates()

            } else if (geom instanceof LineString) {
                output = measureLength(geom)
                tooltipCoord = geom.getLastCoordinate()
            }
            measureTooltipElement.innerHTML = output
            measureTooltip.setPosition(tooltipCoord)
        })
    })

    draw.on('drawend', function () {
        measureTooltipElement.className = 'tooltip tooltip-static';
        // measureTooltip.setOffset([0, -7]);
        // 清空临时几何变量
        sketch = null;
        // 清除现在的，创造新的
        measureTooltipElement = null;
        createMeasureTooltip();
        //移除之前注册的几何变化监听器
        unByKey(listener);
    });
}


export function clearDraw(map) {
    map.getOverlays().clear()
    source.clear()
    if (draw) {
        map.removeInteraction(draw)
        draw = null
    }
    if (vectorLayer) {
        map.removeLayer(vectorLayer)
        vectorLayer = null
    }
    // if (helpTooltipElement) {
    //     helpTooltipElement.parentNode.removeChild(helpTooltipElement)
    //     helpTooltipElement = null
    // }
    // if (measureTooltipElement) {
    //     measureTooltipElement.parentNode.removeChild(measureTooltipElement)
    //     measureTooltipElement = null
    // }
}