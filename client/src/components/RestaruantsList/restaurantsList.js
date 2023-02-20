import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {restaurantActions} from "../../redux";

import {RestaurantCard} from "../RestaurantCard/restaurantCard";
import './restListStyle.css'
import {useSearchParams} from "react-router-dom";


const RestaurantsList = ({userId, tag}) => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const {restaurants} = useSelector(state => state.restaurant);
    if (tag) setSearchParams({tag})

    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, [dispatch])


    const submit = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        setSearchParams({restName:query});
    }

    const searchQuery = searchParams.get('restName') || ''
    const [search, setSearch]= useState(searchQuery)

    let restaurantsForCards
    if (userId) restaurantsForCards = restaurants.filter(rest => rest.user === userId);
    else if (searchParams.get('tag')) restaurantsForCards = restaurants.filter(rest => rest.tags?.includes(searchParams.get('tag')))
    else restaurantsForCards = restaurants

    return (
            <div >
                {JSON.stringify(restaurants)==='[]' && <h4> Закладів поки що немає </h4> }
                <form style={{display:'flex'}} onSubmit={submit}>
                    <input style={{ width:'300px'}}
                           type="search"
                           name="search"
                           placeholder="пошук по найменуванню закладу"
                           value={search}
                           onChange={e=> setSearch(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                <div className={'RestList'}>{restaurantsForCards
                    .filter(restaurant=>restaurant.name.toLowerCase().includes(searchQuery))
                    .map(restaurant => <RestaurantCard key={restaurant._id} restaurant={restaurant}/>)} </div>
            </div>
        );
}

export {RestaurantsList};
