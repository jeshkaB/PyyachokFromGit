import {keysLS, urls} from "../constants";
import {axiosService} from "./axios.service";


const authService = {
    register: (user) => axiosService.post(urls.users, user),
    login: (user) => axiosService.post(`${urls.auth}/login`, user),
    refresh: (refreshToken) => axiosService.post(`${urls.auth}/refresh`, {refreshToken}),// чому токен передається в дужках?
    saveTokensInLS: ({accessToken, refreshToken}) => {
        localStorage.setItem(keysLS.access, accessToken);
        localStorage.setItem(keysLS.refresh, refreshToken)
    },
    deleteTokensInLS: () => {
        localStorage.removeItem(keysLS.access);
        localStorage.removeItem(keysLS.refresh)}
}
