
import API_URL from "../../config";
import {StarsRating} from "../StarsRating/starsRating";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {restaurantActions} from "../../redux";
import {useParams} from "react-router-dom";
import './restaurantStyle.css'

const Restaurant = () => {

    const {restaurant} = useSelector(state => state.restaurant);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(restaurantActions.getById(id))
    }, [id])

    return (
    <div className={'Rest'}>
            <h1>{restaurant.name}</h1>
            <img width={'50%'} src={API_URL + restaurant.mainImage} alt={'зображення закладу'}/>
            <div><StarsRating rating={restaurant.rating}/></div>
            <div> Адреса: {restaurant.place}</div>
            <div> Телефон: {restaurant.phone}</div>
            <div> Режим роботи: {restaurant.hours}</div>
            <div> email: {restaurant.email} </div>
            <div> Сайт: {restaurant.webSite} </div>
            <div> Середній чек:{restaurant.averageBill} грн.</div>

    </div>
)
};

export {Restaurant};
