<template>
  <div id="container">
    <!-- v-if="imageArray[imageIndex]?.url" -->
    <Lightbox
      v-if="imageArray && imageArray[imageIndex] && imageArray[imageIndex].clickThrough"
      :imageIndex="imageIndex"
      :imageArray="imageArray"
      @close-lightbox="closeLightbox"
    />
    <div id="timeline-container">
      <!-- timeline filters -->
      <div id="filters">
        <div id="topic-filters">
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
        <div id="expand-collapse-options">
          <span :class="!allCardsExpanded ? 'strong' : 'weak'">Collapse All</span>
          <label class="switch">
            <input type="checkbox" :value="allCardsExpanded" @click="toggleExpansion()">
            <span class="slider round"></span>
          </label>
          <span :class="allCardsExpanded ? 'strong' : 'weak'">Expand All</span>
        </div>
      </div>
      <!-- interactive timeline bar -->
      <div id="timeline">
        <!-- <span id="first-year">{{ firstYear }}</span> -->
        <div
          v-for="year in uniqueYears"
          :key="year"
          class="year-div hoverable"
          :class="currentCard === year ? 'selected' : ''"
          @click="onClick(year)"
        >
          <!-- perma tooltip -->
          <div class="tooltip-arrow" v-if="currentCard === year"></div>
          <div class="tooltip" v-if="currentCard === year">{{ currentCard }}</div>
          <!-- hover tooltip -->
          <div class="react-to-hover-tooltip-arrow"></div>
          <div class="react-to-hover-tooltip">{{ year }}</div>
        </div>
        <!-- <span id="last-year">{{ lastYear }}</span> -->
      </div>
    </div>
    <!-- card display -->
    <div id="card-section">
      <Card
        v-for="(card, i) in cardData"
        :key="i + (card.id ? card.id : card.year + card.category + card.header)"
        :card="card"
        class="card"
        @set-current-card="setCurrentCard"
        :allCardsExpanded="allCardsExpanded"
        @open-lightbox="openLightbox"
        @toggle-to-decade="onClick"
        @jump-to-card="jumpToCard"
        :cardIsExpanded="cardIdMap[card.id] ? cardIdMap[card.id].isExpanded : false"
        @toggle-card-expansion="singleCardExpansion"
      />
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
import Lightbox from '../components/Lightbox.vue'
import { computed, reactive, ref, onMounted, onBeforeUnmount, nextTick, watch, onUpdated } from 'vue'
import data from '../data/cardData'

export default {
  name: 'Timeline',
  components: {
    Card,
    Lightbox 
  },
  emits: ['toggle-scroll'],
  setup (_, { emit }) {
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
      for (let member in reverseMap.value) delete reverseMap.value[member]
      const tempCopy = { ...cardIdMap }
      for (let member in cardIdMap) delete cardIdMap[member]
      for (let i = 0; i < cardData.value.length; i++) {
        let cardBounds = cards[i].getBoundingClientRect()
        topYearMap[cardBounds.top + window.scrollY] = cardData.value[i].year
        if (!reverseMap.value[cardData.value[i].year]) {
          reverseMap.value[cardData.value[i].year] = cardBounds.top + window.scrollY
        }
        cardIdMap[cardData.value[i].id] = {
          year: cardData.value[i].year,
          position: cardBounds.top + window.scrollY,
          isExpanded: tempCopy[cardData.value[i].id]?.isExpanded || false,
          category: cardData.value[i].category || cardData.value[i].type
        }
      }
    })

    const windowWidth = ref(window.innerWidth)
    // on resize, recalculating position maps since the positions will vary due to width
    const onResize = () => {
      windowWidth.value = window.innerWidth
    }

    const topYearMap = {}
    const reverseMap = ref({})
    const cardIdMap = {}
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
          top: reverseMap.value[year] - 250,
          behavior: 'smooth'
        })
      }
    }

    const jumpToCard = async (cardID) => {
      // if the card isn't currently in the displayed data, turns off all filters and then has a brief timeout to wait to scroll to the card
      if (!cardIdMap[cardID]) {
        selectedFiltersObj.philanthropy = true
        selectedFiltersObj.leadership = true
        selectedFiltersObj.action = true

        setTimeout(() => {
          if (!isScrolling.value) {
          currentCard.value = cardIdMap[cardID].year
          isScrolling.value = true
          setTimeout(() => {
            isScrolling.value = false
          }, 1000)
          window.scroll({
            top: cardIdMap[cardID].position - 250,
            behavior: 'smooth'
          })
          }
        }, 250)
      } else if (!isScrolling.value) {
        currentCard.value = cardIdMap[cardID].year
        isScrolling.value = true
        setTimeout(() => {
          isScrolling.value = false
        }, 1000)
        window.scroll({
          top: cardIdMap[cardID].position - 250,
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
        if (
          selectedFiltersObj[card.category] ||
          (card.type && card.type === 'highlights')
        ) {
          if (allCardsExpanded.value) {
            cardIdMap[card.id] = {
              year: card.year,
              isExpanded: true
            }
          }
          return card
        }
        return
      })
      uniqueYears.value = new Set(years.value)
    }, { deep: true })

    const allCardsExpanded = ref(false)
    const toggleExpansion = () => {
      allCardsExpanded.value = !allCardsExpanded.value
      for (let member in cardIdMap) {
        cardIdMap[member].isExpanded = allCardsExpanded.value
      }
    }
    const singleCardExpansion = ({ cardID, isExpanded }) => {
      cardIdMap[cardID].isExpanded = isExpanded
    }

    const imageIndex = ref(null)
    const imageArray = ref(null)
    const openLightbox = (payload) => {
      imageIndex.value = payload.imageIndex
      imageArray.value = payload.imageArray
      emit('toggle-scroll', 'disable')
    }
    const closeLightbox = () => {
      imageIndex.value = null
      imageArray.value = null
      emit('toggle-scroll', 'enable')
    }

    const preloadImages = () => {
      for (let card of cardData.value) {
        if (card.images) {
          for (let image of card.images) {
            let imageToLoad = new Image()
            imageToLoad.src = image.url
          }
        }
      }
    }

    onMounted(() => {
      // ensures scroll is at top when returning to this page
      window.scroll({
        top: 0
      })
      preloadImages()
      nextTick(() => {
        window.addEventListener('scroll', onScroll)
        window.addEventListener('resize', onResize)
      })
      const cards = document.getElementsByClassName('card')
      for (let i = 0; i < cards.length; i++) {
        let cardBounds = cards[i].getBoundingClientRect()
        topYearMap[cardBounds.top + window.scrollY] = cardData.value[i].year
        if (!reverseMap.value[cardData.value[i].year]) {
          reverseMap.value[cardData.value[i].year] = cardBounds.top + window.scrollY
        }
        cardIdMap[cardData.value[i].id] = {
          year: cardData.value[i].year,
          position: cardBounds.top + window.scrollY,
          isExpanded: false,
          category: cardData.value[i].category || cardData.value[i].type
        }
      }
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    })

    return {
      allCardsExpanded,
      cardData,
      cardIdMap,
      currentCard,
      firstYear,
      imageArray,
      imageIndex,
      lastYear,
      selectedFiltersObj,
      uniqueYears,
      closeLightbox,
      jumpToCard,
      onClick,
      openLightbox,
      setCurrentCard,
      singleCardExpansion,
      toggleExpansion,
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
  max-width: 1000px;
  margin: 0 auto;
  overflow: hidden;
}
#timeline-container {
  background-color: #ffffff;
  color: white;
  position: sticky;
  top: 100px;
  z-index: 6;
  padding: 15px 0 50px 0;
  box-shadow: 2px 2px 2px #b0a9a0;
  -moz-box-shadow: 2px 2px 3px #b0a9a0;
  -webkit-box-shadow: 2px 2px 3px #b0a9a0;
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
  max-width: 1000px;
  cursor: pointer;
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
  justify-content: space-between;
  width: 80%;
  max-width: 1000px;
  padding-bottom: 5px;
  margin: 0 auto;
}

