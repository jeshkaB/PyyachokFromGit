/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';

import {restaurantActions} from '../../redux';
import {Button} from 'react-bootstrap';

import {RestaurantSearchForm} from './RestaurantSearchForm';
import {RestaurantsSort} from './RestaurantsSort';
import {RestaurantsFilter} from './RestaurantsFilter';
import {PaginationUC} from '../PaginationUC/PaginationUC';
import {RestaurantCard} from '../RestaurantCard/RestaurantCard';

import css from './RestaurantsList.module.css';

const RestaurantsList = ({tag}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const {restaurantsSorted:restaurants,totalItems, limit} = useSelector(state => state.restaurant);
    const {isLocationAvailable, latitude, longitude} = useSelector(state => state.geo);
    useEffect(()=> {
        if (isLocationAvailable && searchParams.get('sort')==='distance')
            setSearchParams (searchParams => {
                searchParams.set('latitude', `${latitude}`);
                searchParams.set('longitude', `${longitude}`);
                return searchParams;
            });
    }, [searchParams]);

    if (tag)
    setSearchParams (searchParams => {
        searchParams.set('tags', tag);
        return searchParams;
    });

    useEffect(() => {
        dispatch(restaurantActions.getModeratedRestByParams({
                latitude: searchParams.get('latitude'),
                longitude: searchParams.get('longitude'),
                rating:searchParams.get('rating'),
                averageBill:searchParams.get('averageBill'),
                tags: searchParams.get('tags'),
                search: searchParams.get('search'),
                sort: searchParams.get('sort'),
                sortOrder: searchParams.get('sortOrder'),
                page: searchParams.get('page'),
            }));
    }, [searchParams]);

    const [isReset, setIsReset] = useState(false);

    const resetFilters = () => {
         setSearchParams (searchParams => {
            for (const key of searchParams.keys())
                searchParams.delete(key);
         });
        setIsReset(!isReset);
    };

            return (
                <div className={css.Hole}>
                    {!isLocationAvailable && <h4> Ваша локація не визначена </h4>}
                    <div className={css.Nav}>
                        <RestaurantSearchForm setSearchParams={setSearchParams}/>
                        <RestaurantsFilter setSearchParams={setSearchParams} isReset = {isReset}/>
                        <RestaurantsSort setSearchParams={setSearchParams} isReset = {isReset}/>
                    </div>
                    <div style={{marginBottom:'5px'}}> <Button size={'sm'} variant="outline-warning" onClick={resetFilters}>Скинути всі фільтри і сортування</Button></div>

                    {location.pathname === '/home' && <Button variant="outline-secondary" onClick={() => navigate('/restaurants')}>Всі заклади більш детально </Button>}
                    {restaurants && <div className={css.RestList}>{restaurants.map(rest => <RestaurantCard key={rest._id} restaurant={rest}/>)} </div>}
                    <PaginationUC setSearchParams={setSearchParams} searchParams = {searchParams} totalItems = {totalItems} limit = {limit}/>
                </div>
            );
        };

export {RestaurantsList};
