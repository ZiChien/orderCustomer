import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://192.168.1.138:3030/admin/',
    timeout: 1000,
})

const apiMerchantInfo = () => instance.get(`api.getinfo`)
const apiGetmtl = () => instance.get(`api.getmtl`)

export { apiMerchantInfo, apiGetmtl }