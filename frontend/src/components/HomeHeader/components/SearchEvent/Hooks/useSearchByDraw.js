import { ref, reactive } from "vue";

import { createDraw } from "@/Hooks/useDraw";
import { useHighlight, highlight_source } from "./useHighlight";
import { Query } from "@/Hooks/useQuery";
import { popupShow } from "./usePopup";

let queryResult = ref([])
let draw
let showDialog = ref(false)
let isBoxSelect = ref(true)

/* 1、点击事件设置画笔实现拉框 */
const queryByDraw = (map) => {
    const { highlight_layer } = useHighlight(map)
    isBoxSelect.value = false
    draw = createDraw({
        type: 'Rectangle',
        source: highlight_source,
        callback: () => {
            let popup = document.querySelector('#popup')
            popup.setAttribute('style', 'display:none !important;')
        }
    })
    map.addInteraction(draw)
    draw.on('drawend', handleDraw)

    function handleDraw(evt) {
        draw.setActive(false)
        highlight_source.clear()
        let geometry = evt.feature.getGeometry()
        let service = {
            name: 'guanggu',
            layerId: 2
        }
        /* 2、调用查询接口实现拉框查询 */
        Query.queryByGeom({
            geometry,
            service,
            callback: querySuccess
        })
    }

    // 3、查询成功的回调
    function querySuccess(features) {
        if (features) {
            showDialog.value = true
            highlight_source.addFeatures(features)
            /* 要素的属性 */
            queryResult.value = features.map((item) => item.values_.values_)
            popupShow(map)
        } else {
            isBoxSelect.value = true
            ElMessage({
                type: 'error',
                duration: 1500,
                message: '只能查询有事件发生的区域！'
            })
        }
    }

    return {
        highlight_layer,
        draw
    }
}

export { queryResult, queryByDraw, showDialog, isBoxSelect }
