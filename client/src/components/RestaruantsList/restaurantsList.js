import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {markActions, restaurantActions} from "../../redux";

import {RestaurantCard} from "../RestaurantCard/restaurantCard";
import './restListStyle.css'


const RestaurantsList = () => {

    const {restaurants} = useSelector(state => state.restaurant);// в нашому редюсері state.restaurant є об’єкти restaurants і restaurant

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, [])


    return (
        <div className={'RestList'}>

            <div>{restaurants.map(restaurant => <RestaurantCard key={restaurant._id} restaurant={restaurant}/>)} </div>

        </div>
    );
}

export {RestaurantsList};
