import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {restaurantActions, userActions} from "../../redux";
import css from "../UserInfo/userInfo.module.css";
import API_URL from "../../config";
import {roles} from "../../constants";
import {RestaurantCard} from "../RestaurantCard/restaurantCard";

const User = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {user} = useSelector(state => state.user);
    const {restaurants} = useSelector(state => state.restaurant);
    const {name, email, avatar, restaurants: restOfUserIds, role} = user

    useEffect(() => {
        dispatch(userActions.getById(id))
    }, [dispatch])

    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, [dispatch])

    let restaurantsOfUser=[]
    if (restOfUserIds)
       restaurantsOfUser = restaurants.filter(rest => rest.user === id)
    return (
        <div>
            <div style={{border: 'solid 1px black'}}>
                <h4>{name}</h4>
                <h4>{email}</h4>
                {avatar &&
                    <img className={css.AvatarImg} src={API_URL + avatar} alt={'аватарка'}/>}
                {role.includes(roles.REST_ADMIN) &&
                    <div>
                        Менеджер закладу:
                        {restaurantsOfUser.map(rest => <RestaurantCard key={rest._id} restaurant={rest}/>)}
                    </div>}
            </div>
        </div>
    );
};
export {User};
