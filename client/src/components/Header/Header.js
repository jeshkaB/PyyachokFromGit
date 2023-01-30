import './HeaderStyle.css'
import {Link} from "react-router-dom";
import {UserInfo} from "../UserInfo/userInfo";
import {useSelector} from "react-redux";


const Header = () => {
    const {isAuth, userId} = useSelector(state => state.auth);// TODO зробити вихід (логаут в аусСервісі: почистити LS, стейт ізАус = фелс, юзер = нулл)


    return (
        <div className={'Header'}>
            <div><Link to={'/home'}> На головну </Link></div>
            <div>ПИЯЧОК</div>
            <div>
                {!isAuth ?
                    <div>
                        <Link to={'/login'}>Увійти</Link>
                        <br/>
                        <Link to={'/register'}>Зареєструватися</Link>
                    </div>
                    :
                    <div>
                        <Link to={'/home'}>Вийти </Link>
                        <UserInfo userId={userId}/>
                    </div>}
            </div>
        </div>
    );
}

export {Header}
