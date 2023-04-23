<template>
  <div class="card" :id="cardID">
    <!-- DECADE HIGHLIGHT CARDS -->
    <div v-if="card.type && card.type === 'highlights'">
      <div class="decade-highlight"><span class="decade">{{ card.decade }}</span></div>
      <div class="decade-categories">
        <div class="decade-category" v-if="card.philanthropy.length">
          <div class="philanthropy-header decade-category-name">
            PHILANTHROPY
          </div>
          <div v-if="card.philanthropy.length">
            {{ getCardText(card.philanthropy) }}
          </div>
        </div>
        <hr v-if="card.philanthropy && (card.leadership || card.action)">
        <div class="decade-category" v-if="card.leadership.length">
          <div class="leadership-header decade-category-name">
            LEADERSHIP
          </div>
          <div v-if="card.leadership.length">
            {{ getCardText(card.leadership) }}
          </div>
        </div>
        <hr v-if="card.leadership && card.action">
        <div class="decade-category" v-if="card.action.length">
          <div class="action-header decade-category-name">
            ACTION
          </div>
          <div v-if="card.action.length">
            {{ getCardText(card.action) }}
          </div>
        </div>
      </div>
    </div>
    <!-- NON-DECADE HIGHLIGHT CARDS -->
    <div v-else>
    <div class="text">
      <!-- CARD DATE -->
      <span class="date" :class="headerColor">
        {{ cardDateDisplay }}
      </span>
      <!-- CARD HEADER (if exists) -->
      <span class="header">{{ card.header }}</span>
      <div :class="card.images.length ? 'image-text-container' : ''">
        <!-- IMAGES (if exist & non-collapsed) -->
        <div
          class="image-container"
          :class="halfImageWidth ? 'half-width' : 'full-width'"
          v-if="card.images.length && isExpanded"
        >
          <div v-for="(image, i) in card.images" :key="i + image.url">
            <Image
              :image="image"
              :key="i + image.url"
              @open-lightbox="openLightbox"
              :imageIndex="i"
              :imageArray="card.images"
            />
          </div>  
        </div>
        <!-- CARD PARAGRAPHS -->
        <div v-if="isExpanded && card.body.length">
          <div v-for="(paragraph, i) of card.body" :key="i + card.header">
            <div class="body">
              <p v-html="paragraph"></p>
              <button @click="toggleExpand" v-if="card.body.length - 1 === i" class="close-button-margin-top">Close</button>
            </div>
            <br v-if="card.body.length - 1 > i">
          </div>
        </div>
        <!-- if card is expanded with no body text, but has images -->
        <div v-else-if="isExpanded && !card.body.length && card.images.length">
          <button @click="toggleExpand">Close</button>
        </div>
        <div class="body" v-else-if="!isExpanded">
          <div class="collapsed-text"><span>{{ card.body[0] }}</span></div>
          <br v-if="card.body.length && !isExpanded">
          <button @click="toggleExpand">View More</button>
        </div>
      </div>
    </div>
    <!-- CATEGORY RIGHT-SIDE COLOR BORDER -->
    <div class="color-highlight" :class="highlightColor"></div>
    <!-- CATEGORY RIGHT-SIDE TEXT -->
    <div class="category-text"><span>{{ card.category.toUpperCase() }}</span></div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import Image from '../components/Image.vue'
import data from '../data/cardData'

