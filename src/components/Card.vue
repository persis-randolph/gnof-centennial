<template>
  <div class="card">
    <strong>{{ card.year }}</strong><br>{{ card.header }}<br>{{ card.body }}
    <div class="color-highlight"></div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object // contains year, header, and body
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
  -moz-box-shadow: 2px 2px 3px #222;
  -webkit-box-shadow: 2px 2px 3px #222;
  box-shadow: 2px 2px 3px #222;
  border-radius: 8px;
  position: relative;
}
.color-highlight {
  background-color: navy;
  width: 20px;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  border-radius: 0 8px 8px 0;
}
</style>
