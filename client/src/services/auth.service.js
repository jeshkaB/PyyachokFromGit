import {keysLS, urls} from "../constants";
import {axiosService} from "./axios.service";


const authService = {
    register: (user) => axiosService.post(urls.users, user),// в мене на сервери для реєстрації роут "registration"
    login: (user) => axiosService.post(`${urls.auth}/login`, user),
    logout: () => axiosService.post(`${urls.auth}/logout`),
    logoutFromEverywhere: () => axiosService.post(`${urls.auth}/logout/fromEverywhere`),
    refresh: (refreshToken) => axiosService.post(`${urls.auth}/refresh`, {refreshToken}),// чому токен передається в дужках?
    saveTokensInLS: ({accessToken, refreshToken}) => {
        localStorage.setItem(keysLS.access, accessToken);
        localStorage.setItem(keysLS.refresh, refreshToken)
    },
    getAccessTokenInLS: () =>
        localStorage.getItem(keysLS.access),
    getRefreshTokenInLS: () =>
        localStorage.getItem(keysLS.refresh),
    deleteTokensInLS: () => {
        localStorage.removeItem(keysLS.access);
        localStorage.removeItem(keysLS.refresh)}
}

export {authService}
