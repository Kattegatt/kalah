<template>
  <n-card>
    <n-form
      v-if="!gameStarted"
      @submit="startGame"
      class="flex flex-col items-center justify-center gap-2 p-4"
    >
      <h1 class="text-2xl mb-3">Choose Your Move</h1>
      <n-radio-group v-model:value="whichMove" class="flex flex-row gap-4">
        <n-radio value="1" label="First Move" />
        <n-radio value="2" label="Second Move" />
      </n-radio-group>

      <label for="grains">Number of grains on each pot: {{ grainsValue }}</label>
      <n-space vertical class="w-1/2">
        <n-slider
          id="grains"
          v-model:value="grainsValue"
          :min="2"
          :max="5"
          size="big"
          @update:value="grainsValue = $event"
      /></n-space>

      <n-button type="primary" attr-type="submit">Start</n-button>
    </n-form>
  </n-card>

  <div v-if="gameStarted" class="flex flex-col items-center justify-center gap-4 p-4">
    <div class="flex items-center justify-center">
      <GameBoard />
    </div>
    <div v-if="isGameOver">
      <div class="flex flex-col items-center justify-center">
        <h1 v-if="isWinner" class="text-3xl mb-4 text-center">You won!</h1>
        <h1 v-else class="text-3xl mb-4 text-center">You lost!</h1>
        <h1 v-if="isDraw" class="text-3xl mb-4 text-center">It's a draw!</h1>
        <n-button @click="toMenuRoute">Back to Menu</n-button>
        <n-button>Play Again</n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
// In singleplayer game user is always 'x' side

import GameBoard from '../components/SinglePlayerGameBoard.vue'
import { useSinglePlayerGameStore } from '../stores/singlePlayerGame'
import { NCard, NForm, NButton, NRadio, NRadioGroup, NSlider, NSpace } from 'naive-ui'

import { storeToRefs } from 'pinia'
import { ref, onBeforeMount, computed, watch } from 'vue'
import router from '../router/index.js'

const gameStore = useSinglePlayerGameStore()

const gameStarted = ref(false)
const grainsValue = ref(2)
const whichMove = ref(1)

const { isActive } = storeToRefs(gameStore)

const isGameOver = ref(false)
const isWinner = ref(false)
const isDraw = ref(false)

watch(isActive, (newVal, oldVal) => {
  if (newVal === false) {
    gameStore.calcWinner()
    isWinner.value = gameStore.getWinner()
    isDraw.value = gameStore.getIsDraw()

    isGameOver.value = true
  }
})
onBeforeMount(() => {})

const toMenuRoute = () => {
  router.push({ path: '/' })
}

const startGame = () => {
  gameStore.setGrains(grainsValue.value)
  const player = whichMove.value == 1 ? 'x' : 'y'
  //   gameStore.switchPlayer(player)
  gameStore.resetGame(player)
  gameStarted.value = true
}
</script>

<style scoped></style>
