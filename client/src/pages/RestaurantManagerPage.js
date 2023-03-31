import {useSelector} from "react-redux";

import {RestaurantCreate, RestaurantsForModeration, RestaurantsList} from "../components";

const RestaurantManagerPage = () => {
    const {errors} = useSelector(state => state.restaurant)
    const {userId} = useSelector(state => state.auth);

    return (
        <div style={{marginLeft:20}}>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}

            <RestaurantCreate userId={userId}/>
            <div style={{border: 'solid 1px gray', borderRadius:20, padding: 10}}>
                <h3>Заклади на модерації </h3>
                <RestaurantsForModeration userId={userId}/>
             </div>
            <div>
            <h3>Мої заклади </h3>
            <RestaurantsList userId={userId}/>
            </div>
        </div>
    );
}

export {RestaurantManagerPage};
