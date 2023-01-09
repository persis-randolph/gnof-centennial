<template>
  <section id="container">
    <div class="figure">
      <h2>1800+</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <div class="figure">
      <h2>$10 Million</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <div class="figure">
      <h2>2,401</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Pull-Out Figure Section',
  setup() {

  }
}
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: row;
  padding: 20px 40px;
}

.figure {
  width: 300px;
  margin: 0 auto;
  padding: 50px 30px;
}

@media only screen and (max-width: 800px)  {
  #container {
    display: flex;
    flex-direction: column;
  }
}
</style>
