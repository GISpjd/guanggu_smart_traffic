// import { useGlobalMap } from "@/plugins/globalmap";
// import { ref } from "vue";

// export const useEarthGif = () => {
//     const map = ref(null);
//     map.value = useGlobalMap();

//     const iconFeature = new ol.Feature({
//         geometry: new ol.geom.Point([0, 0])
//     });

//     const vectorLayer = new ol.layer.Vector({
//         source: new ol.source.Vector({
//             features: [iconFeature]
//         })
//     });

//     const gifUrl = '../../../../public/fangun.gif';
//     const gif = gifler(gifUrl);
//     console.log(gif);
//     gif.frames(
//         document.createElement('canvas'),
//         function (ctx, frame) {
//             if (!iconFeature.getStyle()) {
//                 iconFeature.setStyle(
//                     new ol.style.Style({
//                         image: new ol.style.Icon({
//                             img: ctx.canvas,
//                             imgSize: [`${frame.width}px`, `${frame.height}px`],
//                             opacity: 0.8,
//                         }),
//                     }),
//                 );
//             }

//             console.log(frame);
//             // 确保 canvas 尺寸与帧尺寸一致
//             ctx.canvas.width = frame.width;
//             ctx.canvas.height = frame.height;

//             // 清除整个画布
//             ctx.clearRect(0, 0, frame.width, frame.height);

//             ctx.drawImage(frame.buffer, frame.x, frame.y);

//             // 调用 map.render() 刷新图层
//             map.value.render();
//         },
//         true,
//     );
//     // map.value.addLayer(vectorLayer);
//     // console.log(map.value.getLayers());
//     map.value.getLayers().insertAt(0, vectorLayer);
// }
