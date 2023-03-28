import './HeaderStyle.css'
import {Link, useNavigate} from "react-router-dom";
import {UserInfo} from "../UserInfo/userInfo";
import {useDispatch, useSelector} from "react-redux";
import {authActions, userActions} from "../../redux";
import {app, authService, signOutByGoogle} from "../../services";
import {useEffect} from "react";
import {GoogleSignIn} from "../GoogleSignIn/GoogleSignIn";
import {getAuth, signOut} from "firebase/auth";


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuth, authUser, isGoogle} = useSelector(state => state.auth);
    // const {user} = useSelector(state => state.user);
    const isManager = true

    const clickExit = async () => {
        if (isGoogle)
            await signOutByGoogle()
        await dispatch(authActions.logout())
        navigate('../home')
    }

    return (
        <div className={'Header'}>
            <div><Link to={'/home'}> На головну </Link></div>
            <div><Link to={'/UserEvents'}> Пиячок </Link></div>
            <div>
                {!isAuth ?
                    <div>
                        <GoogleSignIn/>
                        <Link to={'/login'}>Увійти</Link>
                        <br/>
                        <Link to={'/register'}>Зареєструватися</Link>
                        <br/>
                        <Link to={'/register'} state={isManager}>Зареєструватися як менеджер закладу</Link>
                    </div>
                    :
                    <div>
                        <p style={{cursor: 'pointer'}} onClick={clickExit}> Вийти </p>
                        <UserInfo user={authUser}/>
                    </div>}
            </div>
        </div>
    );
}

export {Header}
