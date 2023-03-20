<template>
  <div id="header">
    <img
      class="logo"
      src="../assets/GNOF_CentennialLogo_RGB_White.png"
    />
    <div class="link-container">
      <router-link class="nav-link" to="/home" :class="selectedView !== '/home' ? 'active-link' : 'inactive-link'">
        HOME
      </router-link>
      <router-link class="nav-link" to="/timeline" :class="selectedView !== '/timeline' ? 'active-link' : 'inactive-link'">
        TIMELINE
      </router-link>
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
  margin-left: 180px;
}
.link-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 180px;
}
.nav-link {
  font-size: 20px;
  letter-spacing: 2px;
}

.nav-link:first-of-type {
  margin-right: 20px;
}

.inactive-link {
  cursor: default;
}

.active-link {
  font-weight: bold;
  text-decoration: underline;
}
</style>