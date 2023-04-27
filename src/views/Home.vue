<template>
  <div>
    <div :style="{ backgroundColor: 'black' }">
      <Animation />
    </div>
    <PullOutFigureSection />
    <!-- <hr> -->
    <OurStory />
  </div>
</template>

<script>
import PullOutFigureSection from "../components/PullOutFigureSection.vue"
import OurStory from "../components/OurStory.vue"
import Animation from "../components/Animation.vue"
import { onMounted } from 'vue'

export default {
  name: "Home",
  components: {
    Animation,
    OurStory,
    PullOutFigureSection,
  },
  setup() {
    // ensures scroll is at top when returning to this page
    onMounted(() => {
      window.scroll({
        top: 0
      })
    })

    return {}
  },
};
</script>
