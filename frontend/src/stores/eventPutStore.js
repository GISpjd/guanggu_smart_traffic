import { Query } from '@/Hooks/useQuery'
import { Point } from '@/utils/es6PutPoint'
import { ref, onMounted, nextTick } from 'vue'

export const useGetEvent = () => {
    const putShow = ref(true)
    const eventStatus = ref()
    const eventData = ref([])
    const featureId = ref([])
    var service = {
        name: 'guanggu',
        layerId: 2
    }

    const getData = async () => {
        Query.queryByLayer({
            service,
            callback: (res) => {
                res.forEach((item) => {
                    const mergedObj = { ...item.values_.values_, id: item.id_ }
                    eventData.value.push(mergedObj)
                })
            }
        })
        await nextTick() // 等待更新视图
        return eventData
    }

    let docLayer, attr
    // 修改状态
    const handlePutStatus = async (row, eventStatus, map) => {
        let featureIds = row.id
        docLayer = map.getLayers().item(1)
        attr = [{ type: 'smallint', key: '处理状态', value: eventStatus }]
        Point.put({
            featureIds,
            eventStatus,
            service,
            attr,
            docLayer
        })
        await getData()
    }

    // 尽量还是在组件中使用的时候再调用getData
    // onMounted(async () => {
    //     await getData()
    // })

    return { eventData, featureId, putShow, eventStatus, getData, handlePutStatus }
}