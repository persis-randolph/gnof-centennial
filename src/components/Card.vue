<template>
  <div class="card" :id="card.year + card.header">
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
            />
          </div>  
        </div>
        <!-- CARD PARAGRAPHS -->
        <div v-if="isExpanded && card.body.length">
          <div v-for="(paragraph, i) of card.body" :key="i + card.header">
            <div class="body">
              <p v-html="paragraph"></p>
              <br v-if="card.body.length - 1 === i"><br v-if="card.body.length - 1 === i">
              <button @click="toggleExpand" v-if="card.body.length - 1 === i">Close</button>
            </div>
            <br v-if="card.body.length - 1 > i">
          </div>
        </div>
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
</template>

<script>
import { computed, ref, watch } from 'vue'
import Image from '../components/Image.vue'

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
  setup(props) {
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

    return {
      cardDateDisplay,
      halfImageWidth,
      highlightColor,
      headerColor,
      isExpanded,
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
  font-weight: 300;
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
  max-height: 40px;
  overflow: hidden;
}

.expand-link {
  color: #5a87c6;
}

.expand-link:hover {
  color: #041e42;
  cursor: pointer;
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

</style>
