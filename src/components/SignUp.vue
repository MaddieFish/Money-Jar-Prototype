<template>
  <div class="sign-up">
      <h4>User creation</h4>
      <input type="text" v-model="email" placeholder="Email"><br>
      <input type="password" v-model="password" placeholder="Password"><br>
      <button v-on:click="signUp">Sign Up</button>
      <span>Go back to <router-link to="/login">login</router-link>.</span>
    </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'signUp',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            alert('Your user has been created!')
            this.$router.replace('money-jar-home')
          },
          (err) => {
            alert('Please try again' + err.message)
        }
      );
    }
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
