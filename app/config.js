import '@firebase/firestore';
import * as Firebase from 'firebase';
let firebaseConfig = {
    apiKey: "AIzaSyBhdCANsFgFm3Tk_hm-xuQK0BSVHhKWdlY",
    authDomain: "pennapps-60257.firebaseapp.com",
    databaseURL: "https://pennapps-60257.firebaseio.com",
    storageBucket: "pennapps-60257.appspot.com",
    projectId: "pennapps-60257"
};
Firebase.initializeApp(firebaseConfig);
exports.db = Firebase.firestore();
exports.auth = Firebase.auth();