import {RestaurantsList} from "../components";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

const RestaurantsListPage = () => {
    const location = useLocation();
    const tag = location.state?.tag || ''

    const {errors} = useSelector(state => state.restaurant)

    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <RestaurantsList tag={tag}/>
        </div>
    );
};

export {RestaurantsListPage};
