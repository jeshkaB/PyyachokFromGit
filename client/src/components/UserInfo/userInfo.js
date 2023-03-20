import css from './userInfo.module.css';
import API_URL from "../../config";
import {Link} from "react-router-dom";
import {roles} from "../../constants";


const UserInfo = ({user}) => {
const {role, name, avatar} = user

    return (
        <div className={css.UserInfo}>
            {user &&
                <div>
                    <div><b>{name}</b></div>
                    <Link to = {'/myAccount'}>Особистий кабінет</Link>
                    <br/>
                    {role && role.includes(roles.REST_ADMIN) && <Link to = {'/restaurantManager'}>Адміністрування закладів</Link>}
                    {role && role.includes(roles.SUPER_ADMIN) && <Link to = {'/superAdmin'}>Адміністрування сайту</Link>}
                </div>}

            {avatar &&
                <img className={css.AvatarImg} src={API_URL + avatar} alt={'аватарка'}/>}

        </div>
    );
};

export {UserInfo}
