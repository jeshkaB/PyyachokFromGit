import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {restaurantReducer} from "./slices/restaurant.slice";
import {markReducer} from "./slices/mark.slice";
import {newsReducer} from "./slices/news.slice";
import {commentReducer} from "./slices/comment.slice";



const rootReducer = combineReducers({

    restaurant: restaurantReducer,
    mark: markReducer,
    news: newsReducer,
    comment:commentReducer
})

const setupStore = () => configureStore({
    reducer: rootReducer
})


export {setupStore}
