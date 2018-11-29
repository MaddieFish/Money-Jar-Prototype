<template>
  <div class="contacts">
    <h1>{{ msg }}</h1>
    <section>
      <button>Add Contact</button>
      <div v-if="users.length">
        <div v-for="contact in users" class="contact">
      <h3>{{ contact.name }}</h3>
      <h4 class = "email">{{ contact.email }}</h4>
  </div>
</div>
<div v-else>
  <p class="no-results">There are currently no Users</p>
</div>
  </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')
// import firebase from 'firebase'

export default {
  name: 'Contacts',
  data () {
    return {
      msg: 'Contacts',
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'users'])
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contacts {
  align-content: center;
  margin-left: 20%;
  margin-right: 20%;
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
  background:  #42b983;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 22px;
  outline: 0;
  cursor: pointer;
}
.contact {
  /* margin: 10%, 10%, 10%, 10; */
  border-width: 5px;
  border-style: solid;
  border-color:  #42b983;
  border-radius: 10px;
  box-sizing: content-box;
}
.email {
  color: 	#808080;
}
</style>
