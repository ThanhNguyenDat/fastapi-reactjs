// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiy06CjUGpVv9JMCm9IX8URfQI_ZXsj5k",
  authDomain: "reactfastapi.firebaseapp.com",
  projectId: "reactfastapi",
  storageBucket: "reactfastapi.appspot.com",
  messagingSenderId: "62816579701",
  appId: "1:62816579701:web:d179c0f7351f02c6dd083c",
  measurementId: "G-Z2XJK25W45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
