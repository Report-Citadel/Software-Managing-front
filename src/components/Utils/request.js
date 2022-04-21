import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.withCredentials = true

// manageClass an axios instance
const service = axios.create({
    baseURL: '', // url = base url + request url
    // 这里是后端地址

    // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 500000, // request timeout
    crossDomain: true

})

service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (window.sessionStorage.getItem('tokenValue')) {
            config.headers['token'] = window.sessionStorage.getItem('tokenValue')
        }

        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

export default service
