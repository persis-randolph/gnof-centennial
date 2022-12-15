<template>
  <div class="card">
    <div class="line"></div>
    <div class="text">
      <span class="year">{{ card.year }}</span>
      <span class="header">{{ card.header }}</span>
      <span class="body">{{ card.body }}</span>
    </div>
    <div class="color-highlight"><div class="category-text">{{ card.category.toUpperCase() }}</div></div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object // contains year, category, header, and body
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>
.card {
  height: 100px;
  width: 70vw;
  margin: 20px auto;
  text-align: left;
  padding: 20px;
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
  width: 20px;
  height: 140px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  border-radius: 0 8px 8px 0;
  margin: 0 auto;
}
.category-text {
  width: 140px;
  text-align: center;
  transform: rotate(270deg) translateX(-60px) translateY(-58px);
  -webkit-transform: rotate(270deg) translateX(-60px) translateY(-58px);
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
