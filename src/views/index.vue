<template>
  <div>
    <Header />
    <router-link class="nav-link" to="/home" v-if="selectedView !== '/home'">Go to Home</router-link>
    <router-link class="nav-link" to="/timeline" v-if="selectedView !== '/timeline'">Go to Timeline</router-link>
    <main id="main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue'
import router from '../router'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'

export default {
  components: { Footer, Header },
  name: 'Index',
  setup () {
    const selectedView = ref('/home')

    router.beforeEach((to, from, next) => {
      if (to.path === '/') {
        selectedView.value = '/home'
        next({
          path: '/home',
        })
      } else {
        selectedView.value = to.path
        next()
      }
    })

    return {
      selectedView
    }
  }
}
</script>

<style scoped>
.nav-link {
  color: black;
  padding: 10px;
}
</style>
