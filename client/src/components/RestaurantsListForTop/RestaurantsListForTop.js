import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {restaurantActions} from "../../redux";
import {RestaurantCardForTop} from "./RestaurantCardForTop";

const RestaurantsListForTop = () => {
    const dispatch= useDispatch()
    const {restaurants} = useSelector(state => state.restaurant)
    useEffect(()=>{
        dispatch(restaurantActions.getAll())
    },[])

    return (
        <div>
            {restaurants && restaurants.map ( rest=>
                <RestaurantCardForTop key={rest._id} restaurant={rest}/>)
            }
        </div>
    );
};

export {RestaurantsListForTop}
