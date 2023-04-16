import {RegisterForm} from "../components";
import {useLocation} from "react-router-dom";

const RegisterPage = () => {
    const isManager = useLocation().state

    return (
        <div>
                <RegisterForm isManager={isManager}/>
        </div>
    );
}

export {RegisterPage};
