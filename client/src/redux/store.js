import {combineReducers, configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    // restaurants: moviesReducer,
    // news: genresReducer,
    // theme: themeReducer,
    // movie: movieReducer,
    // moviesByGenre:moviesByGenreReducer
})

const setupStore = ()=>configureStore({
    reducer:rootReducer
})


export {setupStore}
