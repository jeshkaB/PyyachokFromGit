/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import {restaurantActions} from '../../redux';

import {RestaurantCardForTop} from './RestaurantCardForTop';
import {RestaurantSearchForm} from '../RestaurantsList/RestaurantSearchForm';
import {PaginationUC} from '../PaginationUC/PaginationUC';

import css from '../UsersList/UsersList.module.css';

const RestaurantsListForTop = () => {
    const dispatch = useDispatch();
        const {restaurantsSorted:restaurants,totalItems, limit} = useSelector(state => state.restaurant);
    const {stateChangeTop} = useSelector(state => state.topCategory);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        dispatch(restaurantActions.getModeratedRestByParams({
            search: searchParams.get('search'),
            page: searchParams.get('page'),
        }));
    }, [searchParams,stateChangeTop]);

    return (
        <div>
            <RestaurantSearchForm setSearchParams={setSearchParams}/>
            {(searchQuery && JSON.stringify(searchQuery) !== '') &&
                <div>
                    <button onClick={() => setSearchParams('')}>Скинути пошук</button>
                </div>}
            <div className={css.List}>
                {restaurants.map(rest => <RestaurantCardForTop key={rest._id} restaurant={rest}/>)}
            </div>
            <div>
                <PaginationUC setSearchParams={setSearchParams} searchParams = {searchParams} totalItems = {totalItems} limit = {limit}/>
            </div>
        </div>
    );
};

export {RestaurantsListForTop};
