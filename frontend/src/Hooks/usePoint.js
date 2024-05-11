/**
 * @param {array} position 经纬度
 * @param {object} service  {name,layerId}  name地图文档的名称,layerId是要素所在的图层
 * @param {Object} docLayer  地图文档图层
 * @param {array} attr [
 * {type:"string",key:"name",value:"xxx"}
 * {type:"int",key:"people",value:100}
 * ]
 */

const POINT_STYLE = {
    Angle: 0,
    Color: 12,
    Space: 0,
    SymHeight: 12,
    SymID: 30,
    SymWidth: 12
}

class Point {
    static add({ position, service, docLayer, attr }) {
        var gpoint = new Zondy.Object.GPoint(position[0], position[1]) //createPoint();
        //设置当前点要素的几何信息
        var fGeom = new Zondy.Object.FeatureGeometry({ PntGeom: [gpoint] })
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
            fGeom: fGeom,
            GraphicInfo: webGraphicInfo,
            AttValue: attValue
        })
        //设置要素为点要素
        /* point--1 line--2  area--3 */
        feature.setFType(1)
        /* 2、创建要素集添加要素 */
        //创建一个要素数据集
        var featureSet = new Zondy.Object.FeatureSet()
        //设置属性结构
        /*这个属性和数据库中的字段的名称,字段的个数,字段的类型是映射的 */
        var cAttStruct = new Zondy.Object.CAttStruct({
            FldName: attr.map((item) => item.key),
            FldNumber: 0,
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
        editService.add(featureSet, Point.onPntSuccess(docLayer))
    }
    static query({ position, service, callback }) {
        var pointObj = new Zondy.Object.Point2D(position[0], position[1])
        //设置查询点的搜索半径
        pointObj.nearDis = 0.001
        /* 2、设置查询参数 */
        //2、初始化查询结构对象，告诉服务端查询结果中应该包含哪些信息
        var queryStruct = new Zondy.Service.QueryFeatureStruct()
        //是否包含几何图形信息
        queryStruct.IncludeGeometry = true
        //是否包含属性信息
        queryStruct.IncludeAttribute = true
        //是否包含图形显示参数
        queryStruct.IncludeWebGraphic = true
        //3、创建查询规则
        var rule = new Zondy.Service.QueryFeatureRule({
            //是否将要素的可见性计算在内
            EnableDisplayCondition: false,
            //是否完全包含
            MustInside: false,
            //是否仅比较要素的外包矩形
            CompareRectOnly: false,
            //是否相交
            Intersect: true
        })
        /* 4、实例化查询对象 */
        var queryParam = new Zondy.Service.QueryParameter({
            geometry: pointObj,
            resultFormat: 'json',
            struct: queryStruct,
            rule: rule
        })
        /* 5、调用查询服务 */
        /* 第二个参数 地图文档的名称
          第三个参数 查询要素所在的图层
           */
        var queryService = new Zondy.Service.QueryDocFeature(
            queryParam,
            service.name,
            service.layerId,
            {
                ip: 'localhost',
                port: '6163'
            }
        )
        queryService.query(this.querySuccess(callback), this.queryError)
    }
    static queryError(e) {
        console.log(e)
    }
    static querySuccess(callback) {
        return function (result) {
            //初始化Zondy.Format.PolygonJSON类
            var format = new Zondy.Format.PolygonJSON()
            //将MapGIS要素JSON反序列化 ol.Feature类型数组
            var features = format.read(result)
            callback(features)
        }
    }
    static onPntSuccess(docLayer) {
        return function (data) {
            if (data.succeed) {
                alert('添加点要素成功！')
                docLayer.refresh()
            } else {
                alert('添加点要素失败！')
            }
        }
    }
}

export { Point }