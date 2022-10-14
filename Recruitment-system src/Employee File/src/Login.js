import React, {useState} from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from "./firebase";
import firebase from "firebase";
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = e =>{
        e.preventDefault()
        auth
            .signInWithEmailAndPassword(email,password)
            .then(auth => {
                history.push('/Home')
            })
            .catch(error=> alert(error.message))
    }
    const register = e =>{
        e.preventDefault()
        auth    
            .createUserWithEmailAndPassword(email,password)
            .then((auth) =>{
                console.log(auth);
                if(auth){
                    alert("Account Created Successfully");
                }
            })
            .catch(error=> alert(error.message))
    }
    const googlelogin = ()=>{
            const provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                history.push('/Home')
                console.log(result);
            /** @type {firebase.auth.OAuthCredential} */
            const credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            console.log(error)
        });
    }
    const fblogin = ()=>{
        const provider = new firebase.auth.FacebookAuthProvider();
                firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            history.push('/Home')
            /** @type {firebase.auth.OAuthCredential} */
            const credential = result.credential;

            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
            console.log(error)
        });
    }
    return (
        <div className="login">
            <p className="logo">Employee Login</p>
        <div className="login_container">
            <h1>Sign-In</h1>
            <button type="button" className="facebook" onClick={fblogin} style={{textAlign:"left"}}><FaFacebook className="facebook-logo"/><span style={{position:"relative", bottom:"5px", left:"45px",fontWeight:"bold"}}>Continue with Facebook</span></button>
            <button type="button" className="google" onClick={googlelogin} style={{textAlign:"left"}}><FcGoogle className="google-logo"/><span style={{position:"relative", bottom:"5px", left:"45px",fontWeight:"bold"}}>Continue with Google</span></button>
            <p style={{fontSize: "18px", textAlign:"center", margin:"0"}}>-or-</p>
            <form>
                <h5>E-mail</h5>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit" onClick={signIn} className="login_signInBtn">Sign In</button>
            </form>
            <p>By signing in to your account, you agree to our Terms of Service and consent to our Cookie Policy and Privacy Policy.</p>
            <button onClick={register} className="register_btn">Create Account</button>
        </div>
        </div>
    )
}

export default Login
