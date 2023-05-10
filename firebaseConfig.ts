// Import the functions you need from the SDKs you need
// import * as firebase from "firebase"
// https://firebase.google.com/docs/web/setup#available-libraries
//add the libaries needed - making an app and authentication
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration - from the firebase website
const firebaseConfig = {
  apiKey: "AIzaSyBtj-r3qOAEA5ieq2Da9Sbj-oGkNKU3EKU",
  authDomain: "allotment-temporary-clone.firebaseapp.com",
  projectId: "allotment-temporary-clone",
  storageBucket: "allotment-temporary-clone.appspot.com",
  messagingSenderId: "472034955364",
  appId: "1:472034955364:web:3035e78923f1727a5d8f71",
};
//initalise the app
export const app = initializeApp(firebaseConfig);
//get auth in
const auth = getAuth(app);



//export authentication
export { auth };

