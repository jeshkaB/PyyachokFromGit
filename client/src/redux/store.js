import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {restaurantReducer} from "./slices/restaurant.slice";


const rootReducer = combineReducers({
    restaurant: restaurantReducer
    // news: genresReducer,
    // theme: themeReducer,
    // movie: movieReducer,
    // moviesByGenre:moviesByGenreReducer
})

const setupStore = ()=>configureStore({
    reducer:rootReducer
})


export {setupStore}
