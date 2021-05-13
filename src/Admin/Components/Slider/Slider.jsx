import { storage } from '../../../Firebase';
import React, { useState, useEffect } from 'react';

export default function Slider() {
    const [img, setImg] = useState(null);
    useEffect(()=>{
        const imgName = "IMG_05.jpg";
        storage.ref("slide").child(imgName).getDownloadURL().then(url => { 
            setImg(url);
        }).catch((err)=>{console.log(err);});

    },[]);

    const typeImg = ["image/png", "image/jpeg"];
    const handleChange = e => {
        console.log(e.target.files[0])
        if(e.target.files[0] && typeImg.includes(e.target.files[0].type)){
            setImg(e.target.files[0]);
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`slide/${ img.name }`).put(img);
        uploadTask.on("state_changed", snapshot => {}, error => { console.log(error) }, () => {
            storage.ref("slide").child(img.name).getDownloadURL()
            .then(url => { 
                console.log("Upload to Firebase with url: ", url);
                setImg(url);
            })
        })

        // //Delete IMG in Firebase
        // var desertRef = firebase.storage().child('images/example.jpg');
        // // Delete the file
        // desertRef.delete().then(function() {
        // // File deleted successfully
        // }).catch(function(error) {
        // // Uh-oh, an error occurred!
        // });
    }
    return (
        <>
            <h2>Upload file</h2>
            <img width="400" src={ img } alt="slider"/><br />
            <input type="file" name="img" onChange={ handleChange } /><br />
            <button onClick={ handleUpload }>Upload</button>
        </>
    )
}
