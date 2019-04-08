import firebase from 'firebase'
//Add the credentials from firebase 
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);

export default firebase;

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
//In data base, this will be your collection;
const db_Users = db.collection("Users")

//Functions that creates a new user
export const Add_User = (name, age, e_mail, city, state) => {
  const add_new_user = db_Users.doc(name);
  return db.runTransaction(t=> {
    t.set(add_new_user, {Mail: e_mail, City: city, State: state, Age: age});
    return Promise.resolve('Write complete');
  });
}

//Function that read your Database
export const ReadFromDb = () => {
  let data = {
    ids : [],
    size : 0,
  }
  return db_Users.get().then(doc => {
    data.ids = doc.docs;
    data.size = doc.size;
    return data;
  })
}