import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authService, geolocationService} from "../../services";
import {defaultCaseReject} from "./utilityFunctions";

const initialState = {
    isAuth: null,
    userId: null,
    errors: null,
    role: null
};

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
            const {data} = await authService.login(user);
           return data
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

//___________________________________________________________________________________________________________________
const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.userId = action.payload.user;
                state.role = action.payload.role;
                authService.saveTokensInLS(action.payload)
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
            .addDefaultCase((state, action) => {
                defaultCaseReject(state, action) //тут нам action.payload повертає rejectWithValue(e.response.data) - з функцій-запитів
            })

})

const {reducer: authReducer} = authSlice;
const authActions = {register, login, logout, logoutFromEverywhere};

export {authReducer, authActions}
