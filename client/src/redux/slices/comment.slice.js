import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiService} from "../../services";
import {defaultCaseReject} from "./utilityFunctions";
import {urls} from "../../constants";


const initialState = {
    comments: [],
    comment: {},
    errors: null
};

const entity = urls.comments;

const getAll = createAsyncThunk(
    'commentSlice/getAll',
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
    'commentSlice/create',
    async ({commentObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.create(entity, commentObj)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getById = createAsyncThunk(
    'commentSlice/getById',
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
    'commentSlice/updateById',
    async ({id, commentObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.updateById(entity, id, commentObj)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'commentSlice/deleteById',
    async (id, {rejectWithValue}) => {
        try {
            return await ApiService.deleteById(entity, id)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
//__________________________________________________________________

const commentSlice = createSlice({
        name: 'commentSlice',
        initialState,
        reducers: {},
        extraReducers: (builder) =>
            builder
                .addCase(getAll.fulfilled, (state, action) => {
                    state.errors = null;
                    state.comments = action.payload
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.comment = action.payload
                })
                .addDefaultCase((state, action) => {
                    defaultCaseReject(state, action)
                })

    },
)
const {reducer: commentReducer} = commentSlice;
const commentActions = {getAll, getById, create, updateById, deleteById};

export {commentReducer, commentActions}
