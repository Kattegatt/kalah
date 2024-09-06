<template>
  <n-space class="board-container">
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
        userSide="x"
        @move="handleMove"
      ></BoardCell>
    </div>
    <BoardCell size="big" type="x" :cell="getMainCell('x')" key="mainX"></BoardCell>
    <button class="btn mt-4" @click="resetGame">Reset</button>
  </n-space>
</template>

<script setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useSinglePlayerGameStore } from '../stores/singlePlayerGame.js'
import BoardCell from './BoardCell.vue'
import { NSpace } from 'naive-ui'

const gameStore = useSinglePlayerGameStore()
const { currentPlayer } = storeToRefs(gameStore)

const isMyTurn = computed(() => gameStore.currentPlayer === 'x')

watch(currentPlayer, (newVal, oldVal) => {
  if (newVal === 'y') {
    const randomTimeout = Math.floor(Math.random() * 1000) + 1000
    setTimeout(() => {
      gameStore.handleBotMove()
    }, randomTimeout)
  }
})

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
