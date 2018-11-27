<template>
  <div>
    <article class="money jars" v-for="(jar, idx) in jars" :key="idx">
      <div>
        <img style="margin: 10px" :src="jar.image" height="291px" width="192px">
        <p >{{ jar.name }}</p>
        <hr>
        <button class="button" @click="deleteJar(jar.id)">
          Delete
        </button>
      </div>
    </article>

    <form @submit="addJar(name, image)">
      <h2>Add a New Money Jar</h2>
      <input v-model="name" placeholder="Jar Name" class="input" required>
      <input v-model="image" placeholder="Jar Image URL" class="input" required>
      <button type="submit" class="button">Add New Jar</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'
export default {
  name: 'Jars',
  data () {
    return {
      jars: [],
      name: '',
      image: ''
    }
  },
  firestore () {
    return {
      jars: db.collection('jars').orderBy('createdAt')
    }
  },
  methods: {
    addJar (name, image) {
      const createdAt = new Date()
      db.collection('jars').add({ name, image, createdAt })
      // Clear values
      this.name = ''
      this.image = ''
    },
    deleteJar (id) {
      db.collection('jars').doc(id).delete()
    },
  }
}
</script>

</script>

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
  color: black;
}
input, button {
  margin-bottom: 10px;
}
button {
  background-color: #0476F2;
}
</style>
