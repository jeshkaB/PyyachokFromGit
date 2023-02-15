import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiService} from "../../services";
import {defaultCaseReject} from "./utilityFunctions";
import {urls} from "../../constants";


const initialState = {
    newsAll: [],
    newsOne: {},
    errors: null
};

const entity = urls.generalNews
const getAll = createAsyncThunk(
    'generalNewsSlice/getAll',
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
    'generalNews/create',
    async ({newsObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.create(entity, newsObj)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getById = createAsyncThunk(
    'generalNews/getById',
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
    'generalNewsSlice/updateById',
    async ({id, newsObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.updateById(entity, id, newsObj)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'generalNews/deleteById',
    async (id, {rejectWithValue}) => {
        try {
            return await ApiService.deleteById(entity, id)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
//__________________________________________________________________

const generalNewsSlice = createSlice({
        name: 'generalNewsSlice',
        initialState,
        reducers: {},
        extraReducers: (builder) =>
            builder
                .addCase(getAll.fulfilled, (state, action) => {
                    state.errors = null;
                    state.newsAll = action.payload
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.newsOne = action.payload
                })
                .addCase(create.fulfilled, (state, action) => {
                    state.errors = null;
                    state.newsOne = action.payload
                    state.newsAll.push(action.payload)
                })
                .addCase(updateById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.newsOne = action.payload
                })
                .addCase(deleteById.fulfilled, (state, action) => {
                    state.errors = null;
                    // const index = state.newsAll.findIndex(news=>news._id === action.payload)
                    // state.newsAll.splice(index,1)
               })
                .addDefaultCase((state, action) => {
                        defaultCaseReject(state, action)
            }
        )
    },
)
const {reducer: generalNewsReducer} = generalNewsSlice;
const generalNewsActions = {getAll, getById, create, updateById, deleteById};

export {generalNewsReducer, generalNewsActions}
