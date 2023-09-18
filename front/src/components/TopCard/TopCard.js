/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import {restaurantActions} from '../../redux';

import css from '../TopCard/TopCard.module.css';
import {RestaurantCardInTop} from '../RestaurantCardInTop/RestaurantCardInTop';

const TopCard = ({categ}) => {
    const dispatch = useDispatch();
    const {restaurants} = useSelector(state => state.restaurant);

    useEffect(() => {
        dispatch(restaurantActions.getAll());
    }, []);

   let restaurantsWithTheCategory=[];
   restaurants && restaurants.forEach(rest => {
       if (rest.topCategories.includes(categ._id))
           restaurantsWithTheCategory.push(rest);
   });
    const randomIntForRest = () => Math.floor(Math.random() * restaurantsWithTheCategory.length);
    const restaurantForRender = restaurantsWithTheCategory[randomIntForRest()];

    return (
        <div>
            {restaurantForRender &&
                <div className={css.Hole}>
                    <div className={css.Title}> {categ.title}</div>
                        <RestaurantCardInTop restaurant={restaurantForRender}/>
                </div>}
        </div>
    );
};

export {TopCard};
