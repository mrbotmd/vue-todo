<template>
  <div id="app">
    <nav class="flex row center">
      <router-link to="/"> Home</router-link>
      <router-link to="todos"> ToDos</router-link>
      <router-link to="archived-todos"> Achived ToDos</router-link>
    </nav>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

.relative {
  position: relative;
}

.flex {
  display: flex;
}

.row {
  flex-direction: row;
}

.column {
  flex-direction: column;
}

.center {
  justify-content: center;
  align-items: center;
}

.spaced {
  justify-content: space-between;
}

.control-btn {
  border: none;
  box-shadow: 0 0 0;
}

nav {
  padding-top: 10px;
  height: 50px;
  width: 100vw;
}

nav a {
  color: black;
  margin: 0 40px;
  text-decoration: none;
  font-size: 1.5rem;
}

nav a:visited {
  color: black;
}
</style>
