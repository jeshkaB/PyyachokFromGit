import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {restaurantActions} from "../../redux";

import {RestaurantCard} from "../RestaurantCard/restaurantCard";
import './restListStyle.css'

const RestaurantsList = () => {

    const {restaurants} = useSelector(state => state.restaurant);// в нашому редюсері state.restaurant є об’єкти restaurants і restaurant

    //в новинах ми вже отримали список ресторанів в стейт
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, [])

    return (
        <div className ={'RestList'}>
            {restaurants.map(restaurant => <RestaurantCard key={restaurant._id} restaurant={restaurant}/>)}
        </div>
    );
}

export {RestaurantsList};
