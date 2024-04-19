import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';

export const eventLayer = new TileLayer({
    source: new TileWMS({
        url: 'http://localhost:8080/geoserver/gis/wms',
        params: { 'LAYERS': 'gis:event', 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
        // crossOrigin: 'anonymous',
    })
})

export const policeLayer = new TileLayer({
    source: new TileWMS({
        url: 'http://localhost:8080/geoserver/gis/wms',
        params: { 'LAYERS': 'gis:police', 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
        // crossOrigin: 'anonymous',
    })
})

export const roadStateLayer = new TileLayer({
    source: new TileWMS({
        url: 'http://localhost:8080/geoserver/gis/wms',
        params: { 'LAYERS': 'gis:road_state_sl', 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
        // crossOrigin: 'anonymous',
    })
})

// module.exports = { eventLayer, policeLayer, roadStateLayer }