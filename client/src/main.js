// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './tailwind.css'
import './assets/css/yorha.css'
import './assets/css/yorha_extra.scss'

import App from './App.vue'
import router from './router'
import { initializeSocket } from './socket.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

// Initialize socket after app is created
initializeSocket()
