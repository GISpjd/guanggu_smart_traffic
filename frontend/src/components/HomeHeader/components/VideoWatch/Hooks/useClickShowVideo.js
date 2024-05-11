import { Point } from '@/Hooks/usePoint'
import { useCanvas } from '@/Hooks/useCanvas'
import { ref } from 'vue'

export let videoSource = new ol.source.Vector({ wrapX: false })
// 传到组件中，便于使用popupVideo这个dom元素
// export let popupVideo = ref(null)

let client
export function useClickShowVideo(map) {
    let canvas = useCanvas(map)
    const style = new ol.style.Style({
        image: new ol.style.Icon({
            img: canvas,
            imgSize: [canvas.width, canvas.height]
        })
    })

    let videoLayer = new ol.layer.Vector({
        source: videoSource,
        style: style
    })

    map.addLayer(videoLayer)
    map.on('click', handleMap)

    function handleMap(e) {
        let position = e.coordinate
        client = map.getPixelFromCoordinate(position)
        console.log(client);
        Point.query({
            position,
            service: {
                name: 'guanggu',
                layerId: 3
            },
            callback: onSuccess
        })
    }

    function onSuccess(res) {
        if (res) {
            videoSource.clear()
            videoSource.addFeatures(res)
            let popupVideo = document.querySelector('.popup_video')
            popupVideo.style.display = 'block'
            popupVideo.style.left = client[0] - 100 + 'px'
            popupVideo.style.top = client[1] - 200 + 'px'
        }
    }

    return handleMap
}