import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {restaurantActions} from "../../redux";

import {RestaurantCard} from "../RestaurantCard/restaurantCard";
import './restListStyle.css'
import {useSearchParams} from "react-router-dom";
import {RestaurantSearchForm} from "./RestaurantSearchForm";
import {RestaurantsSort} from "./RestaurantsSort";
import {RestaurantsFilter} from "./RestaurantsFilter";
import {categoriesForRestSort} from "../../constants";
import {paginationLimits} from "../../constants/paginationLimits";
import {PaginationUC} from "../PaginationUC/PaginationUC";


const RestaurantsList = ({userId, tag}) => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const {restaurants} = useSelector(state => state.restaurant);
    const {isLocationAvailable,latitude, longitude} = useSelector(state => state.geo);

    if (tag) setSearchParams({tag})

    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, [dispatch])

    const searchQuery = searchParams.get('restName') || ''

    const [selectedCatSort, setSelectedCatSort] = useState('')

    const initialStatesForFilter = {startRating:[0,5], startBill:[0,100000],startTags: ''}
    const [ratingFilter, setRatingFilter] = useState(initialStatesForFilter.startRating)
    const [billFilter, setBillFilter] = useState(initialStatesForFilter.startBill)
    const [tagsFilter, setTagsFilter] = useState(initialStatesForFilter.startTags)
    const [minRating, maxRating] = ratingFilter;
    const [minBill, maxBill] = billFilter;

    const [{name:rating}, {name:averageBill}, {name:date}, {name}, {name:distance}] = categoriesForRestSort.categoriesSort

    const resetFilters = ()=> {
        setRatingFilter(initialStatesForFilter.startRating);
        setBillFilter(initialStatesForFilter.startBill);
        setTagsFilter(initialStatesForFilter.startTags);
        setSelectedCatSort('');
        setSearchParams('')
    }

    let sortedRestaurantsList=[]
    if (userId) sortedRestaurantsList = restaurants.filter(rest => rest.user === userId);
    else if (searchParams.get('tag')) sortedRestaurantsList = restaurants.filter(rest => rest.tags?.includes(searchParams.get('tag')))
    else {
        if (!selectedCatSort)
            sortedRestaurantsList = restaurants
        else
            switch (selectedCatSort) {
                case rating:
                    sortedRestaurantsList = [...restaurants].sort((a,b)=> b.rating - a.rating)
                    break;
                case averageBill:
                    sortedRestaurantsList = [...restaurants].sort((a,b)=> a.averageBill - b.averageBill)
                    break;
                case date:
                    sortedRestaurantsList = [...restaurants].reverse()// масив початково відсортований по даті від найстаршого до найновішого
                    break;
                case name:
                    sortedRestaurantsList = [...restaurants].sort((a,b)=> a.name.localeCompare(b.name))
                    break;
                case distance:

                    const restaurantsWithDistance = restaurants.map((currentRest)=> {
                        const rest = Object.assign({}, currentRest);
                        if (isLocationAvailable) rest.distance = Math.hypot((rest.coordinates[0] - longitude), (rest.coordinates[1] - latitude))
                        return rest;
                    });
                    sortedRestaurantsList = [...restaurantsWithDistance].sort((a,b)=> a.distance - b.distance)
                    break;
                default:
                    sortedRestaurantsList = restaurants
        }
    }
    const restaurantsListForCards = sortedRestaurantsList
        .filter(rest => rest.name.toLowerCase().includes(searchQuery))
        .filter(rest => minRating <= rest.rating && rest.rating <= maxRating)
        .filter(rest => minBill <= rest.averageBill && rest.averageBill <= maxBill)
        .filter(rest => tagsFilter !== '' ? rest.tags?.includes(tagsFilter) : rest)

    const [restaurantsOnPage, setRestaurantsOnPage] = useState(restaurantsListForCards.slice(0, paginationLimits.restaurantsLimit))


    return (
            <div >
                {JSON.stringify(restaurants)==='[]' && <h4> Закладів поки що немає </h4> }
                <RestaurantSearchForm setSearchParams={setSearchParams} searchQuery={searchQuery} />
                <RestaurantsFilter setRatingFilter={setRatingFilter} setBillFilter={setBillFilter} setTagsFilter={setTagsFilter} />
                <RestaurantsSort setSelectedCatSort={setSelectedCatSort} selectedCatSort={selectedCatSort}/>
                <div style={{cursor:'pointer', border:'solid darkorange', color: 'darkorange', width:'400px'}} onClick={()=>resetFilters()}>Скинути всі фільтри і сортування</div>
                {!isLocationAvailable && <h4> Ваша локація не визначена </h4> }
                <div className={'RestList'}>{restaurantsOnPage.map(rest => <RestaurantCard key={rest._id} restaurant={rest}/>)}
                </div>
                <PaginationUC entitiesList={restaurantsListForCards} setEntitiesOnPage={setRestaurantsOnPage} limit={paginationLimits.restaurantsLimit}/>
            </div>
        );
}

export {RestaurantsList};
