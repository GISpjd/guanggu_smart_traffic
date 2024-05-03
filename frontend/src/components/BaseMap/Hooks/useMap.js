import { prototype } from "@/main";
import { vecLayerGroup } from "@/map_libs/tianditu";

export const initMap = () => {
    const map = new ol.Map({
        target: 'map',
        layers: [
            vecLayerGroup
        ],
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [114.37, 30.5],
            zoom: 10,
            minZoom: 4
        })
    })
    prototype.$map = map
}
