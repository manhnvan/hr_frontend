import axios from 'axios'

const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
})

http.interceptors.request.use(axiosRequestConfig => {
    const accessToken = window.localStorage.getItem('token')
    const token = accessToken ? accessToken : ''
    axiosRequestConfig.headers.Authorization = `Bearer ${token}`
    return axiosRequestConfig
}, error => console.log(error))

export default http