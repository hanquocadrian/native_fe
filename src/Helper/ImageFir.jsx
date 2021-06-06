import { storage } from "FirebaseConfig";

const postImageFirebase = (ref, file, callback) => {
    try {
        var newNameFile = Date.now() + "_" + file.name;
        var child = newNameFile;

        const uploadTask = storage.ref(ref).child(child).put(file);
            uploadTask.on("state_changed", snapshot => {}, error => { console.log(error) }, () => {
                storage.ref(ref).child(child).getDownloadURL()
                .then(uriImage => { 
                    return callback(uriImage);
                })
            });
    } catch (error) {
        console.error(error);
    }
}

const deleteImageFirebase = (url, callback) => {
    try { 
        storage.refFromURL(url).delete()
        .then(() => {
            alert("Picture is deleted successfully!");
            return () => callback();
        })
        .catch((err) => {
            console.log(err);
        });
    } catch (error) {
        alert("Can't delete Picture!");
        console.log(error);
    }
};

export {
    postImageFirebase,
    deleteImageFirebase
};