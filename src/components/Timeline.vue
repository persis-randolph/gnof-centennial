<template>
  <div id="container">
    <div
      id="timeline"
      class="sticky"
      :style="{'height': (windowHeight * .8) + 'px'}"
    ></div>
    <div
      id="card-section"
      :style="{width: (windowWidth * 0.7) + 'px', 'height': (windowHeight * 0.815) + 'px'}"
    >
      <Card
        v-for="card in cardData"
        :key="card.message"
        :card="card"
      />
      <Card
        v-for="card in cardData"
        :key="card.message"
        :card="card"
      />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'
import { ref, onMounted, nextTick, onBeforeUnmount, watch } from 'vue'

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
      {
        year: '1927',
        category: 'action',
        header: 'Lorem ipsum dolor sit amet, consectetur',
        body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni'
      },
      {
        year: '1928',
        category: 'action',
        header: 'Lorem ipsum dolor sit amet, consectetur',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
      },
      {
        year: '1929',
        category: 'action',
        header: 'Lorem ipsum dolor sit amet, consectetur',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
      },
      {
        year: '1932',
        category: 'action',
        header: 'Lorem ipsum dolor sit amet, consectetur',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
      }
    ]

    // const windowHeight = ref(window.innerHeight + window.scrollY)
    const windowHeight = ref(window.innerHeight)
    const windowWidth = ref(window.innerWidth)

    watch([windowHeight, windowWidth], () => {
      console.log('height: ' + windowHeight.value + ' width: ' + windowWidth.value)
    })

    const onResize = () => {
      windowHeight.value = window.innerHeight
      windowWidth.value = window.innerWidth
    }

    // const onScroll = () => {
    //   windowHeight.value = window.innerHeight
    //   windowHeight.value = window.innerHeight
    // }

    onMounted(() => {
      nextTick(() => {
        window.addEventListener('resize', onResize)
        // window.addEventListener('scroll', onScroll)
      })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
      // window.removeEventListener('scroll', onScroll)
    })

    return {
      cardData,
      windowHeight,
      windowWidth
    }
  }
}
</script>

<style scoped>
#container {
  display: flex;
  justify-content: center;
  position: sticky;
  position: -webkit-sticky;
  top: 75px;
  background-color: #e2f6ff;
}
#card-section {
  /* background-color: magenta; */
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  /* padding-top: 50px; */
}
#card-section::-webkit-scrollbar {
  display: none;
}
#timeline {
  background-color: white;
  width: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px #b0a9a0;
  -moz-box-shadow: 2px 2px 3px #b0a9a0;
  -webkit-box-shadow: 2px 2px 3px #b0a9a0;
  margin: 20px 30px 20px 0;
}
</style>