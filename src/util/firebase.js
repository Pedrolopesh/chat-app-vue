import firebase, { storage } from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyBWM-xKGvy1gD6yPbk7Sb3rDTf8KVWip90",
    authDomain: "help-delivery-app.firebaseapp.com",
    databaseURL: "https://help-delivery-app.firebaseio.com",
    projectId: "help-delivery-app",
    storageBucket: "help-delivery-app.appspot.com",
    messagingSenderId: "24963645393",
    appId: "1:24963645393:web:80d8c0dff9a706e2c1aaf0",
    measurementId: "G-TLGDNQMWWY"
  })


export default async function uploadImageToFirebase(file){
    
    const storageImage = firebase.storage().ref(`${file.name}`).put(file)
    storageImage.on(`state_changed`, snapshot => {
        // let uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        console.log(snapshot)
    },  
    error => {console.log(error.message)},
    ()=> { storageImage.snapshot.ref.getDownloadURL().then((url) => { return url }) })

}