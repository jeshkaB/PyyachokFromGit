import {keysLS} from "../constants";

const geolocationService = {
    getGeolocationFromNavigator: () => {
         navigator.geolocation.getCurrentPosition(position => {
                localStorage.setItem(keysLS.userLongitude, position.coords.longitude);
                localStorage.setItem(keysLS.userLatitude, position.coords.latitude)
            })
    },
    getLatitudeInLS: ()=> localStorage.getItem(keysLS.userLatitude),
    getLongitudeInLS: ()=> localStorage.getItem(keysLS.userLongitude),
    deleteGeoCoordsInLS: ()=> {
        localStorage.removeItem(keysLS.userLatitude);
        localStorage.removeItem(keysLS.userLongitude);
    }
}

export {geolocationService}
