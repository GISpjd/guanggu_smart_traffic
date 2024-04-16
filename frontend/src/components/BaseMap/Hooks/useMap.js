import { prototype } from "@/main";
import { vecLayerGroup } from "@/map_libs/tianditu";
import { Map, View } from "ol";

export const initMap = () => {
    const map = new Map({
        target: 'map',
        layers: [
            vecLayerGroup
        ],
        view: new View({
            projection: 'EPSG:4326',
            center: [114.37, 30.5],
            zoom: 10,
            minZoom: 4
        })
    })
    prototype.$map = map
}
