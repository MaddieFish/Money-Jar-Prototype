<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <section>
      <div class = "row1">
        <div class = "profile">
          <h2>{{ userProfile.name }}</h2>
          <p><i>{{ userProfile.email }}</i><p>
            <div class="create-jar">
              <form @submit.prevent>
                <textarea v-model.trim="post.content" placeholder = " Description."></textarea>
                <!-- <input type = "text" v-modal.trim = "post.content" placeholder = "Purpose: food, utility, etc..."></input> -->
              <button @click="createJar(post.id)" :disabled="post.content == ''">Add Jar</button>
            </form>
        </div>
      </div>
    </div>
      <div class="row2">
        <div v-if="posts.length">

          <div v-for="post in posts" class="post">
        <h4>{{ post.userName }}</h4>
        <font size = "2px">
          <span class = "date">{{ post.createdOn | formatDate }}</span>
        </font>
        <p>{{ post.content | trimLength }}</p>
        <ul>
          <font size = "2px">
            <li><i><a>comments: {{ post.comments }}</a></i></li>
            <li><i><a>likes: {{ post.likes }}</a></i></li>
            <!-- <li><i><a>view full Jar</a></i></li> -->
            <li><button class = "viewFullJar" @click="viewPost(post)">View Full Jar</button></li>
            <li><button class = "delete" @click="deleteJar(post.id)">Delete Jar</button></li>
          </font>

        </ul>



    </div>
</div>

<div v-else>
    <p class="no-results">There are currently no Jars</p>
</div>

      </div>

      <div v-if= "showModalPost" @close = "showModalPost = false">
        <template v-modal = "showModalPost" type="text/x-template" id = "modal-template">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container">

                  <div class="modal-header">
                    <slot name="header">

                      <div class ="post">
                      <h2>{{ fullPost.content }}</h2>
                      <h3>{{ fullPost.userName }}</h3>
                      <span>{{ fullPost.createdOn | formatDate }}</span>

                      <ul>
                        <li><a>comments {{ fullPost.comments }}</a></li>
                        <li><a>likes {{ fullPost.likes }}</a></li>
                      </ul>
                    </div>

                    </slot>
                  </div>

                  <div class="modal-body">
                    <slot name="body">

                      <!-- <div v-show="postComments.length" class="comments">
                        <div v-for="comment in postComments" class="comment">
                          <p>{{ comment.userName }}</p>
                          <span>{{ comment.createdOn | formatDate }}</span>
                          <p>{{ comment.content }}</p>
                        </div>
                      </div> -->


                      <!-- <div v-if="users.length">
                        <div v-for="contact in users" class="contact" @click= "addPermissions(currentUser.uid, contact.name, contact.email, contact.id, post.id)">
                              <h3 @click= "addPermissions(currentUser.uid, friend.name, friend.email, friend.id, post.id)">{{ contact.name }}</h3>
                              <i><h4 class = "email2" @click= "addPermissions(currentUser.uid, friend.name, friend.email, friend.id, post.id)">{{ contact.email }}</h4></i>
                              </div>
                              </div>
                            <div v-else>
                              <p class="no-results">There are currently no Contacts</p>
                            </div> -->


                        <!-- <div v-if="userContacts.length">
                          <div v-for="friend in userContacts" class="contact" @click= "addPermissions(currentUser.uid, friend.name, friend.email, friend.id, post.id)">
                                <h3 @click= "addPermissions(currentUser.uid, friend.name, friend.email, friend.id, post.id)">{{ contact.name }}</h3>
                                <i><h4 class = "email2" @click= "addPermissions(currentUser.uid, friend.name, friend.email, friend.id, post.id)">{{ contact.email }}</h4></i>
                                </div>
                                </div>
                              <div v-else>
                                <p class="no-results">There are currently no Contacts</p>
                              </div> -->

                            </slot>
                          </div>

                  <div class="modal-footer">
                    <slot name="footer">
                      <!-- <p>Click contact to add as editor and viewer</p> -->
                      <button class="modal-default-button" @click="showModalPost = false">
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
import moment from 'moment'


