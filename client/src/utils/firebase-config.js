
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
const firebaseConfig = {
  apiKey: "AIzaSyCP6MStkXmIniqJU7eKionYMM2HcSDbwao",
  authDomain: "react-netflix-clone-36750.firebaseapp.com",
  projectId: "react-netflix-clone-36750",
  storageBucket: "react-netflix-clone-36750.appspot.com",
  messagingSenderId: "969493186606",
  appId: "1:969493186606:web:d14804592c6aadc18637bf",
  measurementId: "G-FR3DPLFK8D"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);