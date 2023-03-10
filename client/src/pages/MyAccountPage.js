import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {restaurantActions, userActions} from "../redux";
import {FavoriteRestaurants, MyComments, MyMarks, MyUserEvents, UpdateAccount} from "../components";
import {logDOM} from "@testing-library/react";
import {useNavigate} from "react-router-dom";

const MyAccountPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {authUser: user, errors: authErrors, isAuth} = useSelector(state => state.auth);

    const {restaurants} = useSelector(state => state.restaurant)
    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, []);


    return (
        <div>
            {isAuth && <div>
                {authErrors &&
                    <h3 className={'errors'}> {authErrors.message} </h3>
                }
                <div style={{border: 'solid'}}>
                    <h2>Улюблені заклади</h2>
                    <div><FavoriteRestaurants user={user} restaurants={restaurants}/></div>
                </div>
                <div>
                    <div><UpdateAccount user={user}/></div>
                    <div><MyMarks user={user}/></div>
                    <div><MyComments user={user} restaurants={restaurants}/></div>
                    <div><MyUserEvents user={user}/></div>
                </div>
            </div>

            }
        </div>
    );
}

export {MyAccountPage};
