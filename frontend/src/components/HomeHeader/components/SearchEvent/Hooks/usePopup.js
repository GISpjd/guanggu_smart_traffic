import { ref } from 'vue'
export let eventTitle = ref()
export let eventContent = ref()

export function popupShow(map) {
    map.on('click', popupClick)

    map.on('pointermove', function (e) {
        // 获取事件像素位置
        const pixel = map.getEventPixel(e.originalEvent)
        // 检查该位置是否有feature
        let isTouch = map.hasFeatureAtPixel(pixel)
        map.getTargetElement().style.cursor = isTouch ? 'pointer' : ''
    })

    function popupClick(e) {
        let feature = map.forEachFeatureAtPixel(e.pixel, function (feature) {
            return feature
        })

        if (feature) {
            // console.log(feature);
            let event = feature.values_.values_
            if (event) {
                eventTitle.value = Object.keys(event)
                eventContent.value = Object.values(event)
            }
            console.log(eventTitle.value, eventContent.value);
            var position = feature.getGeometry().flatCoordinates
            let app = document.querySelector('#app')
            app.addEventListener('click', handleMap)
            setTimeout(() => {
                app.removeEventListener('click', handleMap)
            }, 100)
        }
    }
    function handleMap(evt) {
        var { pageX, pageY } = evt
        let popup = document.querySelector('#popup')
        popup.setAttribute('style', 'display:block !important;z-index:0;')
        popup.style.left = pageX - 150 + 'px'
        popup.style.top = pageY - 155 + 'px'
    }

    return popupClick

}