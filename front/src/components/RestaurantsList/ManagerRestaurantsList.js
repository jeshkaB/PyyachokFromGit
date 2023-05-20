import css from './RestaurantsList.module.css';
import {RestaurantCard} from '../RestaurantCard/RestaurantCard';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {restaurantActions} from '../../redux';

const ManagerRestaurantsList = ({userId}) => {
    const dispatch = useDispatch();
    
    const {restaurants} = useSelector(state => state.restaurant);
    useEffect(()=> {
        dispatch(restaurantActions.getAll());
    }, []);
    
    const restaurantsOfUser = restaurants.filter(res => res.user ===userId);
    
    return (
        <div>
            {restaurants && <div className={css.RestList}>{restaurantsOfUser.map(rest => <RestaurantCard key={rest._id} restaurant={rest}/>)} </div>}
        </div>
    );
};

export {ManagerRestaurantsList};
