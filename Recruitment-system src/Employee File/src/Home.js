import React from 'react'
import { useStateValue } from "./StateProvider";
import { Link } from 'react-router-dom';
import { auth } from "./firebase";
import { IoMdArrowDropdown } from "react-icons/io";
import "./home.css";
import App from '../src/Component/App.js';

function Home() {
    const[{user}, dispatch] = useStateValue();
    const handleAuthentication = () =>{
        if(user){
            auth.signOut();
        }
    }
    return (
        <div className="home_container">
            <div className="nav">
            <div style={{cursor:"pointer"}}>Job Portal</div>
            <Link to={"/Vhub"}>
            <div style={{cursor:"pointer"}}>VirtualHub</div>
            </Link>
            <div style={{cursor:"pointer"}}><Link to={"/Dashboard"}>Profile</Link></div>
            <div className="dpdown">
               <span style={{cursor:"pointer"}}> Hey  {user?user.displayName||user.email.split('@')[0]:'Guest'} </span>
            </div>
            <div className="dpct">
            <span> 
                <Link to={"/Login"}>
                <h5 onClick={handleAuthentication}>{user?'Sign Out' : 'Sign In'}</h5> 
                </Link>
                </span>
            </div> 
            </div>
            <div className="main_body">
                <App />
            </div>
        </div>
    )
}

export default Home
