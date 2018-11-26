import Vue from 'vue';
import App from './App.vue';
import router from './router.vue';
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(VueFire);

// Initialize Firebase
const config = {
   apiKey: 'AIzaSyDbapyvkgk38o1JZE8Kr3ZzT-A78hILpQQ',
   authDomain: 'money-jar-prototype-vue.firebaseapp.com',
   databaseURL: 'https://money-jar-prototype-vue.firebaseio.com',
   projectId: 'money-jar-prototype-vue',
   storageBucket: 'money-jar-prototype-vue.appspot.com',
   messagingSenderId: '863236832203',
 };
firebase.initializeApp(config);

export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
