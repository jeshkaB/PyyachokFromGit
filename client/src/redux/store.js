import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/auth.slice";
import {restaurantReducer} from "./slices/restaurant.slice";
import {markReducer} from "./slices/mark.slice";
import {newsReducer} from "./slices/news.slice";
import {commentReducer} from "./slices/comment.slice";
import {userReducer} from "./slices/user.slice";
import {userEventReducer} from "./slices/userEvent.slice";
import {eventAnswerReducer} from "./slices/eventAnswer.slice";
import {generalNewsReducer} from "./slices/generalNews.slice";


let rootReducer;
rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    mark: markReducer,
    news: newsReducer,
    comment: commentReducer,
    user: userReducer,
    userEvent: userEventReducer,
    eventAnswer: eventAnswerReducer,
    generalNews: generalNewsReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
})


export {setupStore}
