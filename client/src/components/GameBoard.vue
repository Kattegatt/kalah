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
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/game'
import BoardCell from './BoardCell.vue'
import io from 'socket.io-client'

export default {
  components: {
    BoardCell
  },
  emits: ['move'],
  setup() {
    const gameStore = useGameStore()
    const extraTurn = ref(false)
    // const player = ref('x')

    const handleMove = (cellData) => {
      console.log(cellData)
    }

    const resetGame = () => {
      gameStore.resetGame()
    }

    const updateGameState = (data) => {
      gameStore.updateGameState(data)
    }

    const getSmallCells = (playerSide) => {
      return gameStore.gameState.filter(
        (i) => Object.keys(i)[0].includes(playerSide) && !Object.keys(i)[0].includes('7')
      )
    }

    const getMainCell = (playerSide) => {
      return gameStore.gameState.filter(
        (i) => Object.keys(i)[0].includes(playerSide) && Object.keys(i)[0].includes('7')
      )[0]
    }

    // const getSmallCellsX = computed(() => {
    //   return gameStore.gameState.filter(
    //     (i) => Object.keys(i)[0].includes('x') && !Object.keys(i)[0].includes('7')
    //   )
    // })

    // const getMainCellX = computed(() => {
    //   return gameStore.gameState.filter(
    //     (i) => Object.keys(i)[0].includes('x') && Object.keys(i)[0].includes('7')
    //   )[0]
    // })

    // const getSmallCellsY = computed(() => {
    //   return gameStore.gameState
    //     .filter((i) => Object.keys(i)[0].includes('y') && !Object.keys(i)[0].includes('7'))
    //     .reverse()
    // })

    // const getMainCellY = computed(() => {
    //   return gameStore.gameState.filter(
    //     (i) => Object.keys(i)[0].includes('y') && Object.keys(i)[0].includes('7')
    //   )[0]
    // })

    return {
      gameState: gameStore.gameState,
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
