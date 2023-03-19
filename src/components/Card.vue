<template>
  <div class="card" :id="card.year">
    <!-- <div class="line"></div> -->
    <div class="text">
      <!-- CARD DATE -->
      <span class="date" :class="headerColor">
        {{ card.month ? card.month + ' ' : '' }}
        {{ card.day ? card.day + ', ' : '' }}
        {{ card.year }}
        {{ card.yearEnd ? ' - ' + card.yearEnd : '' }}
      </span>
      <!-- CARD HEADER (if exists) -->
      <span class="header">{{ displayHeader }}</span>
      <div :class="card.images.length ? 'image-text-container' : ''">
        <!-- IMAGES (if exist) -->
        <div class="image-container" v-if="card.images.length">
          <!-- TODO: make class dynamic to add margin to the right on 1st half images -->
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
        <div class="paragraphs">
          <div v-for="(paragraph, i) of displayBody" :key="i">
            <p class="body">
              {{ paragraph }}
            </p>
            <br v-if="displayBody.length - 1 > i">
          </div>
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
    const highlightColor = ref(props.card.category + '-highlight')
    const headerColor = ref(props.card.category + '-header')

    const displayHeader = computed(() => {
      // if (props.card.header.length > 40) {
      //   return props.card.header.slice(0, 39) + '...'
      // }
      return props.card.header
    })

    const displayBody = computed(() => {
      // if (props.card.body.length >= 120) {
      //   return props.card.body.slice(0, 119) + '...'
      // }
      return props.card.body
    })

    return {
      displayBody,
      displayHeader,
      highlightColor,
      headerColor
    }
  }
}
</script>

<style scoped>
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
  max-width: 430px;
  min-width: 430px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
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

.paragraphs {
  flex-direction: column;
  color: red;
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

</style>
