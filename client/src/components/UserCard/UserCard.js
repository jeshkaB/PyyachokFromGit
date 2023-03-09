
import css from "../UserInfo/userInfo.module.css";
import API_URL from "../../config";
import {useNavigate} from "react-router-dom";
import {roles} from "../../constants";

const UserCard = ({user}) => {
    const navigate = useNavigate();
    const {_id, name, email, avatar, role} = user


    return (
        <div>
            <div style={{border:'solid 1px black'}} onClick={()=>navigate(`../users/${_id}`, {state:user})}>
                <h3>{name}</h3>
                {role.includes(roles.REST_ADMIN) && <h5 style={{color: 'purple'}}> Менеджер закладу</h5>}
                <h4>{email}</h4>
                {avatar &&
                    <img className={css.AvatarImg} src={API_URL + avatar} alt={'аватарка'}/>}
            </div>
        </div>
    );
};

export {UserCard};
