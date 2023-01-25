import {axiosService} from "./axios.service";
// import {urls} from "../constants";

const ApiService = {

    getAll: (entity) => axiosService.get(`/${entity}s`),
    create: (entity, data) => axiosService.post(`/${entity}s`,data),
    getById: (entity, id) => axiosService.get(`/${entity}s/${id}`),
    deleteById: (entity, id) => axiosService.delete(`/${entity}s/${id}`),
    updateById: (entity, id, data) => axiosService.patch(`/${entity}s/${id}`, data)
}

export {ApiService}
