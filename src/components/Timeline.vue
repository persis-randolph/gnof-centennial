<template>
  <div id="timeline">
    <Card
      v-for="card in cardData"
      :key="card.message"
      :card="card"
    />
    <div id="divider"></div>
  </div>
</template>

<script>
import Card from './Card.vue'

export default {
  name: 'Timeline',
  components: {
    Card
  },
  setup () {
    const cardData = [
      {
        year: '1922',
        header: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
      },
      {
        year: '1923',
        header: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
      },
      {
        year: '1925',
        header: 'Lorem ipsum dolor sit amet, consectetur',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
      },
    ]
    return {
      cardData
    }
  }
}
</script>

<style scoped>
* {
  background-color: rgb(187, 221, 233);
}
#timeline {
  padding-top: 50px;

}
#divider {
  height: 200px;
}
</style>