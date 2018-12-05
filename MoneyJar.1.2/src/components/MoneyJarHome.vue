<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <section>
      <div class = "row1">
        <div class = "profile">
          <h2>{{ userProfile.name }}</h2>
          <p><i>{{ userProfile.email }}</i><p>
            <h3>{{ userProfile.institution }}</h3>
            <div class="create-jar">
              <form @submit.prevent>
                <textarea v-model.trim="post.content" placeholder = " Description"></textarea>
                <!-- <textarea type="number" v-model.trim="post.balance" placeholder = " Add initial funds"></textarea> -->
                <!-- <input type = "number" v-modal="post.balance" placeholder = "Initial $0.00"></input> -->
              <button @click="createJar(currentUser.uid, post)" :disabled="post.content == ''">Add Jar</button>
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
            <font size = "4.5px">
            <p class="content">{{ post.content | trimLength }}</p>
          </font>
            <!-- <h2>${{ post.balance-comment.balance}}</h2> -->
            <h2>${{ post.balance }}</h2>

            <ul>
              <font size = "2px">
                <li><button @click ="openCommentModal(post)">Transaction: {{ post.comments }}</button></li>
                <!-- <li><button @click = "openPermissionModal(currentUser.uid, contact.name, contact.email, contact.id, post)">Permissions</button></li> -->
                <!-- <li><button @click = "openPermissionModal(post)">Permissions</button></li> -->
                <li><button @click = "showModal3 = true">Permissions</button></li>

                <li><button class = "viewFullJar" @click="viewPost(post)">View Full Jar</button></li>
                <li><button class = "delete" @click="deleteJar(post)">Close Jar</button></li>
              </font>

              <div v-if= "showModal3" @close = "showModal3 = false">
                <template v-modal = "showModal3" type="text/x-template" id = "modal-template">
                  <transition name="modal">
                    <!-- <div class="modal-mask"> -->
                      <div class="modal-wrapper">
                        <div class="modal-container3">

                          <div class="modal-header">
                            <slot name="header">
                              <!-- <h3 slot = "header">{{ post.content }}</h3> -->
                              <h3 slot = "header">Contacts</h3>

                            </slot>
                          </div>

                          <div class="modal-body3">
                            <slot name="body">
                              <div v-if="users.length">
                                <div v-for="contact in users" class="contact" @click= "addPermissions(currentUser.uid, currentUser.name, contact.name, contact.email, contact.id, post), showModal3 = false">
                                      <h3 @click= "addPermissions(currentUser.uid, currentUser.name, contact.name, contact.email, contact.id, post)">{{ contact.name }}</h3>
                                      <i><h4 class = "email2" @click= "addPermissions(currentUser.uid, currentUser.name, contact.name, contact.email, contact.id, post)">{{ contact.email }}</h4></i>
                                      </div>
                                      </div>
                                    <div v-else>
                                      <p class="no-results">There are currently no Contacts</p>
                                    </div>

                        <div v-else>
                          <p class="no-results">There are currently no Users</p>
                        </div>
                            </slot>
                          </div>

                          <div class="modal-footer">
                            <slot name="footer">
                              <p>Click user to give permission to view and edit.</p>
                              <button class="modal-default-button" @click="showModal3 = false">
                                DONE
                              </button>
                            </slot>
                          </div>
                        </div>
                      <!-- </div> -->
                    </div>
                  </transition>
                </template>
              </div>


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

                      <p>Add a transaction</p>
                      <form @submit.prevent>
                        <textarea v-model.trim="comment.content" placeholder="Description"></textarea>
                        <textarea type="number" v-model.trim="comment.balance" placeholder="Add or remove amount: $0.00"></textarea>
                        <button @click="addComment(post)" :disabled="comment.content == ''" class="button">submit</button>
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
                        <br>
                      <h3>{{ fullPost.userName }}</h3>
                      <h2>{{ fullPost.content }}</h2>
                      <h2>${{ fullPost.balance }}</h2>
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

                      <p>Members: {{ fullPost.editorNames }}</p>

                      <div v-show="postComments.length" class="comments">
                        <div v-for="comment in postComments" class="comment">
                          <div class= "commentCont">
                          <h3>{{ comment.userName }}</h3>
                          <span><i>{{ comment.createdOn | formatDate }}</i></span>
                          <p>{{ comment.content }}</p>
                          <h3>${{ comment.balance }}</h3>

                        </div>
                        </div>
                      </div>

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
                      <button class="modal-default-button" @click="showModalPost = false">
                        Jar Restrictions
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
      showPermissionModal: false,
      showCommentModal: false,
      userContacts: [],
      post: {
          content: '',
          balance: 0,
          // totalExpense: 0,
          totalIncome: 0,
          editors: [],
          viewers: []
      },
      comment: {
        postId: '',
        userId: '',
        content: '',
        balance: 0,
        postComments: 0
      },
      fullPost: {},
      jarBalance: [],
      postComments: []

    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'posts', 'users', 'friends'])
  },
  methods: {
    createJar(uid, post){
      fb.postsCollection.add({
                createdOn: new Date(),
                content: this.post.content,
                balance: this.post.balance,
                userName: this.userProfile.name,
                userId: this.currentUser.uid,
                comments: 0,
                likes: 0,
                // viewers: [],
                // editors: []
                editors: firebase.firestore.FieldValue.arrayUnion(this.currentUser.uid),
                viewers: firebase.firestore.FieldValue.arrayUnion(this.currentUser.uid)
           }).then(ref => {
               this.post.content = ''
               console.log(this.currentUser.uid)

                            }).catch(err => {
               console.log(err)
           })
    },

    deleteJar(post){
      fb.postsCollection.doc(post.id).delete().then(function() {
      // fb.postsCollection.where("userId", "==", this.currentUser.uid).doc(post.id).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
    },
    openCommentModal(post) {
    this.comment.postId = post.id
    this.comment.userId = post.userId
    this.comment.postComments = post.comments
    this.comment.balance = '',
    this.post.totalIncome = post.balance
    this.showCommentModal = true
    },
    closeCommentModal() {
        this.comment.postId = ''
        this.comment.userId = ''
        this.comment.content = ''
        this.comment.balance = ''
        this.showCommentModal = false
    },

    addComment(post) {
        let postId = this.comment.postId
        let postComments = this.comment.postComments

        fb.commentsCollection.add({
            createdOn: new Date(),
            content: this.comment.content,
            balance: this.comment.balance,
            postId: postId,
            userId: this.currentUser.uid,
            userName: this.userProfile.name
        }).then(doc => {
            fb.postsCollection.doc(postId).update({
                comments: postComments + 1,
                totalIncome: post.totalIncome += Number(this.comment.balance),
                balance: post.totalIncome

            }).then(() => {
                this.closeCommentModal()
            })
        }).catch(err => {
            console.log(err)
        })
    },
    viewPost(post) {
        fb.commentsCollection.where('postId', '==', post.id).orderBy('createdOn', 'desc').get().then(docs => {
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
    addPermissions(uid, uName, name, email, id, post){
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

      fb.postsCollection.doc(post.id).update({
          viewers: firebase.firestore.FieldValue.arrayUnion(uid,id),
          viewerNames: firebase.firestore.FieldValue.arrayUnion(name),
          editors: firebase.firestore.FieldValue.arrayUnion(uid,id),
          editorNames: firebase.firestore.FieldValue.arrayUnion(name)

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
<style scoped>
.dashboard {
  align-content: center;
  margin-left: 15%;
  margin-right: 15%;
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
  padding-bottom: 10px;
  width: 50%;
  padding: 10px 20px;
  margin: 5% 10% 2% 10%;
  border-radius: 10px;
  align-self: center;
  text-align: center;
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
  border-radius: 15px;
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
  height: 415px;
  width: 80%;
  margin: 10px auto;
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
  height: 700px;
  width: 300px;
  margin: 0px auto;
  padding: 5% 8%;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-container3 {
  height: 400px;
  width: 80%;
  margin: 10px auto;
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
  height: 75%;
}
.modal-body2 {
  margin: 15px 0;
  overflow: auto;
  height: 47%;
}
.modal-body3 {
  margin: 15px 0;
  overflow: auto;
  height: 55%;
}
.modal-footer {
  height: 15%;
}
.modal-default-button {
  margin-left: 10px;
  float: right;
}

.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}

</style>
