import { db, firestoreDb } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  firestoreDb.collection("users").doc(id).set({
    id,
    username,
    email
  })

export const onceGetUsers = () =>
  db.ref('users').once('value');

// bus query
export const doCreateBusInCompany = (bid, cid, bus_name, date_created, no_of_seats) =>
  new Promise((res, rej) => {
    let busRef = firestoreDb.collection("Buses").doc(bid);
    busRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          rej(`bus with id ${bid} already exist`)
        }
        else {
          busRef.set({
            bid,
            cid,
            bus_name,
            date_created,
            no_of_seats
          })
          res(bid)
        }
      })
      .catch((err) => {
        rej(`error in creating doc with id ${bid}` + err)
      })
  })

// add city query
export const doAddCity = (city, date_created) =>
  new Promise((res, rej) => {
    let CitiesRef = firestoreDb.collection("cities").doc(city);
    CitiesRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          rej(`This ${city} already exist`)
        }
        else {
          CitiesRef.set({
            city,
            date_created
          })
          res(city)
        }
      })
      .catch((err) => {
        rej(`error in creating doc with ${city}` + err)
      })
  })
// get city query
export const getCities = () =>
  new Promise((res, rej) => {
    let CitiesRef = firestoreDb.collection("cities");
    CitiesRef.get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          let option = { label: doc.data().city, value: doc.data().city, date_created: doc.data().date_created }
          arr.push(option)
        })
        res(arr);
      })
      .catch((error) => {
        rej("Error getting documents: ", error)
      })
  })

export const getBuses = (cid) =>
  new Promise((res, rej) => {
    let busesRef = firestoreDb.collection("Buses");
    busesRef.where("cid", "==", cid)
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data())
        })
        res(arr);
      })
      .catch((error) => {
        rej("Error getting documents: ", error)
      })
  })