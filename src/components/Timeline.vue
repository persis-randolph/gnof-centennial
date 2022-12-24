<template>
  <div id="container">
    <div id="timeline-container">
      <div id="timeline">{{ currentCard }}</div>
    </div>
    <!-- :style="{'height': (windowHeight * .7) + 'px'}" -->
    <div id="card-section">
    <!-- :style="{width: (windowWidth * 0.7) + 'px', 'height': (windowHeight * 0.715) + 'px'}" -->
      <Card
        v-for="card in cardData"
        :key="card.year"
        :card="card"
        @set-current-card="setCurrentCard"
      />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'
import { ref } from 'vue'
// import { ref, onMounted, nextTick, onBeforeUnmount, watch } from 'vue'
import data from '../data/cardData'

export default {
  name: 'Timeline',
  components: {
    Card
  },
  setup () {
    const cardData = data
    const currentCard = ref(undefined)

    const setCurrentCard = (cardYear) => {
      currentCard.value = cardYear
    }

    // const windowHeight = ref(window.innerHeight + window.scrollY)
    // const windowHeight = ref(window.innerHeight)
    // const windowWidth = ref(window.innerWidth)
    // const scrollYPosition = ref(window.scrollY)

    // watch([windowHeight, windowWidth, scrollYPosition], () => {
    //   console.log('height: ' + windowHeight.value + ' width: ' + windowWidth.value)
    //   console.log('scrollY: ', scrollYPosition.value)
    // })

    // const onResize = () => {
    //   windowHeight.value = window.innerHeight
    //   windowWidth.value = window.innerWidth
    // }

    // const onScroll = () => {
    //   scrollYPosition.value = window.scrollY
    //   // windowHeight.value = window.innerHeight
    //   // windowWidth.value = window.innerWidth
    // }

    // onMounted(() => {
    //   nextTick(() => {
    //     window.addEventListener('resize', onResize)
    //     window.addEventListener('scroll', onScroll)
    //   })
    // })

    // onBeforeUnmount(() => {
    //   window.removeEventListener('resize', onResize)
    //   window.removeEventListener('scroll', onScroll)
    // })

    return {
      cardData,
      currentCard,
      // windowHeight,
      // windowWidth,
      setCurrentCard
    }
  }
}
</script>

<style scoped>
#container {
  display: block;
  background-color: #e2f6ff;
  padding-bottom: 20px;
}
#card-section {
  /* overflow: scroll; */
  /* -ms-overflow-style: none; */
  /* scrollbar-width: none; */
  width: 80%;
  margin: 0 auto;
}
/* #card-section::-webkit-scrollbar { */
  /* display: none; */
/* } */
#timeline-container {
  background-color: #04307e;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
  padding: 30px 0;
}

#timeline {
  background-color: white;
  width: 80%;
  height: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px #b0a9a0;
  -moz-box-shadow: 2px 2px 3px #b0a9a0;
  -webkit-box-shadow: 2px 2px 3px #b0a9a0;
  margin: auto;
}
</style>