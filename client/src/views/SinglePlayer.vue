<template>
  <form
    v-if="!gameStarted"
    @submit="startGame"
    class="flex flex-col items-center justify-center gap-2 p-4"
  >
    <h1 class="text-2xl">Choose Your Move</h1>

    <div class="flex flex-row gap-4">
      <input type="radio" name="move" value="1" v-model="whichMove" />
      <label for="html">First Move</label>
    </div>
    <div class="flex flex-row gap-4">
      <input type="radio" name="move" value="2" v-model="whichMove" />
      <label for="html">Second Move</label>
    </div>
    <label for="grains">Number of grains on each pot: {{ grainsValue }}</label>
    <input
      type="range"
      id="grains"
      name="grains"
      min="2"
      max="5"
      :value="grainsValue"
      @pointermove="grainsValue = $event.target.value"
    />
    <input type="submit" value="Start" />
  </form>
  <div v-if="gameStarted" class="flex flex-col items-center justify-center gap-4 p-4">
    <div class="flex items-center justify-center">
      <GameBoard />
    </div>
    <div v-if="isGameOver">
      <div class="flex flex-col items-center justify-center">
        <h1 v-if="isWinner" class="text-3xl mb-4 text-center">You won!</h1>
        <h1 v-else class="text-3xl mb-4 text-center">You lost!</h1>
        <button @click="toMenuRoute">Back to Menu</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import GameBoard from '../components/SinglePlayerGameBoard.vue'
import { useSinglePlayerGameStore } from '../stores/singlePlayerGame'

import { ref, onBeforeMount } from 'vue'
import router from '../router/index.js'

const gameStarted = ref(false)
const grainsValue = ref(2)
const whichMove = ref(1)

onBeforeMount(() => {})

const toMenuRoute = () => {
  router.push({ path: '/' })
}

const startGame = () => {
  const gameStore = useSinglePlayerGameStore()
  gameStore.setGrains(grainsValue.value)

  gameStarted.value = true
}
</script>

<style scoped></style>