export default {
  name: 'MoneyJarHome',
  data () {
    return {
      msg: 'Money Jar Dashboard',
      showModal3: false,
      showModalPost: false,
      userContacts: [],
      post: {
          content: '',
      },
      fullPost: {}

    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'posts', 'users', 'friends'])
  },
  methods: {
    createJar(id){
      fb.postsCollection.add({
                createdOn: new Date(),
                content: this.post.content,
                userName: this.userProfile.name,
                comments: 0,
                likes: 0,
                viewers: [],
                editors: []
           }).then(ref => {
               this.post.content = ''
           }).catch(err => {
               console.log(err)
           })
    },
    deleteJar(id){
      fb.postsCollection.doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
    },
    viewPost(post) {
        // fb.commentsCollection.where('postId', '==', post.id).get().then(docs => {
        //   let commentsArray = []
        //
        //   docs.forEach(doc => {
        //       let comment = doc.data()
        //       comment.id = doc.id
        //       commentsArray.push(comment)
        //   })
        //
        //   this.postComments = commentsArray
          this.fullPost = post
          this.showModalPost = true
      // }).catch(err => {
      //     console.log(err)
      // }),
    },
    closePostModal() {
    // this.postComments = []
    this.showModalPost = false
    },
    preLoad(uid, name, email, id, docId){
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
      })
    },

    addPermissions(uid, name, email, id, docId){
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

      fb.postsCollection.doc(docId).update({
          viewers: firebase.firestore.FieldValue.arrayUnion(uid, id),
          editors: firebase.firestore.FieldValue.arrayUnion(uid, id),

          }).then(ref => {
             // alert('The user has been added to your contacts')
          }).catch(err => {
             console.log(err)
      })

    }
  },
  filters: {
    formatDate(val) {
        if (!val) { return '-' }
        let date = val.toDate()
        return moment(date).fromNow()
    },
    trimLength(val) {
        if (val.length < 200) {
            return val
        }
        return `${val.substring(0, 200)}...`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dashboard {
  align-content: center;
  margin-left: 20%;
  margin-right: 20%;
}
h1, h5 {
  font-weight: normal;
}
h2, h4 {
  color: #42b983;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.date {
  color: 	#808080;
}
textarea{
  padding-bottom: 20px;
  width: 50%;
  padding: 20px 20px;
  margin: 5% 10% 2% 10%;
  border-radius: 10px;
  align-self: center;
  box-sizing: content-box;
}
button{
  padding: 10px 20px;
  margin-top: 4%;
  margin-bottom: 3%;
  background:  #42b983;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 22px;
  outline: 0;
  cursor: pointer;
}
.delete {
  padding: 10px 20px;
  margin-top: 10%;
  background: #EA5656;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 22px;
  outline: 0;
  cursor: pointer;
}
.permissions{
  padding: 10px 20px;
  margin-top: 10%;
  background: #42b983;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 22px;
  outline: 0;
  cursor: pointer;
}
.row1 {
  /* width:40%; */
  height: 20%;
  margin-bottom: 10%;
  border-width: 5px;
  border-style: solid;
  border-radius: 10px;
  box-sizing: content-box;
}
.post {
  /* margin: 10%, 10%, 10%, 10; */
  background-color: rgb(230, 230, 230);
  border-width: 5px;
  border-style: solid;
  /* border-color:  #42b983; */
  border-color: white;
  border-radius: 10px;
  box-sizing: content-box;
}
.hidden-posts {
  border-width: 3px;
  border-style: solid;
  border-color:  #42b983;
  border-radius: 10px;
  box-sizing: content-box;
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
.modal-container {
  height: 60%;
  width: 300px;
  margin: 0px auto;
  padding: 13% 8%;
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
  margin: 10px 0;
  overflow: auto;
  height: 75%;
}
.model-footer {
  height: 10%;
}

.modal-default-button {
  float: right;
  margin-bottom: 10%;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
</style>
