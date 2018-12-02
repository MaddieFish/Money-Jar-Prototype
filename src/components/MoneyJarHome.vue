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
                <textarea type="number" v-model.trim="post.balance" placeholder = " Add initial funds"></textarea>
                <!-- <input type = "number" v-modal="post.balance" placeholder = "Initial $0.00"></input> -->
              <button @click="createJar(post.id)" :disabled="post.content == ''">Add Jar</button>
            </form>
        </div>
      </div>
    </div>
      <div class="row2">
        <div v-if="posts.length">
          <div v-for="post in posts">
            <div class="postLid">
            </div>
            <div  class="post">
              <h3>{{ post.userName }}</h3>
            <font size = "2px">
              <span class = "date">{{ post.createdOn | formatDate }}</span>
            </font>
            <font size = "5px">
            <p class="content">{{ post.content | trimLength }}</p>
          </font>
            <h2>${{ post.balance }}</h2>
            <ul>
              <font size = "2px">
                <li><i><button @click ="openCommentModal(post)">Transaction: {{ post.comments }}</button></i></li>
                <li><button class = "viewFullJar" @click="viewPost(post)">View Full Jar</button></li>
                <li><button class = "delete" @click="deleteJar(post.id)">Delete Jar</button></li>
              </font>
            </ul>

      </div>
    </div>
</div>

<div v-else>
    <p class="no-results">There are currently no Jars</p>
</div>

      </div>

      <div v-if= "showCommentModal" @close = "showCommentModal = false">
        <template v-modal = "showCommentModal" type="text/x-template" id = "modal-template">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container">

                  <div class="modal-header">
                    <slot name="header">
                      <h3 slot = "header">Transactions</h3>
                    </slot>
                  </div>

                  <div class="modal-body">
                    <slot name="body">

                      <p>add a transaction</p>
                      <form @submit.prevent>
                        <textarea v-model.trim="comment.content"></textarea>
                        <button @click="addComment" :disabled="comment.content == ''" class="button">submit</button>
                      </form>

                    </slot>
                        </div>

                  <div class="modal-footer">
                    <slot name="footer">
                      <button class="modal-default-button" @click="showCommentModal = false">
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

      <div v-if= "showModalPost" @close = "showModalPost = false">
        <template v-modal = "showModalPost" type="text/x-template" id = "modal-template">
          <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper2">
                <div class="modal-container2">

                  <div class="modal-header">
                    <slot name="header">

                      <div class ="post">
                      <h2>{{ fullPost.content }}</h2>
                      <h3>{{ fullPost.userName }}</h3>
                      <h2>{{ fullPost.balance }}</h2>
                      <span><i>{{ fullPost.createdOn | formatDate }}</i></span>

                      <ul>
                        <li><a>Transactions: {{ fullPost.comments }}</a></li>
                        <!-- <li><a>likes {{ fullPost.likes }}</a></li> -->
                      </ul>
                  </div>

                    </slot>
                </div>

                  <div class="modal-body2">
                    <slot name="body">

                      <div class= "commentCont">
                      <div v-show="postComments.length" class="comments">
                        <div v-for="comment in postComments" class="comment">
                          <h3>{{ comment.userName }}</h3>
                          <span><i>{{ comment.createdOn | formatDate }}</i></span>
                          <p>{{ comment.content }}</p>
                        </div>

                        </div>
                      </div>


                      <!-- <div v-if="users.length">
                        <div v-for="contact in users" class="contact" @click= "addPermissions(currentUser.uid, contact.name, contact.email, contact.id, post.id)">
                              <h3 @click= "addPermissions(currentUser.uid, contact.name, contact.email, contact.id, post.id)">{{ contact.name }}</h3>
                              <i><h4 class = "email2" @click= "addPermissions(currentUser.uid, contact.name, contact.email, contact.id, post.id)">{{ contact.email }}</h4></i>
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
      showCommentModal: false,
      userContacts: [],
      post: {
          content: '',
          balance: ''
      },
      comment: {
        postId: '',
        userId: '',
        content: '',
        balance: '',
        postComments: 0
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
                balance: this.post.balance,
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
    openCommentModal(post) {
    this.comment.postId = post.id
    this.comment.userId = post.userId
    this.comment.balance = post.balance
    this.comment.postComments = post.comments
    this.showCommentModal = true
    },
    closeCommentModal() {
        this.comment.postId = ''
        this.comment.userId = ''
        this.comment.content = ''
        this.showCommentModal = false
    },
    addComment() {
        let postId = this.comment.postId
        let postComments = this.comment.postComments

        fb.commentsCollection.add({
            createdOn: new Date(),
            content: this.comment.content,
            postId: postId,
            userId: this.currentUser.uid,
            userName: this.userProfile.name
        }).then(doc => {
            fb.postsCollection.doc(postId).update({
                comments: postComments + 1,
                // balance: this.post.balance + this.comment.balance
            }).then(() => {
                this.closeCommentModal()
            })
        }).catch(err => {
            console.log(err)
        })
    },
    viewPost(post) {
        fb.commentsCollection.where('postId', '==', post.id).get().then(docs => {
          let commentsArray = []

          docs.forEach(doc => {
              let comment = doc.data()
              comment.id = doc.id
              commentsArray.push(comment)
          })

          this.postComments = commentsArray
          this.fullPost = post
          this.showModalPost = true
      }).catch(err => {
          console.log(err)
      })
    },
    closePostModal() {
    this.postComments = []
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
.content {
  font-weight: 700;
  /* color: #42b983; */
  color: black;
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
.permissionsCont {
  margin: 10px 0;
  overflow: auto;
  height: 75%;
}
.commentCont {
  background-color: #F0DF55;
  border-radius: 10px;
  border color: white;
  margin: 10px 0;
  overflow: auto;
  height: 92%;
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
.postLid {
  margin-left: 10%;
  margin-top: 20%;
  height: 30px;
  width: 75%;
  background-color: rgb(230, 230, 230);
  border-width: 5px;
  border-style: solid;
  border-color: white;
  border-radius: 20px;
  box-sizing: content-box;
}
.post {
  /* margin: 10%, 10%, 10%, 10; */
  background-color: rgb(230, 230, 230);
  border-width: 5px;
  border-style: solid;
  /* border-color:  #42b983; */
  border-color: white;
  border-radius: 40px;
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
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  height: 45%;
  width: 300px;
  margin: 0px auto;
  padding: 5% 8%;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-wrapper2 {
  display: table-cell;
  vertical-align: middle;
}
.modal-container2 {
  height: 600px;
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
  margin: 15px 0;
  overflow: auto;
  height: 70%;
}
.modal-body2 {
  margin: 15px 0;
  overflow: auto;
  height: 55%;
}
.modal-footer {
  height: 5%;
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
