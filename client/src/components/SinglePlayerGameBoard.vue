// GameBoard.vue
<template>
  <fieldset class="board-container">
    <div class="flex items-center mb-4">
      <label for="grains" class="mr-2">Number of Grains:</label>
      <input id="grains" type="number" v-model.number="grains" min="1" max="10" class="input" />
      <button class="btn ml-4" @click="setGrains">Set Grains</button>
    </div>
    <BoardCell size="big" type="y" :cell="getMainCell('y')" key="mainY"></BoardCell>
    <div class="grid grid-cols-6 gap-4">
      <BoardCell
        v-for="cell in getSmallCells('y').reverse()"
        :key="Object.keys(cell)[0]"
        :cell="cell"
        size="small"
        type="y"
        :turn="isMyTurn"
        @move="handleMove"
      ></BoardCell>
      <BoardCell
        v-for="cell in getSmallCells('x')"
        :key="Object.keys(cell)[0]"
        :cell="cell"
        size="small"
        type="x"
        :turn="isMyTurn"
        @move="handleMove"
      ></BoardCell>
    </div>
    <BoardCell size="big" type="x" :cell="getMainCell('x')" key="mainX"></BoardCell>
    <button class="btn mt-4" @click="resetGame">Reset</button>
  </fieldset>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSinglePlayerGameStore } from '../stores/singlePlayerGame'
import BoardCell from './BoardCell.vue'

const gameStore = useSinglePlayerGameStore()
const grains = ref(gameStore.grains)

const isMyTurn = computed(() => gameStore.currentPlayer === 'x')

const handleMove = (cellData) => {
  if (isMyTurn.value) {
    gameStore.handleMove(cellData)
  }
}

const getSmallCells = (side) => {
  return gameStore.gameState.filter(
    (i) => Object.keys(i)[0].includes(side) && !Object.keys(i)[0].includes('7')
  )
}

const getMainCell = (side) => {
  return gameStore.gameState.filter(
    (i) => Object.keys(i)[0].includes(side) && Object.keys(i)[0].includes('7')
  )[0]
}

const resetGame = () => {
  gameStore.resetGame()
}

const setGrains = () => {
  gameStore.setGrains(grains.value)
}
</script>

<style scoped>
.board-container {
  @apply flex p-4 gap-4 rounded-sm;
}

.btn {
  @apply bg-white h-12 top-11 text-slate-700 py-2 px-4 rounded-lg mt-4;
}

.input {
  @apply border rounded px-2 py-1;
}
</style>
