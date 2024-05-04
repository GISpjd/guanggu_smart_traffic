/**
 *  @param {object} geomery {e.feature.getGeometry()}
 *  @param {object} service
 *  @param {function} callback
 * */

class Query {
    /* geometry = evt.feature.getGeometry() */
    static queryByGeom({ geometry, service, callback }) {
        /* 1、几何信息 */
        var queryStruct = new Zondy.Service.QueryFeatureStruct()
        //是否包含几何图形信息
        queryStruct.IncludeGeometry = true
        //是否包含属性信息
        queryStruct.IncludeAttribute = true
        //是否包含图形显示参数
        queryStruct.IncludeWebGraphic = false
        //创建一个用于查询的区
        var geomObj = new Zondy.Object.Polygon()
        geomObj.setByOL(geometry)

        //2、指定查询规则
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
        //3、实例化查询参数对象
        var queryParam = new Zondy.Service.QueryParameter({
            geometry: geomObj,
            resultFormat: 'json',
            struct: queryStruct,
            rule: rule
        })
        // //设置查询分页号
        queryParam.pageIndex = 0
        // //设置查询要素数目
        /* 默认查20条 */
        queryParam.recordNumber = 20
        //4、实例化地图文档查询服务对象
        var queryService = new Zondy.Service.QueryDocFeature(
            queryParam,
            service.name,
            service.layerId,
            {}
        )
        //执行查询操作，querySuccess为查询回调函数
        queryService.query(this.onQuerySuccess(callback))
    }
    static queryByLayer({ service, callback }) {
        var queryStruct = new Zondy.Service.QueryFeatureStruct()
        //是否包含几何图形信息
        queryStruct.IncludeGeometry = true
        //是否包含属性信息
        queryStruct.IncludeAttribute = true
        //是否包含图形显示参数
        queryStruct.IncludeWebGraphic = false
        //指定查询规则
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
        //实例化查询参数对象
        var queryParam = new Zondy.Service.QueryParameter({
            resultFormat: 'json',
            struct: queryStruct,
            rule: rule
        })
        queryParam.recordNumber = 10000
        var queryService = new Zondy.Service.QueryDocFeature(
            queryParam,
            service.name,
            service.layerId,
            {
                ip: 'localhost',
                port: '6163' //访问IGServer的端口号，.net版为6163，Java版为8089
            }
        )

        //执行查询操作，querySuccess为查询回调函数
        queryService.query(this.onQuerySuccess(callback))
    }
    /* where=`name like '%撞击%'` */
    static queryByAttrSQL({ service, where, callback }) {
        var queryStruct = new Zondy.Service.QueryFeatureStruct()
        queryStruct.IncludeGeometry = true
        //实例化查询参数对象
        var queryParam = new Zondy.Service.QueryParameter({
            resultFormat: 'json',
            struct: queryStruct
        })
        //设置查询分页号
        queryParam.pageIndex = 0
        //设置查询要素数目
        queryParam.recordNumber = 20
        //queryParam.where = name;
        queryParam.where = where
        //实例化地图文档查询服务对象
        var queryService = new Zondy.Service.QueryDocFeature(
            queryParam,
            service.name,
            service.layerId,
            {}
        )
        //执行查询操作，querySuccess为查询回调函数
        queryService.query(this.onQuerySuccess(callback))
    }
    /* fids=[] */
    static queryByFids({ fids, service, callback }) {
        var queryStruct = new Zondy.Service.QueryFeatureStruct()
        //是否包含几何图形信息
        queryStruct.IncludeGeometry = true
        //是否包含属性信息
        queryStruct.IncludeAttribute = true
        //是否包含图形显示参数
        queryStruct.IncludeWebGraphic = false
        //创建查询的OID编号
        //var objectIds = "10,104,185,238";
        //实例化查询参数对象
        var queryParam = new Zondy.Service.QueryParameter({
            objectIds: fids,
            resultFormat: 'json',
            struct: queryStruct
        })
        //设置查询分页号
        queryParam.pageIndex = 0
        //设置查询要素数目
        queryParam.recordNumber = 20
        //实例化地图文档查询服务对象
        var queryService = new Zondy.Service.QueryDocFeature(
            queryParam,
            service.name,
            service.layerId,
            {
                port: '6163' //访问IGServer的端口号，.net版为6163，Java版为8089
            }
        )
        queryService.query(this.onQuerySuccess(callback))
    }
    static onQuerySuccess(callback) {
        return function (data) {
            var format = new Zondy.Format.PolygonJSON()
            var features = format.read(data)
            callback(features)
        }
    }
}

export { Query }
