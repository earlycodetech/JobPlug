import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import 'firebase/compat/storage';
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDeHdRptp7SvTwVbdQbULeV4rCoRmWAnK4",
    authDomain: "jobplug-e45ae.firebaseapp.com",
    projectId: "jobplug-e45ae",
    storageBucket: "jobplug-e45ae.appspot.com",
    messagingSenderId: "771097398518",
    appId: "1:771097398518:web:b78367d98abb53a322b0d7"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export const imgStorage = firebase.storage;
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
