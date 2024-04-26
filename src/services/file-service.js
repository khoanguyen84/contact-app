import axiosClient from "../api-client/axios-client"

class fileService {
    static uploadAvatar = (file) => {
        const formdata = new FormData()
        formdata.append('upload_preset', 'a09ikbyc')
        formdata.append('file', file)
        return axiosClient.post('https://api.cloudinary.com/v1_1/dtxyz2s1g/image/upload', formdata)
    }
}

export default fileService;