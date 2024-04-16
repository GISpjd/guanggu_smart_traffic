import { prototype } from "@/main";
export const useRoam = () => {
    const view = prototype.$map.getView()
    view.animate({
        center: [114.37, 30.5],
        zoom: 13.5,
        duration: 1300
    })
}