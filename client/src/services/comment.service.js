import {axiosService} from "./axios.service";
import {urls} from "../constants";

const commentService = {
    getAll: () => axiosService.get(urls.comments),
    create: (data) => axiosService.post(urls.comments,data),
    getById: (id) => axiosService.get(`${urls.comments}/${id}`),
    deleteById: (id) => axiosService.delete(`${urls.comments}/${id}`),
    updateById: (id, data) => axiosService.patch(`${urls.comments}/${id}`, data)

}

export {commentService}
