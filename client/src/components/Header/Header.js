import './HeaderStyle.css'
import {Link} from "react-router-dom";
import {UserInfo} from "../UserInfo/userInfo";
import {useSelector} from "react-redux";
import {roles} from "../../constants";


const Header = () => {
    const {isAuth, userId, role} = useSelector(state => state.auth);// TODO зробити вихід (логаут в аусСервісі: почистити LS, стейт ізАус = фелс, юзер = нулл)
    const isManager = true

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
                        <Link to={'/home'}>Вийти </Link>
                        <UserInfo userId={userId} role={role}/>
                    </div>}
            </div>
        </div>
    );
}

export {Header}
