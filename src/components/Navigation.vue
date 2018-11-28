<template>
    <header>
        <h2>CHEQUEST</h2>
        <nav>
            <ul>
                <li>
                    <router-link to="/dashboard">Dashboard</router-link>
                </li>
                <li>
                    <router-link to="/contacts">Contacts</router-link>
                </li>
                <li>
                    <router-link to="/settings">Settings</router-link>
                </li>
                <li>
                  <button v-on:click="logout">Logout</button>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
const fb = require('../firebaseConfig.js')
// import firebase from 'firebase'

  export default {
    methods: {
      logout: function() {
        fb.auth.signOut().then(() => {
          this.$store.dispatch('clearData')
          this.$router.push('/login')
          // this.$router.replace('login')
        })
      }
    }
  }
</script>

<style scoped>
    header {
        z-index: 999;
        background-color: #000;
        height: 20%;
        min-height: 70px;
        max-height: 70px;
        position: sticky;
        width: 100%;
        top: 0;
        opacity: 0.9;
        border-bottom: 1px solid gray;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.04);
    }
    header > h2 {
        font-family: "Lato", sans-serif;
        position: absolute;
        left: 5%;
        padding: 11px 0 35px 0;
        font-size: 0.9em;
        font-weight: 400;
        color: #fff;
    }
    nav {
        position: absolute;
        left:40%;
        width: 60%;
    }
    nav > ul > li {
        font-size: 0.75em;
        font-weight: 500;
        padding-right: 5%;
        list-style: none;
        display: inline-block;
    }
    nav > ul > li > a {
        text-decoration: none;
        color: #fff;
    }
    button {
      padding: 10px 15px;
      background:  #42b983;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 22px;
      outline: 0;
      cursor: pointer;
    }
</style>
