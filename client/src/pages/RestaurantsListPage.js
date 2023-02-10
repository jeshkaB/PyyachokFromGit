import {RestaurantsList} from "../components";
import {useSelector} from "react-redux";

const RestaurantsListPage = () => {
    const {errors} = useSelector(state => state.restaurant)

    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <RestaurantsList/>
        </div>
    );
};

export {RestaurantsListPage};
