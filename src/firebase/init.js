let firebaseConfig = {
    apiKey: "AIzaSyBWM-xKGvy1gD6yPbk7Sb3rDTf8KVWip90",
    authDomain: "help-delivery-app.firebaseapp.com",
    databaseURL: "https://help-delivery-app.firebaseio.com",
    projectId: "help-delivery-app",
    storageBucket: "help-delivery-app.appspot.com",
    messagingSenderId: "24963645393",
    appId: "1:24963645393:web:80d8c0dff9a706e2c1aaf0",
    measurementId: "G-TLGDNQMWWY"
  };
  // Initialize Firebase
//   firebase.analytics();

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({ timestampsInSnapshots:true });

  export default firebaseApp.firestore();