import css from './userInfo.module.css';
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../redux";
import API_URL from "../../config";
import {useEffect} from "react";
import {Link} from "react-router-dom";


const UserInfo = ({userId}) => {

    const {user} = useSelector(state => state.user)
    const {name, avatar} = user

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userActions.getById(userId))
    }, [userId])

    return (
        <div className={css.UserInfo}>
            {JSON.stringify(user) !== '{}' &&
                <div>
                    <div><b>{name}</b></div>
                    <Link to = {'/myAccount'}>Особистий кабінет</Link>
                </div>}

            {avatar &&
                <img className={css.AvatarImg} src={API_URL + avatar} alt={'аватарка'}/>}

        </div>
    );
};

export {UserInfo}
