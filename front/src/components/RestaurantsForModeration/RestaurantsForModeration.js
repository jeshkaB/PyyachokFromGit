import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import {restaurantActions} from '../../redux';
import {RestaurantCard} from '../RestaurantCard/RestaurantCard';

const RestaurantsForModeration = ({userId}) => {
    const dispatch = useDispatch();

    const {notModeratedRestaurants, isChangeRestaurantsList} = useSelector(state => state.restaurant);
    useEffect(() => {
        dispatch(restaurantActions.getAll());
    }, [dispatch, isChangeRestaurantsList]);

    let restaurantsForCard;
    if (userId) // коли переходимо зі сторінки менеджера закладу
        restaurantsForCard = notModeratedRestaurants.filter(rest => rest.user === userId);
    else restaurantsForCard = notModeratedRestaurants.filter(rest => !rest.moderationMessage); // зі сторінки суперадміна

    return (
        <div style={{display: 'flex'}}>
            {JSON.stringify(notModeratedRestaurants) === '[]' && <p>Закладів на модерації немає</p>}
            {restaurantsForCard && restaurantsForCard.map(rest => <RestaurantCard key={rest._id} restaurant={rest}/>)}
        </div>
    );
};

export {RestaurantsForModeration};
