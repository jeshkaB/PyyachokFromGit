import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {userActions} from "../redux";
import {FavoriteRestaurants, RestaurantCard, UpdateAccount} from "../components";

const MyAccountPage = (props) => {

    const {userId} = useSelector(state => state.auth);
    const {user, errors} = useSelector(state => state.user);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userActions.getById(userId))
    }, [userId]);


    return (
        <div>
            {errors !== null &&
            <h2> {errors.message} </h2>}
            <div style={{border: 'solid'}}>
                <p>Улюблені заклади</p>
                <div> <FavoriteRestaurants user={user}/> </div>
            </div>
            <div>
                <div> <UpdateAccount user={user}/></div>
                <div>my marks</div>
                <div>my comments</div>
                <div>my user events</div>
            </div>

        </div>
    );
}

export {MyAccountPage};
