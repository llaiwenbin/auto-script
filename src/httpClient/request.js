// 封装axios
import axios from "axios";
import qs from "qs"
axios.defaults.headers["Content-Type"] = 'application/json;charset=utf-8'
const service = axios.create({
    baseURL: '',
    timeout: 30000
})

service.interceptors.request.use(config => {
    if (config.qs) {
        config.data = qs.stringify(config.data)
    }
    return config;
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(res => {
    return res.data
}, error => {
    Promise.reject(error)
})
export default service
