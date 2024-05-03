
var zoomToExtent = new ol.control.ZoomToExtent({
  className: 'ol-zoom-extent', // 默认样式类名
  extent: [
    53.5, 3.85,
    135.08, 73.55
  ]
})


var zoomslider = new ol.control.ZoomSlider()

//实例化鼠标位置控件（MousePosition）
var mousePosition = new ol.control.MousePosition({
  //坐标格式
  coordinateFormat: ol.coordinate.createStringXY(4),
  //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
  projection: 'EPSG:4326',
  //坐标信息显示样式类名，默认是'ol-mouse-position'
  className: 'custom-mouse-position',
  //显示鼠标位置信息的目标容器
  target: document.getElementById('mouse-position'),
  //未定义坐标的标记
  undefinedHTML: '&nbsp;'
})

//实例化比例尺控件（ScaleLine）
var scaleLine = new ol.control.ScaleLine({
  //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
  units: 'metric'
})

// 全屏控件
const fullScreen = new ol.control.FullScreen()

// 鹰眼控件
const overviewMap = new ol.control.OverviewMap({
  /* 鹰眼控件样式  */
  className: 'ol-overviewmap ol-custom-overviewmap',
  /* layers: [
    gaode,
    gaode_yingxiang
    // tianditu_shiliang,
    // tianditu_shiliangzhuji,
    // tianditu_yingxiang,
    // tianditu_yingxiangzhuji
  ], */
  /* 鹰眼控件展开时功能按钮上的标识(网页的JS的字符编码) */
  collapseLabel: '\u00BB',
  /* 鹰眼控件折叠时功能按钮上的标识(网页的JS的字符编码) */
  label: '\u00AB',
  /* 初始为展开显示方式 */
  collapsed: false,
  view: new ol.View({
    projection: 'EPSG:4326',
    minZoom: 8,
    maxZoom: 18
  })
})

export {
  zoomToExtent,
  zoomslider,
  mousePosition,
  scaleLine,
  fullScreen,
  overviewMap
}
