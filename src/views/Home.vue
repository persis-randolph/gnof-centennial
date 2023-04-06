<!-- TODO: scroll needs to reset to 0 when navigating to the homepage -->

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

export default {
  name: "Home",
  components: {
    Animation,
    OurStory,
    PullOutFigureSection,
  },
  setup() {
    return {}
  },
};
</script>
