<template>
  <div>
    <Header />
    <main id="main">
      <section id="animation">Logo Evolution Animation goes here</section>
      <PullOutFigureSection />
      <hr>
      <OurStory />
      <Timeline />
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue'
import Header from './Header.vue'
import OurStory from './OurStory.vue'
import PullOutFigureSection from './PullOutFigureSection.vue'
import Timeline from './Timeline.vue'

export default {
  components: {
    Footer,
    Header,
    OurStory,
    PullOutFigureSection,
    Timeline
  },
  name: 'Index',
  setup () {
    return {}
  }
}
</script>

<style scoped>
#animation {
  width: 100%;
  height: 300px;
  background-color: grey;
  color: white;
}
</style>
