<template>
  <div id="app">
    <router-link to="/"> Home</router-link>
    <router-link to="todos"> to To-Dos</router-link>
    <router-link to="archived-todos"> to achived To-Dos</router-link>
  <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  methods: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  
}
</style>
