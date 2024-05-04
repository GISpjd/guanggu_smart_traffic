import { Query } from "@/Hooks/useQuery";
import { useHighlight, highlight_source } from "./useHighlight";
import { ref } from "vue";
import { ElMessage } from "element-plus";

export let isSearch = ref(true)

export function useSearchByInput(map, address) {
    const { highlight_layer } = useHighlight(map)
    let service = {
        name: 'guanggu',
        layerId: 2
    }

    let where = `发生地点 like '%${address}%'`

    Query.queryByAttrSQL({
        where,
        service,
        callback: handleQuery
    })

    function handleQuery(features) {
        if (features) {
            highlight_source.addFeatures(features)
        } else {
            isSearch.value = true
            ElMessage({
                showClose: true,
                message: '您搜索的地名有误或者未出现紧急事件',
                type: 'warning',
                duration: 1000
            })
        }
    }

    return {
        highlight_layer
    }

}