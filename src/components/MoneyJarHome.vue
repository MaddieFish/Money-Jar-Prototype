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
                <!-- <button>Add Jar</button> -->
              <button @click="createJar(post.id)" :disabled="post.content == ''">Add Jar</button>
            </form>
        </div>
      </div>
    </div>
      <!-- <img src = "/assets/addjar2.png"></img> -->
      <div class="row2">
        <div v-if="posts.length">
          <!-- <transition name="fade">
            <div v-if="hiddenPosts.length" @click="showNewJars" class="hidden-posts">
                <p>
                    Click to show <span class="new-posts">{{ hiddenPosts.length }}</span>
                    new <span v-if="hiddenPosts.length > 1">posts</span><span v-else>post</span>
                </p>
            </div>
        </transition> -->
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
            <li><i><a>view full Jar</a></i></li>
            <li><button class = "delete" @click="deleteJar(post.id)">Delete Jar</button></li>
          </font>
        </ul>
    </div>
</div>
<div v-else>
    <p class="no-results">There are currently no Jars</p>
</div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')
import moment from 'moment'


export default {
  name: 'MoneyJarHome',
  data () {
    return {
      msg: 'Money Jar Dashboard',
      post: {
                content: '',
            }
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'posts', 'hiddenPosts'])
  },
  methods: {
    createJar(id){
      fb.postsCollection.add({
                createdOn: new Date(),
                content: this.post.content,
                // userId: this.currentUser.uid,
                userName: this.userProfile.name,
                comments: 0,
                likes: 0
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
    // showNewJars() {
    //   let updatedPostsArray = this.hiddenPosts.concat(this.posts)
    //   // clear hideenPosts array and update posts array
    //   this.$store.commit('setHiddenPosts', null)
    //   this.$store.commit('setPosts', updatedPostsArray)
    // }
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
</style>
