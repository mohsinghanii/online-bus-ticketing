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
export const doCreateBusInCompany = (bid, cid, bus_name, date_created) =>
  new Promise((res, rej) => {
    const ref = firestoreDb.collection("Buses").doc(bid)
    ref.set({
      bid,
      cid,
      bus_name,
      date_created
    })
      .then(() => {
        ref.get().then((doc) => {
          alert(doc.data())
          res(doc.data())
        })
          .catch((err) => {
            alert(err)
            rej(err)
          })
      })
      .catch((err) => {
        alert(err)
        rej(err)
      })

  })
