import {axiosService} from './axios.service';

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

    sendMessageToRestaurant: (entity, restId, userId, data) => axiosService.post(`${entity}/${restId}/message?userId=${userId}`, data),
    changeRestAdmin: (entity,restId,userId) => axiosService.put(`${entity}/${restId}/changeAdmin?userId=${userId}`),
    completeViews: (entity,restId) => axiosService.put(`${entity}/${restId}/view`),

    getViewStatisticsAll: () => axiosService.get('/ViewStatistics'),
    getViewStatisticsByRestId: (restId) => axiosService.get(`/ViewStatistics/${restId}`),

    getRestaurantsByParams: (entity, rating, averageBill, tags, search, moderated, sort, sortOrder, page ) =>
        axiosService.get(`${entity}/advancedSearch`, {params: {rating, averageBill, tags, search, moderated, sort, sortOrder, page}})

};

export {ApiService};
