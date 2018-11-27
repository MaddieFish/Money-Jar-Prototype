<template>
  <div class="sign-up">
      <h4>User creation</h4>
      <input type="text" v-model.trim="signupForm.name" placeholder="Username" id="name"/><br>
      <input type="text" v-model.trim="signupForm.email" placeholder="Email" id ="email2"><br>
      <input type="password" v-model.trim="signupForm.password" placeholder="Password" id="password2"><br>
      <button v-on:click="signUp">Sign Up</button>
      <span>Go back to <router-link to="/login">login</router-link>.</span>
    </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
// import firebase from 'firebase'

  export default {
    name: 'signUp',
    data: function() {
      return {
        signupForm: {
          name: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      signUp: function (){
          fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(
            user => {
           this.$store.commit('setCurrentUser', user.user)
           console.log(user)

           // create user obj
           fb.usersCollection.doc(user.user.uid).set({
             name: this.signupForm.name,
            email: this.signupForm.email
           }).then(() => {
              this.$router.push('/dashboard')
              this.$store.dispatch('fetchUserProfile')
              alert('Your user has been created!')
           }).catch(err => {
              alert('Please try again. ' + err.message)
           })
       }).catch(err => {
              alert('Please try again. ' + err.message)
       })
    }
    //   signUp: function() {
    //     // firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
    //     fb.auth.createUserWithEmailAndPassword(this.email, this.password).then(
    //       (user) => {
    //         this.$store.commit('setCurrentUser', user)
    //         // create user obj
    //         fb.usersCollection.doc(user.uid).set({
    //            name: this.signupForm.name,
    //            title: this.signupForm.title
    //        }).then(() => {
    //         // this.$router.replace('dashboard')
    //         this.$router.push('/dashboard')
    //         alert('Your user has been created!')
    //         this.$store.commit('fetchUserProfile', user)
    //       )},
    //       (err) => {
    //         alert('Please try again' + err.message)
    //     }
    //   );
    }
  }
</script>

<style scoped>
  .signUp {
    margin-top: 40px;
    /* background-color: rgb(255, 255, 102); */
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
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>
