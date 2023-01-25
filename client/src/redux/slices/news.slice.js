import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiService} from "../../services";


const initialState = {
    newsAll: [],
    newsOne: {},
    errors: null
};

const entity = 'new'// не news, тому що до цієї назви в урлі додається "s"
const getAll = createAsyncThunk(
    'newsSlice/getAll',
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
    'newsSlice/create',
    async (newsObj,{rejectWithValue}) => {
        try {
            const {data} = await ApiService.create(entity,newsObj)
            return data
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getById = createAsyncThunk(
    'newsSlice/getById',
    async (id,{rejectWithValue}) => {
        try {
            const {data} = await ApiService.getById(entity,id)
            return data
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateById = createAsyncThunk(
    'newsSlice/updateById',
    async ({id,newsObj},{rejectWithValue}) => {
        try {
            const {data} = await ApiService.updateById(entity,id,newsObj)
            return data
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'newsSlice/deleteById',
    async (id,{rejectWithValue}) => {
        try {
            return await ApiService.deleteById(entity,id)
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
//__________________________________________________________________

const newsSlice = createSlice({
        name: 'newsSlice',
        initialState,
        reducers: {},
        extraReducers: (builder) =>
            builder
                .addCase(getAll.fulfilled, (state, action) => {
                    state.errors = null;
                    state.newsAll = action.payload
                })
                .addCase(getAll.rejected, (state, action) => {
                    state.errors = action.payload
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.newsOne = action.payload
                })
                .addCase(getById.rejected, (state, action) => {
                    state.errors = action.payload
                })

    },
)
const {reducer: newsReducer} = newsSlice;
const newsActions = {getAll, getById, create, updateById,deleteById};

export {newsReducer, newsActions}
