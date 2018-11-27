<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <button>Add Jar</button>
    <!-- <img src = "/assets/addjar2.png"></img> -->

  </div>
</template>

<script>
// const fb = require('../firebaseConfig.js')
import firebase from 'firebase'

export default {
  name: 'MoneyJarHome',
  data () {
    return {
      msg: 'Money Jar Dashboard'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
a {
  color: #42b983;
}
button{
  padding: 10px 20px;
  background:  #42b983;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 22px;
  outline: 0;
  cursor: pointer;
}
</style>