export default {
  components: { Image },
  props: {
    card: {
      // contains required: year, category, header, body (Array, can be empty),
      // optional: yearEnd, month (3-letter abbrev.), day, images (Array, can be empty), alternateYearDisplay (in case need to display date in a different format)
      // for each image in images array - REQ: url, description, OPT: size, rightMargin (boolean - defaults to false), clickThrough (url string), icon (light, dark, video-light, video-dark)
      type: Object
    },
    allCardsExpanded: {
      type: Boolean,
      default: false
    }
  },
  emits: ['open-lightbox'],
  setup(props, { emit }) {
    const cardID = computed(() => {
      if (props.card.type !== 'highlights') {
        return props.card.id || props.card.year + props.card.header
      } else {
        return props.card.id
      }
    })

    const isExpanded = ref(false)
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value
    }

    const highlightColor = ref(props.card.category + '-highlight')
    const headerColor = ref(props.card.category + '-header')

    const cardDateDisplay = computed(() => {
      if (props.card.alternateYearDisplay) {
        return props.card.alternateYearDisplay
      }
      return `${props.card.month ? props.card.month + ' ' : ''}
      ${props.card.day ? props.card.day + ', ' : ''}
      ${props.card.year}
      ${props.card.yearEnd ? ' - ' + props.card.yearEnd : ''}`
    })

    // if a single half-width image - half image container width
    const halfImageWidth = computed(() => {
      if (props.card.images.length === 1 && !props.card.images[0].size) {
        return true
      }
      return false
    })

    watch(props, () => {
      isExpanded.value = props.allCardsExpanded
    })

    const openLightbox = (payload) => {
      emit('open-lightbox', payload)
    }

    const cardData = ref(data)
    const cardDataMap = computed(() => {
      return cardData.value.reduce((acc, card) => {
        if (card.id) {
          acc[card.id] = card
        }
        return acc
      }, {})
    })
    const getCardText = (cardID) => {
      return cardDataMap.value[cardID].header
    }

    return {
      cardDateDisplay,
      cardID,
      halfImageWidth,
      highlightColor,
      headerColor,
      isExpanded,
      getCardText,
      openLightbox,
      toggleExpand
    }
  }
}
</script>

<style scoped>

/* stack images above text if screen size is under 1180px wide */
@media only screen and (max-width: 1180px)  {
  .image-text-container {
    flex-direction: column;
  }
}
.card {
  margin: 15px auto;
  text-align: left;
  padding: 50px 70px 50px 70px;
  line-height: 1.5;
  background-color: #ffffff;
  box-shadow: 2px 2px 2px #b0a9a0;
  -moz-box-shadow: 2px 2px 3px #b0a9a0;
  -webkit-box-shadow: 2px 2px 3px #b0a9a0;
  border-radius: 8px;
  position: relative;
}

@media only screen and (max-width: 700px)  {
  .card {
    padding: 20px 55px 20px 40px;
  }
}
.decade {
  font-size: 24px;
  font-weight: 600;
}
.decade-highlight {
  position: absolute;
  background-color: #04307e;
  color: white;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 8px 8px 0 0;
  text-align: center;
}
.decade-categories {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}
.decade-category {
  display: flex;
}
.decade-category-name {
  font-size: 16px;
  font-weight: 500;
  min-width: 140px;
}

.color-highlight {
  background-color: #04307e;
  color: #ffffff;
  width: 30px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  border-radius: 0 8px 8px 0;
}
.category-text {
  position: absolute;
  top: 0;
  bottom: 0;
  writing-mode: vertical-lr;
  right: 3px;
  color: #ffffff;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
.text {
  display: flex;
  flex-direction: column;
  word-break: break-word;
}
.date {
  font-weight: 700;
  font-size: 36px;
}
.header {
  font-weight: 500;
  font-size: 38px;
  line-height: 1.1;
  color: #041e42;
}

@media only screen and (max-width: 750px)  {
  .header {
    font-size: 20px;
  }

  .date {
    font-size: 18px;
  }
}
.body {
  font-size: 16px;
  font-weight: 300;
}
.image-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}

.half-width {
  max-width: 215px;
}

.full-width {
  max-width: 430px;
}

@media only screen and (min-width: 700px)  {
  .half-width {
    min-width: 215px;
}
  .full-width {
    min-width: 430px;
  }
}

.philanthropy-highlight {
  background-color: #1D428A;
}
.leadership-highlight {
  background-color: #8DB9CA;
}
.action-highlight {
  background-color: #00A9E0;
}
.philanthropy-header {
  color: #1D428A;
}
.leadership-header {
  color: #8DB9CA;
}
.action-header {
  color: #00A9E0;
}

.image-text-container {
  display: flex;
  margin-top: 10px;
}

.collapsed-text {
  max-height: 46px;
  overflow: hidden;
}

button {
  padding: 10px;
  border: none;
  font: inherit;
  font-weight: 400;
  color: #ffffff;
  background-color: #1d428a;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background-color: #234fa7;
}
.close-button-margin-top {
  margin-top: 20px;
}
hr {
  margin: 10px -100px;
  width: 200%;
  transform: translateX(5px);
  height: 1px;
  border: none;
  background-color: #dedada;
}

</style>
