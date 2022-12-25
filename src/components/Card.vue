<template>
  <div class="card" :id="card.year">
    <!-- <div class="line"></div> -->
    <div class="text" :class="card.imageUrl ? 'textWithImage' : ''">
      <span class="year" :class="headerColor">{{ card.year }}</span>
      <!-- TODO: need to figure out how we want to display rest of header/body if it is condensed -->
      <span class="header">{{ displayHeader }}</span>
      <span class="body">{{ displayBody }}</span>
    </div>
    <!-- TODO: get image to be 1/3 of box w/ auto-crop -->
    <div class="image" v-if="card.imageUrl">
      <img :src="card.imageUrl">
    </div>
    <div class="color-highlight" :class="highlightColor"></div>
    <div class="category-text"><span>{{ card.category.toUpperCase() }}</span></div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  props: {
    card: Object // contains year, category, header, imageUrl, and body
  },
  setup(props) {
    const highlightColor = ref(props.card.category + '-highlight')
    const headerColor = ref(props.card.category + '-header')

    const displayHeader = computed(() => {
      if (props.card.header.length > 40) {
        return props.card.header.slice(0, 39) + '...'
      }
      return props.card.header
    })

    const displayBody = computed(() => {
      if (props.card.body.length >= 120) {
        return props.card.body.slice(0, 119) + '...'
      }
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
  right: 0.5px;
  color: #ffffff;
  font-weight: 300;
  font-size: 24px;
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
}
.year {
  font-weight: 700;
  font-size: 36px;
}
.header {
  font-weight: 500;
  font-size: 38px;
}
.body {
  font-size: 16px;
  font-weight: 300;
}
.image {
  /* width: 150px;
  height: 150px;
  background-color: green; */
  position: absolute;
  top: 0;
  right: 30px;
}
.textWithImage {
  padding-right: 40%;
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
</style>
