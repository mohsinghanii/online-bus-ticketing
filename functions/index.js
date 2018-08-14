const functions = require('firebase-functions');

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://karachi-online-bus.firebaseio.com"
});
const db = admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    console.log(response)
 response.send("Hello from Firebase!");
});

exports.addUserProperty = functions.firestore
  .document('Buses/{busId}')
  .onCreate(snap => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    let busCreated = snap.data();

    let busRef =  db.collection('buses').where("cid" , "==", busCreated.cid);
     
    busRef.get().then((result)=>{
       if(result.empty){
           console.log("No Result Found");
       }
       else{
        result.forEach((doc)=>{
          console.log("DOCUMENT DATA" , doc.data());
        })
       }

    })
    .catch((err)=>{
        console.log("ERROR", err)
    })

});