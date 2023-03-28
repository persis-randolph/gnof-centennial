<template>
  <div id="header">
    <router-link to="/home" id="logo-link">
      <img
        class="logo"
        src="../assets/GNOF_CentennialLogo_RGB_White.png"
      />
    </router-link>
    <div class="link-container">
      <router-link class="nav-link" to="/home" :class="selectedView !== '/home' ? 'active-link' : 'inactive-link'">
        HOME
      </router-link>
      <router-link class="nav-link" to="/timeline" :class="selectedView !== '/timeline' ? 'active-link' : 'inactive-link'">
        TIMELINE
      </router-link>
    </div>
    <div class="dropdown-menu">
      <img src="../assets/Icons_Hamburger_Light.svg" class="icon" @click="toggleMenu">
      <Dropdown v-if="menuOpen" :options="['/home', '/timeline']" :selectedOption="selectedView" @toggle-menu="toggleMenu" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Dropdown from '../components/Dropdown.vue'

export default {
  name: 'Header',
  components: { Dropdown },
  props: {
    selectedView: {
      type: String,
      default: '/home'
    }
  },
  setup () {
    const menuOpen = ref(false)
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value
    }

    return {
      menuOpen,
      toggleMenu
    }
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
  z-index: 8;
}
.logo {
  height: 60px;
}

#logo-link {
  margin-left: 10%;
  height: 60px;
}
.link-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10%;
}

@media only screen and (max-width: 600px)  {
  .link-container {
    display: none;
  }
}
.nav-link {
  font-size: 20px;
  letter-spacing: 2px;
}

.nav-link:first-of-type {
  margin-right: 20px;
}

a, a:link, a:visited, a:hover, a:active {
  color: white;
}

.active-link {
  text-decoration: none;
}

.inactive-link {
  cursor: default;
  font-weight: bold;
  text-decoration: underline;
}

.icon {
  height: 32px;
}

.icon:hover {
  cursor: pointer;
}

.dropdown-menu {
  position: relative;
  display: inline-block;
  margin-right: 10%;
}

@media only screen and (min-width: 600px)  {
  .icon {
    display: none;
  }
  .dropdown-menu {
    display: none;
  }
}
</style>