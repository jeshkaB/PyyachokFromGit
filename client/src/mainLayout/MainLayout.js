import {Outlet} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {Header} from "../components";

import {authService, geolocationService} from "../services";
import {authActions, geoActions} from "../redux";


 const MainLayout = ()=> {

     const dispatch = useDispatch();
     if ("geolocation" in navigator) {
         geolocationService.getGeolocationFromNavigator();
         dispatch(geoActions.setGeoLocation({isLocationAvailable:true, latitude:geolocationService.getLatitudeInLS(), longitude: geolocationService.getLongitudeInLS()}))
     }
     else {
         dispatch(geoActions.setGeoLocation(null));
     }
     const refreshToken = authService.getRefreshTokenInLS();

     useEffect(()=> {

         if (refreshToken)
             dispatch(authActions.setCurrentUser({refreshToken}))
     },[])

    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
}

export {MainLayout}
