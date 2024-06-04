<!-- <template>
  <div class="game-board">
    <div class="row">
      <div v-for="(value, key) in gameState" :key="key" class="cell">{{ key }}: {{ value }}</div>
    </div>
    <button @click="resetGame" class="btn">Reset Game</button>
  </div>
</template> -->
<template>
  <div class="board-container">
    <BoardCell size="big" type="y" :cell="getMainCellY"></BoardCell>
    <div class="grid grid-cols-6 gap-4">
      <BoardCell
        v-for="cell in getSmallCellsY"
        :key="Object.keys(cell)[0]"
        :cell="cell"
        size="small"
        type="y"
      ></BoardCell>
      <BoardCell
        v-for="cell in getSmallCellsX"
        :key="Object.keys(cell)[0]"
        :cell="cell"
        size="small"
        type="x"
      ></BoardCell>
    </div>

    <BoardCell size="big" type="x" :cell="getMainCellX"></BoardCell>
  </div>
</template>

<script>
import { useGameStore } from '../stores/game'
import BoardCell from './BoardCell.vue'

export default {
  components: {
    BoardCell
  },
  setup() {
    const gameStore = useGameStore()

    const resetGame = () => {
      gameStore.resetGame()
    }

    return {
      gameState: gameStore.gameState,
      resetGame
    }
  },
  data() {
    return {
      cellsX: this.resetGame
    }
  },
  computed: {
    getSmallCellsX() {
      return this.gameState.filter(
        (i) => Object.keys(i)[0].includes('x') && !Object.keys(i)[0].includes('7')
      )
    },
    getMainCellX() {
      return this.gameState.filter(
        (i) => Object.keys(i)[0].includes('x') && Object.keys(i)[0].includes('7')
      )[0]
    },
    getSmallCellsY() {
      return this.gameState.filter(
        (i) => Object.keys(i)[0].includes('y') && !Object.keys(i)[0].includes('7')
      )
    },
    getMainCellY() {
      return this.gameState.filter(
        (i) => Object.keys(i)[0].includes('y') && Object.keys(i)[0].includes('7')
      )[0]
    },
    methods: {
      formatGameStateForMongo(data) {
        let stateObj = {}

        data.forEach((obj) => {
          const key = Object.entries(obj)[0][0]
          const value = Object.entries(obj)[0][1]
          stateObj[key] = value
        })

        return stateObj
      }
    }
  }
}
</script>

<style scoped>
.board-container {
  @apply flex p-4 gap-4 rounded-md bg-slate-600;
}
.game-board {
  @apply grid grid-cols-4 gap-4;
}
.cell {
  @apply p-4 bg-gray-200 rounded;
}
.btn {
  @apply bg-blue-500 text-white py-2 px-4 rounded mt-4;
}
</style>
