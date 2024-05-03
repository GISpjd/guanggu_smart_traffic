
/**
 * 加载高德矢量底图
 */
var gaodeVector = new ol.layer.Tile({
    title: '高德地图矢量图层',
    source: new ol.source.XYZ({
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        wrapX: false,
        /* 给地图设置跨域参数,才能执行下载 */
        crossOrigin: 'Anonymous'
    })
})

var gaode_yingxiang = new ol.layer.Tile({
    title: '高德地图卫星影像',
    source: new ol.source.XYZ({
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}',
        wrapX: false,
        /* 给地图设置跨域参数,才能执行下载 */
        crossOrigin: 'Anonymous'
    })
})

const gaodeLayerGroup = new LayerGroup({
    layers: [gaodeVector, gaode_yingxiang]
})

export { gaodeLayerGroup }