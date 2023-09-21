/* eslint-disable react-hooks/exhaustive-deps */
import {Link, Outlet} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';

import {Header, ModalUC} from '../components';

import {authService, geolocationService} from '../services';
import {authActions, geoActions} from '../redux';

import css from './MainLayout.module.css';

const MainLayout = ()=> {

     const dispatch = useDispatch();
     useEffect(()=> {
         if ('geolocation' in navigator) {
             geolocationService.getGeolocationFromNavigator();
             dispatch(geoActions.setGeoLocation({isLocationAvailable: true, latitude: geolocationService.getLatitudeInLS(), longitude: geolocationService.getLongitudeInLS()}));
         }
     }, []);

     const refreshToken = authService.getRefreshTokenInLS();

     useEffect(()=> {
         if (refreshToken)
             dispatch(authActions.setCurrentUser({refreshToken}));
     },[]);

     const [modalIsVisible, setModalIsVisible] = useState(!refreshToken);

    return (
        <div className={css.Main}>
            <ModalUC modalText={'Запускаючи цей додаток, ви погоджуєтесь, що вам виповнилося 18 років'} show={modalIsVisible} onHide={setModalIsVisible} type={'warning'}></ModalUC>
            <Header/>
            <Outlet/>
            <flutter><Link className={css.PP} to={'/privacyPolicy'} ><b>Політика конфіденційності</b></Link></flutter>
        </div>
    );
};

export {MainLayout};
