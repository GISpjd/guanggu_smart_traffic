import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL

function noticeHttp({
    inputUrl,
    method,
    data,
}) {
    return axios({
        url: `${baseUrl}${inputUrl}`,
        method: method,
        data: data,
    }).then((res) => res.data);
}

/**
 * 封装获取公告列表接口
 * @param {*} page 
 * @param {*} size 
 * @param {*} status 
 * @returns 
 */
const getNoticeList = (page, size, status) => {
    return noticeHttp({
        inputUrl: `/notices?page=${page}&size=${size}&status=${status}`,
        method: "GET",
    });
}

/**
 * 获取对应id的公告详情
 * @param {*} id 
 * @returns 
 */
const getNoticeById = (id) => {
    return noticeHttp({
        inputUrl: `/notices/${id}`,
        method: "GET",
    });
}

/**
 * 封装创建公告接口
 * @param {number} user_id 
 * @param {string} notice_title 
 * @param {string} notice_content 
 * @returns 
 */
const createNotice = (user_id, notice_title, notice_content) => {
    return noticeHttp({
        inputUrl: "/notices",
        method: "POST",
        data: {
            user_id: user_id,
            notice_title: notice_title,
            notice_content: notice_content,
        },
    });
}

/**
 * 封装更新公告接口
 * @param {*} id 
 * @param {*} notice_status 
 * @returns 
 */
const updateNotice = (id, notice_status) => {
    return noticeHttp({
        inputUrl: `/notices/${id}`,
        method: "PUT",
        data: {
            notice_status: notice_status,
        }
    });
}

/**
 * 封装删除公告接口
 * @param {number} id 
 * @returns 
 */
const deleteNotice = (id) => {
    return noticeHttp({
        inputUrl: `/notices/${id}`,
        method: "DELETE",
    });
}

export {
    getNoticeList,
    getNoticeById,
    createNotice,
    updateNotice,
    deleteNotice,
};

