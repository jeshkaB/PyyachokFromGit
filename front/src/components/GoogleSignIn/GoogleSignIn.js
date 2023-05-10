import {useDispatch} from 'react-redux';

import {authActions} from '../../redux';
import {signInByFacebook, signInByGoogle} from '../../services';

import css from './GoogleSignIn.module.css';

const GoogleSignIn = () => {
    const dispatch = useDispatch();

    const clickGoogle = async () => {
        const credential = await signInByGoogle();
        const {displayName, email, providerData} = credential.user;
        const user = {name: displayName, email, uid: providerData[0].uid};
       await dispatch(authActions.loginByGoogle({user}));
    };
    const clickFacebook = async () => {
        const credential = await signInByFacebook();
        const {displayName, email, providerData} = credential.user;
        const user = {name: displayName, email, uid: providerData[0].uid};
        await dispatch(authActions.loginByFacebook({user}));
    };

    return (
        <div>
            <div className={css.Enter}>
                <p onClick={clickGoogle}>Увійти через Google</p>
            </div>
            <div className={css.Enter}>
                <p onClick={clickFacebook}>Увійти через Facebook</p>
            </div>
        </div>
    );
};


export {GoogleSignIn};
