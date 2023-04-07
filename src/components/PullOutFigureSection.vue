<template>
  <section id="container">
    <div class="figure">
      <h2>1,100+</h2>
      <p>Number of Funds</p>
    </div>
    <div class="figure">
      <h2>$23 Million</h2>
      <p>Largest Grantmaking Fund, for Affordable Housing & Community Development in New Orleans</p>
    </div>
    <div class="figure">
      <h2>$466+ Million</h2>
      <p>Total Assets</p>
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
  /* padding: 20px 40px; */
  justify-content: space-between;
  width: 80%;
  margin: 70px auto;
}
.figure {
  width: 33%;
  margin: 0 auto;
}
@media only screen and (max-width: 1000px)  {
  #container {
    display: flex;
    flex-direction: column;
    margin: 25px auto;
  }
  .figure {
    margin: 50px auto;
    width: 80%;
  }
}
</style>
