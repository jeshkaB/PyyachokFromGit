import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {restaurantReducer} from "./slices/restaurant.slice";
import {markReducer} from "./slices/mark.slice";
import {newsReducer} from "./slices/news.slice";
import {commentReducer} from "./slices/comment.slice";
import {userReducer} from "./slices/user.slice";
import {authReducer} from "./slices/auth.slice";
import {userEventReducer} from "./slices/userEvent.slice";




const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    mark: markReducer,
    news: newsReducer,
    comment: commentReducer,
    user: userReducer,
    userEvent: userEventReducer
})

const setupStore = () => configureStore({
    reducer: rootReducer
})


export {setupStore}
