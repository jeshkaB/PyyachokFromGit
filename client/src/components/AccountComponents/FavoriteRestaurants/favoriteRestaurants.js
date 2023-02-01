import {useSelector} from "react-redux";
import {RestaurantCard} from "../../RestaurantCard/restaurantCard";
import css from './favoriteRestaurants.module.css';

const FavoriteRestaurants = ({user}) => {

    const {restaurants} = useSelector(state => state.restaurant)
    const {favoriteRestaurants} = user //тут айдішки

    const favoriteRests = [];//вибираємо повні обєкти ресторанів, маючи масив айдішок улюблених ресторанів
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
