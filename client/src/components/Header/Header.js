import './HeaderStyle.css'
import {Link, useNavigate} from "react-router-dom";
import {UserInfo} from "../UserInfo/userInfo";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuth, authUser} = useSelector(state => state.auth);
    const isManager = true

    const clickExit = async ()=> {
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
                        <Link to={'/login'}>Увійти</Link>
                        <br/>
                        <Link to={'/register'}>Зареєструватися</Link>
                        <br/>
                        <Link to={'/register'} state={isManager}>Зареєструватися як менеджер закладу</Link>
                    </div>
                    :
                    <div>
                        <p style={{cursor:'pointer'}} onClick={clickExit}> Вийти </p>
                        <UserInfo user={authUser}/>
                    </div>}
            </div>
        </div>
    );
}

export {Header}
