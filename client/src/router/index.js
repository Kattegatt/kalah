import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import LobbyView from '../views/LobbyView.vue'
import SinglePlayer from '../views/SinglePlayer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: LobbyView
    },
    {
      path: '/singleplayer',
      name: 'singleplayer',
      component: SinglePlayer
    }
  ]
})

export default router
