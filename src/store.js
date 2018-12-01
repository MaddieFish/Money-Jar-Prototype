import Vue from 'vue';
import Vuex from 'vuex';
const fb = require('./firebaseConfig.js')
// import firebase from "firebase"


Vue.use(Vuex);

fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')

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
        }),

        // realtime updates from our posts collection
        fb.contactsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
            let contactsArray = []

            querySnapshot.forEach(doc => {
                let friend = doc.data()
                friend.id = doc.id
                contactsArray.push(friend)
                // console.log(post.id)
            })
            store.commit('setUserContacts', contactsArray)
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
  },
  actions: {
      clearData({ commit }) {
        commit('setUsers', null),
        commit('setCurrentUser', null),
        commit('setUserProfile', {}),
        commit('setPosts', null),
        commit('setUserContacts', null)
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
      setUserContacts(state, val) {
        state.friends =val
      }

  }
});
