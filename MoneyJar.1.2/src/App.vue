<template>
  <div id="app">
    <Navigation v-if="currentUser"/></Navigation>
    <!-- <Navigation></Navigation> -->
    <br>
    <img src="./assets/addjar4.png"/>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: { Navigation },
  computed: {
    ...mapState(['currentUser'])
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
}
a: hover {
  opacity: 0.6;
}
img {
  position: relative;
  margin-top: 20px;
}
</style>
