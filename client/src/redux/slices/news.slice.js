import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiService} from '../../services';
import {defaultCaseReject} from './utilityFunctions';
import {urls} from '../../constants';


const initialState = {
    newsAll: [],
    newsOne: {},
    errors: null,
    isChangeNewsList: false
};

const entity = urls.news;
const getAll = createAsyncThunk(
    'newsSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.getAll(entity);
            return data;


        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const create = createAsyncThunk(
    'newsSlice/create',
    async ({id, newsObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.createByRestId(entity, id, newsObj);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const getById = createAsyncThunk(
    'newsSlice/getById',
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
    'newsSlice/updateById',
    async ({id, newsObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.updateById(entity, id, newsObj);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const deleteById = createAsyncThunk(
    'newsSlice/deleteById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} =  await ApiService.deleteById(entity, id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
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
                    state.newsAll = action.payload;
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.newsOne = action.payload;
                })
                .addCase(create.fulfilled, (state, action) => {
                    state.errors = null;
                    state.newsOne = action.payload;
                    state.newsAll.push(action.payload);
                    state.isChangeNewsList = !state.isChangeNewsList;

                })
                .addCase(updateById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.newsOne = action.payload;
                    state.isChangeNewsList = !state.isChangeNewsList;
                })
                .addCase(deleteById.fulfilled, (state, action) => {
                    state.errors = null;
                    const index = state.newsAll.findIndex(news=>news._id === action.payload._id);
                    state.newsAll.splice(index,1);
                    state.isChangeNewsList = !state.isChangeNewsList;
                })
                .addDefaultCase((state, action) => {
                        defaultCaseReject(state, action);
            }
        )
    },
);
const {reducer: newsReducer} = newsSlice;
const newsActions = {getAll, getById, create, updateById, deleteById};

export {newsReducer, newsActions};
