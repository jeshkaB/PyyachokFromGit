import {GoogleSignIn, LoginForm, LoginFormForgot} from "../components";


const LoginPage = ()=> {

    return (
        <div>

            <div>

               <LoginForm/>
               <LoginFormForgot/>
                {/*<GoogleSignIn from ={'login'}/>*/}

            </div>

        </div>
    );
}

export {LoginPage};
