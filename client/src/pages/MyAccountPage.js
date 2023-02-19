import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {restaurantActions, userActions} from "../redux";
import {FavoriteRestaurants, MyComments, MyMarks, MyUserEvents, UpdateAccount} from "../components";

const MyAccountPage = () => {
    const dispatch = useDispatch();
    const {userId, errors: authErrors} = useSelector(state => state.auth);
    const {user, errors: userErrors} = useSelector(state => state.user);

    const {restaurants} = useSelector(state => state.restaurant)

    useEffect(() => {
        dispatch(userActions.getById(userId))
    }, [userId]);

    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, [dispatch]);

    return (
        <div>
            {authErrors &&
            <h3 className={'errors'}> {authErrors.message} </h3>
            }
            {userErrors &&
                <h3 className={'errors'}> {userErrors.message} </h3>
            }
                <div style={{border: 'solid'}}>
                    <h2>Улюблені заклади</h2>
                    <div><FavoriteRestaurants user={user}/></div>
                </div>
                <div>
                <div> <UpdateAccount user={user}/></div>
                <div> <MyMarks user={user}/></div>
                <div> <MyComments user={user} restaurants={restaurants}/></div>
                <div> <MyUserEvents user={user}/></div>
                </div>

        </div>
    );
}

export {MyAccountPage};
