import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiService} from "../../services";
import {defaultCaseReject} from "./utilityFunctions";
import {urls} from "../../constants";


const initialState = {
    userEvents: [],
    userEvent: {},
    errors: null
};

const entity = urls.userEvents;

const getAll = createAsyncThunk(
    'userEventSlice/getAll',
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
    'userEventSlice/create',
    async ({id, eventObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.createByRestId(entity, id, eventObj)
            return data

        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getById = createAsyncThunk(
    'userEventSlice/getById',
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
    'userEventSlice/updateById',
    async ({id, eventObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.updateById(entity, id, eventObj)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'userEventSlice/deleteById',
    async (id, {rejectWithValue}) => {
        try {
            return await ApiService.deleteById(entity, id)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
//__________________________________________________________________

const userEventSlice = createSlice({
        name: 'userEventSlice',
        initialState,
        reducers: {},
        extraReducers: (builder) =>
            builder
                .addCase(getAll.fulfilled, (state, action) => {
                    state.errors = null;
                    state.userEvents = action.payload
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.userEvent = action.payload
                })
                .addCase(create.fulfilled, (state, action) => {
                    state.errors = null;
                    state.userEvent = action.payload;
                    state.userEvents.push(action.payload)

                })
                .addCase(updateById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.userEvent = action.payload
                })
                .addCase(deleteById.fulfilled, (state, action) => {
                    state.errors = null;
                })
                .addDefaultCase((state, action) => {
                    defaultCaseReject(state, action)
                })

    },
)
const {reducer: userEventReducer} = userEventSlice;
const userEventActions = {getAll, getById, create, updateById, deleteById};

export {userEventReducer, userEventActions}
