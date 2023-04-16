import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isLocationAvailable: null,
    latitude: null,
    longitude: null
};
const geoSlice = createSlice({
    name: 'geoSlice',
    initialState,
    reducers: {
        setGeoLocation: (state,action)=> {
            state.isLocationAvailable = action.payload.isLocationAvailable;
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude
        }
    }

})

const {reducer: geoReducer, actions:{setGeoLocation}} = geoSlice;
const geoActions = {setGeoLocation};

export {geoReducer, geoActions}
