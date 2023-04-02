import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import API_URL from "../../config";
import {roles} from "../../constants";
import {userActions} from "../../redux";

import css from "./UserCard.module.css";

const UserCard = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id, name, email, avatar, role} = user;

    const clickDeleteRole = async ()=> {
       await dispatch(userActions.updateById({id:_id, userObj: {role: [roles.USER]}}))
    }

    return (
        <div>
            <div className={css.Hole} onClick={()=>navigate(`../users/${_id}`, {state: user})}>
                <h3>{name}</h3>
                {role.includes(roles.REST_ADMIN) && <div>
                    <h5 style={{color: 'purple'}}> Адміністратор закладу</h5>
                    <button onClick={clickDeleteRole}> Зняти статус адміна закладу</button>
                </div>}
                <h4>{email}</h4>
                {avatar &&
                    <img className={css.AvatarImg} src={API_URL + avatar} alt={'аватарка'}/>}
            </div>
        </div>
    );
};

export {UserCard};
