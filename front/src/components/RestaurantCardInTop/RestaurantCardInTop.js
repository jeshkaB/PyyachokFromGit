import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {restaurantActions} from '../../redux';

import {StarsRating} from '../StarsRating/starsRating';

import css from './RestaurantCardInTop.module.css';

const RestaurantCardInTop = ({restaurant}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userId} = useSelector(state => state.auth);
    const {_id, name, place, rating} = restaurant;

    const clickToRest = async () => {
        if (!userId) navigate(`../restaurants/${_id}`);
        else {
            await dispatch(restaurantActions.completeViews({restId: _id}));
            navigate(`../restaurants/${_id}`);
        }
    };
    return (
        <div>
            <div className={css.TopCard} onClick={clickToRest}>
                <h3 className={css.Header}>{name}</h3>
                <StarsRating key={_id} rating={rating}/>
                <div>{place}</div>
            </div>
        </div>
    );
};

export {RestaurantCardInTop};
