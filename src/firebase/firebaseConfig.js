import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAaKzrfLDltxC50bOmu0pDMmML6dMA_VqI",
    authDomain: "pokedex-6955d.firebaseapp.com",
    projectId: "pokedex-6955d",
    storageBucket: "pokedex-6955d.appspot.com",
    messagingSenderId: "984129364320",
    appId: "1:984129364320:web:1079f63b76fdd2238d3e05"
};

const app = initializeApp(firebaseConfig);
const googleAuth = new GoogleAuthProvider();
const db = getFirestore(app)

export {app, googleAuth,db}