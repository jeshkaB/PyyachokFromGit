
import {useDispatch} from "react-redux";

import {authActions} from "../../redux";

import {signInByGoogle} from "../../services";

import css from './GoogleSignIn.module.css'

const GoogleSignIn = () => {
    const dispatch = useDispatch();

    const clickIn = async () => {
        const credential = await signInByGoogle();
            const {displayName, email, providerData} = credential.user
            const user = {name: displayName, email, uid: providerData[0].uid}
            console.log(user)
            await dispatch(authActions.loginByGoogle({user}))

    }

    return (
        <div>
            <div className={css.Enter}>
                <p onClick={clickIn}>Увійти через Google</p>
            </div>
        </div>
    )
}


export {GoogleSignIn};
