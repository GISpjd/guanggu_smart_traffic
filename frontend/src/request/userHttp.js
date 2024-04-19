import axios from 'axios'
const baseUrl = import.meta.env.VITE_BASE_URL

function userHttp({
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
 * 封装获取所有用户并分页显示请求
 * @param {number} page 
 * @param {number} size 
 * @param {string} userName 
 * @returns 
 */
const getAllUserHttp = (page, size, userName = '') => {
    return userHttp({
        inputUrl: `/users?page=${page}&size=${size}&userName=${userName}`,
        method: 'get'
    })
}

/**
 * 封装获取单个用户的请求
 * @param {number} id 
 * @returns 
 */
const getOneUserHttp = (id) => {
    return userHttp({
        inputUrl: `/users/${id}`,
        method: 'get'
    })
}


/**
 * 封装用户登录请求
 * @param {string} user_name 
 * @param {string} user_password 
 * @returns {Promise}
 */
const postUserLoginHttp = (user_name, user_password) => {
    return userHttp({
        inputUrl: `/users/login`,
        method: 'post',
        data: {
            user_name,
            user_password
        }
    })
}

/**
 * 封装普通用户注册或管理员添加普通用户请求
 * @param {*} user_name 
 * @param {*} user_password 
 * @returns 
 */
const postOrdinaryUserHttp = (user_name, user_password, user_role = 0) => {
    return userHttp({
        url: '/users',
        method: 'post',
        data: {
            user_name,
            user_password,
            user_role
        }
    })
}


/**
 * 封装修改用户账号的请求
 * @param {number} id 
 * @param {string} user_name 
 * @param {string} user_password 
 * @param {number} user_islogin 
 * @returns {Promise}
 */
const putUserHttp = (id, user_name, user_password, user_islogin) => {
    return userHttp({
        url: `/users/${id}`,
        method: 'put',
        data: {
            user_name,
            user_password,
            user_islogin
        }
    })
}

/**
 * 封装删除用户请求
 * @param {number} id 
 * @returns 
 */
const deleteUserHttp = (id) => {
    return userHttp({
        url: `/users/${id}`,
        method: 'delete'
    })
}


/**
 * 导出相应用户请求模块
 */
export {
    getAllUserHttp,
    getOneUserHttp,
    postUserLoginHttp,
    postOrdinaryUserHttp,
    putUserHttp,
    deleteUserHttp
}
