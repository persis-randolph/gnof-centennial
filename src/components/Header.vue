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
  position: sticky;
  top: 0;
  width: 100%;
  height: 100px;
  background-color: #00A9E0;
  color: white;
  display: flex;
  align-items: center;
  z-index: 2;
}
.logo {
  height: 60px;
  margin: 0 auto;
}
</style>