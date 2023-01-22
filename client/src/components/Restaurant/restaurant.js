
import API_URL from "../../config";
import {StarsRating} from "../StarsRating/starsRating";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {restaurantActions} from "../../redux";
import {useParams} from "react-router-dom";

const Restaurant = () => {

    const {restaurant} = useSelector(state => state.restaurant);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(restaurantActions.getById(id))
    }, [id])

    return (
    <div>
            <h1>{restaurant.name}</h1>
            <img width={300} height={300} src={API_URL + restaurant.mainImage} alt={'зображення закладу'}/>
            {/*<div><StarsRating marksOfRest={restaurant.marks}/></div>*/}
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
