<template>
  <div id="container">
    <div id="timeline-container">
      <!-- timeline filters -->
      <div id="filters">
        <div class="filter" id="philanthropy" @click="toggleFilter('philanthropy')">
          <font-awesome-icon
            :icon="selectedFiltersObj['philanthropy'] ? 'fas fa-square-check' : 'fas fa-square'"
            class="icon philanthropy"
          />
          Philanthropy
        </div>
        <div class="filter" id="leadership" @click="toggleFilter('leadership')">
          <font-awesome-icon
            :icon="selectedFiltersObj['leadership'] ? 'fas fa-square-check' : 'fas fa-square'"
            class="icon leadership"
          />
          Leadership
        </div>
        <div class="filter" id="action" @click="toggleFilter('action')">
          <font-awesome-icon
            :icon="selectedFiltersObj['action'] ? 'fas fa-square-check' : 'fas fa-square'"
            class="icon action"
          />
          Action
        </div>
      </div>
      <!-- interactive timeline bar -->
      <div id="timeline">
        <!-- <span id="first-year">{{ firstYear }}</span> -->
        <div
          v-for="year in uniqueYears"
          :key="year"
          class="year-div"
          :class="currentCard === year ? 'selected' : ''"
          @click="onClick(year)"
        >
          <!-- tooltip -->
          <div class="tooltip-arrow" v-if="currentCard === year"></div>
          <div class="tooltip" v-if="currentCard === year">{{ currentCard }}</div>
        </div>
        <!-- <span id="last-year">{{ lastYear }}</span> -->
      </div>
    </div>
    <!-- card display -->
    <div id="card-section">
      <Card
        v-for="(card, i) in cardData"
        :key="i + card.year + card.category + card.header"
        :card="card"
        class="card"
        @set-current-card="setCurrentCard"
      />
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
import { computed, reactive, ref, onMounted, onBeforeUnmount, nextTick, watch, onUpdated } from 'vue'
import data from '../data/cardData'

export default {
  name: 'Timeline',
  components: { Card },
  setup () {
    const cardData = ref(data)
    const currentCard = ref(data[0].year)

    const setCurrentCard = (cardYear) => {
      currentCard.value = cardYear
    }

    const firstYear = computed(() => cardData.value[0].year)
    const lastYear = computed(() => cardData.value[cardData.value.length - 1].year)

    const years = computed(() => cardData.value.map(card => card.year))
    const uniqueYears = ref(new Set(years.value))

    const scrollYPosition = ref(window.scrollY)
    const onScroll = () => {
      scrollYPosition.value = window.scrollY
    }

    onUpdated(() => {
      // on reselection or window resize - re-map card heights for dynamic timeline
      const cards = document.getElementsByClassName('card')
      for (let member in topYearMap) delete topYearMap[member]
      for (let member in reverseMap) delete reverseMap[member]
      for (let i = 0; i < cardData.value.length; i++) {
        let cardBounds = cards[i].getBoundingClientRect()
        topYearMap[cardBounds.top + window.scrollY] = cardData.value[i].year
        reverseMap[cardData.value[i].year] = cardBounds.top + window.scrollY
      }
    })

    const windowWidth = ref(window.innerWidth)
    // on resize, recalculating position maps since the positions will vary due to width
    const onResize = () => {
      windowWidth.value = window.innerWidth
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

    const selectedFiltersObj = reactive({
      'philanthropy': true,
      'leadership': true,
      'action': true
    })
    const toggleFilter = (selectedFilter) => {
      const filterWithAllChoices = {
        'philanthropy': selectedFiltersObj['philanthropy'],
        'leadership': selectedFiltersObj['leadership'],
        'action': selectedFiltersObj['action']
      }
      filterWithAllChoices[selectedFilter] = !filterWithAllChoices[selectedFilter]
      if (
        filterWithAllChoices['philanthropy'] ||
        filterWithAllChoices['leadership'] ||
        filterWithAllChoices['action']
      ) {
        selectedFiltersObj[selectedFilter] = !selectedFiltersObj[selectedFilter]
      }
    }

    watch(selectedFiltersObj, () => {
      cardData.value = data.filter(card => {
        if (selectedFiltersObj[card.category]) {
          return card
        }
        return
      })
      uniqueYears.value = new Set(years.value)
    }, { deep: true })

    onMounted(() => {
      nextTick(() => {
        window.addEventListener('scroll', onScroll)
        window.addEventListener('resize', onResize)
      })
      const cards = document.getElementsByClassName('card')
      for (let i = 0; i < cards.length; i++) {
        let cardBounds = cards[i].getBoundingClientRect()
        topYearMap[cardBounds.top + window.scrollY] = cardData.value[i].year
        reverseMap[cardData.value[i].year] = cardBounds.top + window.scrollY
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
      selectedFiltersObj,
      uniqueYears,
      onClick,
      setCurrentCard,
      toggleFilter
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
  z-index: 6;
  padding: 15px 0 50px 0;
}
#timeline {
  background-color: #1D428A;
  width: 80%;
  height: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px #b0a9a0;
  -moz-box-shadow: 2px 2px 3px #b0a9a0;
  -webkit-box-shadow: 2px 2px 3px #b0a9a0;
  margin: auto;
  color: #04307e;
  display: flex;
  flex-direction: row;
  /* position: relative; */
}
/* #first-year, #last-year {
  position: absolute;
  font-weight: 300;
}
#first-year {
  left: -40px;
}
#last-year {
  right: -40px;
} */
#filters {
  color: #04307e;
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
}
.year-div {
  position: relative;
  flex-grow: 1;
  height: 100%;
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
.tooltip, .tooltip-arrow {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.tooltip {
  padding: 5px 10px;
  color: white;
  background-color: #1D428A;
  top: 150%;
}
.tooltip-arrow {
  height: 0;
  width: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid #1D428A;
  z-index: 7;
  top: 100%;
}
.filter {
  padding: 0 10px;
}

.philanthropy {
  color: #1D428A;
}
.leadership {
  color: #8DB9CA;
}
.action {
  color: #00A9E0;
}
</style>