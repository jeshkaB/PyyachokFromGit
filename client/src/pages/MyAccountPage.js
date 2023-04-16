import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {restaurantActions} from "../redux";
import {FavoriteRestaurants, ModalUC, MyComments, MyMarks, MyUserEvents, UpdateAccount} from "../components";

import css from './MyAccountPage.module.css'

const MyAccountPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {authUser: user, isAuth} = useSelector(state => state.auth);

    useEffect(()=>{
        if (!isAuth) {
            navigate('../home')
        }
    },[])
    const {restaurants} = useSelector(state => state.restaurant)
    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, []);

    return (
        <div >
            {isAuth &&
                <div className={css.Hole}>
                    <div className={css.FavRest}>
                        <h2>Улюблені заклади</h2>
                        <div><FavoriteRestaurants user={user} restaurants={restaurants}/></div>
                    </div>
                    <div className={css.Account}>
                        <div className={css.ToAc}><UpdateAccount user={user}/></div>
                        <div className={css.To}><MyMarks user={user}/></div>
                        <div className={css.To}><MyComments user={user} restaurants={restaurants}/></div>
                        <div className={css.To}><MyUserEvents user={user}/></div>
                    </div>
                </div>

            }
        </div>
    );
}

export {MyAccountPage};
