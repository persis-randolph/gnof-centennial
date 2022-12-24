import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown'

library.add(faAngleDown)

const app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')