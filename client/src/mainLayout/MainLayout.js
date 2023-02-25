import {Outlet} from 'react-router-dom'
import {Header} from "../components";
import {geolocationService} from "../services";
import {keysLS} from "../constants";
import {useDispatch} from "react-redux";
import {geoActions} from "../redux";


 const MainLayout = ()=> {
     const dispatch = useDispatch();
     if ("geolocation" in navigator) {
         geolocationService.getGeolocationFromNavigator();
         dispatch(geoActions.setGeoLocation({isLocationAvailable:true, latitude:geolocationService.getLatitudeInLS(), longitude: geolocationService.getLongitudeInLS()}))
     }
     else {
         dispatch(geoActions.setGeoLocation(null));
     }
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
}

export {MainLayout}
