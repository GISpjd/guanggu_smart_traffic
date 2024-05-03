import { useGlobalMap } from "@/plugins/globalmap";
import { ref, onMounted } from "vue";

export const useDirectory = () => {
    const children = ref([]);
    const map = ref(null);
    const directoryImg = [
        '../../assets/images/Area.png',
        '../../assets/images/Line.png',
        '../../assets/images/Point.png',
        '../../assets/images/monitor.png',
        '../../assets/images/location.png'
    ]

    onMounted(async () => {
        const docCataLog = await new Zondy.Catalog.MapDoc({
            docName: 'guanggu'
        })
        let count = -1
        docCataLog.getLayersInfo((data) => {
            data.value.forEach((item) => {
                count++
                const { Name, LayerIndex } = item
                children.value.push({
                    id: LayerIndex,
                    name: Name,
                    src: directoryImg[count]
                })
            })
        })
    })

    map.value = useGlobalMap()
    // 实现地图的显隐切换
    const switchLayer = async (e, map) => {
        const docLayer = map.getLayers().item(1)
        var { checked } = e.target
        let id = e.target.id
        let value = checked ? 'include' : 'exclude'
        docLayer.setLayerStatus(id, value)
    }
    return { children, switchLayer }
}