@media only screen and (max-width: 750px)  {
  #filters {
    display: block;
    justify-content: left;
  }
}

#topic-filters {
  display: flex;
}

@media only screen and (max-width: 750px)  {
  #topic-filters {
    justify-content: space-evenly;
  }
}

#expand-collapse-options {
  display: flex;
}

@media only screen and (max-width: 750px)  {
  #expand-collapse-options {
    justify-content: center;
  }
}

.year-div {
  position: relative;
  flex-grow: 1;
  height: 100%;
}
.year-div:first-of-type {
  border-radius: 10px 0 0 10px;
}
@media only screen and (max-width: 650px)  {
  .year-div:first-of-type, .year-div:last-of-type {
    width: 3px;
  }
}
.year-div:last-of-type {
  border-radius: 0 10px 10px 0;
}
.selected {
  background-color: #00A9E0;
}
.tooltip, .tooltip-arrow, .react-to-hover-tooltip, .react-to-hover-tooltip-arrow {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.tooltip, .tooltip-arrow {
  z-index: 7;
}
.tooltip, .react-to-hover-tooltip {
  padding: 5px 10px;
  color: white;
  top: 150%;
}
.tooltip {
  background-color: #1D428A;
}
.tooltip-arrow, .react-to-hover-tooltip-arrow {
  height: 0;
  width: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  top: 100%;
}
.tooltip-arrow {
  border-bottom: 10px solid #1D428A;
}
.react-to-hover-tooltip, .react-to-hover-tooltip-arrow {
  display: none;
  z-index: 8;
}
.react-to-hover-tooltip {
  background-color: #00A9E0;
}
.react-to-hover-tooltip-arrow {
  border-bottom: 10px solid #00A9E0;
}
@media (hover: hover) {
  .hoverable:hover .react-to-hover-tooltip {
    display: block;
  }
  .hoverable:hover .react-to-hover-tooltip-arrow {
    display: block;
  }
}
.filter {
  padding: 0 10px;
  cursor: pointer;
}

@media only screen and (max-width: 750px)  {
  .filter:first-of-type {
    padding: 0 10px 0 0;
  }

  .filter {
    padding-bottom: 5px;
  }
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

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 16px;
  margin: auto 5px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 1px;
  bottom: 1px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #04307e;
}

input:focus + .slider {
  box-shadow: 0 0 1px #04307e;
}

input:checked + .slider:before {
  -webkit-transform: translateX(14px);
  -ms-transform: translateX(14px);
  transform: translateX(14px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.strong {
  font-weight: 400;
}
.weak {
  font-weight: 300;
}
</style>