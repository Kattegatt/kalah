<template>
  <!-- <div class="static top-6 w-full z-20">
    <div class="pattern">
      <div class="container">
        <div class="pattern-inner"></div>
      </div>
    </div>
  </div> -->
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/game">Game</RouterLink>
      <RouterLink to="/lobby">Lobby</RouterLink>
    </nav>
  </header>
  <CircleLoader class="absolute top-1/2 left-1/2" v-if="!canMount" />
  <main v-if="canMount">
    <RouterView />
    <!-- Bottom pattern -->
  </main>
  <!-- <div class="absolute bottom-0 w-full z-50">
    <div class="pattern">
      <div class="container">
        <div class="pattern-inner"></div>
      </div>
    </div>
  </div> -->
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { baseUrl, endpoints } from './utils/api/endpoints'
import { usePlayerStore } from './stores/player'
import CircleLoader from './components/CircleLoader.vue'

const canMount = ref(false)

onBeforeMount(async () => {
  const playerStore = usePlayerStore()
  const playerState = playerStore.$state.playerState
  try {
    if (checkToken()) {
      const verified = await verifyToken()
      console.log('onBeforeMount ~ verified token:', verified)
      if (verified) {
        playerState.isSignedIn = true
        canMount.value = true
        return
      }
    }

    const newToken = await refreshToken()
    if (newToken) {
      localStorage.setItem('dk_kalah_access_token', newToken)
      playerState.isSignedIn = true
    }
  } catch (error) {
    console.log('onBeforeMount error', error)
  }
  canMount.value = true
})

const checkToken = () => {
  const token = localStorage.getItem('dk_kalah_access_token')
  if (!token) {
    return false
  }
  return true
}

const verifyToken = async () => {
  const url = baseUrl + endpoints.verify

  const headers = {
    'Content-Type': 'application/json',
    authorization: 'Bearer' + ' ' + localStorage.getItem('dk_kalah_access_token')
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    })
    if (response.ok) {
      console.log('response ok')
      const newToken = await response.json()

      if (newToken) {
        return newToken
      } else {
        throw new Error('Token is not found')
      }
    }
  } catch (error) {
    if (error.message === 'Not authorized') {
      refreshToken()
    } else {
      console.log(error)
    }
  }
}
const refreshToken = async () => {
  const url = baseUrl + endpoints.refresh
  try {
    const response = await fetch(url)
    if (response.ok) {
      const newToken = await response.json()
      console.log('refreshToken ~ newToken:', newToken)
      if (newToken) {
        localStorage.setItem('dk_kalah_access_token', newToken)
      } else {
        throw new Error('Token is not found')
      }
    }
  } catch (error) {
    console.log('refresh token error', error)
  }
}
</script>

<style scoped>
header {
  @apply text-white;
}

nav {
  @apply bg-gray-800 flex justify-center space-x-4;
}

nav a {
  @apply text-white no-underline hover:underline;
}

main {
  @apply p-4;
}
</style>
