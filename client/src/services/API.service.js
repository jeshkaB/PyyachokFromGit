import {axiosService} from "./axios.service";
// import {urls} from "../constants";

const ApiService = {

    getAll: (entity) => axiosService.get(`${entity}`),
    create: (entity, data) => axiosService.post(`${entity}`,data),
    getById: (entity, id) => axiosService.get(`${entity}/${id}`),
    deleteById: (entity, id) => axiosService.delete(`${entity}/${id}`),
    updateById: (entity, id, data) => axiosService.patch(`${entity}/${id}`, data)
}

export {ApiService}
