import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiService, authService, geolocationService} from "../../services";
import {defaultCaseReject} from "./utilityFunctions";
import {urls} from "../../constants";

const initialState = {
    isAuth: null,
    userId: null,
    errors: null,
    role: null,
    authUser:null,

};

const entity = urls.users;

const register = createAsyncThunk(
    'authSlice/register',
    async ({user}, {rejectWithValue}) => {
        try {
            await authService.register(user)

        } catch (e) {
            return rejectWithValue(e.response.data)// e.response.data = {message: 'Email is already exist'} - response з АРІ

        }
    }
);

const login = createAsyncThunk(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data:authData} = await authService.login(user);
            const {data:userData} = await ApiService.getById(entity, authData.user)
           return {authData, userData}
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const logout = createAsyncThunk(
    'authSlice/logout',
    async (_, {rejectWithValue}) => {
        try {
            await authService.logout();
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const logoutFromEverywhere = createAsyncThunk(
    'authSlice/logoutFromEverywhere',
    async (_, {rejectWithValue}) => {
        try {
            await authService.logoutFromEverywhere()
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const addFavoriteRest = createAsyncThunk(
    'authSlice/addFavoriteRest',
    async ({userId,restId}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.addFavoriteRest(entity, userId, restId)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const removeFavoriteRest = createAsyncThunk(
    'authSlice/removeFavoriteRest',
    async ({userId,restId}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.removeFavoriteRest(entity, userId, restId)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

//___________________________________________________________________________________________________________________
const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.userId = action.payload.authData.user;
                state.role = action.payload.authData.role;
                state.authUser = action.payload.userData;
                authService.saveTokensInLS(action.payload.authData)
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isAuth = false;
                state.errors = null;
                state.userId = null;
                state.role = null;
                authService.deleteTokensInLS();
                geolocationService.deleteGeoCoordsInLS();
            })
            .addCase(logoutFromEverywhere.fulfilled, (state, action) => {
                state.isAuth = false;
                state.errors = null;
                // state.userId = null;
                state.role = null;
                authService.deleteTokensInLS();
                geolocationService.deleteGeoCoordsInLS();
            })
            .addCase(addFavoriteRest.fulfilled, (state, action) => {
                state.errors = null;


            })
            .addCase(removeFavoriteRest.fulfilled, (state, action) => {
                state.errors = null;

            })
            .addDefaultCase((state, action) => {
                defaultCaseReject(state, action) //тут нам action.payload повертає rejectWithValue(e.response.data) - з функцій-запитів
            })

})

const {reducer: authReducer} = authSlice;
const authActions = {register, login, logout, logoutFromEverywhere, addFavoriteRest,removeFavoriteRest};

export {authReducer, authActions}
