import './HeaderStyle.css'
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <div className={'Header'}>
            <div> <Link to={'/home'}> На головну </Link> </div>
            <div>ПИЯЧОК</div>
            <div>
                <div>Увійти</div>
                <div>Зареєструватися</div>
                <div>USER</div>
            </div>
        </div>
    );
}

export {Header}
