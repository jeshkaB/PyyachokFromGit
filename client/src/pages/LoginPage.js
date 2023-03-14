import {AuthProvider, LoginForm, LoginFormForgot} from "../components";


const LoginPage = ()=> {

    return (
        <div>

            <div>
               <LoginForm/>
               <LoginFormForgot/>
               {/*<AuthProvider/>*/}
            </div>

        </div>
    );
}

export {LoginPage};
