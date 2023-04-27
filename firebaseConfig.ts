// Import the functions you need from the SDKs you need
// import * as firebase from "firebase"
// https://firebase.google.com/docs/web/setup#available-libraries
//add the libaries needed - making an app and authentication
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration - from the firebase website
const firebaseConfig = {
  apiKey: "AIzaSyCiKn7nNRQrpfKoUR1z8JXqpzxTcRp896s",
  authDomain: "allotment-cc7dd.firebaseapp.com",
  projectId: "allotment-cc7dd",
  storageBucket: "allotment-cc7dd.appspot.com",
  messagingSenderId: "278887415667",
  appId: "1:278887415667:web:99112784c2b8df4f760f06",

  // apiKey: "AIzaSyBmGseQCUrKX3yzgp5AKJuZwcTrnbsEzrs",
  // authDomain: "auth-test-8a4e7.firebaseapp.com",
  // projectId: "auth-test-8a4e7",
  // storageBucket: "auth-test-8a4e7.appspot.com",
  // messagingSenderId: "893471506567",
  // appId: "1:893471506567:web:22988c15ef28a852a53822",
};
//initalise the app
const app = initializeApp(firebaseConfig);
//get auth in
const auth = getAuth(app);
//export authentication
export { auth };
