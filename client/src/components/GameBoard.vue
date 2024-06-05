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
        @move="handleMove"
      ></BoardCell>
      <BoardCell
        v-for="cell in getSmallCellsX"
        :key="Object.keys(cell)[0]"
        :cell="cell"
        size="small"
        type="x"
        @move="handleMove"
      ></BoardCell>
    </div>
    <BoardCell size="big" type="x" :cell="getMainCellX"></BoardCell>
    <button @click="resetGame">Reset</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/game'
import BoardCell from './BoardCell.vue'

export default {
  components: {
    BoardCell
  },
  emits: ['move'],
  setup() {
    const gameStore = useGameStore()
    const extraTurn = ref(false)
    // const player = ref('x')

    const resetGame = () => {
      gameStore.resetGame()
    }

    const updateGameState = (data) => {
      gameStore.updateGameState(data)
    }

    const handleMove = (cellData) => {
      const oldGameState = gameStore.gameState
      const moveCell = Object.keys(cellData)[0]
      let newGameState = [...oldGameState]
      let grainCount = Object.values(cellData)[0]

      const skippableCellKey = moveCell.includes('x') ? 'y7' : 'x7'
      const storeKey = moveCell.includes('x') ? 'x7' : 'y7'

      const startIndex =
        oldGameState.findIndex((item) => Object.keys(item)[0] === Object.keys(cellData)[0]) + 1

      newGameState[startIndex - 1] = { [moveCell]: 0 }
      let i = 0
      while (grainCount > 0) {
        const cellKey =
          i >= 13 ? String(Object.keys(newGameState[i - 13])) : String(Object.keys(oldGameState[i]))

        if (cellKey === skippableCellKey) {
          i++
          continue
        }

        if (i >= 13) {
          const oldCellValue = parseInt(Object.values(newGameState[i - 13]))
          newGameState[i - 13] = { [cellKey]: oldCellValue + 1 }
          grainCount -= 1
        } else if (i >= startIndex) {
          const oldCellValue = parseInt(Object.values(oldGameState[i]))
          newGameState[i] = { [cellKey]: oldCellValue + 1 }
          grainCount -= 1
        }
        if (grainCount === 0) {
          if (cellKey == 'x7' || cellKey == 'y7') {
            extraTurn.value = true
          } else {
            newGameState = handleCapture(newGameState, cellKey, storeKey)
          }
        }
        i++
      }
      gameStore.updateGameState(newGameState)
    }

    const handleCapture = (state, landedCellKey, storeKey) => {
      const opposites = {
        0: 12,
        1: 11,
        2: 10,
        3: 9,
        4: 8,
        5: 7,
        12: 0,
        11: 1,
        10: 2,
        9: 3,
        8: 4,
        7: 5
      }
      const storeInd = state.findIndex((obj) => Object.prototype.hasOwnProperty.call(obj, storeKey))
      const landedInd = state.findIndex((obj) =>
        Object.prototype.hasOwnProperty.call(obj, landedCellKey)
      )
      const oppositeInd = opposites[landedInd]
      if (!oppositeInd) return state
      const oppositeValue = Object.values(state[oppositeInd])[0]
      const oppositeKey = Object.keys(state[oppositeInd])[0]
      const landedOnEmpty = Object.values(state[landedInd])[0] == 1
      const landOnPlayersCell = landedCellKey[0] == storeKey[0] && landedCellKey != storeKey

      if (landOnPlayersCell && landedOnEmpty && oppositeValue > 0) {
        const sum = oppositeValue + 1
        state[storeInd] = { [storeKey]: sum }
        state[landedInd] = { [landedCellKey]: 0 }
        state[oppositeInd] = { [oppositeKey]: 0 }
      }
      return state
    }

    const getSmallCellsX = computed(() => {
      return gameStore.gameState.filter(
        (i) => Object.keys(i)[0].includes('x') && !Object.keys(i)[0].includes('7')
      )
    })

    const getMainCellX = computed(() => {
      return gameStore.gameState.filter(
        (i) => Object.keys(i)[0].includes('x') && Object.keys(i)[0].includes('7')
      )[0]
    })

    const getSmallCellsY = computed(() => {
      return gameStore.gameState
        .filter((i) => Object.keys(i)[0].includes('y') && !Object.keys(i)[0].includes('7'))
        .reverse()
    })

    const getMainCellY = computed(() => {
      return gameStore.gameState.filter(
        (i) => Object.keys(i)[0].includes('y') && Object.keys(i)[0].includes('7')
      )[0]
    })

    return {
      gameState: gameStore.gameState,
      resetGame,
      updateGameState,
      handleMove,
      getSmallCellsX,
      getMainCellX,
      getSmallCellsY,
      getMainCellY,
      extraTurn
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
