<template>
  <div id="header">
    <img
      class="logo"
      src="../assets/GNOF_CentennialLogo_RGB_White.png"
    />
    <div class="link-container">
      <router-link class="nav-link" to="/home" v-if="selectedView !== '/home'">Home</router-link>
      <router-link class="nav-link" to="/timeline" v-if="selectedView !== '/timeline'">Timeline</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    selectedView: {
      type: String,
      default: '/home'
    }
  },
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
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}
.logo {
  height: 60px;
  /* margin: 0 auto; */
  margin-left: 20px;
}
.link-container {
  height: 100px;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 0;
  align-items: flex-end;
}
.nav-link {
  color: black;
}
</style>