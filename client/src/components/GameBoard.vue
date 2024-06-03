<!-- <template>
  <div class="game-board">
    <div class="row">
      <div v-for="(value, key) in gameState" :key="key" class="cell">{{ key }}: {{ value }}</div>
    </div>
    <button @click="resetGame" class="btn">Reset Game</button>
  </div>
</template> -->
<template>
  <div class="grid grid-cols-6 gap-4 p-4">
    <Cell v-for="(cell, index) in cells" :key="index" :cell="cell" />
  </div>
</template>

<script>
import { useGameStore } from '../stores/game'

export default {
  setup() {
    const gameStore = useGameStore()

    const resetGame = () => {
      gameStore.resetGame()
    }

    return {
      gameState: gameStore.gameState,
      resetGame
    }
  }
}
</script>

<style scoped>
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
