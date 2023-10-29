import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: "ecommerce-site-584f2.firebaseapp.com",
  projectId: "ecommerce-site-584f2",
  storageBucket: "ecommerce-site-584f2.appspot.com",
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);