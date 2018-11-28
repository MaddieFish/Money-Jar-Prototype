<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <section>
      <div class = "row1">
        <div class = "profile">
          <h2>{{ userProfile.name }}</h2>
          <p>{{ userProfile.email }}<p>
            <div class="create-jar">
              <form @submit.prevent>
                <textarea></textarea>
                <button>Add Jar</button>
              <!-- <button @click="createJar" :disabled="post.content == """>Add Jar</button> -->
            </form>
        </div>
      </div>
    </div>
      <!-- <img src = "/assets/addjar2.png"></img> -->
      <div class="row2">
        <div>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')
// import firebase from 'firebase'

export default {
  name: 'MoneyJarHome',
  data () {
    return {
      msg: 'Money Jar Dashboard'
    //   post: {
    //             content: ''
    //         }
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    // createJar(){
    //   fb.postsCollection.add({
    //            createdOn: new Date(),
    //            content: this.post.content,
    //            userId: this.currentUser.uid,
    //            userName: this.userProfile.name,
    //            comments: 0,
    //            likes: 0
    //        }).then(ref => {
    //            this.post.content = ''
    //        }).catch(err => {
    //            console.log(err)
    //        })
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dashboard {
  align-content: center;
  margin-left: 25%;
  margin-right: 25%;
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
textarea{
  padding-bottom: 20px;
  padding: 20px 20px;
  margin: 5% 10% 2% 10%;
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
.row1 {
  /* width:40%; */
  height: 20%;
  border-width: 5px;
  border-style: solid;
  border-radius: 10px;
  box-sizing: content-box;
  /* align-self: center; */
}
</style>
