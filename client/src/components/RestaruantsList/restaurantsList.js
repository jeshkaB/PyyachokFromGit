import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {restaurantActions} from "../../redux";

import {RestaurantCard} from "../RestaurantCard/restaurantCard";
import './restListStyle.css'


const RestaurantsList = ({userId}) => {
    const dispatch = useDispatch();
    const {restaurants} = useSelector(state => state.restaurant);// в нашому редюсері state.restaurant є об’єкти restaurants і restaurant

    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, [dispatch])

    let restaurantsForCards
    if (!userId) restaurantsForCards=restaurants
    else restaurantsForCards = restaurants.filter(rest => rest.user === userId);


    return (
            <div className={'RestList'}>
                <div>{restaurantsForCards.map(restaurant => <RestaurantCard key={restaurant._id} restaurant={restaurant}/>)} </div>
            </div>
        );
}

export {RestaurantsList};
