import {GoogleSignIn, RegisterForm} from "../components";
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
                {/*<GoogleSignIn from={'register'}/>*/}
            </div>
        </div>
    );
}

export {RegisterPage};
