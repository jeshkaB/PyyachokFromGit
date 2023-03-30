import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiService} from "../../services";
import {defaultCaseReject} from "./utilityFunctions";
import {urls} from "../../constants";


const initialState = {
    restaurants: [],//модеровані ресторани
    notModeratedRestaurants: [],
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
    async ({restObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.create(entity, restObj)
            return data
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
            const {data} =  await ApiService.deleteById(entity, id)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const sendMessage = createAsyncThunk(
    'restaurantSlice/sendMessage',
    async ({restId,userId,text}, {rejectWithValue}) => {
        try {
            const {data} =  await ApiService.sendMessageToRestaurant(entity, restId, userId, text )
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const changeRestAdmin = createAsyncThunk(
    'restaurantSlice/changeRestAdmin',
    async ({restId,userId}, {rejectWithValue}) => {
        try {
            const {data} =  await ApiService.changeRestAdmin(entity, restId, userId)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const completeViews = createAsyncThunk(
    'restaurantSlice/completeViews',
    async ({restId}, {rejectWithValue}) => {
        try {
            const {data} =  await ApiService.completeViews(entity, restId)
            return data
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
                    state.restaurants = action.payload.filter(rest=>rest.moderated === true) //модеровані ресторани
                    state.notModeratedRestaurants = action.payload.filter(rest=>rest.moderated === false)

                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.restaurant = action.payload
                })
                .addCase(create.fulfilled, (state, action) => {
                    state.errors = null;
                    state.restaurant = action.payload
                    state.restaurants.push(action.payload)
                })
                .addCase(updateById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.restaurant = action.payload
                })
                .addCase(deleteById.fulfilled, (state, action) => {
                    state.errors = null;
                    const index = state.restaurants.findIndex(rest=>rest._id === action.payload._id);
                    state.restaurants.slice(index,1)
                })
                .addCase(sendMessage.fulfilled, (state, action) => {
                    state.errors = null;
                })
                .addCase(changeRestAdmin.fulfilled, (state, action) => {
                    state.errors = null;
                    state.restaurant = action.payload
                })
                .addCase(completeViews.fulfilled, (state, action) => {
                    state.errors = null
                })
                .addDefaultCase((state, action) => {
                    defaultCaseReject(state, action)
                })
    }
)
const {reducer: restaurantReducer} = restaurantSlice;
const restaurantActions = {getAll, getById, create, updateById, deleteById, sendMessage, changeRestAdmin, completeViews};

export {restaurantReducer, restaurantActions}
