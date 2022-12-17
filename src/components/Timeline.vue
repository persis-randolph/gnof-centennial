<template>
  <div id="container">
    <div
      id="timeline"
      class="sticky"
      :style="{'height': (windowHeight * .7) + 'px'}"
    >{{ currentCard }}</div>
    <div
      id="card-section"
      :style="{width: (windowWidth * 0.7) + 'px', 'height': (windowHeight * 0.715) + 'px'}"
    >
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
import { ref, onMounted, nextTick, onBeforeUnmount, watch } from 'vue'
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
    const windowHeight = ref(window.innerHeight)
    const windowWidth = ref(window.innerWidth)
    const scrollYPosition = ref(window.scrollY)

    watch([windowHeight, windowWidth, scrollYPosition], () => {
      console.log('height: ' + windowHeight.value + ' width: ' + windowWidth.value)
      console.log('scrollY: ', scrollYPosition.value)
    })

    const onResize = () => {
      windowHeight.value = window.innerHeight
      windowWidth.value = window.innerWidth
    }

    const onScroll = () => {
      scrollYPosition.value = window.scrollY
      // windowHeight.value = window.innerHeight
      // windowWidth.value = window.innerWidth
    }

    onMounted(() => {
      nextTick(() => {
        window.addEventListener('resize', onResize)
        window.addEventListener('scroll', onScroll)
      })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
    })

    return {
      cardData,
      currentCard,
      windowHeight,
      windowWidth,
      setCurrentCard
    }
  }
}
</script>

<style scoped>
#container {
  display: flex;
  justify-content: center;
  position: sticky;
  position: -webkit-sticky;
  top: 75px;
  background-color: #e2f6ff;
}
#card-section {
  /* background-color: magenta; */
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  /* padding-top: 50px; */
}
#card-section::-webkit-scrollbar {
  display: none;
}
#timeline {
  background-color: white;
  width: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px #b0a9a0;
  -moz-box-shadow: 2px 2px 3px #b0a9a0;
  -webkit-box-shadow: 2px 2px 3px #b0a9a0;
  margin: 20px 30px 20px 0;
}
</style>