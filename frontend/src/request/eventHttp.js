import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL

/**
 * 封装用户请求方式
 * @param {*}
 * @returns {Promise}
 */
function eventHttp({
    inputUrl,
    method,
    data
}) {
    return axios({
        url: baseUrl + inputUrl,
        method,
        data: data //发送请求体数据
    }).then(response => {
        return response.data
    }).catch(error => {
        console.error('Request failed:', error);
        throw error; // 可以选择抛出错误或者返回错误信息
    })
}


/**
 * 获取符合条件的全部事件或全部事件
 * @param {number} page 
 * @param {number} size 
 * @param {number} userId 
 * @param {number} status 
 * @returns {Promise}
 */
const getAllEventHttp = (page, size, userId = '', status = '') => {
    return eventHttp({
        inputUrl: `/events?page=${page}&size=${size}&userId=${userId}&status=${status}`,
        method: 'get'
    })
}


/**
 * 封装根据事件id获取单个traffic_event数据
 * @param {number} id 
 * @returns 
 */
const getOneEventHttp = (id) => {
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
    event_date
}) => {
    return eventHttp({
        inputUrl: '/events',
        method: 'post',
        data: {
            user_id,
            event_type,
            event_describe,
            event_handle_status,
            road_section_id,
            event_driver,
            event_car_number,
            event_date
        }
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


export { getAllEventHttp, getOneEventHttp, postEventHttp, putEventsStatusHttp }