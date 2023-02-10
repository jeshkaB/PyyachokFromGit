import {RegisterForm} from "../components";
import {useSelector} from "react-redux";

const RegisterPage = () => {
    const {errors} = useSelector(state => state.auth)
    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <div>
                <RegisterForm/>
            </div>
        </div>
    );
}

export {RegisterPage};
