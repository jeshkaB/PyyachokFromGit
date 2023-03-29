import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {restaurantActions} from "../../redux";
import {RestaurantCard} from "../RestaurantCard/RestaurantCard";

const RestaurantsForModeration = ({userId}) => {
    const dispatch = useDispatch();

    const {notModeratedRestaurants} = useSelector(state => state.restaurant)
    useEffect(()=>{
        dispatch(restaurantActions.getAll())
    },[dispatch])

    let notModeratedRestaurantsByUser
    if (userId) {// коли переходимо зі сторінки менеджера закладу
        notModeratedRestaurantsByUser = notModeratedRestaurants.filter(rest=>rest.user===userId)
        return (
            <div>
                {JSON.stringify(notModeratedRestaurants)===`[]` && <p>Закладів на модерації немає</p>}
                {notModeratedRestaurantsByUser && notModeratedRestaurantsByUser.map(rest => <RestaurantCard key={rest._id} restaurant={rest}/>)}
            </div>
        )}
    else // коли переходимо зі сторінки суперадміна
        return (
            <div>
                {JSON.stringify(notModeratedRestaurants)===`[]` && <p>Закладів на модерації немає</p>}
                {notModeratedRestaurants && notModeratedRestaurants.map(rest => <RestaurantCard key={rest._id} restaurant={rest}/>)}
            </div>
        );
};

export {RestaurantsForModeration}
