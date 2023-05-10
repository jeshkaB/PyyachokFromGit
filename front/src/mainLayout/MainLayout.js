/* eslint-disable react-hooks/exhaustive-deps */
import {Outlet} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';

import {Header, ModalUC} from '../components';

import {authService, geolocationService} from '../services';
import {authActions, geoActions} from '../redux';

const MainLayout = ()=> {

     const dispatch = useDispatch();
     if ('geolocation' in navigator) {
         geolocationService.getGeolocationFromNavigator();
         dispatch(geoActions.setGeoLocation({isLocationAvailable: true, latitude: geolocationService.getLatitudeInLS(), longitude: geolocationService.getLongitudeInLS()}));
     }
     else {
         dispatch(geoActions.setGeoLocation({isLocationAvailable: null, latitude: null, longitude: null}));
     }
     const refreshToken = authService.getRefreshTokenInLS();

     useEffect(()=> {
         if (refreshToken)
             dispatch(authActions.setCurrentUser({refreshToken}));
     },[]);

     const [modalIsVisible, setModalIsVisible] = useState(!refreshToken);

    return (
        <div>
            <ModalUC modalText={'Запускаючи цей додаток, ви погоджуєтесь, що вам виповнилося 18 років'} show={modalIsVisible} onHide={setModalIsVisible} type={'warning'}></ModalUC>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};
