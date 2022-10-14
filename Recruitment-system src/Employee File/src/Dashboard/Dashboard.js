import React, {useState, useEffect} from 'react';
import './Dashboard.css';
import Post from './Post';
import { db } from '../firebase';
import ImageUpload from './ImageUpload';
import { useStateValue } from "../StateProvider";
import { Link } from 'react-router-dom';

function Dashboard(){
    const[{user}, dispatch] = useStateValue();
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        if (!user) return
        db.collection('posts').orderBy('timestamp','desc').where('username',"==",user&&user.displayName||user.email).onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map(doc=>({id: doc.id,post: doc.data()}))); 
        })
    }, [user])
    return(
        <div className="dashboard">
            <div className="dashboard__header">
                <Link to="/Home">            
                <div style={{cursor:"pointer",color:"white"}}>Job Portal</div>
                </Link>   
                <Link to="/Vhub">
                <div style={{cursor:"pointer",color:"white"}}>VirtualHub</div>
                </Link>
                <Link to="/ResumeUpload">
                <div style={{cursor:"pointer",color:"white"}}>Resume</div>
                </Link>
                <div style={{cursor:"pointer"}}> Profile</div>
                <div style={{cursor:"pointer"}}>Hey, {user?user.displayName||user.email:'Guest'}</div>
                <div style={{cursor:"pointer"}}>Logout</div>
            </div>   
            <ImageUpload username={user?user.displayName||user.email:null}/>
        <div className="dashboard__posts">
            {
                posts.map(({id, post})=>(
                    <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
                ))
            }
            </div>     
            </div>
            
    );
}
export default Dashboard;