import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiService} from "../../services";
import {defaultCaseReject} from "./utilityFunctions";

const initialState = {
    views: [],
    errors: null
};

const getAll = createAsyncThunk(
    'viewStatisticsSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.getViewStatisticsAll();
            return data

        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const getByRestId = createAsyncThunk(
    'viewStatisticsSlice/getByRestId ',
    async (restId, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.getViewStatisticsByRestId(restId);
            return data

        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
//__________________________________________________________________

const viewStatisticsSlice = createSlice({
        name: 'viewStatisticsSlice',
        initialState,
        reducers: {},
        extraReducers: (builder) =>
            builder
                .addCase(getAll.fulfilled, (state, action) => {
                    state.errors = null;
                    state.views= action.payload
                })
                .addCase(getByRestId.fulfilled, (state, action) => {
                    state.errors = null;
                    state.views = action.payload
                })
                .addDefaultCase((state, action) => {
                    defaultCaseReject(state, action)
                })

    },
)
const {reducer: viewStatisticsReducer} = viewStatisticsSlice;
const viewStatisticsActions = {getAll, getByRestId};

export {viewStatisticsReducer,viewStatisticsActions}
