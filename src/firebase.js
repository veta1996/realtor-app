// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdeYL9U4VO_gzonUlV4ayEAix88iQxH9c",
  authDomain: "realtor-clone-react-f665d.firebaseapp.com",
  projectId: "realtor-clone-react-f665d",
  storageBucket: "realtor-clone-react-f665d.appspot.com",
  messagingSenderId: "19194134321",
  appId: "1:19194134321:web:1d10f2460e38af3013fa10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()