import { Query } from "@/Hooks/useQuery";

export const useRealTimeTraffic = (map, flag) => {
    if (!flag) {
        // console.log(map.getLayers().item(2));
        map.removeLayer(map.getLayers().item(2))
    }

    var lines = []
    if (flag) {
        var service = {
            name: 'guanggu',
            layerId: 1
        }
        Query.queryByLayer({
            service: service,
            callback: (res) => {
                let coordinates = []
                let roadId = []
                let roadInfo = []
                res.forEach(item => {
                    roadInfo.push(item.values_.values_.车流量)
                    roadId.push(item.getId())
                    const a = item.getGeometry().flatCoordinates
                    const b = []
                    for (let i = 0; i < a.length; i += 2) {
                        b.push([a[i], a[i + 1]])
                    }
                    coordinates.push(b)
                })

                for (let i = 0; i < res.length; i++) {
                    let flow = roadInfo[i]
                    let line = new ol.Feature({
                        geometry: new ol.geom.LineString(coordinates[i])
                    })
                    let color
                    if (flow < 1000) {
                        color = 'rgb(34,139,34)'
                    } else if (flow >= 1000 && flow <= 1500) {
                        color = 'rgb(255,127,36)'
                    } else if (flow >= 1500) {
                        color = 'rgb(178,34,33)'
                    }
                    const style = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: color,
                            width: 6
                        })
                    })
                    line.setStyle(style)
                    lines.push(line)
                }
                let flowsource = null
                if (flowsource == null) {
                    flowsource = new ol.source.Vector({
                        wrapX: false
                    })
                    //创建一个图层
                    var flowlayer = new ol.layer.Vector({
                        source: flowsource,
                        zIndex: 10
                    })
                    //将绘制层添加到地图容器中
                    map.addLayer(flowlayer)
                } else {
                    flowsource.clear()
                }
                flowsource.addFeatures(lines)
            }
        })
    }
}