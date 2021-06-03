import axios from "axios";

// Phân biệt: URL, URN, URI
// link: https://techsharing.co-well.com.vn:3080/uploads/default/original/a1.jpeg
// URL: https://techsharing.co-well.com.vn:3080/
// URN: uploads/default/original/a1.jpeg
// URI: https://techsharing.co-well.com.vn:3080/uploads/default/original/a1.jpeg

async function getData(uri){
    try {
        const resp = await axios.get(uri);
        return resp
    } catch (error) {
        console.error(error);
    }
}

async function postData(uri, data) {
    try {
        const resp = await axios.post(uri, data);
        return resp;
    } catch (error) {
        console.warn(error);
    }
}

async function putData(uri, data) {
    try {
        const resp = await axios.put(uri, data);
        return resp;
    } catch (error) {
        console.warn(error);
    }
}   

async function deleteData(uri) {
    try {
        const resp = await axios.delete(uri);
        return resp
    } catch (error) {
        console.error(error);
    }
}

export {
    getData, 
    postData,
    putData,
    deleteData
};