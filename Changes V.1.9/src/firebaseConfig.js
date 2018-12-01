import firebase from 'firebase'
import 'firebase/firestore'
// import 'firebase/authentification'

// Initialize Firebase
  const config = {
    apiKey: "AIzaSyDbapyvkgk38o1JZE8Kr3ZzT-A78hILpQQ",
    authDomain: "money-jar-prototype-vue.firebaseapp.com",
    databaseURL: "https://money-jar-prototype-vue.firebaseio.com",
    projectId: "money-jar-prototype-vue",
    storageBucket: "money-jar-prototype-vue.appspot.com",
    messagingSenderId: "863236832203"
  };
  firebase.initializeApp(config);

  // firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')
const contactsCollection = db.collection('contacts')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection,
    contactsCollection
}
