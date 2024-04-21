import { getCurrentInstance } from 'vue'
function useGlobalMap() {
  const { proxy } = getCurrentInstance()
  /* getCurrentInstance().appContext.config.globalProperties.$map */
  // console.log(proxy.$map);
  return proxy.$map
}
export { useGlobalMap }
