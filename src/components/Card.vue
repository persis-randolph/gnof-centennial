<template>
  <div class="card" :id="card.year">
    <!-- <div class="line"></div> -->
    <div class="text">
      <!-- CARD DATE -->
      <span class="date" :class="headerColor">
        {{ cardDateDisplay }}
      </span>
      <!-- CARD HEADER (if exists) -->
      <span class="header">{{ displayHeader }}</span>
      <div :class="card.images.length ? 'image-text-container' : ''">
        <!-- IMAGES (if exist & non-collapsed) -->
        <div
          class="image-container"
          :class="halfImageWidth ? 'half-width' : 'full-width'"
          v-if="card.images.length && isExpanded"
        >
          <div v-for="(image) in card.images" :key="image.category + image.header">
            <!-- EACH IMAGE -->
            <div class="single-image-container">
              <a :href="image.clickThrough" target="_blank">
                <img :src="image.url" :class="image.rightMargin ? 'image-half-left' : 'image'">
              </a>
              <!-- OPTIONAL ICON -->
              <!-- TODO: center if i have time -->
              <a :href="image.clickThrough" target="_blank">
                <img v-if="image.icon" :src="image.icon" class="icon">
              </a>
            </div>
          </div>  
        </div>
        <!-- CARD PARAGRAPHS -->
        <div v-if="isExpanded">
          <div v-for="(paragraph, i) of card.body" :key="i">
            <p class="body">
              {{ paragraph }}
              <span
                v-if="card.body.length - 1 === i"
                class="expand-link"
                @click="toggleExpand"
              >
                <br><br>Collapse
              </span>
            </p>
            <br v-if="card.body.length - 1 > i">
          </div>
        </div>
        <div class="body" v-else>
          <div class="collapsed-text"><span>{{ card.body[0] }}</span></div>
          <span @click="toggleExpand" class="expand-link">Read more...</span>
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
import { computed, ref } from 'vue'

export default {
  props: {
    card: Object // contains month, year, category, header, imageUrl, and body
  },
  setup(props) {
    const isExpanded = ref(false)
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value
    }

    const highlightColor = ref(props.card.category + '-highlight')
    const headerColor = ref(props.card.category + '-header')

    const cardDateDisplay = computed(() => {
      return `${props.card.month ? props.card.month + ' ' : ''}
      ${props.card.day ? props.card.day + ', ' : ''}
      ${props.card.year}
      ${props.card.yearEnd ? ' - ' + props.card.yearEnd : ''}`
    })

    const displayHeader = computed(() => {
      // if (props.card.header.length > 40) {
      //   return props.card.header.slice(0, 39) + '...'
      // }
      return props.card.header
    })

    // if a single half-width image - half image container width
    const halfImageWidth = computed(() => {
      if (props.card.images.length === 1 && !props.card.images[0].size) {
        return true
      }
      return false
    })

    return {
      cardDateDisplay,
      displayHeader,
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
/* .line {
  width: 3px;
  height: 40px;
  background-color: white;
  position: absolute;
  transform: rotate(90deg) translateX(30px) translateY(40px);
  -webkit-transform: rotate(90deg) translateX(30px) translateY(40px);
} */
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
  min-width: 215px;
}

.full-width {
  max-width: 430px;
  min-width: 430px;
}

.single-image-container {
  position: relative;
  /* text-align: center; */
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

.image {
  border: 0.5px solid #dedada;
  margin-bottom: 5px;
  display: block;
}

.image-half-left {
  border: 0.5px solid #dedada;
  margin-bottom: 5px;
  margin-right: 5px;
  display: block;
}

.icon {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 50px;
}

.expand-link {
  color: #5a87c6;
}

.expand-link:hover {
  color: #041e42;
  cursor: pointer;
}

</style>
