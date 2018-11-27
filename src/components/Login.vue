<template>
  <div class="login">
      <h3>Sign In</h3>
      <input type="text" v-model.trim="loginForm.email" placeholder="Email" id="email"><br>
      <input type="password" v-model.trim="loginForm.password" placeholder="********" id="password"><br>
      <button v-on:click="signIn">Login</button>
      <p>No user? <router-link to="/sign-up">Create one</router-link>.</p>
  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
// import firebase from 'firebase'

  export default {
    name: 'login',
    data: function() {
      return {
        loginForm: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
    signIn: function() {
      // firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(
        user => {
          // this.$router.replace('dashboard')
          this.$router.push('/dasboard')
          this.$store.commit('setCurrentUser', user.user)
          this.$store.dispatch('fetchUserProfile')
          alert('Login was successful.')
        },
        (err) => {
          alert('Wrong email or password. ' + err.message)
        }
      );
    }
  }
}
</script>

<style scoped>
  .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 40%;
    padding: 15px;
  }
  button {
    padding: 10px 20px;
    background:  #42b983;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 22px;
    outline: 0;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
