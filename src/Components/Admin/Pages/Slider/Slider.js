import { storage } from '../../../../FirebaseConfig';
import React, { useState, useEffect } from 'react';

export default function Slider() {
    const [img, setImg] = useState(null);
    const [url, setUrl] = useState("");
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
        var newNameFile = Date.now() + "_" + img.name;
        const uploadTask = storage.ref(`slide/${ newNameFile }`).put(img);
        uploadTask.on("state_changed", snapshot => {}, error => { console.log(error) }, () => {
            storage.ref("slide").child(newNameFile).getDownloadURL()
            .then(url => { 
                console.log("Upload to Firebase with url: ", url);
                setImg(url);
                // lưu vào db vs tên mới
            })
        })
    }

    // //Delete IMG in Firebase with URL
    const deleteFromFirebase = (url) => {
        try { 
            storage.refFromURL(url).delete().then(() => {
                alert("Picture is deleted successfully!");
                setUrl("");
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (error) {
            alert("Can't delete Picture!");
            console.log(error);
        }
    };

    return (
        <>
            <h2>Upload file</h2>
            <img width="400" src={ img } alt="slider"/><br />
            <input type="file" name="img" onChange={ handleChange } /><br />
            <button onClick={ handleUpload }>Upload</button><br />
            <hr />
            Url cần xóa: <input type="text" name="url" onChange={ (e) => setUrl(e.target.value) } value={ url } />
            <button onClick={ () => deleteFromFirebase(url) }>Delete File</button>
        </>
    )
}
