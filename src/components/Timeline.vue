<template>
  <div id="container">
    <div id="timeline-container">
      <div id="years">
        <div>{{ firstYear }}</div>
        <div>{{ lastYear }}</div>
      </div>
      <div id="timeline">
        <div
          v-for="year in uniqueYears"
          :key="year"
          class="year-div"
          :class="currentCard === year ? 'selected' : ''"
          @click="onClick(year)"
        >
          {{ currentCard === year ? currentCard : '' }}
        </div>
      </div>
    </div>
    <div id="card-section">
      <Card
        v-for="card in cardData"
        :key="card.year"
        :card="card"
        class="card"
        @set-current-card="setCurrentCard"
      />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import data from '../data/cardData'

export default {
  name: 'Timeline',
  components: {
    Card
  },
  setup () {
    const cardData = data
    const currentCard = ref(cardData[0].year)

    const setCurrentCard = (cardYear) => {
      currentCard.value = cardYear
    }

    const firstYear = cardData[0].year
    const lastYear = cardData[cardData.length - 1].year

    const years = cardData.map(card => {
      return card.year
    })
    const uniqueYears = new Set(years)

    const scrollYPosition = ref(window.scrollY)
    const onScroll = () => {
      scrollYPosition.value = window.scrollY
    }

    const topYearMap = {}
    const reverseMap = {}
    watch(scrollYPosition, () => {
      if (!isScrolling.value) {
        const highestToLowest = Object.keys(topYearMap).sort().reverse()
        console.log(highestToLowest)
        const closestMatch = highestToLowest.find(e => e <= scrollYPosition.value + 200) || highestToLowest[highestToLowest.length - 1]
        if (currentCard.value !== topYearMap[closestMatch]) {
          currentCard.value = topYearMap[closestMatch]
        }
      }
    })

    const isScrolling = ref(false)
    const onClick = async (year) => {
      if (!isScrolling.value) {
        currentCard.value = year
        isScrolling.value = true
        setTimeout(() => {
          isScrolling.value = false
        }, 1000)
        window.scroll({
          top: reverseMap[year] - 200,
          behavior: 'smooth'
        })
      }
    }

    onMounted(() => {
      nextTick(() => {
        window.addEventListener('scroll', onScroll)
      })
      const cards = document.getElementsByClassName('card')
      for (let i = 0; i < cards.length; i++) {
        let cardBounds = cards[i].getBoundingClientRect()
        // had to add the scrollY because if it mounts already scrolled then it doesn't include that in the top measurement
        // with scrollY added it's consistent
        topYearMap[cardBounds.top + window.scrollY] = cardData[i].year
        reverseMap[cardData[i].year] = cardBounds.top + window.scrollY
      }
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onScroll)
    })

    return {
      cardData,
      currentCard,
      firstYear,
      lastYear,
      uniqueYears,
      onClick,
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
  /* box-shadow: 2px 2px 2px #b0a9a0;
  -moz-box-shadow: 2px 2px 3px #b0a9a0;
  -webkit-box-shadow: 2px 2px 3px #b0a9a0; */
  margin: auto;
  color: #04307e;
  display: flex;
  flex-direction: row;
}

#years {
  display: flex;
  width: 80%;
  justify-content: space-between;
  padding: 0 10%;
}

.year-div {
  flex-grow: 1;
  height: 100%;
  /* border: 1px solid black; */
}

.year-div:first-of-type {
  border-radius: 10px 0 0 10px;
}

.year-div:last-of-type {
  border-radius: 0 10px 10px 0;
}

.selected {
  background-color: #00a1e2;
}
</style>