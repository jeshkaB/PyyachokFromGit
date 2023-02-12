import {LoginForm} from "../components";
import {useSelector} from "react-redux";

function LoginPage() {
    const {errors} = useSelector(state => state.auth)

    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <div>
               <LoginForm/>
            </div>


        </div>
    );
}

export {LoginPage};
