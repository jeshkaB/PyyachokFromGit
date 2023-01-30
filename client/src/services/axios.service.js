import axios from "axios";
import {baseURL} from "../constants";
import {authService} from "./auth.service";
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use((config) => {
    const accessToken = authService.getAccessTokenInLS();
    if (accessToken) {
        config.headers.Authorization = accessToken
    }
    return config
})
let isRefreshing = false;
axiosService.interceptors.request.use((config) => {
        return config;
    },
    async (error) => {
        const refreshToken = authService.getRefreshTokenInLS();
        if (error.response?.status === 401 && error.config && !isRefreshing && refreshToken) {
            isRefreshing = true;
            try {
                const {data} = await authService.refresh(refreshToken);
                authService.saveTokensInLS(data)
            } catch (e) {
                authService.deleteTokensInLS();
                return history.replace('/login?ExpSession=true')
            }
            isRefreshing = false;
            return axiosService(error.config)
        }
        return Promise.reject(error)
    })

export {axiosService, history}
