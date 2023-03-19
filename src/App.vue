<template>
  <Index/>
</template>

<script>
import Index from './views/index.vue'

export default {
  name: 'App',
  components: { Index }
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
}
a, a:link, a:visited, a:hover, a:active {
  color: white;
  text-decoration: none;
}
h2 {
  color: #041e42;
  font-size: 56px;
  font-weight: 700;
}
p {
  color: #041e42;
  font-size: 16px;
  font-weight: 300;
}
</style>
