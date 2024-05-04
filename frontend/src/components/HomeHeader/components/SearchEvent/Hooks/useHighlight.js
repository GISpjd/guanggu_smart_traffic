import { useCanvas } from "@/Hooks/useCanvas";

export const highlight_source = new ol.source.Vector();

export const useHighlight = (map) => {
    let canvas = useCanvas(map);
    const style = new ol.style.Style({
        image: new ol.style.Icon({
            img: canvas,
            imgSize: [canvas.width, canvas.height]
        })
    })

    const highlight_layer = new ol.layer.Vector({
        source: highlight_source,
        style: style
    })
    map.addLayer(highlight_layer);
    return {
        highlight_layer
    }
}