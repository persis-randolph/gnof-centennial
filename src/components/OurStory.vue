<template>
  <section id="container">
    <div>
      <h2>OUR STORY</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <a href="#" target="_blank">dolore magna aliqua</a>.</p>
    </div>
    <!-- <font-awesome-icon icon="fas fa-angle-down" class="icon" /> -->
  </section>
</template>

<script>
export default {
  name: 'Our Story',
  setup() {

  }
}
</script>

<style scoped>
a, a:link, a:visited, a:hover, a:active {
  color: #00A9E0;
  text-decoration: underline;
  font-weight: 700;
}
/* .icon {
  height: 40px;
  color: #1D428A;
  padding-top: 40px;
  padding-bottom: 20px;
} */
#container {
  /* replace 2nd 100px with 0 if icon goes back in */
  padding: 100px 40px 100px 40px;
}
</style>
