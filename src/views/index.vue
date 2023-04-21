<template>
  <div>
    <Header
      :selectedView="selectedView"
    />
    <main id="main">
      <router-view @toggle-scroll="toggleScroll"/>
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
  setup (_, { emit }) {
    const selectedView = ref('/home')

    const toggleScroll = (payload) => {
      emit('toggle-scroll', payload)
    }

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
      selectedView,
      toggleScroll
    }
  }
}
</script>