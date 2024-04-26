import axios from "axios";
const axiosClient = axios.create({
    baseURL: 'https://contact-restful-api.vercel.app/'
})

// axiosClient.interceptors.request.use((request) => {
//     return request.headers({
//         'Authentication' : ''
//     }) 
// })

axiosClient.interceptors.response.use((response) => {
    return response?.data
})

export default axiosClient;