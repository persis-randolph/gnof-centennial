<template>
  <div class="card" :id="card.year" @click="onClick">
    <!-- <div class="line"></div> -->
    <div class="text">
      <span class="year">{{ card.year }}</span>
      <span class="header">{{ card.header }}</span>
      <span class="body">{{ card.body }}</span>
    </div>
    <div class="color-highlight"></div>
    <div class="category-text"><span>{{ card.category.toUpperCase() }}</span></div>
  </div>
</template>

<script>
// import { ref } from 'vue'

export default {
  props: {
    card: Object // contains year, category, header, and body
  },
  emits: ['set-current-card'],
  setup(props, { emit }) {
    const onClick = () => {
      emit('set-current-card', props.card.year)
    }
    // SETUP SOMETHING TO LISTEN FOR TOP BOUND OF CARD (or something similar)
    // if that position is 100px from top of viewport emit an event to the timeline to set this as the active card
    // const currentCard = document.getElementById(props.card.year)
    // const cardBounds = ref(currentCard.getBoundingClientRect())
    // console.log(cardBounds.value)

    return {
      onClick
    }
  }
}
</script>

<style scoped>
.card {
  min-height: 100px;
  margin: 20px auto;
  text-align: left;
  padding: 20px 30px 20px 20px;
  background-color: white;
  box-shadow: 2px 2px 2px #b0a9a0;
  -moz-box-shadow: 2px 2px 3px #b0a9a0;
  -webkit-box-shadow: 2px 2px 3px #b0a9a0;
  border-radius: 8px;
  position: relative;
}
.color-highlight {
  background-color: #04307e;
  color: white;
  width: 25px;
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
  right: 2.5px;
  color: white;
  text-align: center;
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
.line {
  width: 3px;
  height: 40px;
  background-color: white;
  position: absolute;
  transform: rotate(90deg) translateX(30px) translateY(40px);
  -webkit-transform: rotate(90deg) translateX(30px) translateY(40px);
}
.text {
  display: grid;
}
.year {
  font-weight: bolder;
  font-size: 20px;
}
.header {
  font-weight: bold;
  font-size: 18px;
}
.body {
  font-size: 14px;
}
</style>
