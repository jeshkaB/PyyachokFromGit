import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiService} from "../../services";
import {defaultCaseReject} from "./utilityFunctions";
import {urls} from "../../constants";


const initialState = {
    restaurants: [],
    restaurant: {},
    errors: null
};

const entity = urls.restaurants;

const getAll = createAsyncThunk(
    'restaurantSlice/getAll',
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
    'restaurantSlice/create',
    async (restObj, {rejectWithValue}) => {
        try {
            return await ApiService.create(entity, restObj)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getById = createAsyncThunk(
    'restaurantSlice/getById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.getById(entity, id);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateById = createAsyncThunk(
    'restaurantSlice/updateById',
    async ({id, restObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.updateById(entity, id, restObj);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'restaurantSlice/deleteById',
    async (id, {rejectWithValue}) => {
        try {
            return await ApiService.deleteById(entity, id)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
//__________________________________________________________________

const restaurantSlice = createSlice({
        name: 'restaurantSlice',
        initialState,
        reducers: {},
        extraReducers: (builder) =>
            builder
                .addCase(getAll.fulfilled, (state, action) => {
                    state.errors = null;
                    state.restaurants = action.payload
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.restaurant = action.payload
                })
                .addDefaultCase((state, action) => {
                    defaultCaseReject(state, action)
                })
    }
)
const {reducer: restaurantReducer} = restaurantSlice;
const restaurantActions = {getAll, getById, create, updateById, deleteById};

export {restaurantReducer, restaurantActions}
