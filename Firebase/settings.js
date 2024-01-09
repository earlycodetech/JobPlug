// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeHdRptp7SvTwVbdQbULeV4rCoRmWAnK4",
    authDomain: "jobplug-e45ae.firebaseapp.com",
    projectId: "jobplug-e45ae",
    storageBucket: "jobplug-e45ae.appspot.com",
    messagingSenderId: "771097398518",
    appId: "1:771097398518:web:b78367d98abb53a322b0d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)