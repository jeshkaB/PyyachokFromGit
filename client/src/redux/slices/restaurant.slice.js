import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {restaurantService} from "../../services";


const initialState = {
    restaurants: [/*{"_id": "1", "name": "Заглушка"}*/],
    restaurant: {},
    errors: null
};


const getAll = createAsyncThunk(
    'restaurantSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getAll();
            return data

        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const create = createAsyncThunk(
    'restaurantSlice/create',
    async (restObj,{rejectWithValue}) => {
        try {
            return await restaurantService.create(restObj)
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getById = createAsyncThunk(
    'restaurantSlice/getById',
    async (id,{rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getById(id);
            return data
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateById = createAsyncThunk(
    'restaurantSlice/updateById',
    async ({id,restObj},{rejectWithValue}) => {
        try {
            const {data} = await restaurantService.updateById(id,restObj);
            return data
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'restaurantSlice/deleteById',
    async (id,{rejectWithValue}) => {
        try {
            return await restaurantService.deleteById(id)
        }catch (e) {
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
                .addCase(getAll.rejected, (state, action) => {
                    state.errors = action.payload
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.restaurant = action.payload
                })
                .addCase(getById.rejected, (state, action) => {
                    state.errors = action.payload
                })

    },
)
const {reducer: restaurantReducer} = restaurantSlice;
const restaurantActions = {getAll, getById, create, updateById,deleteById};

export {restaurantReducer, restaurantActions}
