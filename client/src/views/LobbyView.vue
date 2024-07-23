<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <h1 class="text-3xl mb-4 text-center">Kalah</h1>
    <div v-if="!isLobbyOpened" class="flex flex-col gap-3 items-center justify-center">
      <button class="w-44">Find Game</button>
      <button class="w-44" @click="localLobbyOpened = true">Local</button>
      <button class="w-44" @click="toMenuRoute">Back To Menu</button>
    </div>
    <!-- <WinRecords /> -->
    <PrivateGame v-if="localLobbyOpened" />
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import router from '../router/index.js'
import PrivateGame from '../components/PrivateGame.vue'
import WinRecords from '../components/WinRecords.vue'
import { socket, joinGame, createGame } from '@/socket'
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

<style scoped></style>
