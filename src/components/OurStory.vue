<template>
  <section id="container">
    <div id="text-container">
      <h2>OUR STORY</h2>
      <p>The Greater New Orleans Foundation is the philanthropic institution dedicated to driving positive impact through philanthropy, leadership, and action in the Greater New Orleans Region. Our roots extend back to the Community Chest of New Orleans established in 1923. For 100 years, we've connected generous people to the causes that spark their passion. In addition to grantmaking, we convene people, resources, and ideas to create intelligent strategies and solutions to meet our region's greatest challenges. We are proud to serve as a vocal civic leader with our partners to ensure a vibrant, sustainable, and just region for all.</p>
      <button><router-link class="nav-link" to="/timeline">Learn more about our story.</router-link></button>
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
/* a, a:link, a:visited, a:hover, a:active {
  color: #00A9E0;
  text-decoration: underline;
  font-weight: 700;
} */
/* .icon {
  height: 40px;
  color: #1D428A;
  padding-top: 40px;
  padding-bottom: 20px;
} */
#container {
  /* replace 100px with 0 if icon goes back in */
  padding: 70px 0;
  background-color: #E2F6FF;
}
#text-container {
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
}
button {
  padding: 20px;
  border: none;
  font: inherit;
  font-weight: 500;
  color: #ffffff;
  background-color: #1d428a;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
}
button:hover {
  background-color: #234fa7;
}
a, a:link, a:visited, a:hover, a:active {
  color: white;
  text-decoration: none;
}
</style>
