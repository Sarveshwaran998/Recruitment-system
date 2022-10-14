import React, {useState, useEffect} from 'react';
import { Button } from "@material-ui/core";
import {storage,db} from "../firebase";
import firebase from "firebase";
import './ResumeUpload.css';
import { useStateValue } from "../StateProvider";

function ResumeUpload({username}) {
    const[{user}, dispatch] = useStateValue();
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [resume, setResume] = useState([]);
    useEffect(()=>{
        if (!user) return
        db.collection('resumes').orderBy('timestamp','desc').where('username',"==",user&&user.displayName||user.email).onSnapshot(snapshot=>{
            setResume(snapshot.docs.map(doc=>({id: doc.id,resume: doc.data()}))); 
        })
    }, [user])

    const handleChange = (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };
    const handleUpload=()=>{
        const uploadTask = storage.ref(`resume/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) =>{
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            (error)=>{
                console.log(error);
                alert(error.message);
                },
            ()=>{
                storage
                    .ref("resume")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>{
                        db.collection("resumes").add(
                            {
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                imageUrl: url,
                                username: `${user?user.displayName||user.email:null}`
                            });
                            setProgress(0);
                            setImage(null);
                    })
            }            
        )
    }

    return (
        <div className="resumeWrapper">
        <div className="resumeupload">
        <progress className="resumeupload__progress" value={progress} max="100"/>
        <div className="wr1">
        <div>
        <div className="tempwrap">
            <div className="tempwrapchild1"><label for="file">Browse Pdf file</label>
            <input type="file" name="file" id="file" class="inputfile" onChange={handleChange}/></div>       
                <div className="bn1"><Button onClick={handleUpload}>
                    Upload
                </Button></div>
        </div>
        <div className="resume1">
        {
            resume.map(({id, resume})=>(
                <div className="res1" key={id}>
                <a href={resume.imageUrl}>Download {resume.username} resume </a>
                </div>
            ))
        }
        </div>
        </div>     
        </div>
        </div>
        </div>
    )
}
export default ResumeUpload
