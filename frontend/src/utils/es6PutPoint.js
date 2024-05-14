/**
 * @param {array} position 经纬度
 * @param {object} service  {name,layerId}  name地图文档的名称,layerId是要素所在的图层
 * @param {Object} docLayer  地图文档图层
 */

class Point {
    static put({ service, docLayer, attr, eventStatus, featureIds }) {
        let color
        if (eventStatus == 0) {
            color = 6
        } else if (eventStatus == 1) {
            color = 90
        } else {
            color = 4
        }
        const POINT_STYLE = {
            Angle: 0,
            Color: color,
            Space: 0,
            SymHeight: 5,
            SymID: 21,
            SymWidth: 5
        }
        /* 1-2、样式 子图号,子图颜色,要素的width-height */
        //描述点要素的符号参数信息
        var pointInfo = new Zondy.Object.CPointInfo(POINT_STYLE)
        //设置当前点要素的图形参数信息
        var webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
            /* InfoType 1点要素 */
            InfoType: 1,
            PntInfo: pointInfo
        })
        /* 1-3、设置属性信息 */
        var attValue = attr.map((item) => item.value)
        /* 几何+style+属性 =要素*/
        var feature = new Zondy.Object.Feature({
            GraphicInfo: webGraphicInfo,
            AttValue: attValue
        })
        //设置要素为点要素
        /* point--1 line--2  area--3 */
        feature.setFType(1)
        feature.setFID(featureIds)
        /* 2、创建要素集添加要素 */
        //创建一个要素数据集
        var featureSet = new Zondy.Object.FeatureSet()
        //设置属性结构
        /*这个属性和数据库中的字段的名称,字段的个数,字段的类型是映射的 */
        var cAttStruct = new Zondy.Object.CAttStruct({
            FldName: attr.map((item) => item.key),
            FldNumber: 1,
            FldType: attr.map((item) => item.type)
        })
        featureSet.AttStruct = cAttStruct
        //添加要素到要素数据集
        featureSet.addFeature(feature)
        /* 3、调用服务器添加要素 */
        //创建一个编辑服务类
        /* 第一个参数 地图文档的名称
            第二个参数 添加要素所在的图层
             */
        var editService = new Zondy.Service.EditDocFeature(service.name, service.layerId, {})
        //执行添加点要素功能
        editService.update(featureSet, Point.onSuccess(docLayer))
    }

    static onSuccess(docLayer) {
        return function (data) {
            if (data.succeed) {
                ElMessage.success('修改状态成功')
                docLayer.refresh() //重新加载地图文档
            } else {
                ElMessage.error('修改状态失败')
            }
        }
    }
}

export { Point }