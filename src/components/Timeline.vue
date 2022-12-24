<template>
  <div id="container">
    <div id="timeline-container">
      <div id="years">
        <div>{{ firstYear }}</div>
        <div>{{ lastYear }}</div>
      </div>
      <div id="timeline">{{ currentCard }}</div>
    </div>
    <div id="card-section">
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

    const firstYear = data[0].year
    const lastYear = data[data.length - 1].year

    return {
      cardData,
      currentCard,
      firstYear,
      lastYear,
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
  width: 80%;
  margin: 0 auto;
}

#timeline-container {
  background-color: #04307e;
  color: white;
  position: sticky;
  top: 95px;
  z-index: 2;
  padding: 20px 0 35px 0;
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
  color: #04307e;
}

#years {
  display: flex;
  width: 80%;
  justify-content: space-between;
  padding: 0 10%;
}
</style>