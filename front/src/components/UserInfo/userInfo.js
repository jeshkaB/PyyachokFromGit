import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import API_URL from '../../config';
import {roles} from '../../constants';
import {authActions} from '../../redux';
import {signOutByFacebook, signOutByGoogle} from '../../services';

import css from './userInfo.module.css';

const UserInfo = ({user, isSocNetwork}) => {
    const {role, name, avatar} = user;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clickExit = async () => {
        if (isSocNetwork==='google')
            await signOutByGoogle();
        else if (isSocNetwork==='facebook')
            await signOutByFacebook();
        await dispatch(authActions.logout());
        navigate('../home');
    };

    return (
        <div className={css.UserInfo}>
            {user &&
                <div>
                    <div className={css.Auth}><Link className={css.Link} to={'/myAccount'}>Особистий кабінет</Link></div>
                    {role && role.includes(roles.REST_ADMIN) &&
                        <div className={css.Auth}><Link className={css.Link} to={'/restaurantManager'}>Адміністрування закладів</Link></div>}
                    {role && role.includes(roles.SUPER_ADMIN) &&
                        <div className={css.Auth}><Link className={css.Link} to={'/superAdmin'}>Адміністрування сайту</Link></div>}
                    <div className={css.Quit} onClick={clickExit}>Вийти</div>
                </div>}
            <div className={css.User}>
                <div><b>{name}</b></div>
                {avatar &&
                    <img className={css.AvatarImg} src={API_URL + avatar} alt={'аватарка'}/>}
            </div>
        </div>
    );
};

export {UserInfo};
