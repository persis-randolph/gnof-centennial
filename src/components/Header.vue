<template>
  <div id="header">
    <img
      class="logo"
      src="../assets/GNOF_CentennialLogo_RGB_White.png"
    />
  </div>
</template>

<script>
export default {
  name: 'Header',
  setup () {
    return {}
  }
}
</script>

<style scoped>
#header {
  /* position: fixed; */
  position: sticky;
  top: 0;
  /* left: 0;
  right: 0; */
  width: 100%;
  height: 95px;
  background-color: #00a1e2;
  color: white;
  display: flex;
  align-items: center;
  z-index: 2;
  /* padding: 10px; */
}
.logo {
  height: 60px;
  margin: 10px;
}
</style>