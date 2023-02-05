import {axiosService} from "./axios.service";
// import {urls} from "../constants";

const ApiService = {

    getAll: (entity) => axiosService.get(`${entity}`),
    create: (entity, data) => axiosService.post(`${entity}`,data),
    getById: (entity, id) => axiosService.get(`${entity}/${id}`),
    deleteById: (entity, id) => axiosService.delete(`${entity}/${id}`),
    updateById: (entity, id, data) => axiosService.patch(`${entity}/${id}`, data),

    createByRestId: (entity, id, data) => axiosService.post(`${entity}/?restId=${id}`,data),//для коментів
    addFavoriteRest: (entity, userId, restId) => axiosService.post(`${entity}/${userId}/favoriteRest?restId=${restId}`),//для улблених ресторанів
    removeFavoriteRest: (entity, userId, restId) => axiosService.delete(`${entity}/${userId}/favoriteRest?restId=${restId}`),//для улюблених ресторанів
    changePassword: (entity,userId,data) => axiosService.put(`${entity}/${userId}/changePassword`, data)
}

export {ApiService}
