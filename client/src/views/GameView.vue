<template>
  <div class="flex items-center justify-center">
    <GameBoard />
  </div>
  <div v-if="isGameOver">
    <div v-if="isWinner" class="flex flex-col items-center justify-center">
      <h1 class="text-3xl mb-4 text-center">You won!</h1>
      <button @click="toMenuRoute">Back to Menu</button>
    </div>
    <div v-else class="flex flex-col items-center justify-center">
      <h1 class="text-3xl mb-4 text-center">You lost!</h1>
      <button @click="toMenuRoute">Back to Menu</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GameBoard from '../components/GameBoard.vue'
import { socket } from '@/socket'
import { useGameStore } from '../stores/game'
import { usePlayerStore } from '../stores/player'
import router from '../router/index.js'
const playerStore = usePlayerStore()
const playerState = playerStore.$state.playerState
const playerSide = playerState.side

const gameStore = useGameStore()
const gameState = gameStore.$state.gameState

const isWinner = ref(false)

socket.on('endGame', () => {
  isWinner.value = calcIsWinner()

  isGameOver.value = true
})

const isGameOver = ref(false)
const calcIsWinner = () => {
  const playerXStore = gameState.filter(
    (cell) => Object.keys(cell)[0].includes('x') && Object.keys(cell)[0].includes('7')
  )[0]['x7']
  console.log('X store', playerXStore)
  const playerYStore = gameState.filter(
    (cell) => Object.keys(cell)[0].includes('y') && Object.keys(cell)[0].includes('7')
  )[0]['y7']
  console.log('Y store', playerYStore)
  if (playerSide === 'x') {
    return playerXStore > playerYStore
  } else {
    return playerYStore > playerXStore
  }
}

const toMenuRoute = () => {
  router.push({ path: '/' })
}
</script>

<style scoped></style>
