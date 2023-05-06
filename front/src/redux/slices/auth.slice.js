import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiService, authService, geolocationService} from '../../services';
import {defaultCaseReject} from './utilityFunctions';
import {urls} from '../../constants';

const initialState = {
    isAuth: null,
    userId: null,
    errors: null,
    role: null,
    authUser: null,
    isGoogle: null

};

const entity = urls.users;

const register = createAsyncThunk(
    'authSlice/register',
    async ({user, isManager, isSuperadmin}, {rejectWithValue}) => {
        try {
            if (isManager)
                await authService.registerAsRestaurantAdmin(user);
            else if (isSuperadmin)
                await authService.registerAsSuperadmin(user);
            else
                await authService.register(user);

        } catch (e) {
            return rejectWithValue(e.response.data);// e.response.data = {message: 'Email is already exist'} - response з АРІ

        }
    }
);

const login = createAsyncThunk(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data} = await authService.login(user);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const loginByGoogle = createAsyncThunk(
    'authSlice/loginByGoogle',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data} = await authService.loginByGoogle(user);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const logout = createAsyncThunk(
    'authSlice/logout',
    async (_, {rejectWithValue}) => {
        try {
            await authService.logout();

        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const addFavoriteRest = createAsyncThunk(
    'authSlice/addFavoriteRest',
    async ({userId, restId}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.addFavoriteRest(entity, userId, restId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
const removeFavoriteRest = createAsyncThunk(
    'authSlice/removeFavoriteRest',
    async ({userId, restId}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.removeFavoriteRest(entity, userId, restId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
const setCurrentUser = createAsyncThunk(
    'authSlice/setCurrentUser',
    async ({refreshToken}, {rejectWithValue}) => {
        try {
            const {data} = await authService.refresh(refreshToken);
            return data;

        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const forgotPasswordRequest = createAsyncThunk(
    'authSlice/forgotPasswordRequest',
    async ({email}, {rejectWithValue}) => {
        try {
            const {data} = await authService.forgotPasswordRequest({email});
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
const forgotPasswordNewPassword = createAsyncThunk(
    'authSlice/forgotPasswordNewPassword',
    async ({password, actionToken}, {rejectWithValue}) => {
        try {
            const {data} = await authService.forgotPasswordNewPassword(password, actionToken);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
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
                const {user, tokens} = action.payload;
                state.userId = user._id;
                state.role = user.role;
                state.authUser = user;
                authService.saveTokensInLS({accessToken:tokens.accessToken, refreshToken:tokens.refreshToken});
                authService.saveUserIdInLS(user._id);

            })
            .addCase(loginByGoogle.fulfilled, (state, action) => {
                state.isAuth = true;
                state.isGoodle = true;
                const {user, tokens} = action.payload;
                state.userId = user._id;
                state.role = user.role;
                state.authUser = user;
                authService.saveTokensInLS({accessToken:tokens.accessToken, refreshToken:tokens.refreshToken});
                authService.saveUserIdInLS(user._id);

            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isAuth = false;
                state.errors = null;
                state.userId = null;
                state.role = null;
                authService.deleteTokensInLS();
                authService.deleteUserIdInLS();
                geolocationService.deleteGeoCoordsInLS();
            })
            .addCase(addFavoriteRest.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(removeFavoriteRest.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(forgotPasswordRequest.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(forgotPasswordNewPassword.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(setCurrentUser.fulfilled, (state, action) => {
                const {user,tokens} = action.payload;
                state.isAuth = true;
                state.userId = user._id;
                state.role = user.role;
                state.authUser = user;
                authService.deleteTokensInLS();
                authService.saveTokensInLS({accessToken:tokens.accessToken, refreshToken:tokens.refreshToken});

            })
            .addDefaultCase((state, action) => {
                defaultCaseReject(state, action); //тут нам action.payload повертає rejectWithValue(e.response.data) - з функцій-запитів
            })

});
const {reducer: authReducer} = authSlice;

const authActions = {
    register,
    login,
    loginByGoogle,
    logout,
    addFavoriteRest,
    removeFavoriteRest,
    forgotPasswordRequest,
    forgotPasswordNewPassword,
    setCurrentUser
};

export {authReducer, authActions};
