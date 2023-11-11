
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCyQtEYdBVEBBLkdsZ4QKYnz1Omj9KZvQY",
  authDomain: "matrizon-e-commerce.firebaseapp.com",
  databaseURL: "https://matrizon-e-commerce-default-rtdb.firebaseio.com",
  projectId: "matrizon-e-commerce",
  storageBucket: "matrizon-e-commerce.appspot.com",
  messagingSenderId: "55416849340",
  appId: "1:55416849340:web:f0942ee0a5f3e07e6161b9",
  measurementId: "G-5143ZWSV3P"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
