import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import LayerGroup from 'ol/layer/Group';

const myKey = import.meta.env.VITE_TIANDITU_WT_KEY
const baseURL = `http://t${Math.ceil(Math.random() * 7)}.tianditu.gov.cn`


const tianditu_vec = new TileLayer({
    title: '天地图矢量图层',
    source: new XYZ({
        url: `${baseURL}/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${myKey}`,
        wrapX: false,
        projection: 'EPSG:3857',
        maxZoom: 18,
        minZoom: 1,
        // 给地图设置跨域参数，才能执行跨域
        crossOrigin: 'Anonymous'
    })
})

// 天地图矢量注记
const tianditu_cva = new TileLayer({
    title: '天地图矢量注记',
    source: new XYZ({
        url: `${baseURL}/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${myKey}`,
        wrapX: false,
        projection: 'EPSG:3857',
        maxZoom: 18,
        minZoom: 1,
        // 给地图设置跨域参数，才能执行跨域
        crossOrigin: 'Anonymous'
    })
})

// 天地图影像底图
const tianditu_img = new TileLayer({
    title: '天地图影像底图',
    source: new XYZ({
        url: `${baseURL}/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${myKey}`,
        wrapX: false,
        projection: 'EPSG:3857',
        maxZoom: 18,
        minZoom: 1,
        // 给地图设置跨域参数，才能执行跨域
        crossOrigin: 'Anonymous'
    })
})

// 天地图影像注记
const tianditu_cia = new TileLayer({
    title: '天地图影像注记',
    source: new XYZ({
        url: `${baseURL}/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${myKey}`,
        wrapX: false,
        projection: 'EPSG:3857',
        maxZoom: 18,
        minZoom: 1,
        // 给地图设置跨域参数，才能执行跨域
        crossOrigin: 'Anonymous'
    })
})

// 创建图层组，便于操作
const vecLayerGroup = new LayerGroup({
    layers: [tianditu_vec, tianditu_cva]
})
const imgLayerGroup = new LayerGroup({
    layers: [tianditu_img, tianditu_cia]
})

export { vecLayerGroup, imgLayerGroup }