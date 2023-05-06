import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiService} from '../../services';
import {defaultCaseReject} from './utilityFunctions';
import {urls} from '../../constants';


const initialState = {
    eventAnswers: [],
    eventAnswer: {},
    errors: null,
    isChangeEventAnswersList: false
};

const entity = urls.eventAnswers;

const getAll = createAsyncThunk(
    'eventAnswerSlice/getAll',
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
    'eventAnswerSlice/create',
    async ({id, answObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.createByUserEventId(entity, id, answObj);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const getById = createAsyncThunk(
    'eventAnswerSlice/getById',
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
    'eventAnswerSlice/updateById',
    async ({id, answObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.updateById(entity, id, answObj);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const deleteById = createAsyncThunk(
    'eventAnswerSlice/deleteById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.deleteById(entity, id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
//__________________________________________________________________

const eventAnswerSlice = createSlice({
        name: 'eventAnswerSlice',
        initialState,
        reducers: {
            setStateForm: (state,action)=>{
                state.stateForm = action.payload;
            }
        },
        extraReducers: (builder) =>
            builder
                .addCase(getAll.fulfilled, (state, action) => {
                    state.errors = null;
                    state.eventAnswers = action.payload;
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.eventAnswer = action.payload;
                })
                .addCase(create.fulfilled, (state, action) => {
                    state.errors = null;
                    state.eventAnswer = action.payload;
                    state.eventAnswers.push(action.payload);
                    state.isChangeEventAnswersList = !state.isChangeEventAnswersList;
                })
                .addCase(updateById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.eventAnswer = action.payload;
                    state.isChangeEventAnswersList = !state.isChangeEventAnswersList;
                })
                .addCase(deleteById.fulfilled, (state, action) => {
                    state.errors = null;
                    const index = state.eventAnswers.findIndex(event=>event._id === action.payload._id);
                    state.eventAnswers.splice(index,1);
                    state.isChangeEventAnswersList = !state.isChangeEventAnswersList;
                })
                .addDefaultCase((state, action) => {
                    defaultCaseReject(state, action);
                })

    },
);
const {reducer: eventAnswerReducer} = eventAnswerSlice;
const eventAnswerActions = {getAll, getById, create, updateById, deleteById};

export {eventAnswerReducer, eventAnswerActions};
