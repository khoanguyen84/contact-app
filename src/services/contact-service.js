import axiosClient from "../api-client/axios-client"
class contactService {
    static getContactById = (id) => {
        return axiosClient.get(`/contact/${id}`)
    }

    static deleteContact = (id) => {
        return axiosClient.delete(id)
    }

    static createConact = (data) => {
        return axiosClient.post('/contact', data)
    }

    static modifyContact = (id, data) => {
        return axiosClient.put(`/contact/${id}`, data)
    }
}

export default contactService;