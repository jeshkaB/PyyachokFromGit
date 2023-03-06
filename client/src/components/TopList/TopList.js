import {RestaurantCard} from "../RestaurantCard/restaurantCard";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {restaurantActions, topCategoryActions} from "../../redux";
import {TopCard} from "../TopCard/TopCard";


const TopList = () => {
    const dispatch = useDispatch();
    const {topCategories} = useSelector(state => state.topCategory);

    useEffect(() => {
        dispatch(topCategoryActions.getAll())
    }, []);


    //TODO ця штука коректно працює, лише коли в одній топ категорії один ресторан - треба допрацювати
    return (
        <div style={{border:'solid 2px blue'}}>
            <h2>Топ закладів</h2>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                {topCategories?.map(categ =>
                            <TopCard key={categ._id} categ={categ}/>
                    )}
            </div>
        </div>
    );
};

export {TopList}
