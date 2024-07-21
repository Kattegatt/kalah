<template>
  <!-- For X user -->
  <fieldset v-if="thisUserSide === 'x'" class="board-container">
    <BoardCell size="big" type="y" :cell="getMainCell('y')" key="mainY"></BoardCell>
    <div class="grid grid-cols-6 gap-4">
      <BoardCell
        v-for="cell in getSmallCells('y').reverse()"
        :key="Object.keys(cell)[0]"
        :cell="cell"
        size="small"
        type="y"
        :userSide="thisUserSide"
        :turn="isMyTurn"
        @move="handleMove"
      ></BoardCell>
      <BoardCell
        v-for="cell in getSmallCells('x')"
        :key="Object.keys(cell)[0]"
        :cell="cell"
        size="small"
        type="x"
        :userSide="thisUserSide"
        :turn="isMyTurn"
        @move="handleMove"
      ></BoardCell>
    </div>
    <BoardCell size="big" type="x" :cell="getMainCell('x')" key="mainX"></BoardCell>
    <!-- <button class="btn" @click="resetGame">Reset</button> -->
  </fieldset>
  <!-- For Y user -->
  <fieldset v-if="thisUserSide === 'y'" class="board-container">
    <BoardCell size="big" type="x" :cell="getMainCell('x')"></BoardCell>
    <div class="grid grid-cols-6 gap-4">
      <BoardCell
        v-for="cell in getSmallCells('x').reverse()"
        :key="Object.keys(cell)[0]"
        :cell="cell"
        size="small"
        type="x"
        :userSide="thisUserSide"
        :turn="isMyTurn"
        @move="handleMove"
      ></BoardCell>
      <BoardCell
        v-for="cell in getSmallCells('y')"
        :key="Object.keys(cell)[0]"
        :cell="cell"
        size="small"
        type="y"
        :userSide="thisUserSide"
        :turn="isMyTurn"
        @move="handleMove"
      ></BoardCell>
    </div>
    <BoardCell size="big" type="y" :cell="getMainCell('y')" key="mainY"></BoardCell>
    <!-- <button class="btn" @click="resetGame">Reset</button> -->
  </fieldset>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useGameStore } from '../stores/game'
import { usePlayerStore } from '../stores/player'
import BoardCell from './BoardCell.vue'
import { socket } from '@/socket'

const playerStore = usePlayerStore()
const playerState = playerStore.$state.playerState

const gameStore = useGameStore()
const gameState = gameStore.$state.gameState

const isMyTurn = computed(() => {
  return playerState.activeTurn
})
const thisUserSide = computed(() => {
  return playerState.side
})

onMounted(() => {
  socket.on('returnState', (newGameState) => {
    updateGameState(newGameState)
  })

  socket.on('currentPlayer', (playerId) => {
    if (playerId === socket.id) playerState.activeTurn = true
  })
})

const handleMove = (cellData) => {
  playerStore.setTurnFalse()
  socket.emit('move', { gameState, cellData })
}

const updateGameState = (data) => {
  gameStore.updateGameState(data)
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
</script>

<style scoped>
.board-container {
  @apply flex p-4 gap-4 rounded-sm;
}

.btn {
  @apply bg-white h-12 top-11 text-slate-700 py-2 px-4 rounded-lg mt-4;
}
</style>
