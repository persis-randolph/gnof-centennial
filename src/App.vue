<template>
  <Index/>
</template>

<script>
import Index from './components/index.vue'

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style>
* {
  margin: 0
}
#app {
  font-family: "neusa-next-std", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* overflow-x: hidden; */
}
a, a:link, a:visited, a:hover, a:active {
  color: white;
  text-decoration: none;
}
</style>
