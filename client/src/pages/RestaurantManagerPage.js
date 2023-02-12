import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {userActions} from "../redux";
import {RestaurantCreate, RestaurantsList} from "../components";

const RestaurantManagerPage = () => {
    const {errors} = useSelector(state => state.restaurant)

const dispatch = useDispatch();

const {userId} = useSelector(state => state.auth);
// const {user} = useSelector(state => state.user);
useEffect(()=> {
    dispatch(userActions.getById(userId))
},[dispatch])

    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <RestaurantCreate userId={userId}/>
            <div style={{border: 'solid 1px gray'}}>
                <h3>Мої заклади </h3>
                <RestaurantsList userId={userId}/>
             </div>
        </div>
    );
}

export {RestaurantManagerPage};
