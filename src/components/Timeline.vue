<template>
  <div id="timeline-section">
    <div id="container">
      <div id="timeline"></div>
      <div>
        <Card
          v-for="card in cardData"
          :key="card.message"
          :card="card"
        />
      </div>
    </div>
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
        category: 'philanthropy',
        header: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
      },
      {
        year: '1923',
        category: 'leadership',
        header: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
      },
      {
        year: '1925',
        category: 'action',
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
  background-color: #e2f6ff;
}
#container {
  display: flex;
  justify-content: center;
}
#timeline-section {
  padding-top: 50px;
}
#timeline {
  background-color: white;
  width: 20px;
  height: 600px;
  border-radius: 10px;
  margin: 20px;
}
#divider {
  height: 200px;
}
</style>