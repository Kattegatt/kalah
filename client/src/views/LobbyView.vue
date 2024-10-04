<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <n-h1 class="text-3xl mb-4 text-center">Kalah</n-h1>
    <div v-if="!isLobbyOpened" class="flex flex-col gap-3 items-center justify-center">
      <n-button class="wide-button" size="large">Find Game</n-button>
      <n-button class="wide-button" size="large" @click="localLobbyOpened = true">Local</n-button>
      <n-button class="wide-button" size="large" @click="toMenuRoute">Back To Menu</n-button>
    </div>
    <!-- <WinRecords /> -->
    <PrivateGame v-if="localLobbyOpened" @back="localLobbyOpened = false" />
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { NButton, NH1 } from 'naive-ui'
import router from '../router/index.js'
import PrivateGame from '../components/PrivateGame.vue'
import { joinGame } from '@/socket'
import { usePlayerStore } from '../stores/player'

const localLobbyOpened = ref(false)
const findGameOpened = ref(false)

onBeforeMount(() => {
  const playerStore = usePlayerStore()

  const link = window.location.href
  if (link.split('?').pop().startsWith('game=')) {
    const gameId = link.split('game=').pop()

    joinGame(gameId)

    // Set Player Side to y (second player)
    playerStore.changePlayerSide('y')
  }
})

const toMenuRoute = () => {
  router.push({ path: '/' })
}

const isLobbyOpened = computed(() => localLobbyOpened.value || findGameOpened.value)
</script>

<style scoped>
.wide-button {
  width: 12rem;
  height: 3rem;
  @apply py-2 px-4;
}
</style>
