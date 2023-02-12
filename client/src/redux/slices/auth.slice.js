import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authService} from "../../services";
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
            .addDefaultCase((state, action) => {
                defaultCaseReject(state, action) //тут нам action.payload повертає rejectWithValue(e.response.data) - з функцій-запитів
            })

})

const {reducer: authReducer} = authSlice;
const authActions = {register, login};

export {authReducer, authActions}
