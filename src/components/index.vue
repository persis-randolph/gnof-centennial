<template>
  <div>
    <Header />
    <main id="main">
      <section id="animation">Logo Evolution Animation goes here</section>
      <section id="section1">
        <div class="info-point">
          <h2>1800+</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="info-point">
          <h2>$10 Million</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="info-point">
          <h2>2,401</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </section>
      <hr>
      <section id="section2">
        <div>
          <h2>OUR STORY</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </section>
      <Timeline />
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue'
import Timeline from './Timeline.vue'
import Header from './Header.vue'

export default {
  components: { Footer, Timeline, Header },
  name: 'Index',
  setup () {
    return {}
  }
}
</script>

<style scoped>
h2 {
  color: navy;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
p {
  padding-bottom: 20px;
}
.info-point {
  width: 300px;
  margin: 0 auto;
}
#main {
  margin-top: 55px;
  padding-top: 20px;
}
#animation {
  width: 100%;
  height: 300px;
  background-color: grey;
  color: white;
}
#section1, #section2 {
  padding: 20px 40px;
}
#section1 {
  display: flex;
}

</style>
