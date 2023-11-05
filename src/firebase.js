import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyADtcLa11t237x9w2u02WRpgFbY3CAgkLo",
    authDomain: "stackup-adc7b.firebaseapp.com",
    projectId: "stackup-adc7b",
    storageBucket: "stackup-adc7b.appspot.com",
    messagingSenderId: "725525284518",
    appId: "1:725525284518:web:0e4f577db09b9fff281667"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;