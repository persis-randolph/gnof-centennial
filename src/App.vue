<template>
  <Index @toggle-scroll="toggleScroll"/>
</template>

<script>
import Index from './views/index.vue'

export default {
  name: 'App',
  components: { Index },
  setup () {
    const toggleScroll = (payload) => {
      if (payload === 'enable') {
        document.body.style.overflowY = ''
      } else if (payload === 'disable') {
        document.body.style.overflowY = 'hidden'
      }
    }

    return {
      toggleScroll
    }
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
