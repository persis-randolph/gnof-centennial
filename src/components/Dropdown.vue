<template>
  <div class="menu">
    <div v-for="(option) in options" :key="option" class="option">
      <router-link
        class="nav-link"
        :to="option"
        :class="selectedOption !== option ? 'active-link' : 'inactive-link'"
        @click="toggleMenu"
      >
        {{ option.slice(1).toUpperCase() }}
      </router-link>
    </div>
  </div>
  <div id="modal-background" @click="toggleMenu"></div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    options: {
      type: Array,
    },
    selectedOption: {
      type: String,
    }
  },
  emits: ["toggle-menu"],
  setup(_, { emit }) {
    const toggleMenu = () => {
      emit("toggle-menu")
    }

    return {
      toggleMenu,
    }
  }
}
</script>


<style scoped>
.menu {
  z-index: 9;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-48%);
  background-color: #1d428a;
  text-align: left;
}

.active-link {
  text-decoration: none;
}

.inactive-link {
  cursor: default;
  font-weight: bold;
  text-decoration: underline;
}

.nav-link {
  color: #ffffff;
}

.option:first-of-type {
  padding: 10px 60px 5px 20px;
  border-bottom: 1px solid #ffffff;
}

.option:last-of-type {
  padding: 5px 60px 10px 20px;
}

#modal-background {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 8;
}
</style>