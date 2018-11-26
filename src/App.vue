<template>
  <div id="app">
    <nav-component/>
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import NavComponent from './Components/Head'

export default {
  name: 'App',
  components: {
      NavComponent,
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /* width: 100%;
  height: 100%;
  background-color: lightblue; */
}
a: hover {
  opacity: 0.6;
}
</style>
