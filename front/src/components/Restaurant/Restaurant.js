/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

import API_URL from '../../config';
import {authActions, restaurantActions, userActions} from '../../redux';
import {geolocationService} from '../../services';
import {StarsRating} from '../StarsRating/starsRating';
import {Tag} from '../Tag/Tag';
import {ModalUC} from '../ModalUC/ModalUC';

import css from './Restaurant.module.css';


const Restaurant = () => {
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.restaurant);
    const {user} = useSelector(state => state.user);
    const {authUser, isAuth} = useSelector(state => state.auth);
    const {id} = useParams();
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const {isLocationAvailable} = useSelector(state => state.geo);
    const longitude = geolocationService.getLongitudeInLS();
    const latitude = geolocationService.getLatitudeInLS();

    const tags = restaurant?.tags?.split(',').map(tag => tag.trim());

    let alreadyFavorite = false;
    let userId = null;
    if (isAuth) {
        alreadyFavorite = user.favoriteRestaurants?.includes(id);
        userId = authUser._id;
    }
    const [stateFavorite, setStateFavorite] = useState(alreadyFavorite);

    useEffect(() => {
        dispatch(restaurantActions.getById(id));
    }, []);

    useEffect(() => {
        dispatch(userActions.getById(userId));
    }, [stateFavorite, userId]);


    const addFavorite = async () => {
        if (isAuth) {
            await dispatch(authActions.addFavoriteRest({userId, restId: id}));
            setStateFavorite(true);
        }
        else setModalIsVisible(true);
    };

    const removeFavorite = async () => {
        await dispatch(authActions.removeFavoriteRest({userId, restId: id}));
        setStateFavorite(false);
    };

    return (
        <div className={css.Hole}>
            <ModalUC modalText={'Увійдіть або зареєструйтеся'} show={modalIsVisible}
                     onHide={setModalIsVisible}></ModalUC>
            <div className={css.Header}>
                <div>
                    <div className={css.Name}>
                        {stateFavorite && <img className={css.ImgFav}
                                               src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzZJlK-LdEg8STV1noTrDC55VKSNUG3wejBQ&usqp=CAU'}
                                               alt={'малюнок'}/>}
                        <h1>{restaurant.name}</h1>
                    </div>
                    {!stateFavorite &&
                        <h3 style={{cursor: 'pointer'}} onClick={addFavorite}>Додати до улюблених</h3>}
                    {stateFavorite &&
                        <h5 className={css.NotFav} onClick={removeFavorite}>Прибрати з улюблених</h5>}
                </div>
                <div className={css.Pyyachok}>
                    <Link className={css.Link} to={'userEvents'}><h3> Пиячок </h3></Link>
                </div>
            </div>
            <div className={css.RestBlock}>
                <img width={'50%'} src={API_URL + restaurant?.mainImage} alt={'зображення закладу'}/>
                <div className={css.TextBlock}>
                    <div style={{marginBottom: 10}}><StarsRating rating={restaurant.rating}/></div>
                    <div> Адреса: {restaurant.place}</div>
                    {isLocationAvailable && restaurant.coordinates &&
                        <a href={`https://maps.google.com?saddr=${latitude},${longitude}&daddr=${restaurant.coordinates[1]},${restaurant.coordinates[0]}`}
                       className={css.Route}
                       target="_blank" rel="noreferrer"> Прокласти маршрут</a>}
                    <div> Телефон: {restaurant.phone}</div>
                    <div> Режим роботи: {restaurant.hours}</div>
                    <div> email: {restaurant.email} </div>
                    <div> Сайт: {restaurant.webSite} </div>
                    <div> Середній чек:{restaurant.averageBill} грн.</div>
                    <hr/>
                    теги:
                    {tags && <div> {tags.map(tag => <Tag key={tag} tag={tag}/>)}</div>}
                </div>
            </div>

        </div>
    );
};

export {Restaurant};
