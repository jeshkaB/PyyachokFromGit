import {axiosService} from "./axios.service";
import {interceptors} from "axios";
// import {urls} from "../constants";

const ApiService = {

    getAll: (entity) => axiosService.get(`${entity}`),
    create: (entity, data) => axiosService.post(`${entity}`,data),
    getById: (entity, id) => axiosService.get(`${entity}/${id}`),
    deleteById: (entity, id) => axiosService.delete(`${entity}/${id}`),
    updateById: (entity, id, data) => axiosService.patch(`${entity}/${id}`, data),

    createByRestId: (entity, id, data) => axiosService.post(`${entity}/?restId=${id}`,data),//для коментів
    createByUserEventId: (entity, id, data) => axiosService.post(`${entity}/?eventId=${id}`,data),//для відповідей в пиячку

    addFavoriteRest: (entity, userId, restId) => axiosService.post(`${entity}/${userId}/favoriteRest?restId=${restId}`),//для улюблених ресторанів
    removeFavoriteRest: (entity, userId, restId) => axiosService.delete(`${entity}/${userId}/favoriteRest?restId=${restId}`),//для улюблених ресторанів

    changePassword: (entity,userId,data) => axiosService.put(`${entity}/${userId}/changePassword`, data),

    addRestaurantInCategory: (entity,categId,restId) => axiosService.post(`${entity}/${categId}/restaurant?restId=${restId}`), //для додавання ресторану до топ категорії
    removeRestaurantInCategory: (entity,categId,restId) => axiosService.delete(`${entity}/${categId}/restaurant?restId=${restId}`),
}

export {ApiService}
