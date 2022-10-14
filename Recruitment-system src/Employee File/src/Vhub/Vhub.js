import React, {useState, useEffect} from 'react';
import './Vhub.css';
import Post from './Post';
import { db } from '../firebase';
import { useStateValue } from "../StateProvider";
import { Link } from 'react-router-dom';

function Vhub(){
    const[{user}, dispatch] = useStateValue();
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        if (!user) return
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map(doc=>({id: doc.id,post: doc.data()}))); 
        })
    }, [user])
    return(
        <div className="dashboard1">
            <div className="dashboard__header1">
                <Link to="/Home">            
                <div style={{cursor:"pointer",color:"white"}}>Job Portal</div>
                </Link>   
                <Link to="/Vhub">
                <div style={{cursor:"pointer",color:"white"}}>VirtualHub</div>
                </Link>
                <Link to="/Dashboard"> 
                <div style={{cursor:"pointer",color:"white"}}>Profile</div>
            </Link>
                <div style={{cursor:"pointer"}}>Hey, {user?user.displayName||user.email:'Guest'}</div>
                <div style={{cursor:"pointer"}}>Logout</div>
            </div>   
        


        <div className="dashboard__posts1">
            {
                posts.map(({id, post})=>(
                    <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
                ))
            }
            </div>
            </div>
            
    );
}
export default Vhub;