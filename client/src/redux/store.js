import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {restaurantReducer} from "./slices/restaurant.slice";
import {markReducer} from "./slices/mark.slice";
import {newsReducer} from "./slices/news.slice";



const rootReducer = combineReducers({
    restaurant: restaurantReducer,
    mark: markReducer,
    news: newsReducer
})

const setupStore = () => configureStore({
    reducer: rootReducer
})


export {setupStore}
