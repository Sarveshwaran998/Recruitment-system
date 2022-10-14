import React, {useState} from 'react';
import { Button } from "@material-ui/core";
import {storage,db} from "../firebase";
import firebase from "firebase";
import './ImageUpload.css';

function Imageupload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };
    const handleUpload=()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>{
                        db.collection("posts").add(
                            {
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                username: username
                            });
                            setProgress(0);
                            setCaption("");
                            setImage(null);
                    })
            }            
        )
    }

    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100"/>
            <div className="wr1">
            <input type="text" placeholder="Write your story here..." value={caption} className="wr2" onChange={event=>setCaption(event.target.value) }/>
            <label for="file">Browse file</label>
            <input type="file" name="file" id="file" class="inputfile" onChange={handleChange}/>
            </div>
            <Button onClick={handleUpload}>
                Post
            </Button>
        </div>
    )
}
export default Imageupload
