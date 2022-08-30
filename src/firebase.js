
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDDBeiGwYn1PCC42ENrDeP0I3Jqry4rmDE",
  authDomain: "whtsapp-8d0b5.firebaseapp.com",
  projectId: "whtsapp-8d0b5",
  storageBucket: "whtsapp-8d0b5.appspot.com",
  messagingSenderId: "432851664722",
  appId: "1:432851664722:web:63e26e349e056aa518848b",
  measurementId: "G-LMZFC95MM1"
};


const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth,googleProvider };

export default db;



