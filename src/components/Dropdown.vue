<template>
    <div class="menu">
        <div v-for="(option, i) in options" :key="option" class="option">
            <router-link
                class="nav-link"
                :to="option"
                :class="selectedOption !== option ? 'active-link' : 'inactive-link'"
                @click="toggleMenu"
            >
                {{ option.slice(1).toUpperCase() }}
            </router-link>
            <hr v-if="i !== options.length - 1">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dropdown',
    props: {
        options: {
            type: Array
        },
        selectedOption: {
            type: String
        }
    },
    emits: ['toggle-menu'],
    setup (_, { emit }) {
        const toggleMenu = () => {
            emit('toggle-menu')
        }

        return {
            toggleMenu
        }
    }
}
</script>


<style scoped>
.menu {
    z-index: 9;
    display: block;
    position: absolute;
    right: 0;
    background-color: white;
    border: 1px solid #b0a9a0;
    border-radius: 8px;
    padding: 10px;
    /* box-shadow: 2px 2px 2px #b0a9a0;
    -moz-box-shadow: 2px 2px 3px #b0a9a0;
    -webkit-box-shadow: 2px 2px 3px #b0a9a0; */
}

.inactive-link {
  cursor: default;
  text-decoration: none;
}

.active-link {
  font-weight: bold;
  text-decoration: none;
  /* text-decoration: underline; */
}

.nav-link {
    color: #041e42;
}
</style>