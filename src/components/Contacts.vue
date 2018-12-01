<template>
  <div class="contacts">
    <h1>{{ msg }}</h1>
    <section>
      <button id="show-modal" v-on:click = "showModal = true">Add Contact</button>
      <div v-if= "showModal" @close = "showModal = false">
        <template v-modal = "showModal" type="text/x-template" id = "modal-template">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container">

                  <div class="modal-header">
                    <slot name="header">
                      <h3 slot = "header">Users</h3>
                    </slot>
                  </div>

                  <div class="modal-body">
                    <slot name="body">
                      <div v-if="users.length">
                        <div v-for="contact in users" class="user" @click ="addContact(currentUser.uid, contact.name, contact.email, contact.id)">

                          <h3 @click ="addContact(currentUser.uid, contact.name, contact.email, contact.id)">{{ contact.name }}</h3>
                      <i><h4 class = "email2" @click ="addContact(currentUser.uid, contact.name, contact.email, contact.id)">{{ contact.email }}</h4></i>
                  </div>
                </div>
                <div v-else>
                  <p class="no-results">There are currently no Users</p>
                </div>
                    </slot>
                  </div>

                  <div class="modal-footer">
                    <slot name="footer">
                      <p>Click user to add contact</p>
                      <button class="modal-default-button" @click="showModal = false">
                        DONE
                      </button>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </template>
      </div>

<div v-if="userContacts.length">
  <div v-for="friend in userContacts" class="contact" @click= "showModal2 = true">
        <h3>{{ friend.name }}</h3>
        <i><h4 class = "email2">{{ friend.email }}</h4></i>
        </div>
        </div>
      <div v-else>
        <p class="no-results">There are currently no Users</p>
      </div>

      <div v-if= "showModal2" @close = "showModal2 = false">
        <template v-modal = "showModal2" type="text/x-template" id = "modal-template">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container">

                  <div class="modal-header">
                    <slot name="header">
                      <h3 slot = "header">Users</h3>
                    </slot>
                  </div>

                  <div class="modal-body">
                    <slot name="body">

                      <div v-if="userContacts.length">
                        <div v-for="friend in userContacts" class="contact" @click= "deleteContact(currentUser.uid, friend.name, friend.email, friend.id)">
                              <h3 @click= "deleteContact(currentUser.uid, friend.name, friend.email, friend.id)">{{ friend.name }}</h3>
                              <i><h4 class = "email2" @click= "deleteContact(currentUser.uid, friend.name, friend.email, friend.id)">{{ friend.email }}</h4></i>
                              </div>
                              </div>
                            <div v-else>
                              <p class="no-results">There are currently no Users</p>
                            </div>
                          </slot>
                        </div>

                  <div class="modal-footer">
                    <slot name="footer">
                      <p>Click user to delete contact</p>
                      <button class="modal-default-button" @click="showModal2 = false">
                        DONE
                      </button>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </template>
      </div>

  </section>
    </div>
</template>


<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')
import firebase from 'firebase'
export default {
  name: 'Contacts',
  data () {
    return {
      msg: 'Contacts',
      showModal: false,
      showModal2: false,
      userContacts: []
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'users', 'friends'])
  },
  methods: {
    addContact(uid, name, email, id) {
      fb.contactsCollection.where("contacts", "array-contains", uid).get().then(docs => {
            let contactsArray = []
            docs.forEach(doc => {
                let friend = doc.data()
                friend.id = doc.id
                contactsArray.push(friend)
                console.log(friend.id)
            })
            this.userContacts = contactsArray
          }).catch(err => {
          console.log(err)
      }),
      fb.contactsCollection.doc(id).update({
          contacts: firebase.firestore.FieldValue.arrayUnion(uid),
          }).then(ref => {
             // alert('The user has been added to your contacts')
          }).catch(err => {
             console.Log(err)
                    }),
      fb.contactsCollection.doc(uid).update({
          contacts: firebase.firestore.FieldValue.arrayUnion(id),
          }).then(ref => {
          }).catch(err => {
             console.log(err)
                    })
    },
    deleteContact(uid, name, email, id) {
      fb.contactsCollection.where("contacts", "array-contains", uid).get().then(docs => {
            let contactsArray = []
            docs.forEach(doc => {
                let friend = doc.data()
                friend.id = doc.id
                contactsArray.push(friend)
                console.log(friend.id)
            })
            this.userContacts = contactsArray
          }).catch(err => {
          console.log(err)
      }),
      fb.contactsCollection.doc(id).update({
          contacts: firebase.firestore.FieldValue.arrayRemove(uid),
          }).then(ref => {
             // alert('The user has been removed from your contacts')
          }).catch(err => {
             console.Log(err)
                    }),
      fb.contactsCollection.doc(uid).update({
          contacts: firebase.firestore.FieldValue.arrayRemove(id),
          }).then(ref => {
          }).catch(err => {
             console.log(err)
                    })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contacts {
  align-content: center;
  margin-left: 10%;
  margin-right: 10%;
}
h1, h5 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
button{
  padding: 10px 20px;
  margin-bottom: 3%;
  margin-top:  2%;
  background:  #42b983;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 22px;
  outline: 0;
  cursor: pointer;
}
p {
  float:left;
}
.contact {
  /* margin: 10%, 10%, 10%, 10; */
  color: white;
  background-color: #42b983;
  border-width: 5px;
  border-style: solid;
  border-color:  white;
  border-radius: 10px;
  box-sizing: content-box;
}
.user {
  /* margin: 10%, 10%, 10%, 10; */
  color: white;
  border-width: 4px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
  box-sizing: content-box;
  background-color: #EA5656;
}
.email {
  color: #F0DF55;
}
.email2 {
  color: 	white;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: inline-table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  height: 50%;
  width: 300px;
  margin: 0px auto;
  padding: 5% 8%;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body {
  margin: 20px 0;
  overflow: auto;
  height: 75%;
}
.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}

</style>
