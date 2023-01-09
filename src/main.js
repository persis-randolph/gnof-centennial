import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown'
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'

library.add(
  faAngleDown,
  faSquare,
  faSquareCheck
)

const app = createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')