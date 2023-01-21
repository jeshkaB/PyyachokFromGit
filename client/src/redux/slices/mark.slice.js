import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {markService} from "../../services";


const initialState = {
    marks: [],
    mark: null,
    errors: null
};


const getAll = createAsyncThunk(
    'markSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await markService.getAll();
            return data


        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const create = createAsyncThunk(
    'markSlice/create',
    async (markObj,{rejectWithValue}) => {
        try {
            return await markService.create(markObj)
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getById = createAsyncThunk(
    'markSlice/getById',
    async (id,{rejectWithValue}) => {
        try {
            return await markService.getById(id)
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateById = createAsyncThunk(
    'markSlice/updateById',
    async ({id,markObj},{rejectWithValue}) => {
        try {
            return await markService.updateById(id,markObj)
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'markSlice/deleteById',
    async (id,{rejectWithValue}) => {
        try {
            return await markService.deleteById(id)
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
//__________________________________________________________________

const markSlice = createSlice({
        name: 'markSlice',
        initialState,
        reducers: {},
        extraReducers: (builder) =>
            builder
                .addCase(getAll.fulfilled, (state, action) => {
                    state.errors = null;
                    state.marks = action.payload
                })
                .addCase(getAll.rejected, (state, action) => {
                    state.errors = action.payload
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.mark = action.payload
                })
                .addCase(getById.rejected, (state, action) => {
                    state.errors = action.payload
                })

    },
)
const {reducer: markReducer} = markSlice;
const markActions = {getAll, getById, create, updateById,deleteById};

export {markReducer, markActions}
