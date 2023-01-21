import {axiosService} from "./axios.service";
import {urls} from "../constants";

const markService = {
    getAll: () => axiosService.get(urls.marks),
    create: (data) => axiosService.post(urls.marks,data),
    getById: (id) => axiosService.get(`${urls.marks}/${id}`),
    deleteById: (id) => axiosService.delete(`${urls.marks}/${id}`),
    updateById: (id,data) => axiosService.patch(`${urls.marks}/${id}`, data)

}

export {markService}
