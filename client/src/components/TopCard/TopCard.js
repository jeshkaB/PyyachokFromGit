import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import css from '../TopCard/TopCard.module.css';
import {restaurantActions} from "../../redux";
import {RestaurantCard} from "../RestaurantCard/RestaurantCard";


const TopCard = ({categ}) => {
    const dispatch = useDispatch();
    const {restaurants} = useSelector(state => state.restaurant);

    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, []);

   let restaurantsWithTheCategory=[]
   restaurants.forEach(rest => {
       if (rest.topCategories.includes(categ._id))
           restaurantsWithTheCategory.push(rest)
   })
    const randomIntForRest = () => Math.floor(Math.random() * restaurantsWithTheCategory.length)
    const restaurantForRender = restaurantsWithTheCategory[randomIntForRest()]

    const isTop = true
    return (
        <div>
            {restaurantForRender &&
                <div className={css.Hole}>
                    <div className={css.Title}> {categ.title}</div>
                    <RestaurantCard restaurant={restaurantForRender} isTop={isTop}/>
                </div>}
        </div>
    );
};

export {TopCard}
