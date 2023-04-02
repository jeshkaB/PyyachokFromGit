import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {restaurantActions} from "../../redux";
import {paginationLimits} from "../../constants/paginationLimits";

import {RestaurantCardForTop} from "./RestaurantCardForTop";
import {RestaurantSearchForm} from "../RestaurantsList/RestaurantSearchForm";
import {PaginationUC} from "../PaginationUC/PaginationUC";

import css from "../UsersList/UsersList.module.css";


const RestaurantsListForTop = () => {
    const dispatch= useDispatch()
    const {restaurants} = useSelector(state => state.restaurant);
    const {stateChangeTop} = useSelector(state => state.topCategory)

    const [restaurantsOnPage, setRestaurantsOnPage] = useState([])

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('restName') || '';
    const restaurantsFound = restaurants.filter(rest => rest.name.toLowerCase().includes(searchQuery))

    useEffect(()=>{
        dispatch(restaurantActions.getAll())
    },[stateChangeTop])

    return (
        <div>
            <RestaurantSearchForm setSearchParams={setSearchParams}/>
            {(searchQuery && JSON.stringify(searchQuery)!=='')
                ?
                <div>
                    <button onClick={()=>setSearchParams('')}>Скинути пошук</button>
                    <div className={css.List}>
                        {restaurantsFound.map(rest => <RestaurantCardForTop key={rest._id} restaurant={rest}/>)}
                    </div>
                </div>
                :
                <div>
                    {restaurantsOnPage.map(rest=><RestaurantCardForTop key={rest._id} restaurant={rest}/>)}
                    <PaginationUC entitiesList={restaurants} setEntitiesOnPage={setRestaurantsOnPage} limit={paginationLimits.restaurantsLimit}/>
                 </div>}
        </div>
    );
};

export {RestaurantsListForTop}
