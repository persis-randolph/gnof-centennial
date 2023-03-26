import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Timeline from '../views/Timeline.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: Timeline
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router