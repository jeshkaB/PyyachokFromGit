import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {restaurantActions, userActions} from "../../redux";
import API_URL from "../../config";
import {roles} from "../../constants";

import {MyMarks} from "../AccountComponents/MyMarks/MyMarks";
import {MyComments} from "../AccountComponents/MyComments/MyComments";
import {MyUserEvents} from "../AccountComponents/MyEvents/MyUserEvents";

import css from './User.module.css'
const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const {user,isChangeUsersList} = useSelector(state => state.user)
    useEffect(() => {
        dispatch(userActions.getById(id))
    }, [isChangeUsersList])
    const {_id, name, email, avatar, restaurants: restOfUserIds, role} = user

    const {restaurants} = useSelector(state => state.restaurant);
    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, [dispatch])

    let restaurantsOfUser = []
    if (restOfUserIds)
        restaurantsOfUser = restaurants.filter(rest => rest.user === _id)
    return (
        <div className={css.Hole}>
            <div className={css.UserInfo}>
                <h4>{name}</h4>
                <h4>{email}</h4>
                {avatar &&
                    <img className={css.AvatarImg} src={API_URL + avatar} alt={'аватарка'}/>}
                {role && role.includes(roles.REST_ADMIN) &&
                    <div>
                        Адміністратор закладу:
                        {restaurantsOfUser.map(rest => <h4 style={{cursor: 'pointer'}} key={rest._id}
                                                           onClick={() => navigate(`../restaurantsForAdmin/${_id}`)}> {rest.name} </h4>)}
                    </div>}
            </div>
            <div className={css.UserActs}>
                <h3>Діяльність користувача </h3>
                <div><MyMarks user={user}/></div>
                <div><MyComments user={user} restaurants={restaurantsOfUser}/></div>
                <div><MyUserEvents user={user}/></div>
            </div>

        </div>
    );
};
export {User};
