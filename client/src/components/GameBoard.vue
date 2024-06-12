<template>
  <div class="board-container">
    <BoardCell size="big" type="y" :cell="getMainCell('y')"></BoardCell>
    <div class="grid grid-cols-6 gap-4">
      <BoardCell
        v-for="cell in getSmallCells('y').reverse()"
        :key="Object.keys(cell)[0]"
        :cell="cell"
        size="small"
        type="y"
        @move="handleMove"
      ></BoardCell>
      <BoardCell
        v-for="cell in getSmallCells('x')"
        :key="Object.keys(cell)[0]"
        :cell="cell"
        size="small"
        type="x"
        @move="handleMove"
      ></BoardCell>
    </div>
    <BoardCell size="big" type="x" :cell="getMainCell('x')"></BoardCell>
    <button class="btn" @click="resetGame">Reset</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useGameStore } from '../stores/game'
import BoardCell from './BoardCell.vue'
import { socket, joinGame } from '@/socket'

export default {
  components: {
    BoardCell
  },
  setup() {
    const gameId = ref('1234')
    const gameStore = useGameStore()
    const gameState = gameStore.$state.gameState
    let extraTurn = ref(false)
    // const player = ref('x')

    // watch(socketState.latestState, () => {
    //   console.log('watch ~ latestState:', socketState.latestState)
    // })

    joinGame(gameId.value)

    socket.on('returnState', (args) => {
      console.log('socket.on ~ args:', args)
      const { newGameState, isExtraTurn } = args
      extraTurn.value = isExtraTurn
      updateGameState(newGameState)
    })

    const handleMove = (cellData) => {
      socket.emit('move', { gameState, cellData })
    }

    const resetGame = () => {
      gameStore.resetGame()
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
    return {
      gameState,
      resetGame,
      updateGameState,
      handleMove,
      getSmallCells,
      getMainCell,
      extraTurn
    }
  }
}
</script>

<style scoped>
.board-container {
  @apply flex p-4 gap-4 rounded-lg  bg-slate-600;
}

.btn {
  @apply bg-white h-12 top-11  text-slate-700 py-2 px-4 rounded-lg mt-4;
}
</style>
