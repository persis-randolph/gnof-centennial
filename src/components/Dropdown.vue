<template>
    <div class="menu">
        <div v-for="option in options" :key="option" class="option">
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
    z-index: 4;
    display: block;
    position: absolute;
    right: 0;
    background-color: white;
    border: 1px solid #041e42;
    border-radius: 8px;
    padding: 5px;
}

.inactive-link {
  cursor: default;
  text-decoration: none;
}

.active-link {
  font-weight: bold;
  text-decoration: underline;
}

.nav-link {
    color: #041e42;
}
</style>