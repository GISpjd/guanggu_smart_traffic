import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL

/**
 * 封装用户请求方式
 * @param {*}
 * @returns {Promise}
 */
async function eventHttp({
    inputUrl,
    method,
    data
}) {
    try {
        const response = await axios({
            url: baseUrl + inputUrl,
            method,
            data: data //发送请求体数据
        });
        return response.data;
    } catch (error) {
        console.error('Request failed:', error);
        throw error; // 可以选择抛出错误或者返回错误信息
    }
}


/**
 * 获取符合条件的全部事件或全部事件
 * @param {Array} param0 
 * @returns 
 */
// const getAllEventHttp = ({ page, size, userId, status }) => {
//     // 初始化查询参数数组
//     const queryParams = [];

//     // 根据条件添加参数到数组
//     if (page != undefined) queryParams.push(`page=${encodeURIComponent(page)}`);
//     if (size != undefined) queryParams.push(`size=${encodeURIComponent(size)}`);
//     if (userId != undefined) queryParams.push(`userId=${encodeURIComponent(userId)}`);
//     if (status != undefined) queryParams.push(`status=${encodeURIComponent(status)}`);

//     // 使用join方法将参数连接成字符串，并添加到URL中
//     const queryString = queryParams.join('&');
//     const inputUrl = `/events?${queryString}`;
//     console.log(inputUrl);
//     return eventHttp({
//         inputUrl: inputUrl,
//         method: 'get'
//     });
// }

const getAllEventHttp = ({ page, size, userId, status }) => {
    const params = { page, size, userId, status }

    const queryString = Object.entries(params)
        .filter(([key, value]) => value != undefined)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')

    const inputUrl = `/events?${queryString}`;
    // console.log(inputUrl);
    return eventHttp({
        inputUrl: inputUrl,
        method: 'get'
    })
}

/**
 * 封装根据事件id获取单个traffic_event数据
 * @param {number} id 
 * @returns 
 */
const getEventById = (id) => {
    return eventHttp({
        inputUrl: `/events/${id}`,
        method: 'get'
    })
}


/**
 * 封装添加事件的接口
 * @param {*} params 
 * @returns {Promise}
 */
const postEventHttp = ({
    user_id,
    event_type,
    event_describe,
    event_handle_status,
    road_section_id,
    event_driver,
    event_car_number,
}) => {
    let bodyParams = {
        user_id,
        event_type,
        event_describe,
        event_handle_status,
        road_section_id,
        event_driver,
        event_car_number,
    }

    let data = Object.fromEntries(Object.entries(bodyParams)
        .filter(([_, value]) => value != undefined))
    return eventHttp({
        inputUrl: '/events',
        method: 'post',
        data: data
    })
}


/**
 * 封装修改事件状态的接口
 * @param {number} id 
 * @param {number} event_handle_status 
 * @returns {Promise}
 */
const putEventsStatusHttp = (id, event_handle_status) => {
    return eventHttp({
        inputUrl: `/events/${id}`,
        method: 'put',
        data: {
            event_handle_status
        }
    })
}


export { getAllEventHttp, getEventById, postEventHttp, putEventsStatusHttp }