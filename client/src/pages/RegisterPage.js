import {RegisterForm} from "../components";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";


const RegisterPage = () => {
    const {errors} = useSelector(state => state.auth);
    const isManager = useLocation().state

    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <div>
                <RegisterForm isManager={isManager}/>
            </div>
        </div>
    );
}

export {RegisterPage};
