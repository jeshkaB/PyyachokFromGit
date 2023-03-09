// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, EmailAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// TODO пересети все в дотенв REACT_APP_.....

const firebaseConfig = {
    apiKey: "AIzaSyBhPnflVY0BlUVVRJZ0t7KomfEbPAbBqgo",
    authDomain: "final-project-8b869.firebaseapp.com",
    projectId: "final-project-8b869",
    storageBucket: "final-project-8b869.appspot.com",
    messagingSenderId: "324383922744",
    appId: "1:324383922744:web:58c16f5e0f806e35e7e4cd"
}
const app = initializeApp(firebaseConfig)

const googleAuthProvider = new GoogleAuthProvider();
// const facebookAuthProvider = new FacebookAuthProvider();
const emailAuthProvider = new EmailAuthProvider();

export {app, googleAuthProvider, emailAuthProvider}
