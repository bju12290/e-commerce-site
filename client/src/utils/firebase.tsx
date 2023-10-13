import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkj9TMBVO06JO_KwG7k42n3sYeZeRR_DU",
  authDomain: "ecommerce-site-584f2.firebaseapp.com",
  projectId: "ecommerce-site-584f2",
  storageBucket: "ecommerce-site-584f2.appspot.com",
  messagingSenderId: "326175334264",
  appId: "1:326175334264:web:0cde3f0e621c8a4b8b728d",
  measurementId: "G-GSG7P8HWD7"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);