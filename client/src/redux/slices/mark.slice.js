import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiService} from "../../services";
import {defaultCaseReject} from "./utilityFunctions";
import {urls} from "../../constants";


const initialState = {
    marks: [],
    mark: null,
    errors: null
};

const entity = urls.marks;
const getAll = createAsyncThunk(
    'markSlice/getAll',
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
    'markSlice/create',
    async ({id, markObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.createByRestId(entity, id, markObj)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getById = createAsyncThunk(
    'markSlice/getById',
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
    'markSlice/updateById',
    async ({id, markObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.updateById(entity, id, markObj)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'markSlice/deleteById',
    async (id, {rejectWithValue}) => {
        try {
            return await ApiService.deleteById(entity, id)
        } catch (e) {
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
            .addCase(getById.fulfilled, (state, action) => {
                state.errors = null;
                state.mark = action.payload
            })
            .addCase(create.fulfilled, (state, action) => {
                state.errors = null;
                state.mark = action.payload;
                state.marks.push(action.payload)
            })
            .addCase(updateById.fulfilled, (state, action) => {
                state.errors = null;
                state.mark = action.payload
            })
            .addCase(deleteById.fulfilled, (state, action) => {
                state.errors = null;
                const index = state.marks.findIndex(event=>event._id === action.payload)
                state.marks.splice(index,1)
            })
            .addDefaultCase((state, action) => {
                    defaultCaseReject(state, action)
        },
    )
})
const {reducer: markReducer} = markSlice;
const markActions = {getAll, getById, create, updateById, deleteById};

export {markReducer, markActions}
