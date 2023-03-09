import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {authActions} from "../../redux";

import {getAuth, signInWithPopup} from 'firebase/auth';
import {app, googleAuthProvider, emailAuthProvider} from "../../services";
import {useEffect, useState} from "react";





    const AuthProvider = () => {
        const auth = getAuth(app)
        console.log(auth)
        const [user, setUser] = useState(auth.currentUser)

        const click = (provider)=> {
            const unsub = auth.onAuthStateChanged((newuser) => {
                console.log(newuser)
                if (newuser)
                    return setUser(newuser)
                signInWithPopup(auth, provider).then((credentials) => {
                    setUser(credentials.user)
                    console.log('credentials')
                    console.log(credentials)
                })
                console.log(unsub)
                return unsub
            })
        }


    return (
        <div >
            <h2 onClick={()=>click(googleAuthProvider)}>Увійти через Google</h2>

            <h2 onClick={()=>click(emailAuthProvider)}>Увійти через E-mail</h2>

            {user ?
            <h2>{user.displayName}</h2>
                : <p>loading</p>
            }
        </div>
    )
}


export {AuthProvider};
