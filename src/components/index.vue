<template>
  <div>
    <header id="header">
      <div id="fakelogo">
        GREATER<br>
        NEW ORLEANS<br>
        FOUNDATION
      </div>
      <div id="faketitle">
        <span id="line1">1  0  0</span><br>
        <span id="line2">Y E A R S</span><br>
        <span id="line3">1923 - 2023</span>
      </div>
    </header>
    <main id="main">
      <section id="animation">Logo Evolution Animation goes here</section>
      <section id="section1">
        <h2>1800+</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <h2>$10 Million</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <h2>2,401</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <hr>
        <h2>OUR STORY</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </section>
      <Timeline />
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue'
import Timeline from './Timeline.vue'
export default {
  components: { Footer, Timeline },
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
hr {
  margin: 20px;
}
p {
  padding-bottom: 20px;
}
#main {
  margin-top: 55px;
  padding: 20px 0;
}
#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 75px;
  background-color: #58b2d0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
#animation {
  width: 100%;
  height: 300px;
  background-color: black;
  color: white;
}
#fakelogo {
  text-align: right;
}
#faketitle {
  text-align: justify;
  padding-left: 5px;
  width: 100px;
}
#line1 {
  font-size: 20px;
  line-height: 0px;
}
#line2 {
  font-size: 16px;
  line-height: 0px;
}
#line3 {
  font-size: 14px;
  line-height: 0px;
}
#section1 {
  padding: 20px 0;
}
</style>
