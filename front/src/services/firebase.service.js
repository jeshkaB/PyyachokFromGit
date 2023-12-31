import { initializeApp } from 'firebase/app';
import {GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, getAuth, signOut} from 'firebase/auth';
import {FireBaseConfig} from '../config';

const firebaseConfig = {
    apiKey: FireBaseConfig.API_KEY,
    authDomain: FireBaseConfig.AUTH_DOMAIN,
    projectId: FireBaseConfig.PROJECT_ID,
    storageBucket: FireBaseConfig.STORAGE_BUCKET,
    messagingSenderId: FireBaseConfig.MESSAGING_SENDER_ID,
    appId: FireBaseConfig.APP_ID
};
const app = initializeApp(firebaseConfig);

const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

const auth = getAuth(app);

const signInByGoogle = ()=> signInWithPopup(auth, googleAuthProvider).then((credential) => {
    return credential;
}).catch ((error) => alert(error.message));

const signOutByGoogle = () => signOut(auth).then(() => {
}).catch((error) => {
    alert(error.message);
});

const signInByFacebook = ()=> signInWithPopup(auth, facebookAuthProvider).then((credential) => {
    return credential;
}).catch ((error) => alert(error.message));

const signOutByFacebook = () => signOut(auth).then(() => {
}).catch((error) => {
    alert(error.message);
});

export {signInByGoogle,signOutByGoogle, signInByFacebook,signOutByFacebook};
