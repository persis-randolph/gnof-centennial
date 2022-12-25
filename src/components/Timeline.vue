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

    const windowWidth = ref(window.innerWidth)
    // on resize, recalculating position maps since the positions will vary due to width
    const onResize = () => {
      windowWidth.value = window.innerWidth
      const cards = document.getElementsByClassName('card')
      for (let member in topYearMap) delete topYearMap[member]
      for (let member in reverseMap) delete reverseMap[member]
      for (let i = 0; i < cards.length; i++) {
        let cardBounds = cards[i].getBoundingClientRect()
        topYearMap[cardBounds.top + window.scrollY] = cardData[i].year
        reverseMap[cardData[i].year] = cardBounds.top + window.scrollY
      }
    }


    const topYearMap = {}
    const reverseMap = {}
    watch(scrollYPosition, () => {
      if (!isScrolling.value) {
        const cardPositions = Object.keys(topYearMap)
        const highToLow = cardPositions.map(el => +el).sort((a, b) => b - a)
        const closestMatch = highToLow.find(e => e <= +scrollYPosition.value + 250) || highToLow[highToLow.length - 1]
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
        window.addEventListener('resize', onResize)
      })
      const cards = document.getElementsByClassName('card')
      for (let i = 0; i < cards.length; i++) {
        let cardBounds = cards[i].getBoundingClientRect()
        topYearMap[cardBounds.top + window.scrollY] = cardData[i].year
        reverseMap[cardData[i].year] = cardBounds.top + window.scrollY
      }
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
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
  background-color: #E2F6FF;
  padding-bottom: 20px;
}

#card-section {
  width: 80%;
  margin: 0 auto;
  /* padding: 15px 0; */
}

#timeline-container {
  background-color: #ffffff;
  color: white;
  position: sticky;
  top: 100px;
  z-index: 2;
  padding: 20px 0 35px 0;
}

#timeline {
  background-color: #1D428A;
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
  padding: 0 10% 5px 10%;
  color: #1D428A;
  font-weight: 300;
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
  background-color: #00A9E0;
}
</style>