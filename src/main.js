// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase
  let app;
  var config = {
    apiKey: "AIzaSyDbapyvkgk38o1JZE8Kr3ZzT-A78hILpQQ",
    authDomain: "money-jar-prototype-vue.firebaseapp.com",
    databaseURL: "https://money-jar-prototype-vue.firebaseio.com",
    projectId: "money-jar-prototype-vue",
    storageBucket: "money-jar-prototype-vue.appspot.com",
    messagingSenderId: "863236832203"
  };
  firebase.initializeApp(config);

  // Returns the signed-in user's profile pic URL.
function GetUserEmail() {
  return firebase.auth().user.email;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().user;
}

firebase.auth().onAuthStateChanged(function(user) {
  if (!app){
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
});
