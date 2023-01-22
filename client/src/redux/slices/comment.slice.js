import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {commentService} from "../../services";


const initialState = {
    comments: [],
    comment: {},
    errors: null
};


const getAll = createAsyncThunk(
    'commentSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await commentService.getAll();
            return data


        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const create = createAsyncThunk(
    'commentSlice/create',
    async (commentObj,{rejectWithValue}) => {
        try {
            const {data} = await commentService.create(commentObj)
            return data
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getById = createAsyncThunk(
    'commentSlice/getById',
    async (id,{rejectWithValue}) => {
        try {
            const {data} = await commentService.getById(id)
            return data
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateById = createAsyncThunk(
    'commentSlice/updateById',
    async ({id,commentObj},{rejectWithValue}) => {
        try {
            const {data} = await commentService.updateById(id,commentObj)
            return data
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'commentSlice/deleteById',
    async (id,{rejectWithValue}) => {
        try {
            return await commentService.deleteById(id)
        }catch (e) {
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
                .addCase(getAll.rejected, (state, action) => {
                    state.errors = action.payload
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.comment = action.payload
                })
                .addCase(getById.rejected, (state, action) => {
                    state.errors = action.payload
                })

    },
)
const {reducer: commentReducer} = commentSlice;
const commentActions = {getAll, getById, create, updateById,deleteById};

export {commentReducer, commentActions}
