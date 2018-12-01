import Vue from 'vue';
import Vuex from 'vuex';
const fb = require('./firebaseConfig.js')
// import firebase from "firebase"


Vue.use(Vuex);

fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')
        // store.dispatch('getUserContacts')

        // realtime updates from our users collection
        fb.usersCollection.orderBy('name', 'desc').onSnapshot(querySnapshot => {
            let usersArray = []

            querySnapshot.forEach(doc => {
                let contact = doc.data()
                contact.id = doc.id
                usersArray.push(contact)
                // console.log(contact.id)
            })
            store.commit('setUsers', usersArray)
        }),

        // realtime updates from our users collection
        // fb.usersCollection.where("contacts", "array-contains", userProfile.uid).orderBy('name', 'desc').onSnapshot(querySnapshot => {
        //     let friendsArray = []
        //
        //     querySnapshot.forEach(doc => {
        //         let friend = doc.data()
        //         friend.id = doc.id
        //         friendsArray.push(friend)
        //         // console.log(contact.id)
        //     })
        //     store.commit('setFriends', friendsArray)
        // }),


        // realtime updates from our posts collection
        fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
            let postsArray = []

            querySnapshot.forEach(doc => {
                let post = doc.data()
                post.id = doc.id
                postsArray.push(post)
                // console.log(post.id)
            })
            store.commit('setPosts', postsArray)
        })

    }
})

export const store = new Vuex.Store({
  state: {
          currentUser: null,
          userProfile: {},
          users: [],
          posts: [],
          friends: []
          // hiddenPosts: []
  },
  actions: {
      clearData({ commit }) {
        commit('setUsers', null),
        commit('setCurrentUser', null),
        commit('setUserProfile', {}),
        commit('setPosts', null),
        commit('setFriends', null)
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
      },
      setUsers(state, val) {
        state.users = val
      },
      setFriends(state, val) {
        state.friends = val
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
