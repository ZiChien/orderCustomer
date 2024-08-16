import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://172.20.10.11:3030/admin/',
    timeout: 1000,
})

const apiMerchantInfo = () => instance.get(`api.getinfo`)
const apiGetmtl = () => instance.get(`api.getmtl`)
const apiGetDate = () => instance.get(`api.getdate`)
const apiGetTime = () => instance.get(`api.gettime`)
const apiPostOrder = (data) => instance.post(`api.orderconfirm`, data)

export { apiMerchantInfo, apiGetmtl, apiGetDate, apiGetTime,apiPostOrder }