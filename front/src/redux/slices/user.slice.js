import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiService} from '../../services';
import {defaultCaseReject} from './utilityFunctions';
import {urls} from '../../constants';

const initialState = {
    users: [],
    user: {},
    totalItems: 0,
    page: 1,
    limit: 10,
    errors: null,
    isChangeUsersList: false
};

const entity = urls.users;

const getAll = createAsyncThunk(
    'userSlice/getAll',
    async ({email, page}, {rejectWithValue}) => {
        try {

            const {data} = await ApiService.getAll(entity, email, page);
            console.log(data)
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const create = createAsyncThunk(
    'userSlice/create',
    async (userObj, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.create(entity, userObj);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const getById = createAsyncThunk(
    'userSlice/getById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.getById(entity, id);
            return data;

        } catch (e) {
            return rejectWithValue(e.response.data);

        }
    }
);

const updateById = createAsyncThunk(
    'userSlice/updateById',
    async ({id, userObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.updateById(entity, id, userObj);
            return data;

        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const deleteById = createAsyncThunk(
    'userSlice/deleteById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.deleteById(entity, id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const changePassword = createAsyncThunk(
    'userSlice/changePassword',
    async ({id, passObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.changePassword(entity, id, passObj);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

//__________________________________________________________________

const userSlice = createSlice({
        name: 'userSlice',
        initialState,
        reducers: {},

        extraReducers: (builder) =>
            builder
                .addCase(getAll.fulfilled, (state, action) => {
                    state.errors = null;
                    state.users = action.payload.users;
                    state.totalItems = action.payload.totalItems;
                    state.page = action.payload.page;
                    state.limit = action.payload.limit;
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.user = action.payload;
                })
                .addCase(create.fulfilled, (state, action) => {
                    state.errors = null;
                    state.restaurant = action.payload;
                    state.users.push(action.payload);
                    state.isChangeUsersList = !state.isChangeUsersList;
                })
                .addCase(updateById.fulfilled, (state, action) => {
                    state.errors = null;
                    // const currentUser = state.users.find(item=>item._id = action.payload._id);
                    // state.users = Object.assign(currentUser,action.payload)
                    state.user = action.payload;
                    state.isChangeUsersList = !state.isChangeUsersList;
                })
                .addCase(deleteById.fulfilled, (state, action) => {
                    state.errors = null;
                    const index = state.users.findIndex(user=>user._id === action.payload._id);
                    state.users.slice(index,1);
                    state.isChangeUsersList = !state.isChangeUsersList;
                })

                .addCase(changePassword.fulfilled, (state, action) => {
                    state.errors = null;
                    // state.user = action.payload
                })
                .addDefaultCase((state, action) => {
                    defaultCaseReject(state,action);
                })
    },
);
const {reducer: userReducer/*, actions: {setStateOfUpdating}*/} = userSlice;
const userActions = {getAll, getById, create, updateById, deleteById, changePassword};

export {userReducer, userActions};
