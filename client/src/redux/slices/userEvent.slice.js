import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiService} from "../../services";
import {defaultCaseReject} from "./utilityFunctions";
import {urls} from "../../constants";


const initialState = {
    userEvents: [],
    userEvent: {},
    stateForm: false,
    errors: null,
    isChangeUserEventsList: false
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
            const {data} = await ApiService.deleteById(entity, id);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
//__________________________________________________________________

const userEventSlice = createSlice({
        name: 'userEventSlice',
        initialState,
        reducers: {
            setStateForm: (state,action)=>{
                state.stateForm = action.payload
            }
        },
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
                    state.userEvents.push(action.payload);
                    state.isChangeUserEventsList = !state.isChangeUserEventsList
                })
                .addCase(updateById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.userEvent = action.payload;
                    state.isChangeUserEventsList = !state.isChangeUserEventsList;
                })
                .addCase(deleteById.fulfilled, (state, action) => {
                    state.errors = null;
                    const index = state.userEvents.findIndex(event=>event._id === action.payload._id)
                    state.userEvents.splice(index,1);
                    state.isChangeUserEventsList = !state.isChangeUserEventsList
                })
                .addDefaultCase((state, action) => {
                    defaultCaseReject(state, action)
                })

    },
)
const {reducer: userEventReducer, actions:{setStateForm}} = userEventSlice;
const userEventActions = {getAll, getById, create, updateById, deleteById, setStateForm};

export {userEventReducer, userEventActions}
