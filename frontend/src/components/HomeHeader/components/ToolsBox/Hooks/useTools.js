var source = new ol.source.Vector() //创建一个矢量数据源用于绘制结果的显示
var vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 0.5)',
            lineDash: [10, 10],
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 5,
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.7)'
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            })
        })
    })
})

let draw

/**
 * 封装测量工具函数
 * @param {ol.Map} map 地图对象
 * @param {string} shape 测量类型，可选值为'area'或'line'
 * @param {boolean} geodesic 是否使用测地学方法测量
 */
export function useTools(map, shape, geodesic) {
    map.addLayer(vector)

    map.getInteractions().clear() // 清空地图所有交互内容

    // 当前绘制的要素
    var sketch

    var helpTooltipElement
    var helpTooltip
    var measureTooltipElement
    var measureTooltip
    var continuePolygonMsg = '单击继续绘制多边形'
    var continueLineMsg = '单击继续绘制线条'

    /**
     * 测量长度输出
     * @param {ol.geom.LineString} line
     * @return {string}
     */
    var formatLength = function (line) {
        var length
        var sphere = new ol.Sphere()
        if (geodesic) {
            var sourceProj = map.getView().getProjection()
            length = sphere.getLength(line, { projection: sourceProj, radius: 6378137 })
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
    /**
     * 测量面积输出
     * @param {ol.geom.Polygon} polygon
     * @return {string}
     */
    var formatArea = function (polygon) {
        var area
        var sphere = new ol.Sphere()
        if (geodesic) {
            var sourceProj = map.getView().getProjection() //地图数据源投影坐标系
            var geom = polygon.clone().transform(sourceProj, 'EPSG:4326') //将多边形要素坐标系投影为EPSG:4326
            area = Math.abs(sphere.getArea(geom, { projection: sourceProj, radius: 6378137 })) //获取面积
        } else {
            area = polygon.getArea()
        }
        var output
        if (area > 10000) {
            output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>'
        } else {
            output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>'
        }
        return output
    }

    function createHelpTooltip() {
        if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement)
        }
        helpTooltipElement = document.createElement('div')
        helpTooltipElement.className = 'tooltip hidden'
        helpTooltip = new ol.Overlay({
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
        measureTooltip = new ol.Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        })
        map.addOverlay(measureTooltip)
    }

    var pointerMoveHandler = function (evt) {
        if (evt.dragging) {
            return
        }
        var helpMsg = '点击开始绘制'
        // 判断当前绘制的要素
        if (sketch) {
            var geom = sketch.getGeometry()
            // 判断sketch对象的几何类型是否为多边形/直线
            if (geom instanceof ol.geom.Polygon) {
                helpMsg = continuePolygonMsg
            } else if (geom instanceof ol.geom.LineString) {
                helpMsg = continueLineMsg
            }
        }
        helpTooltipElement.innerHTML = helpMsg
        helpTooltip.setPosition(evt.coordinate)
        helpTooltipElement.classList.remove('hidden')
    }
    map.on('pointermove', pointerMoveHandler)

    // 鼠标移出地图视口时隐藏帮助提示框，解决鼠标移出地图后提示框仍然显示的问题
    map.getViewport().addEventListener('mouseout', function () {
        helpTooltipElement.classList.add('hidden')
    })

    function addInteraction() {
        var type = shape === 'area' ? 'Polygon' : 'LineString'
        draw = new ol.interaction.Draw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ (type),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        })
        map.addInteraction(draw)

        createMeasureTooltip()
        createHelpTooltip()

        var listener
        draw.on(
            'drawstart',
            function (evt) {
                sketch = evt.feature
                var tooltipCoord = evt.coordinate
                listener = sketch.getGeometry().on('change', function (evt) {
                    var geom = evt.target
                    var output
                    if (geom instanceof ol.geom.Polygon) {
                        output = formatArea(/** @type {ol.geom.Polygon} */(geom))
                        // 获取绘制的多边形的中心点坐标
                        tooltipCoord = geom.getInteriorPoint().getCoordinates()
                    } else if (geom instanceof ol.geom.LineString) {
                        output = formatLength(/** @type {ol.geom.LineString} */(geom))
                        tooltipCoord = geom.getLastCoordinate()
                    }
                    measureTooltipElement.innerHTML = output
                    measureTooltip.setPosition(tooltipCoord)
                })
            },
            this
        )
        draw.on('drawend', function (evt) {
            measureTooltipElement.className = 'tooltip tooltip-static';
            // measureTooltip.setOffset([0, -7]);
            // 清空临时几何变量
            sketch = null;
            // 清除现在的，创造新的
            measureTooltipElement = null;
            createMeasureTooltip();
            //移除之前注册的几何变化监听器
            ol.Observable.unByKey(listener);
        })
    }

    addInteraction()
}

/* // 取消测量
export function cancel(map) {
  map.removeLayer(vector)
  // map.getOverlays().clear() // 清空地图上所有的覆盖物
  map.getInteractions().clear() // 清空地图所有交互内容
} */

// 清除绘画
export function clearDraw(map) {
    let timeout = null
    if (timeout) {
        //如果存在定时器就清空
        clearTimeout(timeout)
    }
    timeout = setTimeout(function () {
        source.clear()
        map.removeInteraction(draw)
        map.removeLayer(vector)
        map.getOverlays().clear() // 清空地图上所有的覆盖物
        // map.getInteractions().clear() // 清空地图所有交互内容
        // location.reload()
    }, 500)
}
