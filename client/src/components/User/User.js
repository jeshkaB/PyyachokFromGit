import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {restaurantActions, userActions} from "../../redux";
import css from "../UserInfo/userInfo.module.css";
import API_URL from "../../config";
import {roles} from "../../constants";
import {MyMarks} from "../AccountComponents/MyMarks/MyMarks";
import {MyComments} from "../AccountComponents/MyComments/MyComments";
import {MyUserEvents} from "../AccountComponents/MyEvents/MyUserEvents";

const User = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {restaurants} = useSelector(state => state.restaurant);
    const {_id, name, email, avatar, restaurants: restOfUserIds, role} = user

    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, [dispatch])

    let restaurantsOfUser = []
    if (restOfUserIds)
        restaurantsOfUser = restaurants.filter(rest => rest.user === _id)
    return (
        <div>
            <div style={{border: 'solid 1px black'}}>
                <h4>{name}</h4>
                <h4>{email}</h4>
                {avatar &&
                    <img className={css.AvatarImg} src={API_URL + avatar} alt={'аватарка'}/>}
                {role && role.includes(roles.REST_ADMIN) &&
                    <div>
                        Адміністратор закладу:
                        {restaurantsOfUser.map(rest => <h4 style={{cursor:'pointer'}} key={rest._id} onClick={()=>navigate(`../restaurantsForAdmin/${_id}`)} > {rest.name} </h4>)}
                    </div>}
                <div style={{border:'solid 1px '}}>
                    <h3>Діяльність користувача </h3>
                    <div> <MyMarks user={user}/></div>
                    <div> <MyComments user={user} restaurants={restaurantsOfUser}/></div>
                    <div> <MyUserEvents user={user}/></div>
                </div>
            </div>
        </div>
    );
};
export {User};
