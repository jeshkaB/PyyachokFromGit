import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
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
        <div className={css.Hole}>
            {isAuth &&
                <div>
                    <div className={css.FavRest}>
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
