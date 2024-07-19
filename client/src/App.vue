<template>
  <div class="static top-6 w-full z-20">
    <div class="pattern">
      <div class="container">
        <div class="pattern-inner"></div>
      </div>
    </div>
  </div>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/game">Game</RouterLink>
      <RouterLink to="/lobby">Lobby</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
    <!-- Bottom pattern -->
    <div class="absolute bottom-0 w-full z-50">
      <div class="pattern">
        <div class="container">
          <div class="pattern-inner"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { baseUrl, endpoints } from './utils/api/endpoints'
import { usePlayerStore } from './stores/player'

const playerStore = usePlayerStore()
const playerState = playerStore.$state.playerState

onBeforeMount(async () => {
  try {
    if (checkToken()) {
      const verified = await verifyToken()
      console.log('onBeforeMount ~ verified token:', verified)
      if (verified) {
        playerState.isSignedIn = true
        return
      }
    }

    const newToken = await refreshToken()
    localStorage.setItem('dk_kalah_access_token', JSON.stringify(newToken))
    playerState.isSignedIn = true
  } catch (error) {
    console.log(error)
  }
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
    authorization: 'Bearer' + localStorage.getItem('dk_kalah_access_token')
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    })
    if (response.ok) {
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
      if (newToken) {
        localStorage.setItem('dk_kalah_access_token', JSON.stringify(newToken))
      } else {
        throw new Error('Token is not found')
      }
    }
  } catch (error) {
    console.log(error)
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
