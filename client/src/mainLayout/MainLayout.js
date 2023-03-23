import {Outlet} from 'react-router-dom'
import {Header} from "../components";
import {authService, geolocationService} from "../services";
import {keysLS} from "../constants";
import {useDispatch} from "react-redux";
import {authActions, geoActions} from "../redux";
import {useEffect} from "react";
import {ChartUC} from "../components/ChartUC/ChartUC";



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
