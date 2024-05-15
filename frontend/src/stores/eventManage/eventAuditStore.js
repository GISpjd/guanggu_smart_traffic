import { ref, onMounted } from 'vue'
import { getAllEventHttp, putEventsStatusHttp } from '@/request/eventHttp'
import { ElMessage } from 'element-plus'

export const useEventStore = () => {
    // 控制dialog是否显示
    const tableShow = ref(true)
    const tableData = ref([])
    const currentPage = ref(1)
    const pageSize = ref(5)
    const total = ref()

    let searchEvent = ref('')

    const fetchEventData = async () => {
        const res = await getAllEventHttp({ page: currentPage.value, size: pageSize.value })
        if (res.code == 0) {
            tableData.value = res.data
            total.value = res.total
        }
    }

    const handleSizeChange = (size) => {
        pageSize.value = size
        fetchEventData()
    }

    const handleCurrentChange = (page) => {
        currentPage.value = page
        fetchEventData()
    }

    const handlePass = (row) => {
        putEventsStatusHttp(row.id, 2)
        fetchEventData()
    }

    const handleIgnore = (row) => {
        putEventsStatusHttp(row.id, 1)
        fetchEventData()
    }

    const handleSearch = async (searchEvent) => {
        if (searchEvent) {
            const res = await getAllEventHttp({ page: currentPage.value, size: pageSize.value, userId: searchEvent })
            if (res.code == 0) {
                tableData.value = []
                tableData.value = res.data
                total.value = res.total
            } else {
                ElMessage.error('搜取的用户不存在或者是该用户未上报事件')
            }
        } else {
            ElMessage.error('输入的内容不能为空')
        }
    }

    // onMounted(() => {
    //     fetchEventData()
    // })

    return {
        tableShow,
        tableData,
        currentPage,
        pageSize,
        total,
        searchEvent,
        fetchEventData,
        handleSizeChange,
        handleCurrentChange,
        handlePass,
        handleIgnore,
        handleSearch
    }


}