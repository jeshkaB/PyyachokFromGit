import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiService} from "../../services";
import {defaultCaseReject} from "./utilityFunctions";
import {urls} from "../../constants";

const initialState = {
    users: [],
    user: {},
    errors: null
};

const entity = urls.users

const getAll = createAsyncThunk(
    'userSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.getAll(entity);
            return data


        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const create = createAsyncThunk(
    'userSlice/create',
    async (userObj, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.create(entity, userObj)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getById = createAsyncThunk(
    'userSlice/getById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.getById(entity, id)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateById = createAsyncThunk(
    'userSlice/updateById',
    async ({id, userObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.updateById(entity, id, userObj)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'userSlice/deleteById',
    async (id, {rejectWithValue}) => {
        try {
            return await ApiService.deleteById(entity, id)
        } catch (e) {
            return rejectWithValue(e.response.data)
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
                    state.users = action.payload
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.user = action.payload
                })
                .addDefaultCase((state, action) => {
                    defaultCaseReject(state,action)
                })
    },
)
const {reducer: userReducer} = userSlice;
const userActions = {getAll, getById, create, updateById,deleteById};

export {userReducer, userActions}
