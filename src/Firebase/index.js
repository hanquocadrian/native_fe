import firebase from 'firebase/app';
import 'firebase/storage'; 

const firebaseConfig = {
    apiKey: "AIzaSyCfUO-LhMFQMpyY3RELw-AZ4v4nRGdp2Xk",
    authDomain: "fir-nativecity.firebaseapp.com",
    projectId: "fir-nativecity",
    storageBucket: "fir-nativecity.appspot.com",
    messagingSenderId: "834646983487",
    appId: "1:834646983487:web:42bb361ef29bbf003e898a",
    measurementId: "G-0DS4DDZH0F"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };