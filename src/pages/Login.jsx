import React from "react";
import { useNavigate } from "react-router-dom";
import db, { auth, googleProvider } from "../firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { doc, addDoc,collection, Firestore,setDoc } from "firebase/firestore";
import "./Login.css"
import GoogleButton from "react-google-button";


function Login({ setUser }) {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          const newUser = {
            fullname: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
          };
          navigate("/home")
          setUser(newUser);
          console.log(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          const add=doc(db, `user/${result.user.email}`)
           setDoc(add,newUser);
        })
        .catch((err) => alert(err.message));
        
         
  };

  return (
    <div className="login">
      <div className="login-container">
        <img
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png?20220228223904"
          alt=""
        />
        <p className="login-name">WhatsApp Web</p>
        <GoogleButton onClick={signInWithGoogle} />
      </div>
    </div>
  );
}

export default Login;
