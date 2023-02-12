import {NewsForAdmin, RestaurantForAdmin} from "../components";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

const RestaurantForAdminPage = () => {
    const {errors} = useSelector(state => state.restaurant);


    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <RestaurantForAdmin/>
            <NewsForAdmin/>
        </div>
    );
};

export {RestaurantForAdminPage};
