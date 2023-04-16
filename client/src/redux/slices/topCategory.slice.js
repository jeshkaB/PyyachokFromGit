import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiService} from "../../services";
import {defaultCaseReject} from "./utilityFunctions";
import {urls} from "../../constants";


const initialState = {
    topCategories: [],
    topCategory: {},
    stateChangeTop: false,
    errors: null
};

const entity = urls.topCategory;

const getAll = createAsyncThunk(
    'topCategorySlice/getAll',
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
    'topCategorySlice/create',
    async ({categObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.create(entity, categObj)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getById = createAsyncThunk(
    'topCategorySlice/getById',
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
    'topCategorySlice/updateById',
    async ({id, categObj}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.updateById(entity, id, categObj)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'topCategorySlice/deleteById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.deleteById(entity, id);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const addRestaurantInCategory = createAsyncThunk(
    'topCategorySlice/addRestaurantInCategory',
    async ({categId, restId}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.addRestaurantInCategory(entity, categId, restId);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const removeRestaurantInCategory = createAsyncThunk(
    'topCategorySlice/removeRestaurantInCategory',
    async ({categId, restId}, {rejectWithValue}) => {
        try {
            const {data} = await ApiService.removeRestaurantInCategory(entity, categId, restId);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
//__________________________________________________________________

const topCategorySlice = createSlice({
        name: 'topCategorySlice',
        initialState,
        reducers: {},
        extraReducers: (builder) =>
            builder
                .addCase(getAll.fulfilled, (state, action) => {
                    state.errors = null;
                    state.topCategories = action.payload
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.topCategory = action.payload
                })
                .addCase(create.fulfilled, (state, action) => {
                    state.errors = null;
                    state.topCategory = action.payload;
                    state.topCategories.push(action.payload)
                })
                .addCase(updateById.fulfilled, (state, action) => {
                    state.errors = null;
                    state.topCategory = action.payload;
                    const index = state.topCategories.findIndex(item => item._id === action.payload._id)
                    state.topCategories[index].title = action.payload.title
                })
                .addCase(deleteById.fulfilled, (state, action) => {
                    state.errors = null;
                    const index = state.topCategories.findIndex(item => item._id === action.payload._id)
                    state.topCategories.splice(index, 1)
                })
                .addCase(addRestaurantInCategory.fulfilled, (state, action) => {
                    state.errors = null;
                    state.stateChangeTop = !state.stateChangeTop
                })
                .addCase(removeRestaurantInCategory.fulfilled, (state, action) => {
                    state.errors = null;
                    state.stateChangeTop = !state.stateChangeTop
                })
                .addDefaultCase((state, action) => {
                    defaultCaseReject(state, action)
                })

    },
)
const {reducer: topCategoryReducer} = topCategorySlice;
const topCategoryActions = {getAll, getById, create, updateById, deleteById, addRestaurantInCategory, removeRestaurantInCategory};

export {topCategoryReducer, topCategoryActions}
