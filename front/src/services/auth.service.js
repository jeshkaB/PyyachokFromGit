import {keysLS, urls} from '../constants';
import {axiosService,axiosRefreshService} from './axios.service';


const authService = {
    register: (user) => axiosService.post(`${urls.auth}/registration`, user),
    registerAsRestaurantAdmin: (user) => axiosService.post(`${urls.auth}/registration/asRestaurantAdmin`, user),
    registerAsSuperadmin: (user) => axiosService.post(`${urls.auth}/registration/superadmin`, user),
    login: (user) => axiosService.post(`${urls.auth}/login`, user),
    loginByGoogle: (user) => axiosService.post(`${urls.auth}/login/google`, user),
    logout: () => axiosService.post(`${urls.auth}/logout`),
    refresh: (refreshToken) => axiosRefreshService.post(`${urls.auth}/refresh`, {}, {headers: {Authorization: `${refreshToken}`}}),


    forgotPasswordRequest: (email) => axiosService.post(`${urls.auth}/forgotPassword`, email),
    forgotPasswordNewPassword: (password, actionToken) =>
        axiosService.put(
            `${urls.auth}/forgotPassword`,
            {password},
            {headers: {Authorization: `${actionToken}`}}),

    saveTokensInLS: ({accessToken, refreshToken}) => {
        localStorage.setItem(keysLS.access, accessToken);
        localStorage.setItem(keysLS.refresh, refreshToken);
    },

    getAccessTokenInLS: () =>
        localStorage.getItem(keysLS.access),
    getRefreshTokenInLS: () =>
        localStorage.getItem(keysLS.refresh),
    deleteTokensInLS: () => {
        localStorage.removeItem(keysLS.access);
        localStorage.removeItem(keysLS.refresh);
    },

    saveUserIdInLS: (userId) =>
        localStorage.setItem(keysLS.userId, userId),
    getUserIdInLS: () =>
        localStorage.getItem(keysLS.userId),
    deleteUserIdInLS: () =>
        localStorage.removeItem(keysLS.userId)
};

export {authService};
