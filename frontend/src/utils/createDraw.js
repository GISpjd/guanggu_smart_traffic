/**
 * 
 * @param {*} param0 
 * @returns 
 */

function createDraw({ source, type = 'Point' }) {
    let draw = null
    let geometryFunction = null
    let maxPoints = 0
    if (type == 'Square') {
        type = 'Circle'
        geometryFunction = ol.interaction.Draw.createRegularPolygon(4)
    } else if (type == 'Box') {
        type = 'LineString'
        geometryFunction = function (coordinates, geometry) {
            if (!geometry) {
                geometry = new ol.geom.Polygon(null)
            }

            var start = coordinates[0];
            var end = coordinates[1];

            // 生成矩形
            geometry.setCoordinates([[start, [start[0], end[1]], end, [end[0], start[1]], start]])
            return geometry
        }
        maxPoints = 2
    }

    draw = new ol.interaction.Draw({
        type: type,
        source: source,
        geometryFunction: geometryFunction,
        maxPoints: maxPoints
    })

    return draw
}

export { createDraw }