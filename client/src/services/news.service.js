import {axiosService} from "./axios.service";
import {urls} from "../constants";

const newsService = {
    getAll: () => axiosService.get(urls.news),
    create: (data) => axiosService.post(urls.news,data),
    getById: (id) => axiosService.get(`${urls.news}/${id}`),
    deleteById: (id) => axiosService.delete(`${urls.news}/${id}`),
    updateById: (id, data) => axiosService.patch(`${urls.news}/${id}`, data)

}

// function getAll(entity) {axiosService.get(`/${entity}s`)}
// function create(entity, data) {axiosService.get(`/${entity}s`, data)}
//
// export {getAll,create}

export {newsService}
