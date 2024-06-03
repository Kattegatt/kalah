import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    gameState: {
      x1: 4,
      x2: 4,
      x3: 4,
      x4: 4,
      x5: 4,
      x6: 4,
      x7: 0,
      y1: 4,
      y2: 4,
      y3: 4,
      y4: 4,
      y5: 4,
      y6: 4,
      y7: 0
    }
  }),
  actions: {
    resetGame() {
      this.gameState = {
        x1: 4,
        x2: 4,
        x3: 4,
        x4: 4,
        x5: 4,
        x6: 4,
        x7: 0,
        y1: 4,
        y2: 4,
        y3: 4,
        y4: 4,
        y5: 4,
        y6: 4,
        y7: 0
      }
    },
    updateGameState(newState) {
      this.gameState = { ...this.gameState, ...newState }
    }
  }
})
