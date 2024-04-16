import { getCurrentInstance } from 'vue'
function useGlobalMap() {
  const { proxy } = getCurrentInstance()
  /* getCurrentInstance().appContext.config.globalProperties.$map */
  return proxy.$map
}
export { useGlobalMap }
