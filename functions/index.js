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
    console.log("hello",snap.data())

    const newValue = snap.data();

    db.collection('companies').doc(newValue.cid).set({
        bus_name:newValue.bid
    })

    // access a particular field as you would any JS property
    const name = newValue.name;

});