/* eslint-disable react-hooks/exhaustive-deps */
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import {roles} from '../constants';
import {restaurantActions} from '../redux';

import css from './RestaurantForAdminPage.module.css';

import {ChangeManager, NewsCreate, NewsList, RestaurantForAdmin} from '../components';

const RestaurantForAdminPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {role, isAuth} = useSelector(state => state.auth);

    const {restaurant} = useSelector(state => state.restaurant);

    useEffect(() => {
        dispatch(restaurantActions.getById(id));
    }, []);


    return (
        <div className={css.Hole}>
            <div className={css.Block}>
                {isAuth && role.includes(roles.SUPER_ADMIN) &&
                    <ChangeManager restId = {id}/>}
                <RestaurantForAdmin restId = {id} role = {role} restaurant={restaurant}/>

                <div className={css.ToMark}
                     onClick={() => navigate(`/restaurants/${id}/marks`)}>Оцінки</div>
                <Link className={css.Link} to={`../restaurants/${id}/comments`}><div className={css.To}>Відгуки</div></Link>
            </div>
            <div className={css.BlockNews}>
                <h3 style={{textAlign:'center'}}> Новини </h3>
                <NewsCreate restId={id}/>
                <NewsList restId={id}/>
            </div>
        </div>
    );
};

export {RestaurantForAdminPage};
