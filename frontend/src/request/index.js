import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token')
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
