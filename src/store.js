import Vue from 'vue';
import Vuex from 'vuex';
const fb = require('./firebaseConfig.js')
// import firebase from "firebase"


Vue.use(Vuex);
// handle page reload
fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')

        // realtime updates from our posts collection
        fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
            let postsArray = []

            querySnapshot.forEach(doc => {
                let post = doc.data()
                post.id = doc.id
                postsArray.push(post)
            })

            store.commit('setPosts', postsArray)
        })
    }
})


export const store = new Vuex.Store({
  state: {
          currentUser: null,
          userProfile: {},
          posts: [],
          // hiddenPosts: []
  },
  actions: {
      clearData({ commit }) {
        commit('setCurrentUser', null),
        commit('setUserProfile', {}),
        commit('setPosts', null)
        // commit('setHiddenPosts', null)
      },
      fetchUserProfile({ commit, state }) {
          fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
              commit('setUserProfile', res.data())
          }).catch(err => {
              console.log(err)
          })
      }
  },
  mutations: {
      setCurrentUser(state, val) {
          state.currentUser = val
      },
      setUserProfile(state, val) {
          state.userProfile = val
      },
      setPosts(state, val) {
        state.posts = val
      }
      // setHiddenPosts(state, val) {
      //       if (val) {
      //           // make sure not to add duplicates
      //           if (!state.hiddenPosts.some(x => x.id === val.id)) {
      //               state.hiddenPosts.unshift(val)
      //           }
      //       } else {
      //           state.hiddenPosts = []
      //       }
      //   }
  }
});
