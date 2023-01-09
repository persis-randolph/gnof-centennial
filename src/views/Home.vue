<template>
  <div>
    <section id="animation">Logo Evolution Animation goes here</section>
    <PullOutFigureSection />
    <!-- <hr> -->
    <OurStory />
  </div>
</template>

<script>
import PullOutFigureSection from '../components/PullOutFigureSection.vue'
import OurStory from '../components/OurStory.vue'

export default {
  name: 'Home',
  components: { PullOutFigureSection, OurStory },
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