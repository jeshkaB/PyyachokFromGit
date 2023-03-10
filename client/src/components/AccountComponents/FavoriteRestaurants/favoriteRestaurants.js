import {useDispatch, useSelector} from "react-redux";
import {RestaurantCard} from "../../RestaurantCard/restaurantCard";
import css from './favoriteRestaurants.module.css';
import {useEffect} from "react";
import {restaurantActions, userActions} from "../../../redux";

const FavoriteRestaurants = ({user:{_id}, restaurants}) => {
    const dispatch = useDispatch();
    // const {restaurants} = useSelector(state => state.restaurant)

    const {user} = useSelector(state => state.user)

    useEffect(()=> {
        dispatch(userActions.getById(_id))
    },[])

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
                    <div className={css.FavRest}> {favoriteRests.map(restaurant => <RestaurantCard key={restaurant._id} restaurant={restaurant}/>)} </div>
                }
                {favoriteRests.length < 1 &&
                    <div> У вас досі немає улюблених закладів </div>
                }

        </div>

    );
}

export {FavoriteRestaurants};
