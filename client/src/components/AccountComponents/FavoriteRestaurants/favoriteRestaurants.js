import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {userActions} from "../../../redux";
import {RestaurantCard} from "../../RestaurantCard/RestaurantCard";
import css from './FavoriteRestaurants.module.css'

const FavoriteRestaurants = ({user:{_id}, restaurants}) => {
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.user)

    useEffect(()=> {
        dispatch(userActions.getById(_id))
    },[dispatch])

    const {favoriteRestaurants} = user //тут айдішки

    let favoriteRests = [];//вибираємо повні обєкти ресторанів, маючи масив айдішок улюблених ресторанів
    if (favoriteRestaurants) {
        favoriteRestaurants.forEach(favorId => {
            restaurants.forEach(rest => {
                if (rest._id === favorId) favoriteRests.push(rest);

            });
        })
    }

    return (
        <div>
                {favoriteRests.length > 0 &&
                    <div className={css.RestList} > {favoriteRests.map(restaurant => <RestaurantCard key={restaurant._id} restaurant={restaurant}/>)} </div>
                }
                {favoriteRests.length < 1 &&
                    <p style={{color:'darkgray'}}>У вас досі немає улюблених закладів</p>
                }

        </div>

    );
}

export {FavoriteRestaurants};
